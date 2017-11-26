import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Image } from 'react-native';

export default class MenuScreenComponent extends Component {

    static navigationOptions = {
        title: 'Back to Login',
    };

    //TODO updateable pofile tab from file info
    render() {
    	const {navigate} = this.props.navigation;
        return (
            <View>
            	<Text>MAIN MENU</Text>
            	<View>
            		<Text>Profile Name: Player 1</Text>
            		<Text>Highscore: 0 points</Text>
            		<Image
            			style={{width: 50, height: 50}}
            			source={require('../img/profile.png')}
        			/>
            	</View>
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