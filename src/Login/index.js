import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import RecoverScreen from './Recover';

const Stack = createStackNavigator();

function LoginStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false
                }} 
                initialRouteName="SignInScreen"
            >
                <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                />
                <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                />
                <Stack.Screen
                    name="RecoverScreen"
                    component={RecoverScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoginStack;
