import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Inicial from './pages/inicial';
import Login from './pages/login';
import Register from './pages/register';

const Routes = createAppContainer(
    createStackNavigator({
        RegisterPage: Register,
        LoginPage: Login,
        InicialPage: Inicial,
        
    }, {
        defaultNavigationOptions:{
            header: null,
        }
    },
    {
        initialRouteName: "InitialPage"
    })
);

export default Routes;