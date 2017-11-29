import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Image } from 'react-native';

export default class MenuScreenComponent extends Component {

    constructor () {
        super();
        this.state = {
          profileImage: require('../img/profile.png'),
          profileScore: 0,
          profileName: "Player 1",
        };
     }

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
            		<Text>Profile Name: {this.state.profileName}</Text>
            		<Text>Highscore: {this.state.profileScore} points</Text>
            		<Image
            			style={{width: 80, height: 80}}
            			source={this.state.profileImage}
        			/>
            	</View>
            	<Button
	            onPress={() => navigate('Game')}
	            title="Play Game: Mind Games"
	            />
	            <Button
	            onPress={() => navigate('Score')}
	            title="View Highscores"
	            />
            	<Button
	            onPress={() => navigate('Profile')}
	            title="Profile/Avatar Selection"
	            />
            </View>
        );
    }
}