import React, { useState, useEffect } from "react";
import { allContacts } from '../../redux/actions/contacts'
import { tranfer } from '../../redux/actions/transactions'
import { refresh } from '../../redux/actions/userActions.js';
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Text,
  Item,
  Button,
  Body,
  Picker,
  Icon,
  Header,
  Label,
  ListItem,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import s from "./SendMoneyStyle";
import { Alert, View, CheckBox, StyleSheet, Image } from "react-native";

const SendMoney = ({ navigation }) => {
  const dispatch = useDispatch()
  const contactos = useSelector((state) => state.contactos);
  const user = useSelector((state) => state.userReducer);

  const [selectContact, setSelectContact] = useState(contactos.listaContactos.length ? contactos.listaContactos[0] : "");
  const [money, setMoney] = useState(0);
  const [error, setError] = useState(false);
  const [fromContacts, setFromContacts] = useState(false);
  const [message, setMessage] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  useEffect(() => {
    dispatch(allContacts(user.id))
    
  }, [])
  
  const format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const handleSubmit = async () => {
    await dispatch(tranfer({
      id: user.id,
      toEmail: selectContact.email,
      amount: parseInt(money),
      description: message
    }))
    console.log("Usuario seleccionado ",selectContact)
    await dispatch(refresh(user.id))
    alert("Se han transferido $" + money + " a " + selectContact.nickname)
  }

  return (
    <KeyboardAwareScrollView style={{  backgroundColor: '#242835'}}>

      <View style={s.infoContainer}>
        <View style={s.main1}>
          <Header style={s.header}>
             <Body
              style={{ flex: 1, flexDirection: "row", alignSelf: "flex-start", alignItems: 'center' }}>
             <Text style={s.header1}>Enviar dinero</Text>
            </Body>
            <Text style={{ color: 'white',fontFamily: 'RedHatText_Regular', textAlign: "center"}}>Selecciona un contacto</Text>
            <View style={s.picker}>
              
              <Picker
                mode="dropdown"
                enabled={!fromContacts}
                selectedValue={selectContact}
                onValueChange={setSelectContact}
                itemStyle={s.pickerItem}>

                {contactos.listaContactos.map((item, index) => {
                  return (< Picker.Item label={item.nickname} value={item} key={index} />)
                })}
              </Picker>
            </View>
            <Label style={{textAlign: "center"}}>
            </Label>
          </Header>
        </View>
        <View style={s.main2}>
          {error && (
            <Text style={s.error}>
              Por favor selecciona un contacto e ingrese cantidad
            </Text>
          )}
          <Item style={{ width: "100%" }}>
            <View style={styles.container}>
              <Text style={styles.paragraph}>$ {format(money)}</Text>
              <Input
              keyboardType="numeric"
              placeholder="Ingrese un monto (Mínimo $10)"
              multiline={true}
               
                onChangeText={money => setMoney(money)}
                style={styles.input}
              />
            </View>
          </Item>
          <Item style={{ height: 100, fontFamily: 'RedHatText_Regular'}}>
            <Input
              placeholder="Mensaje"
              multiline={true}
              style={{ height: 100, color: '#171717', fontFamily: 'RedHatText_Regular' }}
              value={message}
              onChangeText={(value) => setMessage(value)}
            />
          </Item>

          <ListItem >
            <CheckBox
              style={styles.color}
              value={checkBox}
              onValueChange={setCheckBox}/>
            <Body>
              <Text style={{ color: '#4b81e7', fontFamily: 'RedHatText_Regular'}}> Acepto usar la seleccion amigo solo con fines personales, no comerciales</Text>
            </Body>
          </ListItem>

          <Button style={s.buttom} dark block onPress={handleSubmit}>
            <Text>Enviar</Text>
          </Button>
          <Button style={[s.buttom, s.space ]} dark block onPress={ ( ) => navigation.navigate( 'Inicio' ) }>
					      <Text>Volver al inicio</Text>
          </Button>
        </View>

      </View>

    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    margin: 40,
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 30,
    color: 'black',
    fontFamily: 'RedHatText_Regular'
  },
  color: {
    color: '#4b81e7',
  }
});

export default SendMoney;