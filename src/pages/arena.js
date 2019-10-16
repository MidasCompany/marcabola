/* eslint-disable no-undef */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {format, parseISO, addMonths, subMonths} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import AsyncStorage from '@react-native-community/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import xMark from '../../assets/xmark.png';

import Star from '../../assets/greenstar.png';

import Placeholder from '../../assets/greenplaceholder.png';

import Coin from '../../assets/greencoin.png';

export default class Arena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      dateSelected: null,
      totalToPay: 0,
      currentDate: new Date(),
    };
  }

  checkPrice = day => {
    this.setState({dateSelected: day.dateString});
    const date = this.state.dateSelected;
    const price = 10;
    this.setState({
      totalToPay: price,
    });
  };

  showCalendar = () => {
    return (
      <Calendar
        minDate={this.state.today}
        onMonthChange={console.log(this.state)}
        onVisibleMonthsChange={months => {
          console.log('month', months[0].month);
        }}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={day => {
          this.checkPrice(day);
        }}
        markedDates={{
          '2019-10-25': {disabled: true, disableTouchEvent: true},
          [this.state.dateSelected]: {selected: true},
        }}
        style={styles.calendar}
      />
    );
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
        <View style={styles.allItems}>
          <View style>
            <View style={styles.superiorItems}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.xMarkBox}>
                <Image source={xMark} style={styles.xMark} />
              </TouchableOpacity>
            </View>
            <View style={styles.backgroundArenaImage} />
            <Text style={styles.textArenaName}>Arena</Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                margin: hp('0.1%'),
              }}>
              <Image source={Star} style={styles.imageArenaProps} />
              <Text style={styles.textArenaProps}>5,0</Text>
              <Image source={Coin} style={styles.imageArenaProps} />
              <Text style={styles.textArenaProps}>$$$</Text>
              <Image source={Placeholder} style={styles.imageArenaProps} />
              <Text style={styles.textArenaProps}>1 km</Text>
            </View>
          </View>
          {this.state.dateSelected ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({dateSelected: null});
                }}
                style={styles.confirmBackground}>
                <Text style={styles.confirmText}>Escolher data de novo</Text>
              </TouchableOpacity>
              <Text style={styles.confirmText}>{this.state.dateSelected}</Text>
            </View>
          ) : (
            this.showCalendar()
          )}
          {this.state.dateSelected ? (
            <View style={styles.inferiorItems}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: wp('5%'),
                }}>
                <Text style={styles.textTotal}>Total</Text>
                <Text style={styles.textMoneyTotal}>
                  R$ {this.state.totalToPay}
                </Text>
              </View>
              <View style={styles.middleInferiorDivisor} />
              <View style={{justifyContent: 'center', marginLeft: wp('-10%')}}>
                <TouchableOpacity style={styles.confirmBackground}>
                  <Text style={styles.confirmText}>Marcar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#4F0259',
    flex: 1,
  },
  calendar: {
    marginVertical: '5%',
    marginBottom: '10%',
  },
  xMarkBox: {
    height: hp('10%'),
    width: wp('10%'),
  },
  xMark: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    marginLeft: wp('5%'),
  },
  superiorItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  favoriteBackground: {
    backgroundColor: '#378C4C',
    height: hp('5%'),
    paddingHorizontal: '5%',
    borderRadius: wp('100%'),
    justifyContent: 'center',
    marginRight: wp('5%'),
  },
  favoriteText: {
    color: 'white',
    fontSize: hp('3%'),
    textAlign: 'center',
  },
  backgroundArenaImage: {
    backgroundColor: '#378C4C',
    width: wp('30%'),
    height: hp('15%'),
    alignSelf: 'center',
    borderRadius: hp('6%'),
  },
  textArenaName: {
    color: '#23B050',
    fontSize: hp('4%'),
    textAlign: 'center',
  },
  textArenaProps: {
    color: 'white',
    fontSize: hp('2.8%'),
    marginHorizontal: wp('2.5%'),
  },
  imageArenaProps: {
    height: '100%',
    width: '10%',
    resizeMode: 'contain',
  },
  allItems: {
    flex: 3,
  },
  middleItems: {
    backgroundColor: 'white',
    width: '100%',
    height: hp('40%'),
    flex: 1,
  },

  inferiorItems: {
    flexDirection: 'row',
    flex: 1 / 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
  },
  textTotal: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp('3%'),
  },
  textMoneyTotal: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp('4%'),
  },
  middleInferiorDivisor: {
    height: '100%',
    width: '1%',
    borderRadius: hp('100%'),
    backgroundColor: 'white',
  },
  confirmBackground: {
    backgroundColor: '#378C4C',
    height: hp('5%'),
    paddingHorizontal: '5%',
    borderRadius: wp('100%'),
    justifyContent: 'center',
  },
  confirmText: {
    color: 'white',
    fontSize: hp('3%'),
    textAlign: 'center',
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
