import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ActivitiesScreen from './Activities';
import PerfilScreen from './Perfil';
import RankingScreen from './Ranking';
import SettingsScreen from './Settings';
import StatisticsScreen from './Statistics';
import AchievementScreen from './Achievements';

import { Icon } from 'react-native-elements';

const Drawer = createDrawerNavigator();

function AppDrawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                screenOptions={{
                    headerShown: false
                }} 
                initialRouteName="Activities"
            >
                <Drawer.Screen
                    name="Perfil"
                    component={PerfilScreen}
                    options={{
                        title: 'Perfil',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="home" color={tintColor} size={24} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Activities"
                    component={ActivitiesScreen}
                    options={{
                        title: 'Atividades',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="work" color={tintColor} size={24} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Achievements"
                    component={AchievementScreen}
                    options={{
                        title: 'Conquistas',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="star" color={tintColor} size={24} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Ranking"
                    component={RankingScreen}
                    options={{
                        title: 'Ranking',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="sort" color={tintColor} size={24} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Statistics"
                    component={StatisticsScreen}
                    options={{
                        title: 'Estatísticas',
                        drawerIcon: ({ tintColor }) => (
                            <Icon
                                name="graphic-eq"
                                color={tintColor}
                                size={24}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: 'Configurações',
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="settings" color={tintColor} size={24} />
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default AppDrawer;
