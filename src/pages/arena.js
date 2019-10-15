/* eslint-disable no-undef */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import xMark from '../../assets/xmark.png';

import Star from '../../assets/greenstar.png';

import Placeholder from '../../assets/greenplaceholder.png';

import Coin from '../../assets/greencoin.png';

import moment from 'moment';

export default class Arena extends Component {
  constructor(props) {
    super(props);
    const DISABLED_DAYS = ['Sábado', 'Domingo'];
    this.state = {
      today: new Date(),
      dateSelected: null,
      markedDates: this.getDaysInMonth(
        moment().month(),
        moment().year(),
        DISABLED_DAYS,
      ),
    };
  }

  selectionData = _day => {
    this.setState(
      (this.state.dateSelected = {
        [_day.dateString]: {selected: true, selectedColor: '#7C038C'},
      }),
    );
  };

  getDaysInMonth(month, year, days) {
    let pivot = moment()
      .month(month)
      .year(year)
      .startOf('month');
    const end = moment()
      .month(month)
      .year(year)
      .endOf('month');

    let dates = {};
    const disabled = {disabled: true, disableTouchEvent: false};
    while (pivot.isBefore(end)) {
      days.forEach(day => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }

    return dates;
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
                margin: hp('1%'),
              }}>
              <Image source={Star} style={styles.imageArenaProps} />
              <Text style={styles.textArenaProps}>5,0</Text>
              <Image source={Coin} style={styles.imageArenaProps} />
              <Text style={styles.textArenaProps}>$$$</Text>
              <Image source={Placeholder} style={styles.imageArenaProps} />
              <Text style={styles.textArenaProps}>1 km</Text>
            </View>
          </View>

          <View style={styles.middleItems}>
            <CalendarList
              onDayPress={day => {
                console.log('selected day', day);
              }}
              pastScrollRange={0}
              minDate={this.state.today}
              futureScrollRange={3}
              scrollEnabled={true}
              onMonthChange={date => {
                this.setState({
                  markedDates: this.getDaysInMonth(
                    date.month - 1,
                    date.year,
                    DISABLED_DAYS,
                  ),
                });
              }}
              showScrollIndicator={true}
              onDayPress={day => {
                this.selectionData(day);
              }}
              onDayLongPress={day => {
                this.selectionData(day);
              }}
              //disabledByDefault
              theme={{
                calendarBackground: '#07A24A',
                textSectionTitleColor: '#7C038C',
                monthTextColor: 'white',
                textMonthFontSize: hp('2.5%'),
                dotColor: '#00adf5',
                selectedDotColor: '#000000',
                dayTextColor: 'white',
                todayTextColor: 'purple',
                textDisabledColor: '#AAAAAA',
              }}
              markedDates={(this.state.dateSelected, this.state.markedDates)}
            />
          </View>

          <View style={styles.inferiorItems}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: wp('5%'),
              }}>
              <Text style={styles.textTotal}>Total</Text>
              <Text style={styles.textMoneyTotal}>R$ 10</Text>
            </View>
            <View style={styles.middleInferiorDivisor} />
            <View style={{justifyContent: 'center', marginLeft: wp('-10%')}}>
              <TouchableOpacity style={styles.confirmBackground}>
                <Text style={styles.confirmText}>Marcar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: 'space-between',
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
