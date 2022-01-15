import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from './Settings';
import HelpScreen from './Help';
import UpdateProfileScreen from './Update';
import InfoScreen from './Info';
import NotificationScreen from './Notifications';

const Stack = createStackNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MainSettings" component={SettingsScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  );
}

export default SettingsStack;
