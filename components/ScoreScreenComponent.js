import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';

export default class ScoreScreenComponent extends Component {

    static navigationOptions = {
        title: 'Back to Main Menu',
    };

    //TODO make the list update by the saved score information
    render() {
        return (
            <View>
            	<Text>High Scores</Text>
                <Text>Player 1: 0</Text>

            </View>
        );
    }
}