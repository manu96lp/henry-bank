import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import s from './Styles.js';
const CreateUser = ({navigation}) => {

    const [data, setData] = useState({
        tipoDoc: '',
        nroDNI: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        cel: ''
    });

    const handleSiguiente = () => {
        console.log(data)
        for (const prop in data) {
            if (data[prop] === '') {
                return;
            }
        }
            navigation.navigate('DirectionRegister', data)
    }

    return (
        <Container style={styles.container}>
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}
            style={styles.keyboard}
            >
                  <View style={s.imageContainerCU}>
                    <Image source={require('../../../assets/nova.png')} style={s.image} />
                </View>
                <View style={styles.inner}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <Form>
                                <Label style={styles.titulos}>Datos Personales</Label>
                                <Item >
                                <Label style={s.labelForm}>Tipo de documento: *</Label>
                                <Picker style={s.inputForm} onValueChange={tipoDoc => setData({...data, tipoDoc})} selectedValue={data.tipoDoc}
                                    >
                                        <Picker.Item style={s.labelForm} label= 'Selecciona el tipo de documento' value= ''/>
                                        <Picker.Item style={s.labelForm} label='DNI' value= "DNI"/>
                                        <Picker.Item style={s.labelForm} label='Pasaporte' value= "Pasaporte"/>
                                    </Picker>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Nro de DNI: *</Label>
                                    <Input style={s.inputForm} onChangeText={nroDNI => setData({ ...data, nroDNI })} type="number"></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Nombre: *</Label>
                                    <Input style={s.inputForm} onChangeText={nombre => setData({ ...data, nombre })}></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Apellido: *</Label>
                                    <Input style={s.inputForm} onChangeText={apellido => setData({ ...data, apellido }) }></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Fecha de nacimiento: *</Label>
                                    <Input style={s.inputForm} onChangeText={fechaNac => setData({ ...data, fechaNac })} type="date"></Input>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={s.labelForm}>Telefono celular: *</Label>
                                    <Input style={s.inputForm} onChangeText={cel => setData({ ...data, cel })}  type="number"></Input>
                                </Item>
                            </Form>
                            <Button
                                block
                                dark
                                style={styles.button}
                                onPress={() =>  handleSiguiente()}
                            >
                                <Text>Siguiente</Text>
                            </Button>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flex : 1 }} />
            </KeyboardAvoidingView>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#242835',
        flex: 1
    },
    keyboard: {
        flex: 1
    },
    inner: {
        justifyContent: "flex-end"
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
        alignSelf: 'center',
        fontWeight: "bold",
        color: 'white',
        fontFamily: 'RedHatText_Regular',
    }
});


export default CreateUser;