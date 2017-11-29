import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { Text, View, Button, TextInput, AsyncStorage, Alert, StyleSheet } from 'react-native';
import { NavigationAction, NavigationActions } from 'react-navigation';

export default class LoginScreenComponent extends Component {

    constructor() {
        super();
        this.state = {
            text: ''
        }
        this.checkProfile = this.checkProfile.bind(this);
        this.createProfile = this.createProfile.bind(this);
    }

    static navigationOptions = {
        title: 'Mind Games',
    };

    //Create an AsyncStorage profile and assign a default value for the highscore and avatar
    async createProfile(text) {
        try {
            //Create an AsyncStorage item with a default value and key of what the user entered
            await AsyncStorage.setItem(text, "0 ../img/profile.png");
            console.log("Created profile: " + text);
        } catch (error) {
            //Error saving data
            console.log(error.message);
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

    render() {
        return (
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'flex-start'}}>
                <Button
                    //TODO Place in an if statement for if the entered data matches login data from file then goes to Main Menu
                    onPress={() => this.checkProfile(this.state.text)}
                    title="Login"
                    style={styles.but}
                />

                <Button
                    onPress={() => this.createProfile(this.state.text)}
                    title="Create Profile"
                    style={styles.but}
                />

                <TextInput
                    style={styles.inp}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text} 
                    placeholder="Enter Profile Name"
                />

                <Text style={styles.te}>By: MARKSMEN Games</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    but: {
        height: 30,
        alignSelf: 'stretch'
    },
    te: {
        fontSize: 10,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        alignSelf: 'center'
    },
    inp: {
        marginTop: 150,
        alignSelf: 'center',
        width: 250,
        height: 30,
        textAlign: 'center'
    }
});