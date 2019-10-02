import React, { Component } from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import Logo from '../../assets/logocalendario.png';

import Button from '../../assets/enterbuttonup.png';

export default class Register extends Component{
    constructor(props){
        super(props);
        //this.state = {isLoading: true}
    }

    render(){
        return(
            <View style={{backgroundColor: '#052623', flex: 1}}>
                    <TouchableOpacity style={{margin: wp('5%'), position: 'absolute'}}>
                        <Text style={{color: '#36D25C', fontSize: hp('5%')}}>X</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#247346', borderRadius: hp('100%'), alignSelf: 'center', alignItems: 'center', width: wp('40%'), height: wp('40%'), margin: hp('5%'), justifyContent: 'center', marginBottom: hp('2%')}}>
                        <Image source={Logo} style={{ height: '50%', width: '70%', height: '70%'}}/>
                    </View>
                <View style={{justifyContent: 'center', alignSelf: 'center', width: wp('90%'), padding: wp('0%'), borderColor: '#40A640', borderWidth: 1, borderRadius: wp('10%')}}>
                        <Text style={{color: '#36D25C', fontSize: hp('3.5%'), textAlign: 'center', padding: '5%'}}>Cadastro</Text>
                        <TextInput placeholder='nome completo' placeholderTextColor='#36D25C' style={styles.textfield} />
                        <TextInput placeholder='e-mail' placeholderTextColor='#36D25C' style={styles.textfield} />
                        <TextInput placeholder='cpf' placeholderTextColor='#36D25C' style={styles.textfield} />
                        <TextInput placeholder='data de nasc.' placeholderTextColor='#36D25C' style={styles.textfield} />
                        <TextInput placeholder='nome de usuario' placeholderTextColor='#36D25C' style={styles.textfield} />
                        <TextInput placeholder='senha' placeholderTextColor='#36D25C' style={styles.textfield} />
                        <TouchableOpacity style={{height: '20%', width: '20%', alignSelf: 'center', margin: '3%', marginBottom: 0}}>
                            <Image source={Button} style={{height: '100%', width: '100%', resizeMode: 'center', justifyContent: 'center', alignSelf: 'center'}}/>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textfield: {
        color: '#36D25C', 
        fontSize: hp('2.5%'), 
        alignSelf: 'center', 
        borderBottomWidth: 2, 
        borderBottomColor: '#C004D9', 
        width: '80%', 
        textAlign: 'center'
    }
})