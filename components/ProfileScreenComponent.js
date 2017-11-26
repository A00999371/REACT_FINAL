import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Image } from 'react-native';

export default class ProfileScreenComponent extends Component {

    static navigationOptions = {
        title: 'Back to Main Menu',
    };

    //TODO add in multiple avatars, with associated sprite 
    //TODO buttons and functions to update the local file and pofile tab
    render() {
        return (
            <View>
            	<Text>Edit Profile & Avatar Selection</Text>
            	<View>
            		<Text>Profile Name: Player 1</Text>
            		<Text>Highscore: 0 points</Text>
            		<Image
            			style={{width: 50, height: 50}}
            			source={require('../img/profile.png')}
        			/>
            	</View>
            </View>
        );
    }
}