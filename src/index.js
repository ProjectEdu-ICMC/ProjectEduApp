import React, { useState } from 'react';
import LoginScreen from './Login';
import AppScreen from './Screens';
import LoadingScreen from './Loading';

import { getAuth, onAuthStateChanged } from '@firebase/auth';

function Switch({}) {
    const [screen, setScreen] = useState('loading');
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
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
