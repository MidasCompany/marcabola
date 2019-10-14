import React, {Component} from 'react';

import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BackButton from '../../assets/leftarrow.png';
// import { Container } from './styles';

export default class Profile extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#052623', flex: 1}}>
        <TouchableOpacity
          style={{height: hp('10%'), width: wp('20%'), margin: wp('3%')}}>
          <Image
            source={BackButton}
            style={{height: '50%', width: '50%', resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#36D25C',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: hp('4%'),
            margin: wp('3%'),
            position: 'absolute',
          }}>
          Perfil
        </Text>

        <View
          style={{
            padding: wp('3%'),
            width: wp('100%'),
            backgroundColor: '#4F0259',
            height: hp('100%'),
            justifyContent: 'center',
          }}>
          <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
            <Text style={styles.proptext}>Nome</Text>
            <Text style={styles.usertext}>Donquixote</Text>
          </View>

          <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
            <Text style={styles.proptext}>Sobrenome</Text>
            <Text style={styles.usertext}>Donflamingo</Text>
          </View>

          <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
            <Text style={styles.proptext}>E-mail</Text>
            <Text style={styles.usertext}>doflamingo@gmail.com</Text>
          </View>

          <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
            <Text style={styles.proptext}>Data de nascimento</Text>
            <Text style={styles.usertext}>11/03/1990</Text>
          </View>

          <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
            <Text style={styles.proptext}>CPF</Text>
            <Text style={styles.usertext}>182.321.123-69</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#052623',
              alignSelf: 'center',
              padding: wp('5%'),
              borderRadius: wp('100%'),
            }}>
            <Text style={styles.passwordtext}>Mudar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proptext: {
    color: '#07A24A',
    fontSize: hp('2.5%'),
  },
  usertext: {
    color: '#FFFFFF',
    fontSize: hp('3%'),
  },
  passwordtext: {
    color: '#FFFFFF',
    fontSize: hp('3%'),
    textAlign: 'center',
  },
});
