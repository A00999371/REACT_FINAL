import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Image, StyleSheet, Props } from 'react-native';

import sample from 'lodash.sample';
import AnimatedSprite from 'react-native-animated-sprite';

import ninjaSprite from '../sprites/ninja/ninjaSprite';
import walkRightSprite from '../sprites/walkRight/walkRightSprite';
import ironManSprite from '../sprites/ironman/ironManSprite';
import hulkSprite from '../sprites/hulk/hulkSprite';

export default class ProfileScreenComponent extends Component {

	constructor () {
	    super();
	    this.state = {
	      animationType: 'ALL',
	    };
	 }

    static navigationOptions = {
        title: 'Back to Main Menu',
    };
 
    //TODO buttons and functions to update the local file and pofile tab with the selected avatar
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
            	<View>
            		<Text>AVATAR IMAGES</Text>
            	</View>
            	<Image
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
			        fps={8}
			        onPress={() => {this.onPress();}}
			    />
			    <Image
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
		        	onPress={() => {this.onPress();}}
		        />
		        <Image
        			style={{width: 65, height: 65, top: 500, left:190}}
        			source={require('../img/ironman1.png')}
        			position= 'absolute'
    			/>
		        <AnimatedSprite
		        	ref={'ironManRef'}
		        	sprite={ironManSprite}
		        	animationFrameIndex={ironManSprite.animationIndex(this.state.animationType)}
		        	loopAnimation={true}
		        	coordinates={{
		            	top: 470,
		            	left: 250,
		        	}}
		        	size={{
		            	width: ironManSprite.size.width * 0.3,
		            	height: ironManSprite.size.height * 0.3,
		        	}}
		        	fps={4}
		        	onPress={() => {this.onPress();}}
		        />
		        <Image
        			style={{width: 65, height: 65, top: 420, left:190}}
        			source={require('../img/hulk1.png')}
        			position= 'absolute'
    			/>
		        <AnimatedSprite
		        	ref={'hulkRef'}
		        	sprite={hulkSprite}
		        	animationFrameIndex={hulkSprite.animationIndex(this.state.animationType)}
		        	loopAnimation={true}
		        	coordinates={{
		            	top: 400,
		            	left: 260,
		        	}}
		        	size={{
		            	width: hulkSprite.size.width * 0.235,
		            	height: hulkSprite.size.height * 0.235,
		        	}}
		        	fps={3}
		        	onPress={() => {this.onPress();}}
		        />
            </View>
        );
    }
}