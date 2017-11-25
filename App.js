import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreenComponent from './components/LoginScreenComponent';
import MenuScreenComponent from './components/MenuScreenComponent'
import ProfileScreenComponent from './components/ProfileScreenComponent'
import GameScreenComponent from './components/GameScreenComponent'

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
  }
});

export default class App extends React.Component {
  render() {
    return (
      <SimpleApp/> 
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