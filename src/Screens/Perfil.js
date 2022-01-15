import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { getAuth } from '@firebase/auth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
      />
      {/* Renders User Profile */}
      <View>
        <View style={styles.header}></View>
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
            <Text style={styles.description}>Pontuação: {data.points || 0 }</Text>
            <Text style={styles.description}>Progresso: {data.progress || 0}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3b5998',
    height: 180
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  body: {
    marginTop: 40,
    paddingTop: 20,
    alignSelf: 'stretch',
  },
  bodyContent: {
    alignItems: 'center',
    padding: 30
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600'
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10
  },
  description: {
    fontSize: 22,
    color: '#696969',
    marginTop: 20,
    textAlign: 'center'
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
