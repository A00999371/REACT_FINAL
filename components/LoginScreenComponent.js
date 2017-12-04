import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { Text, View, Image, TextInput, AsyncStorage, Alert, StyleSheet } from 'react-native';
import { NavigationAction, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';

export default class LoginScreenComponent extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            inputFocus: false
        }
        this.checkProfile = this.checkProfile.bind(this);
        this.createProfile = this.createProfile.bind(this);
    }

    //When you get to the login page, see if the player has a profile or not
    //If the user has a profile, then send them straight to home
    //Otherwise, stay on login page
    async componentDidMount() {
        if (await AsyncStorage.getItem("Profile") != null) {
            const navigateAction = NavigationActions.navigate({
                routeName: 'Menu',
                params: {}
            });

            this.props.navigation.dispatch(navigateAction);
        }
    }

    //Shows the navigation title as Mind games
    static navigationOptions = {
        title: 'Mind Games',
    };

    //Create an AsyncStorage profile and assign a default value for the highscore and avatar lit
    async createProfile(text) {
        if(!text == "") {
            try {
                //Create an AsyncStorage item with a default value and key of what the user entered
                await AsyncStorage.setItem(text, "0 profile");
                console.log("Created profile: " + text);
            } catch (error) {
                //Error saving data
                console.log(error.message);
            }
            //Once profile has been created, send an alert saying that the users profile has been created
            Alert.alert(
                'Congratulations!',
                'Profile Created.',
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            )
        //If user tries to create a user with a blank name, then send an alert saying the user must enter some name for their user
        } else {
            Alert.alert(
                'Error!',
                'Text field is empty.',
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            )
        }
    }

    //See if the AsyncStorage profile exists, and if it does, use that as the login profile
    async checkProfile(text) {
        try {
            //Attempt to get the AsyncStorage item that matches the text the user entered
            const profile = await AsyncStorage.getItem(text);

            if (profile !== null) {
                //Set AsyncStorage items highscore, profile, and avatar to equal what the user is trying to login with and send the user to main menu
                var words = profile.split(" ");
                await AsyncStorage.setItem("Highscore", words[0]);
                await AsyncStorage.setItem("Avatar", words[1]);
                await AsyncStorage.setItem("Profile", text);

                //Once highscore, profile, and avatar asyncstorage items have been created, send the user to main menu via navigation action
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Menu',
                    params: {}
                });

                this.props.navigation.dispatch(navigateAction);
            } else {
                //Alert popup saying user does not exist
                Alert.alert("Invalid", "Profile does not exist.");
            }
        } catch (error) {
            //Error getting data
            console.log(error.message);
        }
    }

    //Focus on input when you click on the input
    _onFocus() {
        this.setState({
            inputFocus: true
        });
    }
    
    //Unfocusses input when you click away from the input
    _onBlur() {
        this.setState({
            inputFocus: false
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Button
                        onPress={() => this.checkProfile(this.state.text)}
                        title="Login"
                        buttonStyle={styles.loginButton}
                        textStyle={styles.buttonText}
                    />

                    <Button
                        onPress={() => this.createProfile(this.state.text)}
                        title="Create Profile"
                        buttonStyle={styles.createButton}
                        textStyle={styles.buttonText}
                    />

                    <TextInput
                        onFocus={() => this._onFocus()}
                        onBlur={() => this._onBlur()}
                        style={[styles.input,
                            this.state.inputFocus == true?
                            {width: 350, borderColor: 'black', backgroundColor: '#ffeccc'}:
                            {width: 300, borderColor: 'orange', backgroundColor: '#f7eede'}]}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text} 
                        placeholder="Enter Profile Name"
                        placeholderTextColor="dimgray"
                        underlineColorAndroid="#f7eede"
                        onSubmitEditing={() => this.checkProfile(this.state.text)}
                    />
                </View>

                <Image style={styles.image} source={require('../img/team.png')}/>
                
                <Text style={styles.text1}>MARKSMEN</Text>
                <Text style={styles.text2}>Games</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    },
    container2:{
        position: 'relative',
        alignItems: 'center',
        alignContent: 'center',
        top: 60
    },
    loginButton: {
        position: 'relative',
        width: 300,
        height: 75,
        backgroundColor: 'orange',
        borderRadius: 1,
    },
    createButton: {
        position: 'relative',
        top: 5,
        width: 300,
        height: 75,
        backgroundColor: 'orange',
        borderRadius: 1,
    },
    buttonText: {
        fontFamily: 'sans-serif-light',
        fontSize: 27.5,
        color: 'black'
    },
    input: {
        position: 'relative',
        top: 50,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 20,
        borderWidth: 3,
        // backgroundColor: '#f7eede'
    },
    image: {
        position: 'absolute',
        width: 358,
        height: 287,
        bottom: 0,
    },
    text1: {
        position: 'absolute',
        bottom: 32,
        fontFamily: 'sans-serif-medium',
        textAlign: 'center',
        fontSize: 25,
        color: 'orange',
        backgroundColor: 'transparent'
    },
    text2: {
        position: 'absolute',
        bottom: 15,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        backgroundColor: 'transparent'
    },
});