/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Logo from '../../assets/logocalendario.png';
import api from '../services/api';
import Button from '../../assets/enterbuttonup.png';

export default class Register extends Component {
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
      password: null,
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

  register = async () => {
    if (!this.state.name) {
      return Alert.alert('Você precisa preencher o campo de nome.');
    }
    if (!this.state.surname) {
      return Alert.alert('Você precisa preencher o campo de sobrenome.');
    }
    if (!this.state.email) {
      return Alert.alert('Você precisa preencher o campo de e-mail.');
    }
    if (!this.state.cpf) {
      return Alert.alert('Você precisa preencher o campo de cpf.');
    }
    if (!this.state.phone) {
      return Alert.alert('Você precisa preencher o campo de telefone.');
    }
    if (!this.state.birthdate) {
      return Alert.alert(
        'Você precisa preencher o campo de data de nascimento.',
      );
    }
    if (!this.state.username) {
      return Alert.alert('Você precisa preencher o campo de nome de usuário.');
    }

    if (!this.state.password) {
      return Alert.alert('Você precisa preencher o campo de senha.');
    }

    try {
      const datas = {
        email: this.state.email,
        cpf: this.state.cpf,
        name: this.state.name,
        surname: this.state.surname,
        username: this.state.username,
        password: this.state.password,
        phone: this.state.phone,
        birthdate: this.state.birthdate,
      };
      console.log(datas);
      const response = await api.post('api/user', datas);
      console.log(response);
      Alert.alert('Parabéns', 'Você conseguiu se cadastrar! :)', [
        {text: 'Que legal!', onPress: () => this.logIn()},
      ]);
    } catch (response) {
      console.log(response);
      Alert.alert(response.data.message);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: '#052623', flex: 1}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{margin: wp('5%'), position: 'absolute'}}>
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
            marginBottom: hp('2%'),
          }}>
          <Image source={Logo} style={{width: '70%', height: '70%'}} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            width: '90%',
            height: '70%',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: wp('10%'),
          }}>
          <Text
            style={{
              color: '#36D25C',
              fontSize: hp('3.5%'),
              textAlign: 'center',
              padding: '2%',
            }}>
            Cadastro
          </Text>
          <TextInput
            placeholder="nome"
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />
          <TextInput
            placeholder="sobrenome"
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={surname => this.setState({surname})}
            value={this.state.surname}
          />
          <TextInput
            placeholder="e-mail"
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            placeholder="cpf"
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={cpf => this.setState({cpf})}
            value={this.state.cpf}
          />
          <TextInput
            placeholder="telefone"
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={phone => this.setState({phone})}
            value={this.state.phone}
          />
          <TextInput
            placeholder="data de nasc."
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={birthdate => this.setState({birthdate})}
            value={this.state.birthdate}
          />
          <TextInput
            placeholder="nome de usuario"
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={username => this.setState({username})}
            value={this.state.username}
          />
          <TextInput
            placeholder="senha"
            placeholderTextColor="#36D25C"
            style={styles.textfield}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
          />
          <TouchableOpacity
            onPress={this.register}
            style={{
              height: '20%',
              width: '20%',
              alignSelf: 'center',
              margin: '3%',
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
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textfield: {
    color: '#36D25C',
    fontSize: hp('2.5%'),
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#C004D9',
    width: '80%',
    textAlign: 'center',
  },
});
