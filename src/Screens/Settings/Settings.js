import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { getAuth, signOut } from '@firebase/auth';

class Settings extends React.Component {
  //Hides the Header
  //It's created manually
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      listSettings: [
        {
          title: 'Sobre',
          icon: 'info'
        },
        {
          title: 'Ajuda',
          icon: 'search'
        },
        {
          title: 'Atualizar Perfil',
          icon: 'refresh'
        },
        {
          title: 'Notificações',
          icon: 'call'
        },
        {
          title: 'Sair do App',
          icon: 'pause'
        }
      ]
    };

    this.auth =  getAuth();
  }

  //Function for Logging out the user
  async OnLogout() {
    try {
      await signOut(this.auth);
      console.log('Logged Out!');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const list = this.state.listSettings;

    return (
      <View>
        {/*Screen Header Information */}
        <Header
          backgroundColor="#1e272e"
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer()
          }}
          centerComponent={{ text: 'Configurações', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'portrait',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('Perfil')
          }}
        />
        {/*Renders the settings list */}
        {list.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider={true}
            chevron={true}
            leftIcon={{
              name: l.icon
            }}
            onPress={function () {
              if (l.title == 'Sobre') {
                this.props.navigation.navigate('Info');
              }
              if (l.title == 'Ajuda') {
                this.props.navigation.navigate('Help');
              }
              if (l.title == 'Atualizar Perfil') {
                this.props.navigation.navigate('UpdateProfile');
              }
              if (l.title == 'Notificações') {
                this.props.navigation.navigate('Notification');
              }
              if (l.title == 'Sair do App') {
                this.OnLogout();
              }
            }.bind(this)}
          >
            <ListItem.Title>{l.title}</ListItem.Title>
          </ListItem>
        ))}
      </View>
    );
  }
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 400,
    height: 100,
    alignSelf: 'center',
    alignContent: 'center'
  }
});
