
const walkRightSprite = {
  name:"walkRight",
  size: {width: 102, height: 148},
  animationTypes: ['ALL'],
  frames: [
    require('./walk-right0.png'),
    require('./walk-right1.png'),
    require('./walk-right2.png'),
    require('./walk-right3.png'),
    require('./walk-right4.png'),
    require('./walk-right5.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ALL':
        return [0,1,2,3,4,5];
    }
  },
};

export default walkRightSprite;
