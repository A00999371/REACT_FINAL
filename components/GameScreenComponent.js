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

    //Sets the highscore to the score variable
    async _setHighscore(score) {
        //Get the profile the current user is using
        var profile = await AsyncStorage.getItem("Profile");

        //Get what their current highscore and avatar are by getItem and the profile variable
        var string = await AsyncStorage.getItem(profile);
        
        //Differentiate the highscore and avatar by splitting the variable string by spaces
        var split_string = string.split(" ");
        
        //Once the highscore and avatar strings have been split up, set the current users highscore to the score variable
        //Score will always be split_string[0] and split_string[1] will always be avatar
        //After that, set the highscore AsyncStorage variable to score
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

    //Get a random integer for moving the tap button around on the screen
    //This integer has to be within the max and min values
    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //Move the tap button around on the screen between certain values
    _move() {
        //
        setInterval(() => {
            if (!this.state.currentTime == 0) {
                let coordY = this._getRandomInt(-50, 200);
                let coordX = this._getRandomInt(-100, 100);
                this.refs.view.transitionTo({left: coordX}, 200);
                this.refs.view.transitionTo({top: coordY}, 200);
            }
        }, 750);
    }

    //Restarts game once user presses option Play Again
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

    //After the game finishes, run this function
    _showScore() {
        //If the currentTime left of the game is 0
        if (this.state.currentTime == 0) {
            setTimeout(async () => {
                //Set the variable newScore to equal what the users score was
                var newScore = this.state.currentScore;

                //Get the users current highscore
                var profile = await AsyncStorage.getItem("Profile");
                var string = await AsyncStorage.getItem(profile);
                var split_string = string.split(" ");
        
                //If the users current score is higher than their highscore, 
                //then set their highscore to their current score and tell the user that they set a new highscore
                if (newScore > parseInt(split_string[0])) {
                    //Calls function setHighscore to set the highscore
                    //Passes through the variable newScore
                    this._setHighscore(newScore);

                    //Send the user an alert saying they set a new highscore and tell them what their score was
                    this.displayAlert('WOW! You set a new highscore!\r\nScore: ', newScore);
                
                //If the users current score is the same as their highscore,
                //then tell the user that they matched their current highscore and show the user their score
                } else if (parseInt(split_string[0]) == newScore) {
                    this.displayAlert('Congradulations! You tied your highscore!\r\nScore: ', newScore);
                
                //If the users current score is less than their highscore,
                //then tell the user they did a good job and show the user their score
                } else {
                    this.displayAlert('Great Job!\r\nScore: ', newScore);
                }
            }, 500);
        }
    }

    //Run updateTimer and move function whenever the user enters the page
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