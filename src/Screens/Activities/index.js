import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ModulesScreen from './Modules';
import TopicsScreen from './Topics';
import SlidesScreen from './Slides';
import RankingScreen from './Ranking';

const Stack = createStackNavigator();

function ActivitiesStack() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }} 
        >
            <Stack.Screen name="Modules" component={ModulesScreen} />
            <Stack.Screen name="Topics" component={TopicsScreen} />
            <Stack.Screen name="Slides" component={SlidesScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
        </Stack.Navigator>
    );
}

export default ActivitiesStack;
