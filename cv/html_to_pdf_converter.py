#!/usr/bin/env python3
"""
High-Quality HTML to PDF Converter using Playwright
Renders the HTML exactly like a browser for perfect Bootstrap styling.
"""

import os
import sys
from pathlib import Path

def convert_html_to_pdf(html_file="index.html", pdf_file="cthiebaud.pdf"):
    """Convert HTML resume to PDF using Playwright (browser-based rendering)"""
    try:
        from playwright.sync_api import sync_playwright
        
        print(f"Converting {html_file} to {pdf_file} using browser rendering...")
        
        with sync_playwright() as p:
            # Launch browser
            browser = p.chromium.launch()
            page = browser.new_page()
            
            # Navigate to the HTML file
            file_path = Path(html_file).resolve()
            page.goto(f"file://{file_path}")
            
            # Wait for page to fully load (important for external CSS/fonts)
            page.wait_for_load_state("networkidle")
            
            # Emulate print media to apply @media print styles
            page.emulate_media(media="print")
            
            # Generate PDF with good settings for resumes (portrait orientation)
            page.pdf(
                path=pdf_file,
                format="A4",
                landscape=False,  # Explicitly set portrait
                margin={
                    "top": "0.5in",
                    "bottom": "0.5in", 
                    "left": "0.5in",
                    "right": "0.5in"
                },
                print_background=True,  # Include background colors/images
                prefer_css_page_size=False,
                width="8.27in",   # A4 width in portrait
                height="11.7in"   # A4 height in portrait
            )
            
            browser.close()
        
        print(f"✅ Successfully created {pdf_file}")
        return True
        
    except ImportError:
        print("❌ Playwright not installed.")
        print("Install it with:")
        print("  pip install playwright")
        print("  playwright install chromium")
        return False
    except Exception as e:
        print(f"❌ Conversion failed: {e}")
        return False

def install_playwright():
    """Helper function to install Playwright"""
    try:
        import subprocess
        print("Installing Playwright...")
        subprocess.run([sys.executable, "-m", "pip", "install", "playwright"], check=True)
        subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=True)
        print("✅ Playwright installed successfully!")
        return True
    except Exception as e:
        print(f"❌ Failed to install Playwright: {e}")
        return False

if __name__ == "__main__":
    # Default filenames
    html_file = "index.html"
    pdf_file = "cthiebaud.pdf"
    
    # Allow command line arguments
    if len(sys.argv) > 1:
        html_file = sys.argv[1]
    if len(sys.argv) > 2:
        pdf_file = sys.argv[2]
    
    # Check if HTML file exists
    if not os.path.exists(html_file):
        print(f"❌ HTML file '{html_file}' not found!")
        sys.exit(1)
    
    # Try conversion, offer to install if needed
    success = convert_html_to_pdf(html_file, pdf_file)
    
    if not success:
        install_choice = input("Would you like to try installing Playwright? (y/n): ")
        if install_choice.lower() == 'y':
            if install_playwright():
                success = convert_html_to_pdf(html_file, pdf_file)
    
    sys.exit(0 if success else 1)