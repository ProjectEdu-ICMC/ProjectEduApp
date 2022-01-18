import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Card, Button, Header } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { getAuth } from '@firebase/auth';
import { Icon } from 'react-native-elements';

function Modules() {
    const navigation = useNavigation();
    const [modules, setModules] = useState(undefined);
    const [searchModules, setSearchModules] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const { register, handleSubmit, errors, setValue, getValues } = useForm();

    const auth = getAuth();

    useEffect(() => {
        const fetch = async () => {
            const user = auth.currentUser;
            const token = await user?.getIdToken();

            if (!token) {
                setFetching(false);
                return;
            }
            axios
                .get('http://192.168.0.29:8000/module', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    setModules(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        register('search');
        fetch();
    }, []);

    const makeSearch = async ({ search }) => {
        if (search === undefined || search === '') {
            setSearchModules(undefined);
            return;
        }

        setFetching(true);
        axios
            .get(`http://192.168.0.29:8000/module/${search}`)
            .then((res) => {
                setSearchModules(res.data);
                setFetching(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const subscribe = async (module) => {
        setFetching(true);
        const user = auth.currentUser;
        const token = await user?.getIdToken();

        if (!token) {
            setFetching(false);
            return;
        }

        axios
            .post(
                `http://192.168.0.29:8000/module/${module}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((res) => {
                setSearchModules(undefined);
                setModules(res.data);
                setFetching(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const subscribedCards = modules?.length
        ? modules.map((mod, index) => (
              <Card containerStyle={styles.card} wrapperStyle={{elevation: 0}} key={mod.id}>
                  <Card.Image
                      placeholderStyle={{ backgroundColor: `#${Math.floor(Math.random() * 16777216).toString(16)}` }}
                      style={styles.cardImage}
                      source={{ uri: mod.image ? mod.image : 'a' }}
                  >
                      <View style={styles.titleWrapper}>
                          <Card.Title style={styles.cardTitle}>
                              {mod.name}
                          </Card.Title>
                      </View>
                      <Button
                          type="solid"
                          onPress={() => {
                              navigation.navigate('Topics', {
                                  mod: mod.id,
                                  modName: mod.name
                              });
                          }}
                          buttonStyle={styles.cardButton}
                          title="Visualizar"
                      />
                  </Card.Image>
              </Card>
          ))
        : 
        <View style={styles.container}>
            <Text style={styles.emptyText}>
                Sem módulos
            </Text>
        </View>;

    const cancelSearch = () => {
        setValue('search', '');
        setSearchModules(undefined);
    }

    const searchCards = searchModules?.length
        ? searchModules.map((mod, index) => (
            <Card containerStyle={styles.card} wrapperStyle={{elevation: 0}} key={mod.id}>
                <Card.Image
                    placeholderStyle={{ backgroundColor: `#${Math.floor(Math.random() * 16777216).toString(16)}` }}
                    style={styles.cardImage}
                    source={{ uri: mod.image ? mod.image : 'a' }}
                >
                    <View style={styles.titleWrapper}>
                        <Card.Title style={styles.cardTitle}>
                            {mod.name}
                        </Card.Title>
                    </View>
                    <Button
                        type="solid"
                        onPress={() => subscribe(mod.id)}
                        buttonStyle={styles.cardButton}
                        title="Se inscrever"
                    />
                </Card.Image>
            </Card>
          ))
        : 
        <View style={styles.container}>
            <Text style={styles.emptyText}>
                Sem resultados
            </Text>
        </View>;

    return (
        <View>
            <Header
                backgroundColor="#1e272e"
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                    onPress: () => navigation.openDrawer()
                }}
                centerComponent={{
                    text: 'Atividades',
                    style: { color: '#fff' }
                }}
                rightComponent={{
                    icon: 'portrait',
                    color: '#fff',
                    onPress: () => navigation.navigate('Perfil')
                }}
                containerStyle={{borderBottomWidth: 0}}
            />
            <ScrollView style={styles.scrollBox}>
                <View style={styles.searchView}>
                    <TextInput
                        defaultValue={getValues('search')}
                        placeholder="Módulo"
                        style={styles.singleLineInput}
                        onChangeText={(text) => {
                            setValue('search', text);
                        }}
                    />
                    {searchModules !== undefined ?
                    <Button
                        disabled={fetching}
                        onPress={cancelSearch}
                        buttonStyle={styles.cancelButton}
                        icon={<Icon name="close" color='#fff'/>}
                    />
                    :
                    <Button
                        disabled={fetching}
                        onPress={handleSubmit(makeSearch)}
                        buttonStyle={styles.submitButton}
                        title="Ir"
                    />                    
                    }
                </View>

                {searchModules !== undefined ? searchCards : subscribedCards}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    singleLineInput: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        flexGrow: 1
    },    
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    scrollBox: {
        marginBottom: 80
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: '#40739e',
        padding: 15,
    },
    cardTitle: {
        fontSize: 20,
        color: 'white'
    },
    titleWrapper: {
        backgroundColor: '#33333388',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardImage: {
        padding: 10,
        borderRadius: 10,
    },
    cardButton: {
        backgroundColor: '#40739e',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    submitButton: {
        borderRadius: 5,
        backgroundColor: '#6a6',
        alignSelf: 'stretch',
        flexGrow: 1,
        paddingHorizontal: 20,
        marginLeft: 10
    },    
    cancelButton: {
        borderRadius: 5,
        backgroundColor: '#d66',
        alignSelf: 'stretch',
        flexGrow: 1,
        paddingHorizontal: 20,
        marginLeft: 10
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        borderWidth: 0,
        borderRadius: 10
    }
});

export default Modules;
