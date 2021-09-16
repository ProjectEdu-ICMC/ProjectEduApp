import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

function Loading() {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#e93766', fontSize: 40 }}>Loading</Text>
            <ActivityIndicator color="#e93766" size="large" />
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
