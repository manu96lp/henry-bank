import React, {useEffect} from 'react';
import { Image } from 'react-native';
import { Button, Text, View, Container } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import s from './styles.js'
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { isEmptyArray } from 'formik';
const StartScreen = ({ navigation }) => {
    AsyncStorage.getItem("userData", (err, result)=>{
        const data = JSON.parse(result)
        if(data !== null){
            navigation.navigate("Touch")
        }
        console.log("POOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",data)
    })
   
    return (
        <Container style={s.contianer}>
            <View style={s.imageContainer}>
                <Image source={require('../../../assets/nova.png')} style={s.image} />
            </View>
            <View style={s.containerOptions}>
                <Button
                    block
                    dark
                    style={s.button}
                    onPress={() => navigation.navigate('Ingresar')}
                >
                    <Icon size={35} name='login' style={s.icon}/>
                    <Text style={s.textButton}>Ingresar</Text>
                </Button>
                <Button
                    block
                    dark
                    style={s.button}
                    onPress={() => navigation.navigate('Registrarse')}
                >
                    <Icon size={35} name='account-check' style={s.icon}/>
                    <Text style={s.textButton}>Registrarme</Text>
                </Button>
            </View>
        </Container>
    );
};

export default StartScreen;