\header {
  title = "Petit Arpège pour la Route"
  composer = "Christophe Thiebaud"
}

#(define RH rightHandFinger)

\markup {
  \vspace #1
}

\markup { \abs-fontsize #7 \italic "6ème corde en ré" } 

\score {

\storePredefinedDiagram #default-fret-table
                        \chordmode { e }
                        #guitar-tuning
                        #"2-1;x;2-2;o;o;o;"

\storePredefinedDiagram #default-fret-table
                        \chordmode { a }
                        #guitar-tuning
                        #"x;o;2-2;o;1-1;o;"

\storePredefinedDiagram #default-fret-table
                        \chordmode { d }
                        #guitar-tuning
                        #"o;x;4-3;4-4;1-1;2-2;"

\storePredefinedDiagram #default-fret-table
                        \chordmode { g }
                        #guitar-tuning
                        #"5-3;x;4-2;5-4;o;2-2;"

\storePredefinedDiagram #default-fret-table
                        \chordmode { fis }
                        #guitar-tuning
                        #"4-3;x;2-1;4-4;o;o;"

\storePredefinedDiagram #default-fret-table
                        \chordmode { e:sus4 }
                        #guitar-tuning
                        #"x;x;2-1;2-2;o;o;"

\storePredefinedDiagram #default-fret-table
                        \chordmode { b }
                        #guitar-tuning
                        #"x;x;1-1;2-3;o;3-4;"
<<
  \new FretBoards {
    \chordmode {
      e1 r1 r4 
      a1 r1 r4  
      d1 r1 r4  
      g1 r8  
      fis8 r4
      e:sus4 r8
      b4
    }
  }
  \new Voice \relative e {
    \key e \minor
    \time 9/8

    \repeat volta 2 {

    \bar ".|:" 

    \repeat percent 2 { e16-1\RH #1 g'\RH #2 e-2\RH #1 b'\RH #3 g\RH #2  e'\RH #4 
    b\RH #3 e\RH #4 g,\RH #2 b\RH #3 fis-4\RH #1 g\RH #2
    b\RH #3 e\RH #4 g,\RH #2 b\RH #3 fis-4\RH #1 g\RH #2 |
    }

    \break

    \repeat percent 2 { a, g' e-2 c'-1 g  e' 
    c e g, c fis,-4 g 
    c e g, c fis, g  |
    }

    \break

    \repeat percent 2 { 

    d, b''-4 fis-3 c'-1 b  fis'-2 
    c fis b, c fis, b 
    c fis b, c fis, b |

    }

    \break

    { 
    g,-3 c'-4 fis,-2 b c fis-1 
    b, fis' c b fis c' 
    b fis' c b fis c' |
    }

    {
    fis,,-3 b'-4 e,-1 b'-0 b-4 e 
    b e-1 a,-2 b e, a  
    b g'-4 a,-3 b dis,-1 a' |
    }

    }
  }
>>
 \layout {
    indent = #0
  }
  \midi {}
}
