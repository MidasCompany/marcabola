import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Logo from '../../assets/logocalendario.png';

export default class Inicial extends Component {
  constructor(props) {
    super(props);
    //this.state = {isLoading: true}
  }
  isLogged = async () => {
    console.log(await AsyncStorage.getAllKeys());
    const token = await AsyncStorage.getItem('@CodeApi:token');
    if (token) {
      this.props.navigation.navigate('MainPage');
    }
  };

  componentDidMount() {
    console.log('DidMount');
    this.isLogged();
  }

  render() {
    return (
      <View style={{backgroundColor: '#052623', flex: 1}}>
        <View
          style={{
            backgroundColor: '#247346',
            borderRadius: hp('100%'),
            alignSelf: 'center',
            alignItems: 'center',
            width: wp('40%'),
            height: wp('40%'),
            justifyContent: 'center',
            marginTop: hp('5%'),
            marginBottom: hp('10%'),
          }}>
          <Image
            source={Logo}
            style={{height: '50%', width: '70%', height: '70%'}}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginPage')}
            style={{
              width: wp('90%'),
              padding: wp('10%'),
              borderColor: '#40A640',
              borderWidth: 1,
              borderTopRightRadius: hp('20%'),
              borderLeftWidth: 0,
              borderBottomRightRadius: hp('20%'),
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                color: '#36D25C',
                fontSize: hp('5%'),
                textAlign: 'center',
              }}>
              login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('RegisterPage')}
            style={{
              width: wp('90%'),
              padding: wp('10%'),
              borderColor: '#40A640',
              borderWidth: 1,
              borderTopLeftRadius: hp('20%'),
              borderRightWidth: 0,
              borderBottomLeftRadius: hp('20%'),
              alignSelf: 'flex-end',
              marginTop: hp('5%'),
            }}>
            <Text
              style={{
                color: '#36D25C',
                fontSize: hp('5%'),
                textAlign: 'center',
              }}>
              cadastro
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
