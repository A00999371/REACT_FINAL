import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreenComponent from './components/LoginScreenComponent';
import MenuScreenComponent from './components/MenuScreenComponent'
import ProfileScreenComponent from './components/ProfileScreenComponent'
import GameScreenComponent from './components/GameScreenComponent'
import ScoreScreenComponent from './components/ScoreScreenComponent'

const SimpleApp = StackNavigator({
  Login : {
    screen : LoginScreenComponent
  },

  Menu: {
    screen: MenuScreenComponent 
  },

  Profile: {
    screen: ProfileScreenComponent
  },

  Game: {
    screen: GameScreenComponent
  },

  Score: {
    screen: ScoreScreenComponent
  }
}, {
  headerMode: 'none',
  gesturesEnabled: false,
});

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <SimpleApp style={{marginTop: 10}}/> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});