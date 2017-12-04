import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, AsyncStorage, StyleSheet } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
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
            l.push(<View key={profile}><Text style={styles.listText}>{profile}: {score}</Text></View>);
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
            <View style={styles.container}>
                <Button
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                    title="Go back home"
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                <Text style={styles.text1}>Highscores</Text>
                <Text style={styles.text2}>YOU</Text>
                <Text style={styles.text3}>
                {this.state.you}
                </Text>

                <List containerStyle={styles.listContainer}>
                    {this.state.list}
                </List>
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
    button: {
        position: 'relative',
        top: 25,
        width: 300,
        height: 50,
		backgroundColor: 'rgb(100,100,100)'
    },
    buttonText: {
		fontFamily: 'sans-serif-medium',
		fontSize: 20,
		color: 'white'
	},
    text1: {
        position: 'relative',
        top: 45,
		fontFamily: 'sans-serif-medium',
		fontSize: 25,
		color: 'orange',
        backgroundColor: 'transparent'
    },
    text2: {
        position: 'relative',
        selfAlign: 'center',
        top: 65,
		fontFamily: 'sans-serif-condensed',
		fontSize: 20,
        color: 'white',
        backgroundColor: 'transparent'
    },
    text3: {
        position: 'relative',
        top: 65,
		fontFamily: 'sans-serif-condensed',
		fontSize: 30,
        color: 'rgb(150,150,150)',
        backgroundColor: 'transparent'
    },
    listContainer: {
        position: 'relative',
        top: 75,
        color: 'white',
        backgroundColor: 'transparent'
    },
    listText: {
        textAlign: 'center',
        top: 15,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
        fontSize: 17,
        color: 'rgb(175,175,175)',
		backgroundColor: 'transparent'
    }
});