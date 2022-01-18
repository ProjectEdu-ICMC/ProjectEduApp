import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';

export default function Perfil() {
    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [fetching, setFetching] = useState(false);

    const auth = getAuth();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const fetchData = async () => {
        const user = auth.currentUser;
        const token = await user?.getIdToken();

        if (!token) {
            setFetching(false);
            return;
        }
        axios
            .get('http://192.168.0.29:8000/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const points = data?.points ? Object.values(data.points).reduce((prev, curr, index) => prev + curr) : 0;

    return (
        <View>
            {/*Screen Header Informatiom */}
            <Header
                backgroundColor="#1e272e"
                barStyle="light-content"
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                    onPress: () => navigation.openDrawer()
                }}
                centerComponent={{ text: 'Perfil', style: { color: '#fff' } }}
                containerStyle={{borderBottomWidth: 0}}
            />
            {/* Renders User Profile */}
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={fetching} onRefresh={fetchData} />
                }
            >
                <View style={styles.header}></View>
                <View style={styles.box}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri:
                                auth.currentUser.photoURL ||
                                'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
                        }}
                    />
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{auth.currentUser.displayName}</Text>
                            <Text style={styles.info}>{auth.currentUser.email}</Text>
                            <Text style={styles.points}>{points || 0 } pontos</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#40739e',
        height: 180
    },
    box: {
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: -105,
        padding: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        alignSelf: 'center',
    },
    name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600'
    },
    body: {
        marginTop: 10,
        alignSelf: 'stretch',
    },
    bodyContent: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    name: {
        fontSize: 28,
        color: '#000',
        fontWeight: '600'
    },
    info: {
        fontSize: 16,
        color: '#40739e',
    },
    points: {
        fontSize: 22,
        color: '#000',
        marginTop: 40,
        textAlign: 'center',
        backgroundColor: '#fdc75c',
        padding: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: '#00BFFF'
    },
    followButtonPlay: {
        marginTop: 10,
        marginBottom: 10,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    imageIcon: {
        width: 80,
        height: 80
    }
});
