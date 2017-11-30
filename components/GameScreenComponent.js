import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';

export default class GameScreenComponent extends Component {

    constructor() {
        super();
        this.state = ({
            currentTime: 3,
            currentScore: 0
        });
    }

    static navigationOptions = {
        title: 'Increment',
    };

    _updateTimer() {
        setInterval(() => {
            if (!this.state.currentTime == 0) {
                this.setState({
                    currentTime: this.state.currentTime - 1
                });
            }
        }, 1000);
    }

    _updateScore() {
        if (!this.state.currentTime == 0) {
            this.setState({
                currentScore: this.state.currentScore + 1,
            });
        }
    }

    _playAgain() {
        this.props.navigation.navigate('Game');
    }

    _backToMenu() {
        this.props.navigation.navigate('Menu');
    }

    _showScore() {
        if (this.state.currentTime == 0) {
            setTimeout(() => {
                Alert.alert(
                    'Time\'s Up!',
                    'Score: ' + this.state.currentScore,
                    [
                      {text: 'Play Again!', onPress: () => this._playAgain()},
                      {text: 'Main Menu', onPress: () => this._backToMenu()},
                    ],
                    { cancelable: false }
                )
            }, 500);
        }
    }

    componentDidMount() {
        this._updateTimer();
    }

    render() {
        return (
            <View style={styles.container}>

            	<Text style={styles.text}>Let's see how fast you can tap.</Text>
                
                <View>

                    <Text style={styles.text2}>
                        0:{this.state.currentTime<10?
                        '0' + this.state.currentTime:this.state.currentTime}
                    </Text>
                
                </View>

                <View style={{position: 'relative', marginTop: 25}}>
                
                    <Text style={styles.text3}>
                    {this.state.currentScore}</Text>
                
                </View>
                
                <View style={styles.container2}>

                    <Button
                    large
                    title={'CLICK'}
                    buttonStyle={styles.button}
                    textStyle={{color: 'black'}}
                    fontSize={40}
                    onPress={() => this._updateScore()}
                    disabled={this.state.currentTime==0? true : false}/>
                    
                </View>

                {this._showScore()}

            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(50,50,50)',
        alignItems: 'center',
    },
    text: {
        position: 'relative',
        marginTop: 25,
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    text2: {
        position: 'relative',
        fontSize: 75,
        color: 'rgb(200,200,200)',
    },
    text3: {
        position: 'relative',
        fontSize: 50,
        color: 'limegreen',
    },
    container2: {
        position: 'relative',
        marginTop: 50
    },
    button: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 200,
        backgroundColor: "rgb(100,100,100)",
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 200,
    }
});