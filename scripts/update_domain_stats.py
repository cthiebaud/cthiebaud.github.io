#!/usr/bin/env python3
"""
Recompute the activity/lastCommit/commits figures in ../index.html's
`domains` object from local git history, and rewrite them in place.

Ground truth is local clones under ~/github.com/<owner>/<repo>, not the
GitHub API — some domains (notably hat.cthiebaud.com) aggregate repos
that are no longer public, so the API alone can't reproduce these numbers.

Methodology (see index.html's "Peak Activity" header tooltip):
  - default branch only per repo, not --all. --all sweeps in dependabot
    branches, fork upstream-tracking refs, and stale pre-rewrite history
    on orphan branches (e.g. aequologica's old "backup" branch) that
    inflate counts without representing real additional effort.
  - a domain spanning more than one repo (bwv, ciaccona, covid, hat,
    sangiosleague, sangiovannilipioni) combines each repo's default
    branch, deduped by commit hash.
  - iroif is the one deliberate exception: it combines master + gh-pages
    (both hand-authored, serving different purposes) but excludes
    gh-pages-orig (a disjoint pre-rewrite history, same issue as
    aequologica's backup branch).

Run manually, or on a schedule (e.g. launchd/cron). Prints a summary of
what changed; does not commit or push - review the diff and do that
yourself.
"""
import datetime
import re
import subprocess
from pathlib import Path

BASE = Path.home() / "github.com"
INDEX_HTML = Path(__file__).resolve().parent.parent / "index.html"

HAT_SUBMODULES = [
    "battement", "buildhub", "dagr", "elastoc", "erator", "garance",
    "geppaequo", "hello-CDI-on-java-SE-world", "holos", "lifebuoy",
    "meios", "parole", "quintessence", "runciter", "serioulizer",
    "shakuntala", "tuhao", "zebulon",
]

# domain -> [(path, ref), ...]. ref is an origin/<branch> remote-tracking
# ref for anything fetched from GitHub, or a plain local branch name for
# the hat family (those repos are no longer reachable on GitHub to fetch).
ENTRIES = {
    "cthiebaud.com": [(BASE / "cthiebaud/cthiebaud.github.io", "origin/main")],
    "aequologica.cthiebaud.com": [(BASE / "aequologica/aequologica.github.io", "origin/master")],
    "aletheia.cthiebaud.com": [(BASE / "cthiebaud/truth", "origin/main")],
    "athenaeum.cthiebaud.com": [(BASE / "athenaeum-brew/making-of", "origin/main")],
    "bookshelves.cthiebaud.com": [(BASE / "cthiebaud/bookshelves", "origin/main")],
    "bwv.cthiebaud.com": [
        (BASE / "musicollator/bwv-siegel", "origin/main"),
        (BASE / "musicollator/bwv-zeug", "origin/main"),
        (BASE / "musicollator/bwv", "origin/main"),
        (BASE / "musicollator/bwv1006", "origin/main"),
        (BASE / "musicollator/bwv245", "origin/main"),
        (BASE / "musicollator/bwv543", "origin/main"),
        (BASE / "musicollator/bwv639", "origin/main"),
        (BASE / "musicollator/bwv659", "origin/main"),
        (BASE / "musicollator/bwv846", "origin/main"),
        (BASE / "musicollator/bwv849", "origin/main"),
        (BASE / "musicollator/bwv988", "origin/main"),
    ],
    "ciaccona.cthiebaud.com": [
        (BASE / "musicollator/ciaccona", "origin/main"),
        (BASE / "musicollator/ciaccona-stationary", "origin/main"),
    ],
    "covid.cthiebaud.com": [(BASE / "covid-aequologica-net/covid-aequologica-net.github.io", "origin/master")],
    "emugnier.cthiebaud.com": [(BASE / "cthiebaud/emugnier", "origin/main")],
    "gear.cthiebaud.com": [(BASE / "cthiebaud/gear", "origin/main")],
    "hat.cthiebaud.com": [(BASE / "hat", "develop")] + [
        (BASE / "hat" / name, "develop") for name in HAT_SUBMODULES
    ],
    "iroif.cthiebaud.com": [
        (BASE / "cthiebaud/iroif", "origin/master"),
        (BASE / "cthiebaud/iroif", "origin/gh-pages"),
    ],
    "klam.cthiebaud.com": [(BASE / "cthiebaud/klam", "origin/main")],
    "mundial.cthiebaud.com": [(BASE / "born-in-plays-for/mundial", "origin/main")],
    "music.cthiebaud.com": [(BASE / "cthiebaud/music", "origin/main")],
    "openmozart.cthiebaud.com": [(BASE / "cthiebaud/openmozart.net", "origin/master")],
    "openricard.cthiebaud.com": [(BASE / "cthiebaud/openricard.net", "origin/master")],
    "sangiosleague.cthiebaud.com": [
        (BASE / "sangiosleague/sangiosleague.github.io", "origin/master"),
        (BASE / "sangiosleague/sangiosleague.api", "origin/main"),
    ],
    "sangiovannilipioni.cthiebaud.com": [
        (BASE / "sangiovannilipioni/sangiovannilipioni.github.io", "origin/master"),
        (BASE / "sangiovannilipioni/sangiovannilipioni.api", "origin/main"),
    ],
}


def fetch_all_repos():
    seen = set()
    for pairs in ENTRIES.values():
        for path, ref in pairs:
            if ref.startswith("origin/") and path not in seen:
                seen.add(path)
                subprocess.run(["git", "-C", str(path), "fetch", "origin", "--quiet"],
                                capture_output=True)


def stats(repo_ref_pairs):
    epochs = {}
    for path, ref in repo_ref_pairs:
        out = subprocess.run(["git", "-C", str(path), "log", ref, "--format=%H %at"],
                              capture_output=True, text=True).stdout
        for line in out.splitlines():
            parts = line.split(" ")
            if len(parts) == 2:
                h, t = parts
                epochs[h] = int(t)
    if not epochs:
        return None
    mean = sum(epochs.values()) / len(epochs)
    mean_d = datetime.datetime.fromtimestamp(mean, datetime.timezone.utc).strftime("%Y-%m-%d")
    last_d = datetime.datetime.fromtimestamp(max(epochs.values()), datetime.timezone.utc).strftime("%Y-%m-%d")
    return mean_d, last_d, len(epochs)


def update_timestamp(html):
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    pattern = re.compile(
        r'(<span id="stats-updated">\s*stats last updated: )[^\n<]*(\s*</span>)'
    )
    return pattern.sub(lambda m: m.group(1) + now + m.group(2), html, count=1)


def update_index_html(results):
    html = INDEX_HTML.read_text(encoding="utf-8")
    changes = []
    for domain, (activity, last_commit, commits) in results.items():
        pattern = re.compile(
            r'("' + re.escape(domain) + r'":\s*\{[^\n]*?)'
            r'activity: "[\d-]+", lastCommit: "[\d-]+", commits: \d+'
        )
        m = pattern.search(html)
        if not m:
            print(f"WARNING: could not find entry for {domain!r} in index.html, skipping")
            continue
        old = m.group(0)
        new = m.group(1) + f'activity: "{activity}", lastCommit: "{last_commit}", commits: {commits}'
        if old != new:
            changes.append((domain, old, new))
        html = pattern.sub(lambda _m, new=new: new, html, count=1)
    html = update_timestamp(html)
    INDEX_HTML.write_text(html, encoding="utf-8")
    return changes


def main():
    print("Fetching latest refs...")
    fetch_all_repos()

    print("Computing stats...")
    results = {}
    for domain, pairs in ENTRIES.items():
        results[domain] = stats(pairs)

    changes = update_index_html(results)

    if not changes:
        print("No domain stats changed (timestamp refreshed regardless).")
        return

    print(f"\n{len(changes)} domain(s) updated:")
    for domain, old, new in changes:
        print(f"  {domain}")
        print(f"    - {old}")
        print(f"    + {new}")
    print("\nReview with `git diff`, then commit and push yourself.")


if __name__ == "__main__":
    main()
