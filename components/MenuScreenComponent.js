import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Image, AsyncStorage } from 'react-native';

export default class MenuScreenComponent extends Component {

    constructor () {
        super();
        this.state = {
          profileImage: require('../img/profile.png'),
          profileScore: "",
          profileName: "",
        };
	 }
	 
	componentDidMount() {
		this.getProfile();
		this.getHighscore();
		// this.getAvatar();
	}

	async getProfile() {
		var profile = await AsyncStorage.getItem('Profile');
		this.setState({
			profileName: profile
		});
	}

	async getHighscore() {
		var score = await AsyncStorage.getItem('Highscore');
		this.setState({
			profileScore: score
		});
	}

	//TODO figure out how to make require work dynamically
	//Or hardcode all values and match with what the AsyncStorage item is
	async getAvatar() {
		var img = await AsyncStorage.getItem('Avatar');
		this.setState({
			profileImage: img
		});
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