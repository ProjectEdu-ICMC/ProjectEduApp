import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    View
} from 'react-native';

import { Header } from 'react-native-elements';
import TopicCard from './components/TopicCard.js';

import {
    useNavigation,
    useRoute
} from '@react-navigation/native';

import { Icon } from 'react-native-elements';
import axios from 'axios';

function Topics() {
    const navigation = useNavigation();
    const route = useRoute();
    const [topics, setTopics] = useState(undefined);

    const { mod, modName } = route.params;

    useEffect(() => {
        const fetch = async () => {
            axios
                .get(`http://192.168.0.29:8000/topic/${mod}`)
                .then((res) => {
                    setTopics(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetch();
    }, [setTopics, axios, mod]);

    const header = <View style={{ minHeight: 20 }}>
        <TouchableOpacity 
            style={styles.rankingButton} 
            onPress={() => navigation.navigate('Ranking', {
                moduleId: mod,
                moduleName: modName
            })}
        >
            <Icon name="sort" color={'#fff'} size={24} />
            <Text style={styles.rankingButtonText}>Ranking</Text>
        </TouchableOpacity>
    </View>

    const footer = <View style={{ minHeight: 20 }}></View>

    return (
        <View>
            {/*Screen Header Information */}
            <Header
                backgroundColor="#1e272e"
                barStyle="light-content"
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => navigation.goBack()
                }}
                centerComponent={{
                    text: modName,
                    style: { color: '#fff' }
                }}
            />
            {/*Renders Topics with a FlatList */}
            <FlatList
                ListHeaderComponent={header}
                ListFooterComponent={footer}
                data={topics}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({ item }) => {
                    return (
                        <TopicCard
                            item={item}
                            OnPress={(item) =>
                                navigation.navigate('Slides', {
                                    topic: item.id,
                                    topicName: item.name
                                })
                            }
                        />
                    );
                }}
                
            />
        </View>
    );
}

export default Topics;

const styles = StyleSheet.create({
    rankingButton: {
        backgroundColor: '#40739e',
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rankingButtonText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,

    }
});
