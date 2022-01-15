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
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
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
    decimalPlaces: 1,
    backgroundColor: '#fffffff',
    backgroundGradientFrom: '#ecf0f1',
    backgroundGradientTo: '#7f8c8d',
    color: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1 // optional, default 3
  };

  //Setting the data for the chart
  const data = {
    labels: stats.dates || [],
    datasets: [
      {
        data: stats.points || []
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
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={fetchData} />
        }
      >
        {/* User information Card */}
        <Card
          containerStyle={{
            backgroundColor: '#40739e',
            marginBottom: 0,
            borderRadius: 20
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', margin: 25 }}
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
              <Text style={{ fontSize: 17, color: '#ffffff' }}>
                Nome: {auth.currentUser.displayName}
              </Text>
              <Text style={{ fontSize: 17, color: '#ffffff' }}>
                Pontuação: {stats.total}
              </Text>
              <Text style={{ fontSize: 17, color: '#ffffff' }}>
                Progresso: {stats.progress}%
              </Text>
            </View>
          </View>
        </Card>

        {/* Renders the Chart */}
        <BarChart
          style={{
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20
          }}
          fromZero={true}
          data={data}
          width={screenWidth - 40}
          height={400}
          chartConfig={chartConfig}
          verticalLabelRotation={90}
        />
      </ScrollView>
    </View>
  );
}

export default Statistics;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageCard: {
    width: 70,
    height: 70,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center'
  }
});
