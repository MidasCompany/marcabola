import React, { Component } from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {BoxShadow} from 'react-native-shadow'

import Logo from '../../assets/logocalendario.png';

import Button from '../../assets/enterbutton.png';

export default class Login extends Component{
    constructor(props){
        super(props);
        //this.state = {isLoading: true}
    }

    render(){
        return(
            <View style={{backgroundColor: '#052623', flex: 1, justifyContent: 'center'}}>
                <View style={{}}>
                    <TouchableOpacity style={{margin: wp('5%')}}>
                        <Text style={{color: '#36D25C', fontSize: hp('5%')}}>X</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#247346', borderRadius: hp('100%'), alignSelf: 'center', alignItems: 'center', width: wp('40%'), height: wp('40%'), margin: hp('5%'), justifyContent: 'center', marginTop: hp('-10%'), marginBottom: hp('10%')}}>
                        <Image source={Logo} style={{ height: '50%', width: '70%', height: '70%'}}/>
                    </View>
                </View>
                <View style={{justifyContent: 'center', alignSelf: 'center', width: wp('90%'),padding: wp('1%'), borderColor: '#40A640', borderWidth: 1, borderRadius: wp('10%')}}>
                        <Text style={{color: '#36D25C', fontSize: hp('5%'), textAlign: 'center'}}>login</Text>
                        <TextInput placeholder='usuario' placeholderTextColor='#36D25C' style={{color: '#36D25C', fontSize: hp('3.2%'), alignSelf: 'center', margin: wp('1%'), borderBottomWidth: wp('0.5%'), borderBottomColor: '#C004D9', width: '80%', textAlign: 'center'}} />
                        <TextInput placeholder='senha' placeholderTextColor='#36D25C' style={{color: '#36D25C', fontSize: hp('3.2%'), alignSelf: 'center', margin: wp('1%'), borderBottomWidth: wp('0.5%'), borderBottomColor: '#C004D9', width: '80%', textAlign: 'center'}} />
                        <TouchableOpacity style={{height: '20%', width: '20%', alignSelf: 'center', margin: '5%', marginBottom: 0}}>
                            <Image source={Button} style={{height: '100%', width: '100%', resizeMode: 'center', justifyContent: 'center', alignSelf: 'center'}}/>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}