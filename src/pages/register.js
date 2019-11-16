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
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Yup from 'yup';
import {TextInputMask} from 'react-native-masked-text';
import DatePicker from 'react-native-date-picker';
import {format, subYears, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
      formPage: 1,
      date: new Date(),
    };
  }

  logIn = async () => {
    Keyboard.dismiss();
    if (this.state.username && this.state.password) {
      try {
        const response = await api.post('api/sessions', {
          username: this.state.username,
          password: this.state.password,
        });
        const {user, token} = response.data;
        await AsyncStorage.multiSet([
          ['@CodeApi:token', token],
          ['@CodeApi:user', JSON.stringify(user)],
        ]);

        this.props.navigation.navigate('MainPage');
      } catch (response) {
        if (!response.data) {
          Alert.alert(
            'Servidor está indisponível no momento, tente novamente mais tarde.',
          );
        } else {
          Alert.alert('Login não efetuado.', response.data.message);
        }
      }
    } else {
      Alert.alert('Preencha os campos, por favor.');
    }
  };

  formatedDate = () => {
    const formatedDate = format(
      this.state.birthdate,
      "dd 'de' MMMM' de 'yyyy'",
      {
        locale: ptBR,
      },
    );
    return formatedDate;
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
      Alert.alert(
        'Não estamos conseguindo nos comunicar com nossos servidores :(',
      );
    }
  };

  firstForm = () => {
    return (
      <View>
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
        <TextInputMask
          placeholder="cpf"
          placeholderTextColor="#36D25C"
          style={styles.textfield}
          type={'cpf'}
          value={this.state.cpf}
          onChangeText={text => {
            this.setState({
              cpf: text,
            });
          }}
        />
      </View>
    );
  };

  secondForm = () => {
    return (
      <View>
        <Text style={styles.textfield}>Data de nascimento</Text>
        <DatePicker
          date={this.state.date}
          maximumDate={subYears(parseISO(format(new Date(), 'yyyy-MM-dd')), 18)}
          fadeToColor={'none'}
          style={{
            backgroundColor: 'none',
            border: 'none',
            alignSelf: 'center',
          }}
          textColor={'#36D25C'}
          mode={'date'}
          locale={'pt_BR'}
          onDateChange={this.handleDate}
        />
        {this.state.birthdate ? (
          <Text style={styles.textfieldbigger}>{this.formatedDate()}</Text>
        ) : null}
      </View>
    );
  };

  thirdForm = () => {
    return (
      <View>
        <TextInputMask
          placeholder="telefone"
          placeholderTextColor="#36D25C"
          style={styles.textfield}
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          value={this.state.phone}
          onChangeText={text => {
            this.setState({
              phone: text,
            });
          }}
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
          secureTextEntry={true}
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
    );
  };

  handleDate = date => {
    //const _date = format(date, 'yyyy-dd-MM');
    this.setState({birthdate: date});
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-90}
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
        <Text
          style={{
            color: '#36D25C',
            fontSize: hp('3.5%'),
            textAlign: 'center',
            padding: '2%',
          }}>
          Cadastro
        </Text>
        {this.state.formPage === 1
          ? this.firstForm()
          : this.state.formPage === 2
          ? this.secondForm()
          : this.thirdForm()}

        <View>
          {this.state.formPage === 1 ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({formPage: this.state.formPage + 1});
              }}>
              <Text
                style={{
                  fontSize: wp('15%'),
                  alignSelf: 'center',
                  color: '#36D25C',
                }}>
                >
              </Text>
            </TouchableOpacity>
          ) : null}

          {this.state.formPage === 2 ? (
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({formPage: this.state.formPage - 1});
                }}>
                <Text
                  style={{
                    fontSize: wp('15%'),
                    alignSelf: 'center',
                    color: '#36D25C',
                  }}>
                  {'<'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({formPage: this.state.formPage + 1});
                }}>
                <Text
                  style={{
                    fontSize: wp('15%'),
                    alignSelf: 'center',
                    color: '#36D25C',
                  }}>
                  >
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {this.state.formPage === 3 ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({formPage: this.state.formPage - 1});
              }}>
              <Text
                style={{
                  fontSize: wp('15%'),
                  alignSelf: 'center',
                  color: '#36D25C',
                }}>
                {'<'}
              </Text>
            </TouchableOpacity>
          ) : null}
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
  textfieldbigger: {
    color: '#36D25C',
    fontSize: hp('4%'),
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center',
  },
});
