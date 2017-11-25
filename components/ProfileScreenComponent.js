import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';

export default class ProfileScreenComponent extends Component {

    static navigationOptions = {
        title: 'Back to Main Menu',
    };

    //TODO add in multiple avatars and maybe profile options to pick from which will update the pofile
    render() {
        return (
            <View>
            	<Text>Edit Profile & Avatar Selection</Text>
            </View>
        );
    }
}