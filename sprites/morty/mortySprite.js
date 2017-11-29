
const mortySprite = {
  name:"morty",
  size: {width: 124, height: 161},
  animationTypes: ['ALL'],
  frames: [
    require('./morty1.png'),
    require('./morty2.png'),
    require('./morty3.png'),
    require('./morty4.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ALL':
        return [0,1,2,3];
    }
  },
};

export default mortySprite;
