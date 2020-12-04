import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Image } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/actions/userActions.js'
import s from './Styles.js';

const CreateUser = ({navigation}) => {

    const dispatch = useDispatch();

    const [data, setData] = useState({
        pin: '',
    });

    const handleSubmit = () => {
        dispatch(createUser(data));
        navigation.navigate('Crear Usuario')
    };

    return (
        <Container style={styles.container}>
              <KeyboardAvoidingView 
                behavior='position'>
                <View style={s.imageContainerVT}>
                    <Image source={require('../../../assets/nova.png')} style={s.image} />
                </View>
                <Form>
                    <Item floatingLabel>
                        <Label style={s.labelForm}>Validacion de Usuario</Label>
                        <Input style={s.inputForm} onChangeText={pin => setData({ ...data, pin })}></Input>
                    </Item>
                </Form>
                <Button
                    block
                    dark
                    style={styles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text>Enviar</Text>
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
        marginTop: 60,
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