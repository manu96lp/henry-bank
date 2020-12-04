import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import s from './styles';

const Movement = ({ navigation }) => {
    return (
        <View style={s.container}>
            <Text style={s.header}>Actividad</Text>
            <View>
                <Image style={{width: '50%', height: '50%', alignSelf: 'center'}}source={require('../../assets/wallet.png')}/>
            </View>
            <View style={s.buttonsContainer}>
                <Button style={s.button} onPress={() => navigation.navigate('RechargeBalance')}>   
                    <Icon2 name='money-bill' size={30} color='white'/> 
                    <Text style={s.textButton}>Recargar mediante efectivo</Text>
                </Button>
                <Button style={s.button} onPress={() => navigation.navigate('RechargeWithCard')}>
                    <Icon2 name='credit-card' size={30} color='white'/>
                    <Text style={s.textButton}>Recargar con tarjeta</Text>
                </Button>
                <Button style={s.button} onPress={() => navigation.navigate('SendMoney')}>
                    <Icon2 name='paper-plane' size={30} color='white'/>
                    <Text style={s.textButton}>Enviar dinero</Text>
                </Button>
                {/* <Button style={s.button}>
                    <Icon2 name='sync' size={30} color='white' onPress={() => navigation.navigate('CurrencyConverter')}/>
                    <Text style={s.textButton}>Comprar dolares</Text>
                </Button> */}
            </View>
        </View>
    )
}

export default Movement;