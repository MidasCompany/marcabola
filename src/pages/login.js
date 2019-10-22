/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Logo from '../../assets/logocalendario.png';

import Button from '../../assets/enterbutton.png';
import api from '../services/api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errorMessage: null,
    };
  }

  logIn = async () => {
    if (this.state.username && this.state.password) {
      try {
        const response = await api.post('api/sessions', {
          username: this.state.username,
          password: this.state.password,
        });

        console.log('Resposta', response);

        const {user, token} = response.data;
        await AsyncStorage.multiSet([
          ['@CodeApi:token', token],
          ['@CodeApi:user', JSON.stringify(user)],
        ]);

        this.props.navigation.navigate('MainPage');
      } catch (response) {
        Alert.alert('Login não efetuado.', response.data.message);
      }
    } else {
      Alert.alert('Preencha os campos, por favor.');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: '#052623', flex: 1}}>
        <>
          {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('InicialPage')}
            style={{margin: wp('5%')}}>
            <Text style={{color: '#36D25C', fontSize: hp('5%')}}>X</Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#247346',
              borderRadius: hp('100%'),
              alignSelf: 'center',
              alignItems: 'center',
              width: wp('40%'),
              height: wp('40%'),
              margin: hp('5%'),
              justifyContent: 'center',
              marginTop: hp('-10%'),
              marginBottom: hp('10%'),
            }}>
            <Image source={Logo} style={{width: '70%', height: '70%'}} />
          </View>
        </>
        <Text
          style={{color: '#36D25C', fontSize: hp('5%'), textAlign: 'center'}}>
          login
        </Text>
        <TextInput
          placeholder="usuario"
          onChangeText={username => this.setState({username})}
          value={this.state.username}
          placeholderTextColor="#36D25C"
          style={style.textInputField}
        />
        <TextInput
          placeholder="senha"
          secureTextEntry={true}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
          placeholderTextColor="#36D25C"
          style={style.textInputField}
        />
        <TouchableOpacity
          onPress={this.logIn}
          style={{
            height: '20%',
            width: '20%',
            alignSelf: 'center',
            margin: '5%',
            marginBottom: 0,
          }}>
          <Image
            source={Button}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  textInputField: {
    color: '#36D25C',
    fontSize: hp('3.2%'),
    alignSelf: 'center',
    margin: wp('1%'),
    borderBottomWidth: wp('0.5%'),
    borderBottomColor: '#C004D9',
    width: '80%',
    textAlign: 'center',
  },
});
