import React, { useState } from 'react';
import LoginScreen from './Login';
import AppScreen from './Screens';
import LoadingScreen from './Loading';

import * as firebase from 'firebase';

function Switch(props) {
    const [screen, setScreen] = useState('loading');
    console.log(screen);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setScreen('app');
        } else {
            setScreen('login');
        }
    });

    if (screen === 'app') return <AppScreen />;

    if (screen === 'login') return <LoginScreen />;

    return <LoadingScreen />;
}

export default Switch;
