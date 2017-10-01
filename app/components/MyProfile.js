import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';

const MyProfile = ({image}) => (
    <View>
        <Image
            style={{width: 48, height: 48, marginLeft: 8, marginTop: 8}}
            source={{uri: image}}/>
    </View>
);

const mapStateToProps = state => ({
    image: state.user.imageUrl,
});

export default connect(mapStateToProps)(MyProfile);
