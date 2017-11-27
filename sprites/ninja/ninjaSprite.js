
const ninjaSprite = {
  name:"ninja",
  size: {width: 180, height: 247},
  animationTypes: ['ALL'],
  frames: [
    require('./n1.png'),
    require('./n2.png'),
    require('./n3.png'),
    require('./n4.png'),
    require('./n5.png'),
    require('./n6.png'),
    require('./n7.png'),
    require('./n8.png'),
    require('./n9.png'),
    require('./n10.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8,9];
    }
  },
};

export default ninjaSprite;
