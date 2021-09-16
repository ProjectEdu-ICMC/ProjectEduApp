import React from 'react';
import { View, Switch, StyleSheet, Text, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Header } from 'react-native-elements';

export default class Alarm extends React.Component {
  state = {
    isEnabled: null
  };

  //Receives user information about notification
  componentDidMount() {
    Notifications.getAllScheduledNotificationsAsync().then((res) => {
      if (res.length > 0) this.setState({ isEnabled: true });
    });
  }

  //Enable notifications for the app
  //Schedule a daily notification
  enable = async () => {
    await this.registerForPushNotificationsAsync()
      .then((res) => {
        this.setState({ isEnabled: true });
        const localNotification = {
          title: 'Notificação Diária',
          body: 'Vamos estudar gestão de projetos!',
          sound: true
        };
        const schedulingOptions = {
          hour: 15,
          minute: 0,
          repeats: true
        };
        Notifications.scheduleNotificationAsync({
          content: localNotification,
          trigger: schedulingOptions
        }).catch((err) => console.error(err));
      })
      .catch((error) => {
        console.log('error ', error);
        Alert.alert(error.message);
      });
  };

  //Disabe notifications for the app
  //Cancel all the scheduled notifications
  disable = async () => {
    Notifications.cancelAllScheduledNotificationsAsync()
      .then((res) => {
        this.setState({ isEnabled: false });
      })
      .catch((error) => {
        console.log('error ', error);
        Alert.alert(error.message);
      });
  };
  toggleSwitch(value) {
    if (value === true) {
      this.enable();
    } else {
      this.disable();
    }
  }

  //Receives information about the device
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/*Renders a Switch for the notifications */}
        <Header
          backgroundColor="#1e272e"
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => this.props.navigation.goBack()
          }}
          centerComponent={{ text: 'Notificações', style: { color: '#fff' } }}
        />

        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Ativar Notificações</Text>
          <View style={styles.toolbarButton}>
            <Switch
              value={this.state.isEnabled}
              onValueChange={(val) => this.toggleSwitch(val)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  toolbarButton: {
    width: 50,
    marginTop: 8
  },
  toolbarTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    marginTop: 6
  },
  toolbar: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row'
  }
});
