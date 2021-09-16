import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    TouchableHighlight,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import * as firebase from 'firebase';

export default class SignIn extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: '',
        currentDate: new Date(),
        isSelected: 0
    };

    //Sets the Header to be null
    //The screen does not need a header
    static navigationOptions = {
        header: null
    };
    //Function that is responsible for the user login
    async onLogin() {
        const { email, password, currentDate } = this.state;
        try {
            //Sign in the user
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('Logged In!');

            let userId = firebase.auth().currentUser.uid;
            let userNamePath = '/users/' + userId;
        } catch (error) {
            console.log(error.toString());
            Alert.alert(error.message);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="height"
                enabled
            >
                {/*Renders logo ProjectEDU*/}
                <Image
                    resizeMode="contain"
                    style={{ width: 200, height: 200, marginBottom: 30 }}
                    source={require('../../assets/logo.png')}
                />

                {/*Text Input email*/}
                <View style={styles.inputContainer}>
                    <Image
                        style={[styles.icon, styles.inputIcon]}
                        source={{
                            uri:
                                'https://png.icons8.com/envelope/androidL/40/3498db'
                        }}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        onChangeText={(email) => this.setState({ email })}
                    />
                </View>

                {/*Text Input password*/}
                <View style={styles.inputContainer}>
                    <Image
                        style={[styles.icon, styles.inputIcon]}
                        source={{
                            uri:
                                'https://png.icons8.com/password/androidL/40/3498db'
                        }}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Senha"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>

                {/*Button - Screen Recover Password */}
                <TouchableOpacity
                    style={styles.restoreButtonContainer}
                    onPress={() =>
                        this.props.navigation.navigate('RecoverScreen')
                    }
                >
                    <Text>Esqueceu sua Senha?</Text>
                </TouchableOpacity>

                {/*Button - Login*/}
                <TouchableOpacity
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={this.onLogin.bind(this)}
                >
                    <Text style={styles.loginText}>Entrar</Text>
                </TouchableOpacity>

                {/*Button - Screen Sign Up */}
                <TouchableOpacity
                    style={[styles.buttonContainer, styles.registerButton]}
                    onPress={() =>
                        this.props.navigation.navigate('SignUpScreen')
                    }
                >
                    <Text style={styles.registerText}>Cadastrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1
    },
    icon: {
        width: 30,
        height: 30
    },
    inputIcon: {
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
    loginButton: {
        backgroundColor: '#3b5998'
    },
    registerButton: {
        backgroundColor: '#1b3978'
    },
    loginText: {
        color: 'white'
    },
    registerText: {
        color: 'white'
    },
    restoreButtonContainer: {
        width: 250,
        marginBottom: 15,
        alignItems: 'flex-end'
    },
    socialButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialIcon: {
        color: '#FFFFFF',
        marginRight: 5
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
