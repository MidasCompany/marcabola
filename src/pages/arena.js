/* eslint-disable no-undef */
import React, {Component} from 'react';

import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {format, parseISO, addHours, setHours} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import ModalDropdown from 'react-native-modal-dropdown';

import AsyncStorage from '@react-native-community/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import api from '../services/api';

import xMark from '../../assets/xmark.png';

import Star from '../../assets/greenstar.png';

import Placeholder from '../../assets/greenplaceholder.png';

import Coin from '../../assets/greencoin.png';

import Negative from '../../assets/negative.png';
import Plus from '../../assets/plus.png';

export default class Arena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      dateSelected: null,
      dateSelectedFormated: null,
      totalToPay: 0,
      totalHours: 0,
      currentDate: new Date(),
      timeStart: null,
      availableTime: null,
      totalToShow: null,
      morning: ['06:00'],
      evening: ['13:00'],
      night: ['18:00'],
    };
  }

  fillAvailableTime = (evening, morning, night) => {
    const aArray = [];
    const allArrays = aArray.concat(evening, morning, night);
    this.setState({
      availableTime: allArrays,
    });
  };

  formatDays = day => {
    this.setState({dateSelected: day.dateString});
    const _date = parseISO(day.dateString);
    const formatedDate = format(_date, "dd 'de' MMMM' de 'yyyy'", {
      locale: ptBR,
    });
    this.setState({
      dateSelectedFormated: formatedDate,
    });
  };

  showCalendar = () => {
    return (
      <Calendar
        minDate={this.state.today}
        onVisibleMonthsChange={months => {
          console.log('month', months[0].month);
        }}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={day => {
          this.formatDays(day);
        }}
        markedDates={{
          [this.state.dateSelected]: {selected: true},
        }}
        style={styles.calendar}
      />
    );
  };
  handleWithDropdown = hour => {
    this.setState({timeStart: hour, totalHours: 1});
    this.handleWithPrice();
  };
  handleWithHours = async a => {
    const hours = this.state.totalHours;
    if ((hours == 1 && a < 1) || hours == 0 || !hours) {
      return;
    }
    this.setState({totalHours: this.state.totalHours + a}, () => {
      this.handleWithPrice();
    });
  };

  handleWithPrice = async () => {
    const arena_id = this.props.navigation.state.params.arena_id;
    const token = await AsyncStorage.getItem('@CodeApi:token');
    const infos = await api.get(`/api/arena/${arena_id}`, null, {
      headers: {Authorization: `BEARER ${token}`},
    });
    const hours = this.state.totalHours;

    const price = infos.data.price;
    const schedule = infos.data.schedule;
    const selectedH = this.state.timeStart;
    console.log(price);
    if (schedule.evening.find(element => element === selectedH)) {
      console.log('evening');
      this.setState({totalToPay: price.evening * this.state.totalHours});
    }
    if (schedule.morning.find(element => element === selectedH)) {
      console.log('morning');
      this.setState({totalToPay: price.morning * this.state.totalHours});
    }
    if (schedule.night.find(element => element === selectedH)) {
      console.log('night');
      this.setState({totalToPay: price.night * this.state.totalHours});
    }
  };

  sendReserve = async () => {
    try {
      const arena_id = this.props.navigation.state.params.arena_id;
      const token = await AsyncStorage.getItem('@CodeApi:token');
      const _date = parseISO(this.state.dateSelected);
      const timeStart = parseInt(this.state.timeStart, 10);
      const _datetime = setHours(_date, timeStart);
      console.log(_datetime);
      const response = await api.post(
        'api/reservations',
        {
          arena_id: arena_id,
          date_start: _datetime,
          total_hours: this.state.totalHours,
        },
        {
          headers: {Authorization: `BEARER ${token}`},
        },
      );
      console.log(response);
    } catch (response) {
      console.log(response);
    }
  };

  showDropDown = () => {
    return (
      <ModalDropdown
        options={this.state.availableTime}
        textStyle={{fontSize: 20, color: 'white'}}
        style={styles.favoriteBackground}
        dropdownTextStyle={{fontSize: 20}}
        defaultValue="Escolha seu horário de início"
        onSelect={(index, value) => {
          this.handleWithDropdown(value);
        }}
      />
    );
  };

  showTotalInfos = () => {
    return (
      <View style={styles.inferiorItems}>
        <View>
          <Text style={styles.textTotal}>Total</Text>
          <Text style={styles.textMoneyTotal}>R$ {this.state.totalToPay}</Text>
        </View>
        <View style={styles.middleInferiorDivisor} />
        <View style={{justifyContent: 'center', marginLeft: wp('-10%')}}>
          <TouchableOpacity
            onPress={() => this.sendReserve()}
            style={styles.confirmBackground}>
            <Text style={styles.confirmText}>Marcar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  listArenaData = async () => {
    try {
      const arena_id = this.props.navigation.state.params.arena_id;
      const token = await AsyncStorage.getItem('@CodeApi:token');
      const infos = await api.get(`/api/arena/${arena_id}`, null, {
        headers: {Authorization: `BEARER ${token}`},
      });
      const schedule = infos.data.schedule;
      console.log(schedule);

      this.fillAvailableTime(
        schedule.evening,
        schedule.morning,
        schedule.night,
      );
    } catch (response) {
      console.log('Erro: ', response);
      this.isLogged();
    }
  };

  showManyHours = () => {
    return (
      <View style={{alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{fontSize: 20, color: 'white'}}>Por quantas horas?</Text>
        <View
          style={{
            flexDirection: 'row',
            height: '30%',
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.handleWithHours(-1)}
            style={{height: '60%', width: '20%'}}>
            <Image
              source={Negative}
              style={{height: '100%', width: '100%', resizeMode: 'center'}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 25, color: 'white'}}>
            {this.state.totalHours}
          </Text>
          <TouchableOpacity
            onPress={() => this.handleWithHours(1)}
            style={{height: '60%', width: '20%'}}>
            <Image
              source={Plus}
              style={{height: '100%', width: '100%', resizeMode: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    this.fillAvailableTime();
    this.listArenaData();
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
            <Text style={styles.textArenaName}>
              {this.props.navigation.state.params.name}
            </Text>
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
              <Text style={styles.confirmText}>
                {this.state.dateSelectedFormated}
              </Text>
            </View>
          ) : (
            this.showCalendar()
          )}

          {this.state.dateSelected ? this.showDropDown() : null}
          {this.state.timeStart ? this.showManyHours() : null}
          {this.state.dateSelected && this.state.timeStart
            ? this.showTotalInfos()
            : null}
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
