import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, Props, TouchableHighlight, Alert, AsyncStorage, Icon } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationAction, NavigationActions } from 'react-navigation';
import sample from 'lodash.sample';
import AnimatedSprite from 'react-native-animated-sprite';

//import ninjaSprite from '../sprites/ninja/ninjaSprite';
//import walkRightSprite from '../sprites/walkRight/walkRightSprite';
import ironManSprite from '../sprites/ironman/ironManSprite';
import hulkSprite from '../sprites/hulk/hulkSprite';
import rickSprite from '../sprites/rick/rickSprite';
import mortySprite from '../sprites/morty/mortySprite';

export default class ProfileScreenComponent extends Component {

	constructor () {
	    super();
	    this.state = {
	     	animationType: 'ALL',
	    	profileImage: [],
	    	profileScore: "",
	    	profileName: "",
	    };
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

	async setAvatar(value) {
		var profile = await AsyncStorage.getItem("Profile");
		var string = await AsyncStorage.getItem(profile);
		var split_string = string.split(" ");

		await AsyncStorage.setItem(profile, split_string[0] + " " + value);
		await AsyncStorage.setItem("Avatar", value);
	}

	changeLogo(img) {
		this.setAvatar(img);

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

    static navigationOptions = {
		title: 'Back to Main Menu',
	};

    //TODO buttons and functions to update the local file and pofile tab with the selected avatar
    render() {
        return (
            <View style={styles.container}>
				<Button
					onPress={() => {
						const navigateAction = NavigationActions.navigate({
							routeName: 'Menu',
							params: {}
						});
				
						this.props.navigation.dispatch(navigateAction);
					}}
					title="Back To Menu"
					buttonStyle={styles.button}
					textStyle={styles.buttonText}
				/>
				<View style={styles.container2}>
					<View style={styles.container3}>
						<Text style={styles.text1}>Avatar Selection</Text>
						<Text style={styles.text2}>Profile: {this.state.profileName}</Text>
						{this.state.profileImage}
					</View>
					<View>
						<Text style={styles.text3}>Choose one from below</Text>
					</View>
					{/* Having more than 4 sprites causes loading issues */}
					{/*<Image
						style={{width: 60, height: 60, top: 500, left:10}}
						source={require('../img/guy.png')}
						position= 'absolute'
					/>
					<AnimatedSprite
						ref={'walkRightRef'}
						sprite={walkRightSprite}
						animationFrameIndex={walkRightSprite.animationIndex(this.state.animationType)}
						loopAnimation={true}
						coordinates={{
							top: 500,
							left: 80,
						}}
						size={{
							width: walkRightSprite.size.width * 0.4,
							height: walkRightSprite.size.height * 0.4,
						}}
						fps={5}
						//onPress={() => {this.onPress();}}
					/>*/}
					{/*<Image
						style={{width: 60, height: 60, top: 420, left:10}}
						source={require('../img/ninja1.png')}
						position= 'absolute'
					/>
					<AnimatedSprite
						ref={'ninjaRef'}
						sprite={ninjaSprite}
						animationFrameIndex={ninjaSprite.animationIndex(this.state.animationType)}
						loopAnimation={true}
						coordinates={{
							top: 415,
							left: 80,
						}}
						size={{
							width: ninjaSprite.size.width * 0.3,
							height: ninjaSprite.size.height * 0.3,
						}}
						fps={8}
						//onPress={() => {this.onPress();}}
					/>*/}
					<TouchableHighlight onPress={() => this.changeLogo('ironman')} position='absolute' style={{top: 10, left:10}}>
						<Image
							style={{width: 80, height: 80}}
							source={require('../img/ironman1.png')}
						/>
					</TouchableHighlight>
					<AnimatedSprite
						ref={'ironManRef'}
						sprite={ironManSprite}
						animationFrameIndex={ironManSprite.animationIndex(this.state.animationType)}
						loopAnimation={true}
						coordinates={{
							top: 173,
							left: 90,
						}}
						position= 'absolute'
						size={{
							width: ironManSprite.size.width * 0.3,
							height: ironManSprite.size.height * 0.3,
						}}
						fps={3}
						//onPress={() => {this.onPress();}}
					/>
					<TouchableHighlight onPress={() => this.changeLogo('hulk')} position='absolute' style={{top: 20, left:10}}>
						<Image
							style={{width: 80, height: 80}}
							source={require('../img/hulk1.png')}
							//position= 'absolute'
						/>
					</TouchableHighlight>
					<AnimatedSprite
						ref={'hulkRef'}
						sprite={hulkSprite}
						animationFrameIndex={hulkSprite.animationIndex(this.state.animationType)}
						loopAnimation={true}
						coordinates={{
							top: 283,
							left: 100,
						}}
						position= 'absolute'
						size={{
							width: hulkSprite.size.width * 0.235,
							height: hulkSprite.size.height * 0.235,
						}}
						fps={3}
						//onPress={() => {this.onPress();}}
					/>
					<TouchableHighlight onPress={() => this.changeLogo('rick')} position='absolute' style={{top: 20, left:10}}>
						<Image
							style={{width: 69, height: 80}}
							source={require('../img/rick1.png')}
							//position= 'absolute'
						/>
					</TouchableHighlight>
					<AnimatedSprite
						ref={'rickRef'}
						sprite={rickSprite}
						animationFrameIndex={rickSprite.animationIndex(this.state.animationType)}
						loopAnimation={true}
						coordinates={{
							top: 375,
							left: 120,
						}}
						position= 'absolute'
						size={{
							width: rickSprite.size.width * 0.4,
							height: rickSprite.size.height * 0.4,
						}}
						fps={5}
						//onPress={() => {this.onPress();}}
					/>
					<TouchableHighlight onPress={() => this.changeLogo('morty')} position= 'absolute' style={{top: 30, left:20}}>
						<Image
							style={{width: 52, height: 80}}
							source={require('../img/morty1.png')}
							//position= 'absolute'
						/>
					</TouchableHighlight>
					<AnimatedSprite
						ref={'mortyRef'}
						sprite={mortySprite}
						animationFrameIndex={mortySprite.animationIndex(this.state.animationType)}
						loopAnimation={true}
						coordinates={{
							top: 460,
							left: 120,
						}}
						position= 'absolute'
						size={{
							width: mortySprite.size.width * 0.4,
							height: mortySprite.size.height * 0.4,
						}}
						fps={5}
						//onPress={() => {this.onPress();}}
					/>
				</View>
            	
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: 'rgb(50,50,50)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container2: {
		flexDirection: 'column',
		justifyContent: 'center'
	},
	container3: {
		alignItems: 'center',
	},
	button: {
		position: 'absolute',
		alignSelf: 'center',
		top: -60,
		width: 300,
		height: 50,
		backgroundColor: 'rgb(100,100,100)'
	},
	buttonText: {
		fontFamily: 'sans-serif-medium',
		fontSize: 20,
		color: 'white'
	},
	text1: {
		position: 'relative',
		fontFamily: 'sans-serif-medium',
		fontSize: 25,
		color: 'orange',
		backgroundColor: 'transparent'
	},
	text2: {
		position: 'relative',
		fontFamily: 'sans-serif-condensed',
		fontSize: 20,
		color: 'rgb(150,150,150)',
		backgroundColor: 'transparent'
	},
	text3: {
		position: 'relative',
		alignSelf: 'center',
		marginTop: 30,
		fontFamily: 'sans-serif-light',
		fontSize: 15,
		color: 'white',
		backgroundColor: 'transparent'
	}
});