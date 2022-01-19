import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Swiper from 'react-native-swiper';
import { Icon, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Help() {
    const navigation = useNavigation();
    //Renders a swiper describing the mains componentes of the app
    return (
        <Swiper 
            style={styles.wrapper} 
            showsButtons={false} 
            autoplay={true}
            dot={
                <View style={styles.scroll}>
                    <View style={styles.dot} />
                </View>
            } 
            activeDot={
                <View style={styles.scroll}>
                    <View style={[styles.dot, {backgroundColor: '#40739e'}]} />
                </View>
            }
        >
            <View style={styles.slide1}>
                <Header
                    backgroundColor="#1e272e"
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => navigation.goBack()
                    }}
                    centerComponent={{ text: 'Atividades', style: { color: '#fff' } }}
                    containerStyle={{borderBottomWidth: 0}}
                />
                <View style={styles.boxContainer}>
                    <View style={styles.box}>
                        <Icon color="#222" name="work" size={200} />
                        <Text style={styles.text}>Atividades</Text>
                        <Text style={styles.text1}>
                            Módulos de conteúdos e suas respectivas atividades
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.slide2}>
                <Header
                    backgroundColor="#1e272e"
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => navigation.goBack()
                    }}
                    centerComponent={{ text: 'Ranking', style: { color: '#fff' } }}
                    containerStyle={{borderBottomWidth: 0}}
                />
                <View style={styles.boxContainer}>
                    <View style={styles.box}>
                        <Icon color="#222" name="sort" size={200} />
                        <Text style={styles.text}>Ranking</Text>
                        <Text style={styles.text1}>
                            Mostra um ranking com as melhores pontuações obtidas
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.slide3}>
                <Header
                    backgroundColor="#1e272e"
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => navigation.goBack()
                    }}
                    centerComponent={{ text: 'Estatísticas', style: { color: '#fff' } }}
                    containerStyle={{borderBottomWidth: 0}}
                />
                <View style={styles.boxContainer}>
                    <View style={styles.box}>
                        <Icon color="#222" name="graphic-eq" size={200} />
                        <Text style={styles.text}>Estatísticas</Text>
                        <Text style={styles.text1}>
                            Mostra a evolução diária de cada usuário
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.slide4}>
                <Header
                    backgroundColor="#1e272e"
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => navigation.goBack()
                    }}
                    centerComponent={{
                        text: 'Configurações',
                        style: { color: '#fff' }
                    }}
                    containerStyle={{borderBottomWidth: 0}}
                />
                <View style={styles.boxContainer}>
                    <View style={styles.box}>
                        <Icon color="#222" name="settings" size={200} />
                        <Text style={styles.text}>Configurações</Text>
                        <Text style={styles.text1}>
                            Mostram as configurações principais do App
                        </Text>
                    </View>
                </View>
            </View>
        </Swiper>
    );
    
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
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    text1: {
        textAlign: 'center',
        color: '#000',
        fontSize: 15,
        fontWeight: 'normal',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20
    },
    scroll: {
        height: 16,
        width: 20,
        marginLeft: -3,
        marginRight: -3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: '#00000066',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    }, 
    dot: {
        height: 8,
        width: 8,
        backgroundColor: '#aaa',
        borderRadius: 4,
    },
    boxContainer: {
        justifyContent: 'center', 
        alignSelf: 'stretch', 
        flex: 1
    },
    box: {
        marginBottom: 10,
        padding: 30,
        borderRadius: 10,
        marginHorizontal: 40,
        backgroundColor: '#fff',
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        alignItems: 'center',
    },
});
