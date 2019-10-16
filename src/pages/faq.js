import React, {Component} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MenuButton from '../../assets/menubuttonblack.png';

// import { Container } from './styles';

export default class FAQ extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#176337', flex: 1}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{height: hp('10%'), width: wp('15%'), margin: wp('3%')}}>
          <Image
            source={MenuButton}
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
          FAQ
        </Text>

        <ScrollView>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('QuestionPage')}
            style={styles.backgroundQuestion}>
            <Text style={styles.textQuestion}>
              Minha bola foi cancelada, o que faço?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundQuestion: {
    backgroundColor: '#378C4C',
    alignSelf: 'center',
    borderRadius: hp('3%'),
    width: wp('90%'),
    padding: hp('2%'),
    margin: hp('2%'),
  },
  textQuestion: {
    color: '#FFFFFF',
    fontSize: hp('3%'),
    textAlign: 'center',
  },
});
