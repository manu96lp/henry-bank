import axios from 'axios';
import React, { useEffect, useState } from 'react';
import s from './stylesImport'
import { Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Container, View, Text, Button, Form, Item, Input, Label } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { addContactWithPhone } from '../../redux/actions/contacts';
import Modal from 'react-native-modal';
import * as Contacts from 'expo-contacts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { API_URL } from '../../components/variables';

const ContactImport = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [currentContact, setCurrent] = useState()
  const [input, setInput] = useState({
    email: '',
    nickname: ''
  });
  const [contactList, setContactList] = useState([])

  const Tab = createMaterialTopTabNavigator();

  const setImportContacts = () => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        setContactList(data);

        // if (data.length > 0) {

        // }
      }
    })()
  }

  const handleSubmitAdd = (phone, nickname) => {
    console.log(user)
    axios.post(`http://${API_URL}/contact/addWithPhone`, {phone, nickname, id: user.id})
    .then( (res) => {
      console.log('Pog')
      dispatch(addContactWithPhone(res))
    })
    .catch( (err) => {
      console.log(err)
      if (err.response.status === 404) { 
        if (phone[0] !== '+') {
          Linking.openURL(`whatsapp://send?text=¿Todavía no estas usando Nova? Proba la billetera virtual aca: https://play.google.com/store/apps &phone=+54 9 ${phone}`).catch((err) => console.log(err));
        }
        else {
          Linking.openURL(`whatsapp://send?text=¿Todavía no estas usando Nova? Proba la billetera virtual aca: https://play.google.com/store/apps &phone=${phone}`).catch((err) => console.log(err));
        }
      }
    })
  };

  useEffect(() => {
    setImportContacts();
  }, [])

  return (
    <View style={s.container}>
      {/* MODAL EDIT */}
      <Text style={s.header}>Importar contactos</Text>
      <ScrollView>
        {
          contactList && contactList.map((contact, i) => 
            ( contact.phoneNumbers &&
              <ListItem key={i} bottomDivider containerStyle={s.item} onPress={(() => handleSubmitAdd(contact.phoneNumbers[0].number, contact.name))}>
                <Image source={require('../../assets/logoUser.png')} style={{ width: 40, height: 40 }} />
                <ListItem.Content>
                  <ListItem.Title>{contact.name}</ListItem.Title>
                  <ListItem.Subtitle>{contact.phoneNumbers[0].number}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          )
        }
      </ScrollView>
    </View>
  )
}

     

export default ContactImport;