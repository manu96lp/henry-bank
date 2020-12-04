import React, { useState } from 'react';
import axios from 'axios'
import { StyleSheet, Image } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { KeyboardAvoidingView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/actions/userActions.js'
import s from './Styles.js';

import  API_URL  from '../../variables'

const CreateUser = ({navigation}) => {

    const dispatch = useDispatch();
  
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const createUser =  () => {
        return axios.post(`http://${API_URL}/user/`, data)
        .then(resp=>{
            console.log('SOY LA RESPUESTA', resp.data)
        })
        .then(() => navigation.navigate('Verificacion'))
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };

    const handleSubmit = () => {
        createUser();
    };

    return (
        <Container style={styles.container}>
                      <KeyboardAvoidingView 
                behavior='position'>
                <View style={s.imageContainer}>
                    <Image source={require('../../../assets/nova.png')} style={s.image} />
                </View>
                <Form>
                    <Item floatingLabel >
                        <Label style={s.labelForm}>Nombre de Usuario *</Label>
                        <Input style={s.inputForm} onChangeText={username => setData({ ...data, username })}></Input>
                    </Item>

                    <Item floatingLabel>
                        <Label style={s.labelForm}>Email *</Label>
                        <Input style={s.inputForm} onChangeText={email => setData({ ...data, email })}></Input>
                    </Item>

                    <Item floatingLabel>
                        <Label style={s.labelForm}>Contraseña *</Label>
                        <Input style={s.inputForm} secureTextEntry={true} onChangeText={password => setData({ ...data, password })}></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text>Siguiente</Text>
                </Button>
                </KeyboardAvoidingView>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#242835',
    },
    button: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 35,
        justifyContent: 'center',
        backgroundColor: '#4b81e7',
        borderRadius: 10,
    },
    titulos: {
        marginTop: 50,
        alignSelf: 'center',
        fontWeight: "bold"
    }
});


export default CreateUser;