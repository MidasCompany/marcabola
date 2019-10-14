/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  AsyncStorage,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BackButton from '../../assets/leftarrowpink.png';

import api from '../services/api';

export default class Arenas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arenas: [],
    };
  }
  listArenas = async () => {
    console.log('Arenas: ', this.state.arenas);
    try {
      const token = await AsyncStorage.getItem('@CodeApi:token');
      console.log('app', token);
      const list = await api.get('/api/arena', null, {
        headers: {Authorization: `BEARER ${token}`},
      });
      this.setState({
        arenas: list.data,
      });
      console.log('Arenas: ', this.state.arenas);
    } catch (response) {
      console.log(response);
    }
  };

  componentDidMount() {
    this.listArenas();
  }

  render() {
    return (
      <View style={{backgroundColor: '#052623', flex: 1}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.leftArrowTouchable}>
          <Image source={BackButton} style={styles.leftArrowImage} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#C004D9',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: hp('4%'),
            margin: wp('3%'),
            position: 'absolute',
          }}>
          Arenas
        </Text>

        <View style={styles.allArenas}>
          <SafeAreaView
            style={{
              width: '100%',
              height: '100%',
            }}>
            <FlatList
              data={this.state.arenas}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.push('ArenaPage')}
                  style={styles.boxarenas}>
                  <View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: wp('10%'),
                        height: '100%',
                        marginRight: wp('2%'),
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.textname}>{item.name}</Text>
                    <Text style={styles.textprops}>$$$ 1km</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allArenas: {
    backgroundColor: '#4F0259',
    width: '100%',
    height: hp('100%'),
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('5%'),
  },
  boxarenas: {
    backgroundColor: '#220126',
    width: '100%',
    height: hp('10%'),
    flexDirection: 'row',
    padding: wp('3%'),
    marginBottom: hp('2.5%'),
    borderRadius: wp('5%'),
  },
  textname: {
    color: '#07A24A',
    fontSize: hp('2.5%'),
  },
  textprops: {
    color: '#FFFFFF',
    fontSize: hp('2.5%'),
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
});
