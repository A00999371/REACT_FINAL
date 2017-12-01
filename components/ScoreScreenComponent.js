import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, AsyncStorage } from 'react-native';

export default class ScoreScreenComponent extends Component {

    constructor() {
        super();
        this.state = {
        }
        this.getHighscores = this.getHighscores.bind(this);
    }

    componentDidMount() {
        this.getHighscores();
    }

    async getHighscores() {
        var allProfiles = await AsyncStorage.getAllKeys();
        console.log("All keys: " + allProfiles);
        for (var i in allProfiles) {
            var profile = allProfiles[i];

            if (profile == 'Highscore' || profile == "Avatar" || profile == "Profile") {
                continue;
            } else {
                var score = await AsyncStorage.getItem(profile);
                var score_list = score.split(" ");
                console.log(profile + ": " + score_list[0]);
            }
        }
    }

    // async getYourScore() {
    //     var you = await AsyncStorage.getItem("Profile");
    //     var string = await AsyncStorage.getItem(you);
    //     var string_list = string.split(" ");
    //     string = you + ": " + string_list[0];
    //     return string;
    // }

    static navigationOptions = {
        title: 'Back to Main Menu',
    };

    //TODO make the list update by the saved score information
    render() {
        return (
            <View>Highscore</View>
        );
    }
}