import React, { Component } from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import xMark from '../../assets/xmark.png';

export default class Arena extends Component {
  render() {
    return(
    <View style={styles.background}>
        <View style={styles.superiorItems}>
            <TouchableOpacity style={styles.xMarkBox}>
                <Image source={xMark} style={styles.xMark}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteBackground}>
            <Text style={styles.favoriteText}>Favorito</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.backgroundImage}>
        </View>
        <Text>Arena</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create(
{    
    background:{
        backgroundColor: '#4F0259',
        flex: 1,
    },
    xMarkBox:{
        height: hp('10%'),
        width: wp('10%')
    },
    xMark: {
        width: '100%',
        height: '100%',
        resizeMode: 'center',
        marginLeft: wp('5%')
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
        marginRight: wp('5%')
    },
    favoriteText: {
        color: 'white',
        fontSize: hp('3%'),
        textAlign: 'center'
    },
    backgroundImage:{
        backgroundColor: '#378C4C',
        width: '30%',
        height: '15%',
        alignSelf: 'center',
        borderRadius: hp('6%')
    }


}
);
