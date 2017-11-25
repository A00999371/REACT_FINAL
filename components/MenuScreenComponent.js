import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';

export default class MenuScreenComponent extends Component {

    static navigationOptions = {
        title: 'Back to Login',
    };
    render() {
    	const {navigate} = this.props.navigation;
        return (
            <View>
            	<Text>MAIN MENU</Text>
            	<Button
	            onPress={() => navigate('Game')}
	            title="Play Game: Mind Games"
	            />
            	<Button
	            onPress={() => navigate('Profile')}
	            title="Profile/Avatar Selection"
	            />
            </View>
        );
    }
}