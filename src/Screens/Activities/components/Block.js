import React, { useState }from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

function Block({ content, type, datatype }) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const _onLayout = (event) => {
        const containerWidth = event.nativeEvent.layout.width;
        
        // console.log(containerWidth)
        Image.getSize(content, (w, h) => {
            setWidth(containerWidth);
            setHeight(containerWidth * h / w);
        }, () => {
            setWidth(containerWidth);
            setHeight(containerWidth * 9 / 16);
        });
    };

    console.log()
    return (
        <View style={styles.block}>
            <Text style={styles.blockType}>{type}</Text>
            {datatype === 'image' && (
                <View onLayout={_onLayout} style={styles.container}>
                    <Image
                        source={{ uri: content }}
                        style={{width: width, height: height}}
                        resizeMode={'contain'}
                    />
                </View>
            )}
            {datatype === 'video' && (

                <View onLayout={_onLayout} style={styles.container}>
                    <WebView
                        style={{width: width, height: height}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        automaticallyAdjustContentInsets={true}
                        scalesPageToFit={true}
                        source={{ uri: content }}
                    />
                </View>
            )}
            {datatype === 'text' && (
                <Text style={styles.textSubTitle}>{content}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    blockType: {
        fontSize: 20,
        textAlign: 'left',
        flex: 1,
        alignSelf: 'stretch',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 5
    },
    container: {
        alignSelf: 'stretch',
    },
    textSubTitle: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 15,
        marginTop: 5
    }
});

export default Block;
