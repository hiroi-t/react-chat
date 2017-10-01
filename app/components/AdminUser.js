import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, Image, Button} from 'react-native';

export default class AdminUser extends React.Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex:1.5}}>
                    <Image
                        style={{width: 48, height: 48, marginBottom: 2}}
                        source={{uri: this.props.user.imageUrl}}/>
                </View>
                <View style={{flex:4}}>
                    <Text style={{
                        marginTop: 12,
                        marginLeft: 8,
                        fontSize: 16
                    }}>{this.props.user.name}</Text>
                </View>
                <View style={{flex:2.5}}>
                    <Text style={{
                        marginTop: 12,
                        marginLeft: 8,
                        fontSize: 16
                    }}>{this.props.user.createdAt}</Text>
                </View>
                <View style={{flex:2}}>
                    <Button onPress={() => this.props.deleteFunc(this.props.index)} color="red" title="Delete"/>
                </View>
            </View>
        );
    }
}
