/**
 * @author Huitre<gohin.j@gmail.com>
 */
 /*
  * Fichier de description des animations de chaque personnage
  *
  * Structure : 
        characterName :
            animationName : [ 
                    {-left, -top, width, height, time between frame}
                ]
  */
var Animation = {
  ken : {
    idle : [
      {x : -6,  y : -18,  w : 43, h : 81},
      {x : -55,  y : -18, w : 43, h : 81},
      {x : -105, y : -18, w : 43, h : 81},
      {x : -154, y : -18, w : 43, h : 81}
    ],
    walkright : [
      {x : -205, y : -17, w : 44, h : 82, rate: 50},
      {x : -252, y : -17, w : 43, h : 82, rate: 50},
      {x : -301, y : -17, w : 43, h : 82, rate: 50},
      {x : -351, y : -17, w : 43, h : 82, rate: 50},
      {x : -401, y : -17, w : 43, h : 82, rate: 50}
    ],
    lpunch : [
      {x : -3,   y : -133, w : 43, h : 82, rate: 20},
      {x : -52,  y : -133, w : 57, h : 82, rate: 30},
      {x : -117, y : -133, w : 43, h : 82, rate: 10}
    ],
    lkick : [
      {x : -6,   y : -260, w : 49, h : 86},
      {x : -62,  y : -260, w : 67, h : 86},
      {x : -135, y : -260, w : 49, h : 86}
    ],
    shoryuken : [
      {x : -246, y : -0, w : 73, h : 100},
      {x : -320, y : 0, w : 73, h : 100},
      {x : -395, y : 0, w : 82, h : 100},
      {x : -476, y : 1, w : 82, h : 100},
      {x : -27, y : -110, w : 68, h : 136},
      {x : -107, y : -110, w : 68, h : 136},
      {x : -183, y : -110, w : 68, h : 136},
      {x : -251, y : -110, w : 73, h : 136},
      {x : -325, y : -114, w : 73, h : 136},
      {x : -398, y : -120, w : 64, h : 119},
      {x : -468, y : -126, w : 64, h : 115}
    ],
    jump : [
      {x : -498, y : -6, w: 43, h: 93},
      {x : -537, y : -15, w: 43, h: 81},
      {x : -575, y : -15, w: 43, h: 81},
      {x : -614, y : -15, w: 42, h: 81},
      {x : -498, y : -6, w: 43, h: 93}
    ],
    crouch : [
      {x : -498, y : -6, w: 43, h: 93}
    ]
  }
};
