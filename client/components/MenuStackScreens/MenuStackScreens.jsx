import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import RechargeBalance from "../RechargeBalance/RechargeBalance";
import RechargeWithCard from "../RechargeWithCard/RechargeWithCard";
import SendMoney from '../SendMoney/SendMoney'
import TabNavigator from '../TabNavigator/TabNavigator';


const MenuStack = createStackNavigator();

const MenuStackScreens = () => {

    const options = {
        headerStyle: {
            backgroundColor: '#171717',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 0,
            elevation: 0
        },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTintColor: 'white' 
    }

    return (
        <MenuStack.Navigator screenOptions={options} headerMode='float'>
            <MenuStack.Screen name='TabNavigator' component={TabNavigator} options={{headerShown: false}}/>
            <MenuStack.Screen name='RechargeBalance' component={RechargeBalance} options={{headerShown: false}}/>
            <MenuStack.Screen name='RechargeWithCard' component={RechargeWithCard} options={{headerShown: false}}/>
            <MenuStack.Screen name='SendMoney' component={SendMoney} options={{headerShown: false}}/>
        </MenuStack.Navigator>
    );
};

export default MenuStackScreens;