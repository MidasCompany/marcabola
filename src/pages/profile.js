/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import {format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../services/api';

import BackButton from '../../assets/leftarrow.png';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      surname: null,
      email: null,
      cpf: null,
      phone: null,
      birthdate: null,
      username: null,
    };
  }
  isLogged = async () => {
    const token = await AsyncStorage.getItem('@CodeApi:token');
    console.log(token);
    if (!token) {
      this.props.navigation.navigate('LoginPage');
    }
  };

  listData = async () => {
    try {
      const token = await AsyncStorage.getItem('@CodeApi:token');
      const infos = await api.get('/api/user', null, {
        headers: {Authorization: `BEARER ${token}`},
      });
      const date = parseISO(infos.data.birthdate);
      const formateddate = format(date, "dd 'de' MMMM' de 'yyyy'", {
        locale: ptBR,
      });
      this.setState({
        name: infos.data.name,
        surname: infos.data.surname,
        email: infos.data.email,
        cpf: infos.data.cpf,
        phone: infos.data.phone,
        birthdate: formateddate,
        username: infos.data.username,
      });
    } catch (response) {
      console.log('Erro: ', response);
      this.isLogged();
    }
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

  UNSAFE_componentWillMount() {
    this.listData();
  }

  render() {
    return (
      <View style={{backgroundColor: '#052623', flex: 1}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
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
          <ScrollView>
            <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
              <Text style={styles.userTitle}>@{this.state.username}</Text>
            </View>

            <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
              <Text style={styles.proptext}>Nome</Text>
              <Text style={styles.usertext}>{this.state.name}</Text>
            </View>

            <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
              <Text style={styles.proptext}>Sobrenome</Text>
              <Text style={styles.usertext}>{this.state.surname}</Text>
            </View>

            <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
              <Text style={styles.proptext}>Telefone</Text>
              <Text style={styles.usertext}>{this.state.phone}</Text>
            </View>

            <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
              <Text style={styles.proptext}>E-mail</Text>
              <Text style={styles.usertext}>{this.state.email}</Text>
            </View>

            <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
              <Text style={styles.proptext}>Data de nascimento</Text>
              <Text style={styles.usertext}>{this.state.birthdate}</Text>
            </View>

            <View style={{marginBottom: wp('3%'), marginTop: wp('3%')}}>
              <Text style={styles.proptext}>CPF</Text>
              <Text style={styles.usertext}>{this.state.cpf}</Text>
            </View>
          </ScrollView>
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
  userTitle: {
    color: '#FFFFFF',
    fontSize: hp('4%'),
    textAlign: 'center',
  },
  passwordtext: {
    color: '#FFFFFF',
    fontSize: hp('3%'),
    textAlign: 'center',
  },
});
