
const hulkSprite = {
  name:"ninja",
  size: {width: 360, height: 360},
  animationTypes: ['ALL'],
  frames: [
    require('./hulk1.png'),
    require('./hulk2.png'),
    require('./hulk3.png'),
    require('./hulk4.png'),
    require('./hulk5.png'),
    require('./hulk6.png'),
    require('./hulk7.png'),
    require('./hulk8.png'),
    require('./hulk9.png'),
    require('./hulk10.png'),
    require('./hulk11.png'),
    require('./hulk12.png'),
    require('./hulk13.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8,9,10,11,12];
    }
  },
};

export default hulkSprite;
