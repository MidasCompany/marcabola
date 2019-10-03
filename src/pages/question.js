import React, { Component } from 'react';

import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackButton from '../../assets/leftarrowdark.png'

// import { Container } from './styles';

export default class Question extends Component {
  render() {
    return(
        <View style={{backgroundColor: '#176337', flex: 1}}>
            <TouchableOpacity style={{height: hp('15%'), width: wp('20%'), margin: wp('3%')}}>
                <Image source={BackButton} style={{height: '50%',width: '50%', resizeMode: 'contain'}}/>
            </TouchableOpacity>

            <ScrollView>
            <View style={styles.backgroundQuestion}>
                <Text style={styles.textQuestion}>Minha bola foi cancelada, o que faço?</Text>
            </View>

            <View style={styles.backgroundQuestion}>
                <Text style={styles.textQuestion}>Infelizmente imprevistos 
acontecem e também não é justo ninguém sair lesado da situação, por isso, o MarcaBola dá completo reembolso, caso já aquela bola já tenha sido paga.</Text>
            </View>

            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    backgroundQuestion:{
        backgroundColor: '#378C4C',
        alignSelf: 'center',
        borderRadius: hp('3%'),
        width: wp('90%'),
        padding: hp('2%'),
        margin: hp('2%')
        
    },
    textQuestion:{
        color: '#FFFFFF',
        fontSize: hp('3%'),
        textAlign: 'center'
    }
});