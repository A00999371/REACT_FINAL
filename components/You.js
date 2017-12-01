// Import Libraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MenuScreenComponent from './MenuScreenComponent';
import ProfileScreenComponent from './ProfileScreenComponent';

// Create a Component
export default class You extends Component {
   
    constructor () {
	    super();
	    this.state = {
	      animationType: 'ALL',
	      profileImage: require('../img/profile.png'),
	      profileScore: "",
	      profileName: "",
	    };
     }
     
     getScore() {
         return this.state.profileScore;
     }
   
     componentDidMount() {
		this.getProfile();
		this.getHighscore();
		// this.getAvatar();
    }
    
    settingStates(v, i) {
        MenuScreenComponent.setState({
            v: i
        })
        ProfileScreenComponent.setState({
            v: i
        })
    }

	async getProfile() {
		var profile = await AsyncStorage.getItem('Profile');
        settingStates(profileName, profile);
	}

	async getHighscore() {
		var score = await AsyncStorage.getItem('Highscore');
		this.setState({
			profileScore: score
		});
	}

	async getAvatar() {
		var img = await AsyncStorage.getItem('Avatar');
		this.setState({
			profileImage: img
		});
	}

    render() {
        return (
            <View>
                
            </View>
        );
    }
}
