
const rickSprite = {
  name:"rick",
  size: {width: 124, height: 161},
  animationTypes: ['ALL'],
  frames: [
    require('./rick1.png'),
    require('./rick2.png'),
    require('./rick3.png'),
    require('./rick4.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ALL':
        return [0,1,2,3];
    }
  },
};

export default rickSprite;
