import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Inicial from './pages/inicial';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Profile from './pages/profile';
import FAQ from './pages/faq';
import Question from './pages/question';
import Arenas from './pages/arenas';
import Arena from './pages/arena';


const Routes = createAppContainer(
    createStackNavigator({
        ArenaPage: Arena,
        ArenasPage: Arenas,
        QuestionPage: Question,
        FAQPage: FAQ,
        ProfilePage: Profile,
        MainPage: Main,
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