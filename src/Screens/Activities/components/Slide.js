import React, { useState, useEffect } from 'react';
import {
    TouchableHighlight,
    ScrollView,
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Block from './Block';
import Exercise from './Exercise';
import { ActivityIndicator } from 'react-native';

function Slide({ type, slide, topicName, finishTopic, finishedExplorations }) {
    const navigation = useNavigation();

    const [content, setContent] = useState(undefined);

    useEffect(() => {
        const fetch = async (path) => {
            axios
                .get(`http://192.168.0.29:8000/${path}/${slide}`)
                .then((res) => {
                    setContent(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        switch (type) {
            case 'iinfo':
                fetch('info');
                break;
            case 'eexpla':
                fetch('explanation');
                break;
            case 'eexplo':
                fetch('exploration');
                break;
            default:
                break;
        }
    }, [type, axios, setContent, slide]);

    if (type === 'empty') {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Text style={styles.textInfo}>
                        Esse slide não possui conteúdo ainda
                    </Text>
                </View>
            </ScrollView>
        );
    }

    if (type === 'begin') {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Text style={styles.textInfo}>{topicName}</Text>
                </View>
            </ScrollView>
        );
    }

    if (type === 'end') {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <TouchableHighlight
                        style={[
                            styles.buttonContainer,
                            styles.activitiesButton
                        ]}
                        onPress={() => {
                            finishTopic();
                            // navigation.goBack();
                        }}
                    >
                        <Text style={styles.buttonText}>Finalizar</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }

    const blocks =
        content &&
        content.map((item, index) =>
            type !== 'eexplo' ? (
                <Block
                    key={item.id}
                    datatype={item.datatype}
                    type={item.type}
                    content={item.value}
                />
            ) : (
                <Exercise key={item.id} type={item.type} content={item} 
                    savedState={finishedExplorations?.hasOwnProperty(item.id) ? finishedExplorations[item.id] : undefined} />
            )
        );
    // TODO: display content (video, image & text)
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                <View style={{ height: 50 }} />
                {blocks}
            </View>
            <View style={{ height: 80 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInfo: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 30,
        marginHorizontal: 20,
        marginBottom: 0,
        padding: 10,
        borderColor: '#54a0ff',
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: '#E7F1FF'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
        width: 280,
        borderRadius: 30
    },
    buttonText: {
        color: 'white'
    },
    activitiesButton: {
        backgroundColor: '#3498db'
    }
});

export default Slide;
