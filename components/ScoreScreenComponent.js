import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, AsyncStorage } from 'react-native';
import { NavigationAction, NavigationActions } from 'react-navigation';
const sortBy = require('lodash.sortby');

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
        console.log("These are allProfiles: " + allProfiles);

        for (var i in allProfiles) {
            var profile = allProfiles[i];

            if (profile == 'Highscore' || profile == "Avatar" || profile == "Profile" || profile == await AsyncStorage.getItem("Profile")) {
                continue;
            } else {
                var score = await AsyncStorage.getItem(profile);
                var score_list = score.split(" ");
                dict.push({
                    value: score_list[0],
                    key: profile
                });
            }
        }

        this._getHighscores(dict);
    }

    async _getHighscores(dict) {
        var l = [];
        dict = sortBy(dict, 'value');
        for (var i = dict.length-1; i >= 0; i--) {
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