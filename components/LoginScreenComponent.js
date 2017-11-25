import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, TextInput } from 'react-native';

export default class HomeScreenComponent extends Component {

    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    static navigationOptions = {
        title: 'Mind Games',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>By: MARKSMEN Gmaes</Text>
                <Button
                    //TODO Place in an if statement for if the entered data matches login data then goes to Main Menu
                    onPress={() => navigate('Menu')}
                    title="Login"
                />
                <Button
                    title="Create Profile"
                    //TODO add onPress function to create profile using textinput and save to file
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', width: 300}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text} 
                    placeholder="Enter Profile Name"
                />
            </View>
        );
    }
}