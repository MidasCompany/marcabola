/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';

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
  render() {
    return (
      <View style={styles.background}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            margin: '4%',
            marginBottom: '1%',
            height: hp('6%'),
            width: wp('8%'),
          }}>
          <Image
            source={MenuIcon}
            style={{height: '100%', width: '100%', resizeMode: 'stretch'}}
          />
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.roundedbox_history}>
          <Text style={styles.text}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundedbox_teams}>
          <Text style={styles.text}>Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundedbox_plane}>
          <Text style={styles.text}>Convidar</Text>
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
