import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Swiper from 'react-native-swiper';
import { Icon, Header } from 'react-native-elements';

export default class Help extends React.Component {
  render() {
    //Renders a swiper describing the mains componentes of the app
    return (
      <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
        <View style={styles.slide1}>
          <Header
            backgroundColor="#1e272e"
            leftComponent={{
              icon: 'arrow-back',
              color: '#fff',
              onPress: () => this.props.navigation.goBack()
            }}
            centerComponent={{ text: 'Atividades', style: { color: '#fff' } }}
          />

          <Icon name="work" size={300} />
          <Text style={styles.text}>Atividades</Text>
          <Text style={styles.text1}>
            Módulos de conteúdos e suas respectivas atividades
          </Text>
        </View>
        <View style={styles.slide2}>
          <Header
            backgroundColor="#1e272e"
            leftComponent={{
              icon: 'arrow-back',
              color: '#fff',
              onPress: () => this.props.navigation.goBack()
            }}
            centerComponent={{ text: 'Ranking', style: { color: '#fff' } }}
          />
          <Icon name="sort" size={300} />
          <Text style={styles.text}>Ranking</Text>
          <Text style={styles.text1}>
            Mostra um ranking com as melhores pontuações obtidas
          </Text>
        </View>
        <View style={styles.slide3}>
          <Header
            backgroundColor="#1e272e"
            leftComponent={{
              icon: 'arrow-back',
              color: '#fff',
              onPress: () => this.props.navigation.goBack()
            }}
            centerComponent={{ text: 'Estatísticas', style: { color: '#fff' } }}
          />
          <Icon name="graphic-eq" size={300} />
          <Text style={styles.text}>Estatísticas</Text>
          <Text style={styles.text1}>
            Mostra a evolução diária de cada usuário
          </Text>
        </View>
        <View style={styles.slide4}>
          <Header
            backgroundColor="#1e272e"
            leftComponent={{
              icon: 'arrow-back',
              color: '#fff',
              onPress: () => this.props.navigation.goBack()
            }}
            centerComponent={{
              text: 'Configurações',
              style: { color: '#fff' }
            }}
          />
          <Icon name="settings" size={300} />
          <Text style={styles.text}>Configurações</Text>
          <Text style={styles.text1}>
            Mostram as configurações principais do App
          </Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red'
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#92BB'
  },
  slide4: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFC312'
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  text1: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20
  }
});
