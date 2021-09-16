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
import * as firebase from 'firebase';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Ranking() {
  const navigation = useNavigation();
  const [points, setPoints] = useState(0);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = async () => {
    const user = firebase.auth().currentUser;
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
        setPoints(res.data.points);
        axios
          .get('http://192.168.0.29:8000/ranking')
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      {/*Header Screen Information */}
      <Header
        backgroundColor="#1e272e"
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => navigation.openDrawer()
        }}
        centerComponent={{ text: 'Ranking', style: { color: '#fff' } }}
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
        {/*Card for user information*/}
        <Card containerStyle={{ backgroundColor: '#40739e', marginBottom: 20 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}
          >
            <Image
              style={styles.imageCard}
              source={{
                uri:
                  firebase.auth().currentUser.photoURL ||
                  'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
              }}
            />
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 15, color: '#ffffff' }}>
                Nome: {firebase.auth().currentUser.displayName}
              </Text>
              <Text style={{ fontSize: 15, color: '#ffffff' }}>
                Pontuação: {points}
              </Text>
            </View>
          </View>
        </Card>

        <Divider style={{ backgroundColor: '#40739e', height: 10 }} />

        <Card containerStyle={{ backgroundColor: '#40739e', marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 25 }}>
            Top 10
          </Text>
        </Card>
        {/*List Top 10 Uses */}
        {data.map((user, i) => (
          <ListItem key={i} topDivider={true} bottomDivider={true}>
            <ListItem.Title>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{user.points}</ListItem.Subtitle>
            <Badge
              value={i + 1}
              textStyle={{ color: 'white' }}
              containerStyle={{ marginTop: -20 }}
            />
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
