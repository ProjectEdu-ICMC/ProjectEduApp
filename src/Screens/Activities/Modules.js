import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Card, Button, Header } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import * as firebase from 'firebase';

function Modules() {
    const navigation = useNavigation();
    const [modules, setModules] = useState(undefined);
    const [searchModules, setSearchModules] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const { register, handleSubmit, errors, setValue, getValues } = useForm();

    useEffect(() => {
        const fetch = async () => {
            const user = firebase.auth().currentUser;
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
    }, [register, setModules, axios]);

    const makeSearch = async ({ search }) => {
        if (search === undefined || search === '') return;

        setFetching(true);
        axios
            .get(`http://192.168.0.29:8000/module/${search}`)
            .then((res) => {
                console.log(res.data);
                setSearchModules(res.data);
                setFetching(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const subscribe = async (module) => {
        setFetching(true);
        const user = firebase.auth().currentUser;
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
                console.log(res.data);
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
              <Card key={mod.id}>
                  <Card.Image
                      placeholderStyle={{ backgroundColor: '#03a9f4' }}
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
                          backgroundColor="#03A9F4"
                          buttonStyle={{
                              borderRadius: 0,
                              marginLeft: 0,
                              marginRight: 0,
                              marginBottom: 0
                          }}
                          title="Visualizar"
                      />
                  </Card.Image>
              </Card>
          ))
        : null;

    const searchCards = searchModules?.length
        ? searchModules.map((mod, index) => (
              <Card key={mod.id}>
                  <Card.Image
                      placeholderStyle={{ backgroundColor: '#03a9f4' }}
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
                          backgroundColor="#03A9F4"
                          buttonStyle={{
                              borderRadius: 0,
                              marginLeft: 0,
                              marginRight: 0,
                              marginBottom: 0
                          }}
                          title="Se inscrever"
                      />
                  </Card.Image>
              </Card>
          ))
        : null;
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
                    <Button
                        disabled={fetching}
                        onPress={handleSubmit(makeSearch)}
                        title="Ir"
                    />
                </View>

                {searchCards ? searchCards : subscribedCards}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    singleLineInput: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 3,
        flexGrow: 1
    },
    scrollBox: {
        marginBottom: 80
    },
    searchView: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        flex: 1
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
        flex: 1
    },
    cardImage: {
        padding: 10
    },
    cardButton: {
        backgroundColor: '#eae2b7'
    }
});

export default Modules;
