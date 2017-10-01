import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, Image, Button} from 'react-native';

export default class ChatMessage extends React.Component {

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', margin: 8}}>
                    <View style={{flex: 1}}>
                        <Image
                            style={{width: 48, height: 48}}
                            source={{uri: this.props.image}}/>
                        <Text>
                            {this.props.userName}
                        </Text>
                    </View>
                    <View style={{flex: 5, marginLeft: 8}}>
                        <Text>
                            {this.props.time}
                        </Text>
                        <Text>
                            {this.props.message}
                        </Text>
                        <View style={{alignItems: 'flex-end'}}>
                            {(() => {
                                return this.props.canDelete ?
                                    <Button
                                        onPress={() => this.props.deleteFunc(this.props.index)}
                                        title="Delete"
                                        color="#841584"
                                    />
                                    : null;
                            })()}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
