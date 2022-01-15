import React from 'react';
import SwitchNavigator from './src';

import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './secret';

initializeApp(firebaseConfig);

export default class App extends React.Component {
    render() {
        return <SwitchNavigator />;
    }
}