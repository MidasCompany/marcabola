/**
 * @format
 */
if(__DEV__) {
    import('./src/configs/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import {AppRegistry} from 'react-native';
import App from './src/';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
