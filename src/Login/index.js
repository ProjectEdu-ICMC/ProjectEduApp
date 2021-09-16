import React from 'react';
//import { createStackNavigator } from 'react-navigation-stack';
//import { createAppContainer } from 'react-navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import RecoverScreen from './Recover';

const Stack = createStackNavigator();

function LoginStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="SignInScreen">
                <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    //options={{
                    //    title: 'Profile',
                    //    drawerIcon: ({ tintColor }) => (
                    //        <Icon name="home" color={tintColor} size={24} />
                    //    ),
                    //}}
                />
                <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    //options={{
                    //    title: 'Activities',
                    //    drawerIcon: ({ tintColor }) => (
                    //        <Icon name="work" color={tintColor} size={24} />
                    //    )
                    //}}
                />
                <Stack.Screen
                    name="RecoverScreen"
                    component={RecoverScreen}
                    //options={{
                    //    title: 'Achievements',
                    //    drawerIcon: ({ tintColor }) => (
                    //        <Icon name="star" color={tintColor} size={24} />
                    //    ),
                    //}}
                />
                {/*
                <Drawer.Screen
                    name="Ranking"
                    component={RankingScreen}
                    options={{
                        title: 'Ranking',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="sort" color={tintColor} size={24} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Statistics"
                    component={StatisticsScreen}
                    options={{
                        title: 'Statistics',
                        drawerIcon: ({ tintColor }) => (
                            <Icon
                                name="graphic-eq"
                                color={tintColor}
                                size={24}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: 'Settings',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="settings" color={tintColor} size={24} />
                        ),
                    }}
                />
                */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoginStack;
//Defines the navigation inside Login
//It's a stack navigator with 3 main screens
//export default createAppContainer(
//    createStackNavigator(
//        {
//            SignInScreen,
//            SignUpScreen,
//            RecoverScreen
//        },
//        {
//            initialRouteName: 'SignInScreen'
//        }
//    )
//);
