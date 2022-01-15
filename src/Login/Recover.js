import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

import { getAuth, sendPasswordResetEmail }from '@firebase/auth';

export default class Recover extends Component {
  constructor(props) {
    super(props);
    state = {
      email: ''
    };
  }

  //Configuring the Header of the Screen
  static navigationOptions = {
    title: 'Back',
    headerStyle: {
      backgroundColor: '#FF800'
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'left'
    }
  };

  //Function that sends an email to the user
  //The email will be responsible to change the password
  async onRecoverButton() {
    const { email } = this.state;
    try {
      const auth = getAuth()
      sendPasswordResetEmail(auth, email)
        .catch((error) => {
          console.log(error);
          Alert.alert(error.message);
        });
      Alert.alert('Solicitação Enviada com sucesso');
    } catch (error) {
      console.log(error.toString());
      Alert.alert(error.message);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          resizeMode="contain"
          style={{ width: 200, height: 200, marginBottom: 30 }}
          source={require('../../assets/logo.png')}
        />
        <Text style={{ marginBottom: 30, fontSize: 20 }}>Insira seu Email</Text>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({ email })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.recoverButton]}
          onPress={this.onRecoverButton.bind(this)}
        >
          <Text style={styles.recoverText}>Enviar</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686F9A'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  recoverButton: {
    backgroundColor: '#3b5998'
  },
  recoverText: {
    color: 'white'
  }
});
