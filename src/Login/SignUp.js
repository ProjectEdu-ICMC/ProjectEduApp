import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { ImagePicker, Notifications } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm } from 'react-hook-form';

import { getAuth, createUserWithEmailAndPassword} from '@firebase/auth';
import axios from 'axios';

export default function SignUp() {
    const { register, handleSubmit, setValue, getValues, errors } = useForm();
    const [picking, setPicking] = useState(false);
    const [birth, setBirth] = useState(new Date());

    useEffect(() => {
        register('name');
        register('birthday');
        register('email');
        register('password');
    }, [register]);

    const selectBirthday = (_, selected) => {
        const curr = selected || birth;

        setPicking(false);

        setValue('birthday', curr.toLocaleDateString('pt-BR'));
        setBirth(curr);
    };

    //Function responsible for creating the user and registering information on the database
    const onSignUpPress = async ({ name, birthday, email, password }) => {
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    //update user information on firebase - Name and Email
                    auth.currentUser.updateProfile({
                        displayName: name,
                        email: email
                    })
                    .catch((error) => {
                        console.log('error ', error);
                        Alert.alert(error.message);
                    });
                    console.log('Account created');

                    ////Registering User info
                    const token = auth.currentUser?.getIdToken();

                    if (!token) {
                        setFetching(false);
                        return;
                    }

                    axios
                        .post(
                            `http://192.168.0.29:8000/user`,
                            {
                                name: name,
                                birthday: birthday
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        )
                        .catch((err) => {
                            console.log(err);
                        });
                });
        } catch (error) {
            console.log(error.toString());
            Alert.alert(error.message);
        }
    };

    //Function that detects if the inputs aren't null
    const checkTextInput = (data) => {
        console.log(data);
        if (data.name && data.name != '') {
            if (data.birthday != null) {
                onSignUpPress(data);
            } else {
                Alert.alert('Please insert a valid birth date');
            }
        } else {
            Alert.alert('Please insert a valid name');
        }
    };

    //Renders the Sign Up Screen
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            {/*Text Input Name*/}
            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={{
                        uri:
                            'https://png.icons8.com/male-user/ultraviolet/50/3498db'
                    }}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Nome completo"
                    keyboardType="name-phone-pad"
                    underlineColorAndroid="transparent"
                    textContentType="name"
                    onChangeText={(text) => setValue('name', text)}
                />
            </View>

            {/*Text Birthdate*/}
            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={{
                        uri:
                            'https://png.icons8.com/male-user/ultraviolet/50/3498db'
                    }}
                />
                <TouchableOpacity
                    style={styles.inputs}
                    onPress={() => setPicking(true)}
                >
                    <Text>
                        Aniversário: {birth.toLocaleDateString('pt-BR')}
                    </Text>
                </TouchableOpacity>
                {picking && (
                    <DateTimePicker
                        value={birth}
                        mode={'date'}
                        onChange={selectBirthday}
                    />
                )}
            </View>

            {/*Text Input email*/}
            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={{
                        uri:
                            'https://png.icons8.com/message/ultraviolet/50/3498db'
                    }}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={(text) => setValue('email', text)}
                />
            </View>

            {/*Text Input password*/}
            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={{
                        uri:
                            'https://png.icons8.com/key-2/ultraviolet/50/3498db'
                    }}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Senha"
                    textContentType="password"
                    keyboardType="default"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={(text) => setValue('password', text)}
                />
            </View>

            {/*Button Sign Up*/}
            <TouchableHighlight
                style={[styles.buttonContainer, styles.signupButton]}
                onPress={handleSubmit(checkTextInput)}
            >
                <Text style={styles.signUpText}>Cadastrar</Text>
            </TouchableHighlight>
        </KeyboardAvoidingView>
    );
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
        marginBottom: 0,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center'
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
        marginTop: 30,
        marginBottom: 20,
        width: 250,
        borderRadius: 30
    },
    signupButton: {
        backgroundColor: '#3b5998'
    },
    signUpText: {
        color: 'white'
    },
    inputContainerPhoto: {
        marginBottom: 0,
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center'
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
