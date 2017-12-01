import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Image, StyleSheet, Props, TouchableHighlight, Alert, AsyncStorage, Icon } from 'react-native';
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
            <View>
				<Button
					onPress={() => {
						const navigateAction = NavigationActions.navigate({
							routeName: 'Menu',
							params: {}
						});
		
						this.props.navigation.dispatch(navigateAction);
					}}
					title="Go back home"
					style={{position: 'absolute', bottom: 0}}
				/>
            	<Text>Edit Profile & Avatar Selection</Text>
            	<View>
            		<Text>Profile Name: {this.state.profileName}</Text>
            		<Text>Highscore: {this.state.profileScore} points</Text>
            		{this.state.profileImage}
            	</View>
            	<View>
            		<Text>AVATAR IMAGES</Text>
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
		            	top: 180,
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
		            	top: 290,
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
		            	top: 380,
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
        );
    }
}