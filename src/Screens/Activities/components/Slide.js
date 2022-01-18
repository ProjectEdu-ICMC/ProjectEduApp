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
import { Icon } from 'react-native-elements';

function Slide({ type, slide, topicName, finishTopic, finishedExplorations, finishing }) {
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
                    <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Text style={styles.topicText}>
                                Esse slide não possui conteúdo ainda
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

    if (type === 'begin') {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Text style={styles.topicText}>Tópico</Text>
                            <Text style={styles.textInfo}>{topicName}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

    if (type === 'end') {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Icon name='celebration' size={96} color="#40739e"/>
                            <Text style={styles.finishText}>Chegamos ao fim deste tópico!</Text>
                            {!finishing && 
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
                            }
                        </View>
                    </View>
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
                {/* <View style={{ height: 50 }} /> */}
                {blocks}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 30,
        backgroundColor: '#40739e',
        zIndex: -2
    },
    topicText: {
        textTransform: 'uppercase',
        color: '#aaa',
        textAlign: 'center'
    },
    finishText: {
        // textTransform: 'uppercase',
        color: '#000',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center'
    },
    boxContainer: {
        justifyContent: 'center', 
        alignSelf: 'stretch', 
        flex: 1
    },
    box: {
        marginBottom: 10,
        padding: 30,
        borderRadius: 10,
        marginHorizontal: 40,
        backgroundColor: '#fff',
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        alignItems: 'center',
    },
    textInfo: {
        textAlign: 'center',
        fontSize: 32,
        textTransform: 'uppercase',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        backgroundColor: '#40739e'
    },
    buttonText: {
        color: 'white'
    }
});

export default Slide;
