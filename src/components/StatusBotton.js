import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

function StatusBotton({ style, status }) {
    if (!status) status = 'enabled';
    
    const color = status === 'enabled' ? '#40739e' : (status === 'done' ? '#6a6' : (status === 'error' ? '#d66' : '#ddd'))

    return (
        <View style={[{
            height: 36,
            width: 72,
            borderRadius: 18,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
        }, style ]}>
            { status === 'done' && <Icon size={32} name="done" color="white"/>}
            { status === 'enabled' && <Icon size={32} name="play-arrow" color="white"/>}
            { status === 'error' && <Icon size={32} name="close" color="white"/>}
        </View>
    );
}

export default StatusBotton;