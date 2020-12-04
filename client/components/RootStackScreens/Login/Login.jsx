import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button } from 'native-base';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userActions.js'
import * as LocalAuthentication from 'expo-local-authentication';
import LottieView from 'lottie-react-native';
import s from './styles.js';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { API_URL } from '../../variables';


const Login = ({ navigation }) => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [suportted, setSuportted] = useState(null);
    const [nombre, setNombre] = useState('Usuario');
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        LocalAuthentication.supportedAuthenticationTypesAsync()
            .then(success => {
                setSuportted(true);
            })
            .catch((error) => {
                console.log("Error touch: " + error)
                alert("Tu dispositivo no es compatible")
            })
    }, []);
    const tiempo = setTimeout(async() => {
        await AsyncStorage.setItem("userData", JSON.stringify(user))
        
    }, 8000);
   
   
    const handleSubmit = async () => {
        dispatch(login(input));
        await axios.post(`http://${API_URL}/auth/login`, input)

            .then(async() => {
            tiempo
            console.log("LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", user)
            if(user.id !== null){
                navigation.navigate('Home'); 
                Keyboard.dismiss();  }
            })
            .catch(() => {
                return Alert.alert("Datos incorrectos");
            })
    };

    const recoverPassword = () => {
        console.log(user.id)
        //Recuperar contraseña del email//
    }

    return (
        <Container style={s.container}>
            <KeyboardAvoidingView 
                behavior='position'>
                <View style={s.imageContainer}>
                    <Image source={require('../../../assets/nova.png')} style={s.image} />
                </View>
                <View style={s.optionsContainer}>
                    <Form style={s.form}>
                        <Item floatingLabel>
                            <Label style={s.labelForm1}>Email</Label>
                            <Input style={s.inputForm1} onChangeText={email => setInput({ ...input, email })} autoCapitalize= "none"/>
                        </Item>
                    </Form>
                    <Form style={s.form2}>
                    <Item floatingLabel>
                            <Label style={s.labelForm2}>Contraseña</Label>
                            <Input style={s.inputForm2}
                                onChangeText={password => setInput({ ...input, password })}
                                secureTextEntry={true}
                            />
                        </Item>
                    </Form>
                    <Button
                        block
                        dark
                        style={s.button}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={s.textButton}>Ingresar</Text>
                    </Button>
                    {/* <Button
                        style={s.reset}
                        transparent
                        onPress={() => recoverPassword()}
                    >
                        <Text style={s.textReset}>¿Olvidaste tu contraseña?</Text>
                    </Button> */}

                  
                </View>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Login;