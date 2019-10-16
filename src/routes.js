import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Inicial from './pages/inicial';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Profile from './pages/profile';
import FAQ from './pages/faq';
import Question from './pages/question';
import Arenas from './pages/arenas';
import Arena from './pages/arena';
import Reserves from './pages/reserves';

const Routes = createAppContainer(
  createStackNavigator(
    {
      ArenaPage: Arena,
      InicialPage: Inicial,
      RegisterPage: Register,
      LoginPage: Login,
      MainPage: Main,
      ProfilePage: Profile,
      ReservesPage: Reserves,
      ArenasPage: Arenas,
      QuestionPage: Question,
      FAQPage: FAQ,
    },
    {
      defaultNavigationOptions: {
        header: null,
      },
    },
    {
      initialRouteName: 'InitialPage',
    },
  ),
);

export default Routes;
