import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import StatusBotton from '../../../components/StatusBotton';

function TopicCard({ item, OnPress, disabled }) {
    return (
        <TouchableOpacity style={styles.card} onPress={disabled ? null : () => OnPress(item)}>
            <View style={styles.cardContent}>
                <Text style={[styles.name, disabled && styles.disabledName]}>{item.name}</Text>
                <StatusBotton status={disabled ? 'done' : 'enabled'} style={{marginVertical: 10}} />
            </View>
        </TouchableOpacity>
    );
}

export default TopicCard;

const styles = StyleSheet.create({
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10
    },
    imagePlay: {
        width: 60,
        height: 60,
        marginLeft: 10
    },
    disabledImage: {
        tintColor: "#dddddd"
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
    },
    name: {
        fontSize: 15,
        flex: 1,
        // width: '80%',
        // alignSelf: 'center',
        color: '#000000',
        fontWeight: 'bold',
    },
    disabledName: {
        color: '#aaaaaa'
    }
});
