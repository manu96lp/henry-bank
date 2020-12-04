import React, { useEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Container, Form, Item, Input, Label, Text, Button, Picker } from 'native-base';
import axios from 'axios';
import s from './Styles.js';

const DirectionRegister = ({route, navigation}) => {

    const [data, setData] = useState({
        calle: '',
        nro: '',
        localidad: '',
        departamento: '',
        provincia: ''
    });

    const [pickerProvincias, setPickerProvincias] = useState([]);
    const [pickerDepartamentos, setPickerDepartamentos] = useState([]);
    const [pickerLocalidades, setPickerLocalidades] = useState([]);

    const cargarProvincias = () => {
        axios.get(`https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`)
        .then( response => {
                setPickerProvincias(response.data.provincias);
            }
        ).catch( err => console.log(err))
    }

    const cargarDepartamentos = (provincia) => {
        if (!provincia){ return }
        axios.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provincia}&orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`)
        .then( response => {
                setPickerDepartamentos(response.data.departamentos);
            }
        ).catch( err => console.log(err))
    }

    const cargarLocalidades = (provincia, departamento) => {
        if (!departamento){ return }
        axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&departamento=${departamento}&aplanar=true&campos=basico&max=5000&exacto=true&formato=json
        `)
        .then( response => {
                setPickerLocalidades(response.data.localidades);
            }
        ).catch( err => console.log(err))
    }
    
    const handleProvincias = (provincia) => {
        setData({ ...data, provincia })
        cargarDepartamentos(provincia);
    }

    const handleDepartamentos = (departamento) => {
        setData({ ...data, departamento });
        cargarLocalidades(data.provincia, departamento);
    }

    const handleRegistrarse = () => {
        Keyboard.dismiss()

        console.log(data)
        for (const prop in data) {
            if (data[prop] === '') {
                return;
            }
        }
        
        console.log(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${data.calle}%20${data.nro}&provincia=${data.provincia}&departamento=${data.departamento}&localidad=${data.localidad}&aplanar=true&campos=basico&max=10`)
        axios.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${data.calle}%20${data.nro}&provincia=${data.provincia}&departamento=${data.departamento}&localidad=${data.localidad}&aplanar=true&campos=basico&max=10`)
        .then( info => {
            console.log(info.data.direcciones[0].nomenclatura)
            if (info.data.direcciones[0].nomenclatura) {
                navigation.navigate('Home', data)
            }
        })
        
    }

    useEffect(() => {
        const {tipoDoc, nroDNI, nombre, apellido, fechaNac, cel} = route.params;
        setData({...data, tipoDoc, nroDNI, nombre, apellido, fechaNac, cel});
        cargarProvincias();
    },[])

    return (
        <Container style={styles.container}>
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}
            style={styles.keyboard}
            >
              <View style={s.imageContainerCU}>
                    <Image source={require('../../../assets/nova.png')} style={s.image} />
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Label style={styles.titulos}>Residencia</Label>
                        <Form>
                            <Item>
                                <Label style={s.labelForm}>Provincia: *</Label>
                                <Picker style={s.inputForm}  onValueChange={value => handleProvincias(value)} selectedValue={data.provincia}> 
                                    <Picker.Item style={s.inputForm} label='Seleccione su provincia' value=''/>
                                    {
                                        pickerProvincias.map( provincia => (
                                            <Picker.Item style={s.inputForm} label={provincia.nombre} value={provincia.nombre}/>
                                        ))
                                    }
                                </Picker>
                            </Item>
                            <Item>
                                <Label style={s.labelForm}>Partido/Departamento: *</Label>
                                <Picker style={s.inputForm}  onValueChange={value => handleDepartamentos(value)} selectedValue={data.departamento}>
                                    <Picker.Item style={s.inputForm} label='Seleccione su Partido/Departamento' value=''/>
                                    {
                                        pickerDepartamentos.map( departamento => (
                                            <Picker.Item style={s.inputForm} label={departamento.nombre} value={departamento.nombre}/>
                                        ))
                                    }
                                </Picker>
                            </Item>
                            <Item>
                                <Label style={s.labelForm}>Localidad: *</Label>
                                <Picker style={s.inputForm}  onValueChange={localidad => setData({ ...data, localidad })} selectedValue={data.localidad}>
                                    <Picker.Item style={s.inputForm} label='Seleccione su Localidad' value=''/>
                                    {
                                        pickerLocalidades.map( localidad => (
                                            <Picker.Item style={s.inputForm} label={localidad.nombre} value={localidad.nombre}/>
                                        ))
                                    }
                                </Picker>
                            </Item>
                            <Item floatingLabel>
                                <Label style={s.labelForm}>Calle: *</Label>
                                <Input style={s.inputForm} onChangeText={calle => setData({ ...data, calle})}></Input>
                            </Item>
                            <Item floatingLabel>
                                <Label style={s.labelForm}>Nro: *</Label>
                                <Input style={s.inputForm}  onChangeText={nro => setData({ ...data, nro})}></Input>
                            </Item>
                        </Form>
                        <Button
                            block
                            dark
                            style={styles.button}
                            onPress={() => handleRegistrarse()}
                        >
                            <Text>Registrarme</Text>
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
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
        color: 'white'
    }
});


export default DirectionRegister;