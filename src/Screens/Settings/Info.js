import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Header } from 'react-native-elements';

class Info extends React.Component {
    render() {
        return (
            <View>
                <Header
                    backgroundColor="#1e272e"
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{
                        text: 'Sobre',
                        style: { color: '#fff' }
                    }}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <View>
                        <Text style={styles.textTitle}>
                            Mais sobre o ProjectEdu
                        </Text>

                        <Text style={styles.textInfo}>
                            ProjectEdu é um protótipo de aplicação de
                            aprendizado móvel focado em usuários que querem
                            aprender Gestão de Projetos de Software. Muitas
                            aplicações móveis podem ser encontradas para
                            realizar a gestão das atividades durante o projeto,
                            mas o ProjectEdu se destaca por focar no ensino da
                            teoria sobre Gestão de projetos, bem como sua
                            prática.
                        </Text>
                        <Text style={styles.textInfo}>
                            ProjectEdu está na sua versão protótipo, sendo
                            desenvolvido utilizando a framework React Native.
                        </Text>
                        <Text style={styles.textInfo}>
                            Na sua versão atual, ProjectEdu tem as seguintes
                            funcionalidades:
                        </Text>

                        <Card>
                            <Card.Title> Atividades </Card.Title>
                            <Card.Image
                                source={{
                                    uri:
                                        'https://cdn.lynda.com/course/145310/145310-636190593102969217-16x9.jpg'
                                }}
                            />
                            <Text style={styles.cardInfo}>
                                Nessa area do aplicativo, o usuário tem acesso a
                                todo o conteúdo teórico de Gestão de Projetos de
                                Software, além de algumas atividades e práticas
                                relacionadas aos tópicos.
                            </Text>
                        </Card>

                        <Card>
                            <Card.Title> Estatísticas </Card.Title>
                            <Card.Image
                                source={{
                                    uri:
                                        'https://www.siteground.com/blog/wp-content/uploads/2016/06/new-statistics.jpg'
                                }}
                            />
                            <Text style={styles.cardInfo}>
                                Essa funcionalidade permite que o usuário
                                verifique seu progresso, acessando sua pontuação
                                e verificando o quanto foi aprendido na
                                aplicação, através de dados estatísticos.
                            </Text>
                        </Card>

                        <Card>
                            <Card.Title>Ranking</Card.Title>
                            <Card.Image
                                source={{
                                    uri:
                                        'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/083ed15e981cd6003e0ba383abf061a2'
                                }}
                            />
                            <Text style={styles.cardInfo}>
                                Nessa funcionalidade o usuário consegue comparar
                                sua pontuação com a de outros usuários. Para
                                obter as pontuações o usuário deve participar
                                das atividades disponíveis no aplicativo.
                            </Text>
                        </Card>

                        <Card>
                            <Card.Title>Configurações</Card.Title>
                            <Card.Image
                                source={{
                                    uri:
                                        'https://winbusinessin.com/wp-content/uploads/2015/08/settings-copy.png'
                                }}
                            />
                            <Text style={styles.cardInfo}>
                                As configurações permitem que o usuário permita
                                notificações, atualize seu perfil, além de
                                possui explicações sobre o app.
                            </Text>
                        </Card>

                        <Text style={styles.textInfo}>
                            Apesar de algumas dessas funcionalidades serem
                            comuns em aplicativos de aprendizado móvel,
                            ProjectEdu foi projetado considerando dois artefatos
                            que visam sistematizar a criação de aplicativos de
                            Mobile Learning.
                        </Text>
                        <Text style={styles.textInfo}>
                            O processo de desenvolvimento escolhido foi
                            iterativo e incremental, com fases curtas e
                            proximidade com o público-alvo final, para que a
                            aplicação seja bem aceita por ele. Nesse sentido, as
                            funcionalidades inseridas e testadas gradualmente.
                        </Text>
                        <Text style={styles.textInfo}>
                            Na versão atual do ProjectEdu, o ReqML-Catalog guiou
                            a definição dos requisitos de aprendizado e
                            usabilidade. Como o objetivo é fornecer uma
                            abordagem mais atrativa, é importante considerar
                            aspectos como interface de usuário e usabilidade
                            para atingí-lo.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Info;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3b5998',
        alignItems: 'center',
        paddingBottom: 80
    },
    textInfo: {
        margin: 15,
        textAlign: 'center',
        fontSize: 15,
        color: '#ffffff'
    },
    textTopics: {
        margin: 15,
        textAlign: 'left',
        fontSize: 15,
        color: '#ffffff'
    },
    textTitle: {
        margin: 15,
        textAlign: 'center',
        fontSize: 40,
        color: '#ffffff'
    },
    cardInfo: {
        textAlign: 'center'
    }
});
