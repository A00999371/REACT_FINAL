import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, AsyncStorage, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';

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
	 
	//When the user enters this page, get the users current highscore, profile, and avatar
	componentDidMount() {
		this.getProfile();
		this.getHighscore();
		this.getAvatar();
	}

	//Get the users AsyncStorage profile name
	async getProfile() {
		var profile = await AsyncStorage.getItem('Profile');
		this.setState({
			profileName: profile
		});
	}

	//Get the users AsyncStorage highscore, which is their current highscore
	async getHighscore() {
		var score = await AsyncStorage.getItem('Highscore');
		this.setState({
			profileScore: score
		});
	}

	//Get the users AsyncStorage avatar, which is their current avatar
	async getAvatar() {
		var img = await AsyncStorage.getItem('Avatar');
		var l = [];

		//If the users avatar equals any of the names below, then put an image element into the l array
		if (img == 'profile') {
			l.push(<Image style={{width: 199, height: 200}} source={require('../img/profile.png')} key={'profile'}/>);
		} else if (img == 'ninja') {
			l.push(<Image style={{width: 257, height: 200}} source={require('../img/ninja1.png')} key={'ninja'}/>);			
		} else if (img == 'hulk') {
			l.push(<Image style={{width: 200, height: 200}} source={require('../img/hulk1.png')} key={'hulk'}/>);			
		} else if (img == 'morty') {
			l.push(<Image style={{width: 131, height: 200}} source={require('../img/morty1.png')} key={'morty'}/>);
		} else if (img == 'rick') {
			l.push(<Image style={{width: 172, height: 200}} source={require('../img/rick1.png')} key={'rick'}/>);			
		} else if (img == 'ironman') {
			l.push(<Image style={{width: 200, height: 200}} source={require('../img/ironman1.png')} key={'ironman'}/>);			
		} else {
			l.push(<Image style={{width: 200, height: 200}} source={require('../img/guy.png')} key={'guy'}/>);			
		}

		//Once the users profile image has been found, set the profileImage state to equal the l array
		this.setState({
			profileImage: l
		});
	}

	//Changes the highscore state value to equal the value variable
	changeHighscore(value) {
		this.setState({
			profileScore: value
		});
	}

    static navigationOptions = {
        tabBarLabel: 'Back to Login',
	};

    render() {
		const {navigate} = this.props.navigation;
		Keyboard.dismiss();
        return (
            <View style={styles.container}>
				<View style={styles.bar}></View>
            	<Text style={styles.mainText}>Menu</Text>
            	<View style={styles.container2}>
            		<Text style={styles.text1}>{this.state.profileName}</Text>
            		<Text style={styles.text2}>Highscore: {this.state.profileScore} points</Text>
            		{this.state.profileImage}
            	</View>
            	<Button
	            onPress={() => navigate('Game')}
				title="Play Game: Increment"
				buttonStyle={styles.button}
				textStyle={[styles.buttonText, {color: 'orange'}]}
	            />
	            <Button
	            onPress={() => navigate('Score')}
	            title="View Highscores"
				buttonStyle={styles.button}
				textStyle={[styles.buttonText, {color: 'white'}]}
	            />
            	<Button
	            onPress={() => navigate('Profile')}
	            title="Avatar Selection"
				buttonStyle={styles.button}
				textStyle={[styles.buttonText, {color: 'white'}]}
	            />
				<Button
				onPress={async () => {
					await AsyncStorage.removeItem("Highscore");
					await AsyncStorage.removeItem("Profile");
					await AsyncStorage.removeItem("Avatar");
					navigate('Login')
				}}
				title='Logout'
				buttonStyle={styles.button}
				textStyle={[styles.buttonText, {color: 'white'}]}
				/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(50,50,50)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bar: {
		position: 'relative',
		height: 20,
		top: -33,
		alignSelf: 'stretch',
		backgroundColor: 'rgb(225,225,225)'
	},
	mainText: {
		position: 'absolute',
		top: 25,
		fontFamily: 'sans-serif-medium',
		fontSize: 20,
		color: 'white',
		backgroundColor: 'transparent'
	},
	container2: {
		position: 'relative',
        alignItems: 'center',
	},
	text1: {
		position: 'relative',
		fontFamily: 'sans-serif-condensed',
		fontSize: 28,
		color: 'orange',
		backgroundColor: 'transparent'
	},
	text2: {
		position: 'relative',
		marginBottom: 5,
		fontFamily: 'sans-serif-light',
		fontSize: 18,
		color: 'rgb(150,150,150)',
		backgroundColor: 'transparent'
	},
    button: {
		position: 'relative',
		width: 300,
		height: 75,
		marginBottom: 5,
		backgroundColor: 'rgb(100,100,100)'
	},
	buttonText: {
		fontFamily: 'sans-serif',
		fontSize: 20
	}
});