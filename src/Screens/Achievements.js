import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Header, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import axios from 'axios';
import * as firebase from 'firebase';

import { View } from 'react-native-animatable';

export default class Achievements extends Component {
  //Achievements List
  state = {
    data: {
      BrightBeginning: {
        id: 0,
        description: 'Terminou o primeiro tópico de estudo',
        name: 'Início Brilhante', //Finished first lesson
        image:
          'https://image.freepik.com/free-vector/illustration-power-button_53876-5834.jpg',
        status: null
      },
      Respect: {
        id: 1,
        description: 'Finalizou um exercício',
        name: '#Respeito', //Finished activities part from a lesson
        image:
          'https://image.freepik.com/free-vector/illustration-business-target-icon_53876-5899.jpg',
        status: null
      },

      RockstarRookie: {
        id: 2,
        description: 'Terminou um módulo',
        name: 'Novato Rockstar', //Finished a module
        image:
          'https://image.freepik.com/free-vector/business-man-holding-job-done-check-sign_3446-560.jpg',
        status: null
      },
      LimelightAward: {
        id: 3,
        description: 'Chegou a 500 pontos',
        name: 'Centro das Atenções', //Reached 500 points - Bronze Medal
        image:
          'https://image.freepik.com/free-vector/bronzed-medal-design_1166-32.jpg',
        status: null
      },
      SpotlightAward: {
        id: 4,
        description: 'Chegou a 1000 pontos',
        name: 'Destaque', //Reached 1000 poinst - Silver Medal
        image:
          'https://image.freepik.com/free-vector/silvery-medal-design_1166-23.jpg',
        status: null
      },
      HeroAward: {
        id: 5,
        description: 'Chegou a 1500 pontos',
        name: 'Herói', //Reached 1500 poinst - Gold Medal
        image:
          'https://image.freepik.com/free-vector/golden-medal-design_1166-34.jpg',
        status: null
      },
      ShiningStarAward: {
        id: 6,
        description: 'Chegou a 2000 pontos',
        name: 'Estrela Brilhante', //Reached 2000 poinst - Bronze Trophy
        image:
          'https://cdn0.iconfinder.com/data/icons/gamification/512/cup_bronze-256.png',
        status: null
      },
      SuperstarAward: {
        id: 7,
        description: 'Chegou a 3000 pontos',
        name: 'Super Estrela', //Reached 3000 poinst - Silver Trophy
        image:
          'https://cdn2.iconfinder.com/data/icons/gamification/512/cup_silver_kopia-256.png',
        status: null
      },
      PresidentsAward: {
        id: 8,
        description: 'Chegou a 4000 pontos',
        name: 'Presidente', //Reached 4000 poinst - Gold Trophy
        image:
          'https://cdn2.iconfinder.com/data/icons/gamification/512/cup_gold_-_kopia-256.png',
        status: null
      },
      HonorClub: {
        id: 9,
        description: 'Chegou a 10000 pontos',
        name: 'Clube de Honra', //Reached 10000 poinst - Crown Trophy
        image:
          'https://cdn0.iconfinder.com/data/icons/gamification-flat-awards-and-badges/500/crown1-256.png',
        status: null
      },
      DiamondClub: {
        id: 10,
        description: 'Chegou a 20000 pontos',
        name: 'Clube de Diamante', //Reached 20000 poinst - Diamond Trophy
        image:
          'https://cdn0.iconfinder.com/data/icons/flat-community-and-achievement-badges/500/diamond-256.png',
        status: null
      }
    },
    idSelected: null,
    isVisible: false
  };

  clickEventListener = (item) => {
    this.setState({ idSelected: item });
    this.setState({ isVisible: true });
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;
    user?.getIdToken().then((token) => {
      axios
        .get('http://192.168.0.29:8000/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          const { data } = res;
          const achievements = data?.achievements;

          let dataState = this.state.data;
          if (achievements != undefined) {
            for (const achName in achievements) {
              dataState[achName].status = 'Completo';
            }
          }
          this.setState({ data: dataState });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  render() {
    let dataAchieves = this.state.data;

    return (
      //Renders the List with all the achievements
      <View style={styles.container}>
        {this.state.isVisible && (
          <Modal isVisible={this.state.isVisible}>
            <View style={styles.modalContainer}>
              <Image
                style={styles.infoImageOverlay}
                source={{ uri: this.state.data[this.state.idSelected].image }}
              />
              <Text
                style={{ textAlign: 'center', fontSize: 30, color: '#8395a7' }}
              >
                {this.state.data[this.state.idSelected].name}
              </Text>
              <Text
                style={{ textAlign: 'center', fontSize: 15, color: '#8395a7' }}
              >
                {this.state.data[this.state.idSelected].description}
              </Text>
              <Text
                style={{ textAlign: 'center', fontSize: 15, color: '#8395a7' }}
              >
                Estado:{' '}
                {this.state.data[this.state.idSelected].status ||
                  'Não conquistado'}
              </Text>
              <Button
                onPress={() => this.setState({ isVisible: false })}
                buttonStyle={{
                  borderRadius: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 100
                }}
                title="Voltar"
              />
            </View>
          </Modal>
        )}
        <Header
          backgroundColor="#1e272e"
          barStyle="light-content"
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer()
          }}
          centerComponent={{ text: 'Conquistas', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'portrait',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('Perfil')
          }}
        />
        <View style={styles.container}>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={Object.keys(dataAchieves)}
            keyExtractor={(item) => {
              return dataAchieves[item].id.toString();
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}
                >
                  <Image style={styles.image} source={{ uri: dataAchieves[item].image }} />
                  <View style={styles.cardContent}>
                    <Text style={styles.name}>{dataAchieves[item].name}</Text>
                    <Text style={styles.count}>
                      Estado: {dataAchieves[item].status || 'Não conquistado'}
                    </Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => this.clickEventListener(item)}
                    >
                      <Text style={styles.followButtonText}>Explorar</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
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
    backgroundColor: '#ebf0f7'
  },
  contentList: {
    flex: 1
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7'
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6
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
    borderRadius: 30
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#6666ff'
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdcdc'
  },
  followButtonText: {
    color: '#dcdcdc',
    fontSize: 12
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    height: Dimensions.get('window').height
  },
  infoImageOverlay: {
    width: 300,
    height: 300
  }
});
