import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, AsyncStorage } from 'react-native';

export default class ScoreScreenComponent extends Component {

    constructor() {
        super();
        this.state = {
            list: [],
            you: ""
        }
        this.createHighscoreDict = this.createHighscoreDict.bind(this);
    }

    componentDidMount() {
        this.getProfile();
        this.createHighscoreDict();
    }

    async getProfile() {
        var profile = await AsyncStorage.getItem("Profile");
        var string = await AsyncStorage.getItem(profile);
        var string_split = string.split(" ");
        this.setState({
            you: profile + ": " + string_split[0]
        });
    }

    async createHighscoreDict() {
        var allProfiles = await AsyncStorage.getAllKeys();
        var dict = [];

        for (var i in allProfiles) {
            var profile = allProfiles[i];

            if (profile == 'Highscore' || profile == "Avatar" || profile == "Profile" || profile == await AsyncStorage.getItem("Profile")) {
                continue;
            } else {
                var score = await AsyncStorage.getItem(profile);
                var score_list = score.split(" ");
                dict.push({
                    key: profile,
                    value: score_list[0]
                });
            }
        }

        this.getHighscores(dict);
    }

    async getHighscores(dict) {
        var l = [];
        for (var i in dict) {
            var profile = dict[i].key;
            var score = dict[i].value;
            l.push(<View key={profile}><Text>{profile}: {score}</Text></View>);
        }
        this.setState({
            list: l
        });
    }

    static navigationOptions = {
        title: 'Back to Main Menu',
    };

    //TODO make the list update by the saved score information
    render() {
        return (
            <View>
                <Text>Highscore</Text>
                <Text style={{marginBottom: 10, marginTop: 10}}>
                YOU{"\n"}
                {this.state.you}
                </Text>

                {this.state.list}
            </View>
        );
    }
}