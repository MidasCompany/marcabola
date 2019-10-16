/* eslint-disable react/jsx-no-duplicate-props */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LeftArrow from '../../assets/leftarrow.png';

import xMarkTransparent from '../../assets/xMarkTransparent.png';

import warningTransparent from '../../assets/warningTransparent.png';

import checkTransparent from '../../assets/checkTransparent.png';

export default class Reserves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      dateSelected: null,
    };
  }

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
          onPress={() => this.props.navigation.goBack()}
          style={styles.leftArrowTouchable}>
          <Image source={LeftArrow} style={styles.leftArrowImage} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Bolas marcadas</Text>

        <View style={styles.backBox}>
          <ScrollView style={{flexDirection: 'column', marginTop: hp('1%')}}>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{width: '15%'}}>
                <Text style={styles.textDay}>Dia</Text>
                <Text style={styles.textData}>8</Text>
              </View>

              <View style={styles.boxReserve}>
                <View style={styles.individualBoxReserveGreen}>
                  <View style={styles.greenBackground}>
                    <Image
                      source={checkTransparent}
                      style={styles.imageStatusReserve}
                    />
                  </View>
                  <View>
                    <Text style={styles.boxReserveTitle}>
                      Futebol dos bacanas
                    </Text>
                    <Text style={styles.boxReserveHour}>11h-12h</Text>
                  </View>
                </View>

                <View style={styles.individualBoxReserveRed}>
                  <View style={styles.redBackground}>
                    <Image
                      source={xMarkTransparent}
                      style={styles.imageStatusReserve}
                    />
                  </View>
                  <View>
                    <Text style={styles.boxReserveTitle}>
                      Futebol dos bacanas
                    </Text>
                    <Text style={styles.boxReserveHour}>12h-13h</Text>
                  </View>
                </View>

                <View style={styles.individualBoxReserveOrange}>
                  <View style={styles.orangeBackGround}>
                    <Image
                      source={warningTransparent}
                      style={styles.imageStatusReserve}
                    />
                  </View>
                  <View>
                    <Text style={styles.boxReserveTitle}>
                      Futebol dos bacanas
                    </Text>
                    <Text style={styles.boxReserveHour}>15h-16h</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
              <View style={{width: '15%'}}>
                <Text style={styles.textDay}>Dia</Text>
                <Text style={styles.textData}>16</Text>
              </View>

              <View style={styles.boxReserve}>
                <View style={styles.individualBoxReserveGreen}>
                  <View style={styles.greenBackground}>
                    <Image
                      source={checkTransparent}
                      style={styles.imageStatusReserve}
                    />
                  </View>
                  <View>
                    <Text style={styles.boxReserveTitle}>
                      Futebol dos bacanas
                    </Text>
                    <Text style={styles.boxReserveHour}>11h-12h</Text>
                  </View>
                </View>

                <View style={styles.individualBoxReserveRed}>
                  <View style={styles.redBackground}>
                    <Image
                      source={xMarkTransparent}
                      style={styles.imageStatusReserve}
                    />
                  </View>
                  <View>
                    <Text style={styles.boxReserveTitle}>
                      Futebol dos bacanas
                    </Text>
                    <Text style={styles.boxReserveHour}>12h-13h</Text>
                  </View>
                </View>

                <View style={styles.individualBoxReserveOrange}>
                  <View style={styles.orangeBackGround}>
                    <Image
                      source={warningTransparent}
                      style={styles.imageStatusReserve}
                    />
                  </View>
                  <View>
                    <Text style={styles.boxReserveTitle}>
                      Futebol dos bacanas
                    </Text>
                    <Text style={styles.boxReserveHour}>15h-16h</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#052623',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  backBox: {
    backgroundColor: '#4F0259',
    height: '85%',
    width: '100%',
    borderTopLeftRadius: wp('20%'),
    borderTopRightRadius: wp('20%'),
    alignSelf: 'center',
    padding: hp('3%'),
  },
  leftArrowTouchable: {
    width: wp('20%'),
    height: hp('8%'),
  },
  leftArrowImage: {
    resizeMode: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  textTitle: {
    color: '#36D25C',
    alignItems: 'center',
    marginVertical: hp('1%'),
    fontSize: hp('3%'),
    textAlign: 'center',
  },
  boxReserve: {
    width: '85%',
    height: '100%',
    flexDirection: 'column',
  },
  individualBoxReserveGreen: {
    borderWidth: wp('1%'),
    borderColor: '#378C4C',
    flexDirection: 'row',
    width: '100%',
    padding: hp('1%'),
    marginVertical: hp('1%'),
    borderRadius: wp('6%'),
  },
  individualBoxReserveRed: {
    borderWidth: wp('1%'),
    borderColor: '#8C3737',
    flexDirection: 'row',
    width: '100%',
    padding: hp('1%'),
    marginVertical: hp('1%'),
    borderRadius: wp('6%'),
  },
  individualBoxReserveOrange: {
    borderWidth: wp('1%'),
    borderColor: '#FF9900',
    flexDirection: 'row',
    width: '100%',
    padding: hp('1%'),
    marginVertical: hp('1%'),
    borderRadius: wp('6%'),
  },
  boxReserveTitle: {
    color: 'white',
    fontSize: wp('5%'),
  },
  boxReserveHour: {
    color: 'white',
    fontSize: wp('5%'),
  },
  textDay: {
    color: '#07A24A',
    fontSize: hp('3%'),
  },
  textData: {
    color: 'white',
    fontSize: hp('3%'),
  },
  greenBackground: {
    width: wp('13%'),
    height: wp('13%'),
    marginRight: wp('3%'),
    backgroundColor: '#378C4C',
    borderRadius: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  redBackground: {
    width: wp('13%'),
    height: wp('13%'),
    marginRight: wp('3%'),
    backgroundColor: '#8C3737',
    borderRadius: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  orangeBackGround: {
    width: wp('13%'),
    height: wp('13%'),
    marginRight: wp('3%'),
    backgroundColor: '#FF9900',
    borderRadius: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStatusReserve: {
    width: '70%',
    height: '70%',
    resizeMode: 'center',
  },
});

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'br';
