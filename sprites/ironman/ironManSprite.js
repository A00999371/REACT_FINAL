
const ironManSprite = {
  name:"ironMan",
  size: {width: 400, height: 400},
  animationTypes: ['ALL'],
  frames: [
    require('./ironman4.png'),
    require('./ironman5.png'),
    require('./ironman6.png'),
    require('./ironman7.png'),
    require('./ironman8.png'),
    require('./ironman9.png'),
    require('./ironman10.png'),
    require('./ironman11.png'),
    require('./ironman12.png'),
    require('./ironman13.png'),
    require('./ironman14.png'),
    require('./ironman15.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8,9,10,11];
    }
  },
};

export default ironManSprite;
