import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TouchableHighlight,
    Alert,
    TextInput
} from 'react-native';
import { Header, Card } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import { getAuth, sendPasswordResetEmail, updateProfile } from '@firebase/auth';
import axios from 'axios';

export default class ImagePickerExample extends React.Component {
    

    constructor(props) {
        super(props);

        this.auth = getAuth();

        this.state = {
            image: this.auth.currentUser.photoURL,
            email: this.auth.currentUser.email,
            name: this.auth.currentUser.displayName,
            isPressed: false,
            isEditingName: false,
            isEditingEmail: false,
            userRef: undefined,
            rankingRef: undefined
        };

    }

    //Function for recover user password
    async onRecoverButton() {
        this.setState({ isPressed: true });

        try {
            sendPasswordResetEmail(this.auth, this.state.email)
                .catch((error) => {
                    console.log(error);
                    Alert.alert(error.message);
                });
        } catch (error) {
            console.log(error.toString());
            Alert.alert(error.message);
        }
    }

    changeName = (text) => {
        if (text.length > 1) {
            this.setState({ name: text });
            
            updateProfile(this.auth.currentUser, {
                displayName: text
            })
                .then(async () => {
                    const token = await this.auth.currentUser?.getIdToken();

                    axios
                        .put(`http://192.168.0.29:8000/user`,
                        {
                            name: text,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .catch((error) => {
                            console.log('error ', error);
                            Alert.alert(error.message);
                        })
                })
                .catch((error) => {
                    console.log('error ', error);
                    Alert.alert(error.message);
                });
            this.setState({ isEditingName: false });
        } else alert('Seu nome deve ter pelo menos 2 caracteres');
    };

    render() {
        //Alert that email for recover password was sent
        if (this.state.isPressed == true) {
            Alert.alert(
                'Recuperação de Senha',
                'O pedido foi enviado para o seu email',
                [{ text: 'OK', onPress: () => this.setState({ isPressed: false }) }],
                { cancelable: false }
            );
        }

        return (
            <View style={styles.container}>
                <DialogInput
                    isDialogVisible={this.state.isEditingName}
                    title={'Editar nome'}
                    hintInput={this.state.name}
                    closeDialog={() => {
                        this.setState({ isEditingName: false });
                    }}
                    submitInput={this.changeName}
                ></DialogInput>
                {/*Screen Header Information */}
                <Header
                    backgroundColor="#1e272e"
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{
                        text: 'Atualizar Perfil',
                        style: { color: '#fff' }
                    }}
                />

                {/*Card with User main information */}
                <Card containerStyle={{ backgroundColor: '#3b5998', borderRadius: 20 }}>
                    {/*Touchable Highlight for setting profile picture */}
                    <Card.Title
                        style={{
                            fontSize: 18,
                            color: '#ffffff'
                        }}
                    >
                        Informação Pessoal
                    </Card.Title>
                    <View style={styles.inputContainerPhoto}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 20 }}
                            source={{
                                uri:
                                    this.auth.currentUser.photoURL ||
                                    'https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg'
                            }}
                        />
                    </View>
                    {/*User main information */}
                    <View style={{ paddingTop: 15 }}>
                        <Text style={styles.textInfo}>Nome: {this.state.name}</Text>
                        <View style={{ flexDirection: 'row-reverse', height: 30 }}>
                            <TouchableHighlight
                                style={[styles.editButtonContainer, styles.recoverButton]}
                                onPress={() => this.setState({ isEditingName: true })}
                            >
                                <Text style={styles.recoverText}>Editar nome</Text>
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.textInfo}>Email: {this.state.email}</Text>
                        <View style={{ flexDirection: 'row-reverse', height: 30 }}>
                            <TouchableHighlight
                                style={[styles.editButtonContainer, styles.recoverButton]}
                                onPress={() => alert('Edit email presses')}
                            >
                                <Text style={styles.recoverText}>Editar email</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Card>

                {/*Button - Recover Password */}
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.recoverButton]}
                    onPress={this.onRecoverButton.bind(this)}
                >
                    <Text style={styles.recoverText}>Trocar senha</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#3b5998'
    },
    inputContainerPhoto: {
        marginBottom: 0,
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center'
    },
    textInfo: {
        marginBottom: 5,
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff'
    },
    textPhoto: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 12,
        textAlign: 'center',
        color: '#ffffff'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        width: 250,
        borderRadius: 30
    },
    editButtonContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        width: 100,
        borderRadius: 30
    },
    recoverButton: {
        backgroundColor: '#000000'
    },
    recoverText: {
        color: 'white'
    }
});
