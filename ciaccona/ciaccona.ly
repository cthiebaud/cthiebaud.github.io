%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% %%%%%%%  Cut here ----- Start 'bbarred.ly'

%% C with slash -------------------------------
cWithSlash = \markup {
  \combine \roman C \translate #'(0.6 . -0.4) \draw-line #'(0 . 2.0)
}
%% Span -----------------------------------
%% Syntax: \bbarre #"text" { notes } - text = any number of box
bbarre =
#(define-music-function (barre location str music) (string? ly:music?)
   (let ((elts (extract-named-music music '(NoteEvent EventChord))))
     (if (pair? elts)
         (let ((first-element (first elts))
               (last-element (last elts)))
           (set! (ly:music-property first-element 'articulations)
                 (cons (make-music 'TextSpanEvent 'span-direction -1)
                       (ly:music-property first-element 'articulations)))
           (set! (ly:music-property last-element 'articulations)
                 (cons (make-music 'TextSpanEvent 'span-direction 1)
                       (ly:music-property last-element 'articulations))))))
   #{
       \once \override TextSpanner.font-size = #-2
       \once \override TextSpanner.font-shape = #'upright
       \once \override TextSpanner.staff-padding = #3
       \once \override TextSpanner.style = #'line
       \once \override TextSpanner.to-barline = ##f
       \once \override TextSpanner.bound-details =
            #`((left
                (text . ,#{ \markup { \draw-line #'( 0 . -.5) } #})
                (Y . 0)
                (padding . 0.25)
                (attach-dir . -2))
               (right
                (text . ,#{ \markup { \cWithSlash #str } #})
                (Y . 0)
                (padding . 0.25)
                (attach-dir . 2)))
%% uncomment this line for make full barred
      % \once \override TextSpanner.bound-details.left.text = \markup{"B" #str}
      $music
   #})

%% %%%%%%%  Cut here ----- End 'bbarred.ly'
%% Copy and change the last line for full barred. Rename in 'fbarred.ly'
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

#(define RH rightHandFinger)

\header {
  title = "Ciaccona"
  composer = "JS Bach"
}

\score {
  \relative c' {
    \key d \minor
    \time 3/4

    % 1
    \partial 2
    <<
        {
        a'4.-3\4\RH #3  a8 }
        \\
        { 
        < f-4\5\RH #2 d,-0\RH #1 >2 
        }
    >>
    % 2
    <<
        { 
        e'4-0\1\RH #4 
        e4.\RH #4 
        e8 
        }
        \\
        { 
        < bes-4\RH #2 g-0\RH #3 d-1\RH #1 >4 
        < a-4\RH #2 g\RH #3 cis,-1\RH #1 >2 
        }
    >>
    % 3
    <<
        \bbarre #"V" { f'4-1  d4.-2 c8-1 } 
        \\
        { < a-2 f-3 d,-0 >4 < f-4 bes,-3 >2 }
    >>
    % 4
    <<
        { bes4-4 a-1 g16-0 f-2( e-1 f-2) }
        \\
        { < g-0 g,-1 >4 < f-2 a,-0 > cis-3 }
    >>
  }
  \layout {
    \set fingeringOrientations = #'(left)
    \set stringNumberOrientations = #'(left)
  }
  \midi {}
}