import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PrincipalScreen from '../PrincipalScreen/PrincipalScreen';
import Statistics from '../Statistics/Statistics';
import ContactsTopNavigator from '../Contacts/ContactsTopNavigator';
import Movement from '../Movement/Movement'; 
/* import SendMoney from '../SendMoney/SendMoney';*/
import Profile from '../UserProfile/Profile';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const color = 'red'

    return (
        <Tab.Navigator 
        screenOptions={({route}) => ({
            tabBarIcon:({color}) => {
                let iconName;
                if(route.name =='Inicio') {
                    iconName = 'home-variant-outline'
                }
                else if(route.name =='Mi cuenta') {
                    iconName = 'account-circle'
                }
                else if(route.name =='Estadisticas') {
                    iconName = 'chart-areaspline'
                }
                else if(route.name =='Contactos') {
                    iconName = 'contacts'
                }
                else {
                    iconName = 'swap-horizontal'
                }
                return <Icon name={iconName} size={33} color={color}/>
            }
            
        })}
        tabBarOptions={{
            activeTintColor: '#4b81e7',
            inactiveTintColor: 'gray',
            showLabel: false,
        }}

        >
            <Tab.Screen name="Inicio" component={PrincipalScreen}/>
            <Tab.Screen name="Mi cuenta" component={Profile} />
            <Tab.Screen name="Movimiento" component={Movement} />
            <Tab.Screen name="Estadisticas" component={Statistics} />
            <Tab.Screen name="Contactos" component={ContactsTopNavigator} />
        </Tab.Navigator>
    );
};

export default TabNavigator;