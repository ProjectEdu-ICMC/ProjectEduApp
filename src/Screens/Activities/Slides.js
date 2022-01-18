import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';

import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import Slide from './components/Slide';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

import { getAuth } from '@firebase/auth';
import { StyleSheet } from 'react-native';

function Slides() {
    const navigation = useNavigation();
    const route = useRoute();

    const [finishing, setFinishing] = useState(false);
    const [slides, setSlides] = useState(undefined);
    const [finishedExplorations, setFinishedExplorations] = useState(undefined);
    const auth = getAuth();

    const { topic, topicName } = route.params;

    useEffect(() => {
        const fetch = async () => {
            
            const token = await auth.currentUser?.getIdToken();

            axios
                .get(`http://192.168.0.29:8000/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    setFinishedExplorations(res.data?.finishedExplorations)

                    axios
                        .get(`http://192.168.0.29:8000/slide/${topic}`)
                        .then((res) => {
                            setSlides(res.data);                            
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                        })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetch();
    }, [topic]);

    const finishTopic = async () => {
        setFinishing(true);
        const token = await auth.currentUser?.getIdToken();
        axios
            .post(`http://192.168.0.29:8000/topic/${topic}/finish`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                navigation.navigate({
                    name: 'Topics',
                    params: {
                        updateFinished: res.data
                    },
                    merge: true
                })
                setFinishing(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const content =
        slides !== undefined && slides?.length > 0
            ? slides.map((page) => (
                  <Slide key={page.id} slide={page.id} type={page.type} finishedExplorations={finishedExplorations}/>
              ))
            : [<Slide key="empty_slide" type="empty" />];

    const pages = [
        <Slide type="begin" key="first_slide" topicName={topicName} />,
        ...content,
        <Slide type="end" key="last_slide" finishing={finishing} finishTopic={finishTopic} />
    ];

    return (
        slides === undefined ? 
        <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
            <ActivityIndicator size='large' color='#40739e'/>
        </View>
        :
        <>
        <Swiper 
            showsButtons={false} 
            autoplay={false} 
            loop={false} 
            dot={
                <View style={styles.scroll}>
                    <View style={styles.dot} />
                </View>
            } 
            activeDot={
                <View style={styles.scroll}>
                    <View style={[styles.dot, {backgroundColor: '#40739e'}]} />
                </View>
            }
        >
            {pages}
        </Swiper>
        </>
    );
}

const styles = StyleSheet.create({
    scroll: {
        height: 16,
        width: 20,
        marginLeft: -3,
        marginRight: -3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: '#00000066',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    }, 
    dot: {
        height: 8,
        width: 8,
        backgroundColor: '#aaa',
        borderRadius: 4,
    } 
})

export default Slides;
