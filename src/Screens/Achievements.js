import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Header, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import axios from 'axios';
import { getAuth } from '@firebase/auth';

import { useNavigation } from '@react-navigation/core';
import { View } from 'react-native-animatable';
import { ActivityIndicator } from 'react-native';
import StatusBotton from '../components/StatusBotton';
import { Icon } from 'react-native-elements';

export default function Achievements() {
    const navigation = useNavigation();

    const data = {
        BrightBeginning: {
            id: 0,
            description: 'Terminou o primeiro tópico de estudo',
            name: 'Início Brilhante', //Finished first lesson
            image:
                'https://image.freepik.com/free-vector/illustration-power-button_53876-5834.jpg',
            status: (user) => Object.keys(user?.finishedTopics || {}).length > 0
        },
        Respect: {
            id: 1,
            description: 'Finalizou um exercício',
            name: '#Respeito', //Finished activities part from a lesson
            image:
                'https://image.freepik.com/free-vector/illustration-business-target-icon_53876-5899.jpg',
            status: (user) => Object.keys(user?.finishedExplorations || {}).length > 0
        },

        RockstarRookie: {
            id: 2,
            description: 'Terminou um módulo',
            name: 'Novato Rockstar', //Finished a module
            image:
                'https://image.freepik.com/free-vector/business-man-holding-job-done-check-sign_3446-560.jpg',
            status: (user) => Object.keys(user?.finishedModules || {}).length > 0
        },
        LimelightAward: {
            id: 3,
            description: 'Chegou a 500 pontos',
            name: 'Centro das Atenções', //Reached 500 points - Bronze Medal
            image:
                'https://image.freepik.com/free-vector/bronzed-medal-design_1166-32.jpg',
            status: (user) => user?.totalPoints >= 500
        },
        SpotlightAward: {
            id: 4,
            description: 'Chegou a 1000 pontos',
            name: 'Destaque', //Reached 1000 poinst - Silver Medal
            image:
                'https://image.freepik.com/free-vector/silvery-medal-design_1166-23.jpg',
            status: (user) => user?.totalPoints >= 1000
        },
        HeroAward: {
            id: 5,
            description: 'Chegou a 1500 pontos',
            name: 'Herói', //Reached 1500 poinst - Gold Medal
            image:
                'https://image.freepik.com/free-vector/golden-medal-design_1166-34.jpg',
            status: (user) => user?.totalPoints >= 1500
        },
        ShiningStarAward: {
            id: 6,
            description: 'Chegou a 2000 pontos',
            name: 'Estrela Brilhante', //Reached 2000 poinst - Bronze Trophy
            image:
                'https://cdn0.iconfinder.com/data/icons/gamification/512/cup_bronze-256.png',
            status: (user) => user?.totalPoints >= 2000
        },
        SuperstarAward: {
            id: 7,
            description: 'Chegou a 3000 pontos',
            name: 'Super Estrela', //Reached 3000 poinst - Silver Trophy
            image:
                'https://cdn2.iconfinder.com/data/icons/gamification/512/cup_silver_kopia-256.png',
            status: (user) => user?.totalPoints >= 3000
        },
        PresidentsAward: {
            id: 8,
            description: 'Chegou a 4000 pontos',
            name: 'Presidente', //Reached 4000 poinst - Gold Trophy
            image:
                'https://cdn2.iconfinder.com/data/icons/gamification/512/cup_gold_-_kopia-256.png',
            status: (user) => user?.totalPoints >= 4000
        },
        HonorClub: {
            id: 9,
            description: 'Chegou a 10000 pontos',
            name: 'Clube de Honra', //Reached 10000 poinst - Crown Trophy
            image:
                'https://cdn0.iconfinder.com/data/icons/gamification-flat-awards-and-badges/500/crown1-256.png',
            status: (user) => user?.totalPoints >= 10000
        },
        DiamondClub: {
            id: 10,
            description: 'Chegou a 20000 pontos',
            name: 'Clube de Diamante', //Reached 20000 poinst - Diamond Trophy
            image:
                'https://cdn0.iconfinder.com/data/icons/flat-community-and-achievement-badges/500/diamond-256.png',
            status: (user) => user?.totalPoints >= 20000
        }
    };

    const [user, setUser] = useState();
    const [isVisible, setVisible] = useState(false);
    const [selected, setSelected] = useState();
    const [fetching, setFetching] = useState(false);

    const onClick = (item) => {
        setSelected(item);
        setVisible(true);
    };

    const fetch = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        user?.getIdToken().then((token) => {
            axios
                .get('http://192.168.0.29:8000/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    const { data } = res;
                    data.totalPoints = Object.values(data?.points).reduce((prev, curr, index) => prev + curr) || 0
                    setUser(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        //Renders the List with all the achievements
        <View style={styles.container}>
            <Modal isVisible={isVisible}>
                <View style={styles.modalContainer}>
                    <Image
                        style={styles.infoImageOverlay}
                        source={{ uri: selected ? data[selected].image : '' }}
                    />
                    <Text
                        style={styles.titleModal}
                    >
                        { selected ? data[selected].name : '' }
                    </Text>
                    <Text
                        style={styles.descriptionModal}
                    >
                        { selected ? data[selected].description : '' }
                    </Text>
                    <View
                        style={styles.statusModal}
                    >
                        <Text style={styles.textStatusModal}>Conquistado</Text>
                        <StatusBotton status={selected ? (data[selected].status(user) ? 'done' : 'error') : undefined}></StatusBotton>
                    </View>
                    <Button
                        onPress={() => setVisible(false)}
                        buttonStyle={styles.buttonModal}
                        title="Voltar"
                    />
                </View>
            </Modal>
            <Header
                backgroundColor="#1e272e"
                barStyle="light-content"
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                    onPress: () => navigation.openDrawer()
                }}
                centerComponent={{ text: 'Conquistas', style: { color: '#fff' } }}
                rightComponent={{
                    icon: 'portrait',
                    color: '#fff',
                    onPress: () => navigation.navigate('Perfil')
                }}
                containerStyle={{borderBottomWidth: 0}}
            />
            { user === undefined ? 
            <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator size='large' color='#40739e'/>
            </View>
            :
            <View style={styles.container}>
                <FlatList
                    style={styles.contentList}
                    columnWrapperStyle={styles.listContainer}
                    data={Object.keys(data)}
                    keyExtractor={(item) => {
                        return data[item].id.toString();
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => {
                                    onClick(item);
                                }}
                            >
                                <Image style={styles.image} source={{ uri: data[item].image }} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.name}>{data[item].name}</Text>
                                    <View style={styles.buttons}>
                                        <StatusBotton status={data[item].status(user) ? 'done': 'error'}></StatusBotton>
                                        <TouchableOpacity
                                            style={styles.followButton}
                                            onPress={() => onClick(item)}
                                        >
                                            <Text style={styles.followButtonText}>Explorar</Text>
                                            <Icon name="chevron-right" color="#fff" size={16} style={[styles.followButtonText]}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    onRefresh={fetch}
                    refreshing={fetching}
                    ListFooterComponent={<View style={styles.footer}></View>}
                />
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    logoImage: {
        width: 200,
        height: 200
    },
    containerLogo: {
        alignItems: 'center',
        margin: 10
    },
    container: {
        flex: 1,
    },
    contentList: {
        flex: 1
    },
    footer: {
        height: 20
    },
    cardContent: {
        marginLeft: 20,
        marginVertical: 10,
        flex: 1,
        justifyContent: 'space-between'
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
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
        borderRadius: 10
    },

    name: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    buttons: {
        fontSize: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    followButton: {
        height: 36,
        width: 108,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#40739e',
        flexDirection: 'row'
    },
    followButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 10
    },
    infoImageOverlay: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 20
    },
    titleModal: { 
        textAlign: 'center', 
        fontSize: 30, 
        color: '#40739e',
        fontWeight: 'bold',
        marginTop: 20
    },
    descriptionModal: { 
        textAlign: 'center', 
        fontSize: 15, 
        color: '#777' 
    },
    statusModal: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    textStatusModal: { 
        textAlign: 'center', 
        fontSize: 15, 
        color: '#777',
        marginBottom: 5
    },
    buttonModal: {
        borderRadius: 50,
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#40739e',
    }
});
