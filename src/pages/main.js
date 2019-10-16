import React, {Component} from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ArenasIcon from '../../assets/arenas.png';
import CheckIcon from '../../assets/check.png';
import HistoryIcon from '../../assets/history.png';
import PlaneIcon from '../../assets/plane.png';
import TeamIcon from '../../assets/team.png';
import MenuIcon from '../../assets/menubutton.png';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  logOut = async () => {
    console.log('Deslogando');
    await AsyncStorage.clear();
    this.isLogged();
  };

  isLogged = async () => {
    const token = await AsyncStorage.getItem('@CodeApi:token');
    if (!token) {
      this.props.navigation.navigate('LoginPage');
    }
  };
  componentDidUpdate() {
    this.isLogged();
  }
  componentDidMount() {
    this.isLogged();
  }

  render() {
    return (
      <View style={styles.background}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ArenasPage')}
          style={styles.roundedbox_arenas}>
          <Text style={styles.text}>Arenas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ReservesPage')}
          style={styles.roundedbox_check}>
          <Text style={styles.text}>Bolas marcadas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ProfilePage')}
          style={styles.roundedbox_history}>
          <Text style={styles.text}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('FAQPage')}
          style={styles.roundedbox_teams}>
          <Text style={styles.text}>Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logOut} style={styles.roundedbox_plane}>
          <Text style={styles.text}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#052623',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1%',
  },
  text: {
    color: '#DAF6E7',
    fontSize: hp('3.5%'),
    textAlign: 'center',
  },
  roundedbox_arenas: {
    justifyContent: 'center',
    borderWidth: hp('0.7%'),
    width: wp('90%'),
    height: hp('15%'),
    margin: hp('1%'),
    borderRadius: hp('3.5%'),
    borderColor: '#4F0259',
  },
  roundedbox_check: {
    justifyContent: 'center',
    borderWidth: hp('0.7%'),
    width: wp('90%'),
    height: hp('15%'),
    margin: hp('1%'),
    borderRadius: hp('3.5%'),
    borderColor: '#247346',
  },
  roundedbox_history: {
    justifyContent: 'center',
    borderWidth: hp('0.7%'),
    width: wp('90%'),
    height: hp('15%'),
    margin: hp('1%'),
    borderRadius: hp('3.5%'),
    borderColor: '#7C038C',
  },
  roundedbox_teams: {
    justifyContent: 'center',
    borderWidth: hp('0.7%'),
    width: wp('90%'),
    height: hp('15%'),
    margin: hp('1%'),
    borderRadius: hp('3.5%'),
    borderColor: '#247346',
  },
  roundedbox_plane: {
    justifyContent: 'center',
    borderWidth: hp('0.7%'),
    width: wp('90%'),
    height: hp('15%'),
    margin: hp('1%'),
    borderRadius: hp('3.5%'),
    borderColor: '#7C038C',
  },
  icons: {
    height: '80%',
    width: '20%',
    resizeMode: 'center',
  },
});
