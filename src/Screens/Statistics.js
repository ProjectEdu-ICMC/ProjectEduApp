import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    RefreshControl,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import { Header, Card } from 'react-native-elements';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Statistics() {
    const navigation = useNavigation();
    const [stats, setStats] = useState({});
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
            .get('http://192.168.0.29:8000/statistics', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setStats(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const screenWidth = Dimensions.get('window').width;

    //Configure the chart
    const chartConfig = { 
        decimalPlaces: 0,
        backgroundColor: "transparent",
        backgroundGradientTo: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientFrom: "white",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `#888`,
        barPercentage: 0.5,
        barRadius : 10,  
    };

    //Setting the data for the chart
    const data = {
        labels: stats.dates || [],
        datasets: [
            {
                data: stats.points || [],
                colors: stats.points?.map(() => (opacity = 1) => '#40739e') || []
            }
        ]
    };

    return (
        <View style={styles.container}>
            {/* Screen Header Information */}
            <Header
                backgroundColor="#1e272e"
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                    onPress: () => navigation.openDrawer()
                }}
                centerComponent={{ text: 'Estatísticas', style: { color: '#fff' } }}
                rightComponent={{
                    icon: 'portrait',
                    color: '#fff',
                    onPress: () => navigation.navigate('Perfil')
                }}
                containerStyle={{borderBottomWidth: 0}}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={fetching} onRefresh={fetchData} />
                }
                style={styles.scrollBox}
            >
                {/* User information Card */}
                <Card containerStyle={styles.card}>
                    <View
                        style={styles.cardContainer}
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
                                {stats.total} pontos
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Renders the Chart */}
                <View style={styles.chartBox}>
                    <BarChart
                        style={styles.chart}
                        width={screenWidth - 60}
                        height={400}
                        data={data}
                        chartConfig={chartConfig}
                        fromZero={true}
                        withCustomBarColorFromData={true}
                        flatColor={true}
                        withInnerLines={false}
                        showBarTops={false}
                        showValuesOnTopOfBars={true}
                        verticalLabelRotation={270}
                        xLabelsOffset={50}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default Statistics;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        margin: 10
    },
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
        alignSelf: 'center'
    },
    chart: {
        marginHorizontal: 10,
        marginVertical: 20,
    },
    chartBox: {
        margin: 20,
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
    scrollBox: {
        flexGrow: 1
},
});
