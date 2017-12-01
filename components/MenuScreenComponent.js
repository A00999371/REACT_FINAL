import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Image, AsyncStorage, Keyboard } from 'react-native';

export default class MenuScreenComponent extends Component {

    constructor () {
        super();
        this.state = {
        	profileImage: [],
        	profileScore: "",
        	profileName: "",
		};
		this.getAvatar = this.getAvatar.bind(this);
	 }
	 
	componentDidMount() {
		this.getProfile();
		this.getHighscore();
		this.getAvatar();
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
		var l = [];

		if (img == 'profile') {
			l.push(<Image style={{width: 80, height: 80}} source={require('../img/profile.png')} key={'profile'}/>);
		} else if (img == 'ninja') {
			l.push(<Image style={{width: 80, height: 80}} source={require('../img/ninja1.png')} key={'ninja'}/>);			
		} else if (img == 'hulk') {
			l.push(<Image style={{width: 80, height: 80}} source={require('../img/hulk1.png')} key={'hulk'}/>);			
		} else if (img == 'morty') {
			l.push(<Image style={{width: 80, height: 80}} source={require('../img/morty1.png')} key={'morty'}/>);
		} else if (img == 'rick') {
			l.push(<Image style={{width: 80, height: 80}} source={require('../img/rick1.png')} key={'rick'}/>);			
		} else if (img == 'ironman') {
			l.push(<Image style={{width: 80, height: 80}} source={require('../img/ironman1.png')} key={'ironman'}/>);			
		} else {
			l.push(<Image style={{width: 80, height: 80}} source={require('../img/guy.png')} key={'guy'}/>);			
		}
		this.setState({
			profileImage: l
		});
	}

	changeHighscore(value) {
		this.setState({
			profileScore: value
		});
	}

    static navigationOptions = {
        tabBarLabel: 'Back to Login',
	};

    //TODO updateable pofile tab from file info
    render() {
		const {navigate} = this.props.navigation;
		Keyboard.dismiss();
        return (
            <View>
            	<Text>MAIN MENU</Text>
            	<View>
            		<Text>Profile Name: {this.state.profileName}</Text>
            		<Text>Highscore: {this.state.profileScore} points</Text>
            		{this.state.profileImage}
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
				<Button
				onPress={async () => {
					await AsyncStorage.removeItem("Highscore");
					await AsyncStorage.removeItem("Profile");
					await AsyncStorage.removeItem("Avatar");
					navigate('Login')
				}}
				title='Logout'
				/>
            </View>
        );
    }
}