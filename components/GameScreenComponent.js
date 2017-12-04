import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Alert, AsyncStorage, TouchableWithoutFeedback, Easing } from 'react-native';
import { NavigationAction, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Menu } from './MenuScreenComponent';
import * as Animatable from 'react-native-animatable';

export default class GameScreenComponent extends Component {

    constructor() {
        super();
        this.state = ({
            currentTime: 15,
            currentScore: 0
        });
    }

    static navigationOptions = {
        title: 'Quit to Main Menu',
    };

    async _setHighscore(score) {
        var profile = await AsyncStorage.getItem("Profile");
		var string = await AsyncStorage.getItem(profile);
		var split_string = string.split(" ");
        await AsyncStorage.setItem(profile, score + " " + split_string[1]);
        await AsyncStorage.setItem("Highscore", score.toString());
    }

    // Have a clock running down to indicate game time
    _updateTimer() {
        // Do this with a set interval time at each event
        setInterval(() => {
            // If time isn't up yet, reduce by 1 every time
            if (!this.state.currentTime == 0) {
                this.setState({
                    currentTime: this.state.currentTime - 1
                });
            }
        }, 1000); // Take 1 second every time
    }

    // Update score of the player at a certain event
    _updateScore() {
        // If time isn't up yet, increment the score by one at every event
        if (!this.state.currentTime == 0) {
            this.setState({
                currentScore: this.state.currentScore + 1,
            });
        }
    }

    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    _move() {

        setInterval(() => {

            if (!this.state.currentTime == 0) {
                let coordY = this._getRandomInt(-50, 200);
                let coordX = this._getRandomInt(-100, 100);
                this.refs.view.transitionTo({left: coordX}, 200);
                this.refs.view.transitionTo({top: coordY}, 200);
            }

        }, 750);

    }

    // Play again function, after a game finishes
    _playAgain() {

        this.setState({
            currentTime: 15,
            currentScore: 0
        });

        this.render();

    }

    // Take player back to main menu
    _backToMenu() {

        const navigateAction = NavigationActions.navigate({
            routeName: 'Menu',
            params: {}
        });

        this.props.navigation.dispatch(navigateAction);
        
    }

    // display options when game finishes, with parameters passed
    displayAlert(message, score) {
        Alert.alert(
            "Time's Up!",
            message + score,
            
            //define options that the player sees
            [
                {text: 'Play Again!', onPress: () => this._playAgain()},
                {text: 'Main Menu', onPress: () => this._backToMenu()},
            ],
            { cancelable: false }
        )
    }

    _showScore() {
        if (this.state.currentTime == 0) {
            setTimeout(async () => {
                var newScore = this.state.currentScore;
                var profile = await AsyncStorage.getItem("Profile");
                var string = await AsyncStorage.getItem(profile);
                var split_string = string.split(" ");
        
                if (newScore > parseInt(split_string[0])) {
                    this._setHighscore(newScore);
                    this.displayAlert('WOW! You set a new highscore!\r\nScore: ', newScore);
                } else if (parseInt(split_string[0]) == newScore) {
                    this.displayAlert('Congradulations! You tied your highscore!\r\nScore: ', newScore);
                } else {
                    this.displayAlert('Great Job!\r\nScore: ', newScore);
                }
            }, 500);
        }
    }

    componentDidMount() {
        this._updateTimer();
        this._move();
    }

    render() {
        const {navigate} = this.props.navigation;
        
        // if time is under 3 seconds, warn the player by changing timer color
        var timeColor = 'rgb(190,190,190)';
        if (this.state.currentTime <= 3) {
            // change to red
            timeColor = 'red';
        } else {
            timeColor = 'rgb(190,190,190)';
        }

        return (
            <View style={styles.container}>

            	<Text style={styles.text}>Can you keep up the taps?</Text>
                
                <View>

                    {/* this is where to call the color change function */}
                    <Text ref="timerText" style={[{color: timeColor}, styles.text2]}>
                        {/* add a 0 in front if time is 9 and under */}
                        0:{this.state.currentTime<10?
                        '0' + this.state.currentTime:this.state.currentTime}
                    </Text>
                
                </View>

                <View style={{position: 'relative', marginTop: 35}}>
                
                    {/* display current score as game goes on */}
                    <Text style={styles.text3}>
                    {this.state.currentScore}</Text>
                
                </View>
                
                <View style={styles.container2}>

                    {/* for animating the button's view */}
                    <Animatable.View ref="view" style={{position: 'relative', top: 50}}>
                        <Button
                        large
                        ref="button"
                        title={'GO'}
                        buttonStyle={styles.button}
                        textStyle={{color: 'black'}}
                        fontSize={45}
                        onPress={() => {
                            this._updateScore();
                            // shake the view with the button in it
                            this.refs.view.shake(250);
                        }}
                        // disable button if time is up
                        disabled={this.state.currentTime==0? true : false}/>
                    </Animatable.View>
                    
                </View>
                
                {/* call the score function as game ends */}
                {this._showScore()}

            </View>
            
        );
    }
}

// Stylesheet for the render above
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(50,50,50)',
        alignItems: 'center',
    },
    text: {
        position: 'relative',
        marginTop: 35,
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    text2: {
        position: 'relative',
        marginTop: 20,
        fontSize: 75
    },
    text3: {
        position: 'relative',
        fontSize: 50,
        color: 'orange',
    },
    container2: {
        position: 'relative',
        marginTop: 60
    },
    button: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 150,
        backgroundColor: "rgb(100,100,100)",
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 200,
    }
});