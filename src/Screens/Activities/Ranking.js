import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    Text
} from 'react-native';
import { Badge, ListItem, Header, Card, Divider } from 'react-native-elements';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

function Ranking() {
    const navigation = useNavigation();
    const route = useRoute();
    const [points, setPoints] = useState(0);
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(false);

    const { moduleId, moduleName } = route.params;

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

        setFetching(true);
        
        axios
            .get('http://192.168.0.29:8000/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setPoints(res.data.points);
                axios
                    .get('http://192.168.0.29:8000/ranking')
                    .then((res) => {
                        setData(res.data);
                        setFetching(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (data?.length && data?.length < 10) {
        const dummy = new Array(10 - data.length)
        setData([...data, ...dummy.map(() => new Object())])
    }

    return (
        <View>
            {/*Header Screen Information */}
            <Header
                backgroundColor="#1e272e"
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => navigation.goBack()
            }}
                centerComponent={{ text: `Ranking: ${moduleName}`, style: { color: '#fff' } }}
            />

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={fetching} onRefresh={fetchData} />
                }
                style={styles.scrollBox}
            >
                {/*Card for user information*/}
                <Card containerStyle={styles.card}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}
                    >
                        <Image
                            style={styles.imageCard}
                            source={{
                                uri:
                                    auth.currentUser.photoURL ||
                                    'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
                            }}
                        />
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 15, color: '#ffffff' }}>
                                Nome: {auth.currentUser.displayName}
                            </Text>
                            <Text style={{ fontSize: 15, color: '#ffffff' }}>
                                Pontuação: {points}
                            </Text>
                        </View>
                    </View>
                </Card>
                
                {fetching ?
                <ActivityIndicator color="#40739e" size="large" style={styles.loading} /> :
                <View>
                    <Card containerStyle={styles.card}>
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 25 }}>
                            Top 10
                        </Text>
                    </Card>
                    {/*List Top 10 Uses */}
                    {data.map((user, i) => (
                        <ListItem key={i} topDivider={false} bottomDivider={false} style={{marginHorizontal: 15}}>
                            <ListItem.Title>{user?.name || '-'}</ListItem.Title>
                            <ListItem.Subtitle>{user?.name ? user?.points || '0' : '-'}</ListItem.Subtitle>
                            <Badge
                                value={i + 1}
                                textStyle={{ color: 'white' }}
                                containerStyle={{ marginTop: -20 }}
                            />
                        </ListItem>
                    ))}
                    <View style={styles.dummyFooter}></View>
                </View>
                }
            </ScrollView>
        </View>
    );
}
export default Ranking;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#40739e',
        borderWidth: 0
    },
    imageCard: {
        width: 70,
        height: 70,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center'
    },    
    scrollBox: {
        marginBottom: 70
    },
    dummyFooter: {
        height: 20
    },
    loading: {
        marginTop: 30
    }
});
