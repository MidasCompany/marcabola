import React from 'react';
import { StatusBar, View } from 'react-native';

import Routes from './routes';

export default function App(){
    return(
        <>
        <StatusBar barStyle="default" backgroundColor="#052623" />
        <Routes/>
        </>
    );
}