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
                setPoints(res.data.points[moduleId] || 0);
                axios
                    .get(`http://192.168.0.29:8000/ranking/${moduleId}`)
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
                containerStyle={{borderBottomWidth: 0}}
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
                        style={styles.container}
                    >
                        <Image
                            style={styles.imageCard}
                            source={{
                                uri:
                                    auth.currentUser.photoURL ||
                                    'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
                            }}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>
                                {auth.currentUser.displayName}
                            </Text>
                            <Text style={styles.points}>
                                {points} pontos
                            </Text>
                        </View>
                    </View>
                </Card>
                
                {fetching ?
                <ActivityIndicator color="#40739e" size="large" style={styles.loading} /> :
                <View>
                    <Card containerStyle={styles.titleBox}>
                        <Text style={styles.title}>
                            Top 10
                        </Text>
                    </Card>
                    {/*List Top 10 Uses */}
                    {data.map((user, i) => (
                        <ListItem key={i} topDivider={false} bottomDivider={false} containerStyle={[Number(i) === Number(data.length - 1) && styles.bottomList, styles.listItem]}>
                            <Badge
                                value={i + 1}
                                textStyle={{ color: 'white' }}
                                badgeStyle={styles.badge}
                            />
                            <ListItem.Title>{ user ? user?.name || 'Sem nome' : '-'}</ListItem.Title>
                            <ListItem.Subtitle>{user ? user?.points || '0' : '-'}</ListItem.Subtitle>
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
        backgroundColor: '#fff',
        borderWidth: 0,
        elevation: 0,
        borderRadius: 10,
        margin: 20,
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    badge: {
        backgroundColor: '#40739e'
    },
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        margin: 10
    },
    titleBox: {
        backgroundColor: '#fff',
        borderWidth: 0,
        elevation: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        margin: 20,
    },
    listItem: {
        marginHorizontal: 20,
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    bottomList: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: { 
        textAlign: 'center', 
        color: '#000', 
        fontSize: 20 
    },
    name: { 
        fontSize: 20, 
        color: '#000' 
    },
    points: { 
        fontSize: 16, 
        color: '#000' 
    },
    infoContainer: {
        marginLeft: 20,
    },
    imageCard: {
        width: 70,
        height: 70,
        borderRadius: 40,
        // marginBottom: 10,
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
