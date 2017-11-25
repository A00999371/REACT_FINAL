import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';

export default class GameScreenComponent extends Component {

    static navigationOptions = {
        title: 'Quit to Main Menu',
    };

    //TODO add the game, record the score and update the profile
    render() {
        return (
            <View>
            	<Text>MIND GAMES</Text>

            </View>
        );
    }
}