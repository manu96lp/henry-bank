import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ContactList from './ContactList';
import ImportList from './ImportList';
import style from '../PrincipalScreen/style';

const Tab = createMaterialTopTabNavigator();

function ContactsTopNavigator() {
  return (
    <Tab.Navigator swipeEnabled={false}
      tabBarOptions = {{
        activeTintColor: '#4b81e7',
        labelStyle: {
          fontFamily: 'RedHatText_Regular',
        }
      }}
    >
      <Tab.Screen name="Contactos" component={ContactList} />
      <Tab.Screen name="Importar" component={ImportList} />
    </Tab.Navigator>
  );
}

export default ContactsTopNavigator;