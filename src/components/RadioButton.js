import React from 'react';
import { View } from 'react-native';

function RadioButton({ style, selected, color }) {
    if (!color) color = '#000';
    
    return (
        <View style={[{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }, style ]}>
          {
            selected ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: color,
              }}/>
              : null
          }
        </View>
    );
}

export default RadioButton;