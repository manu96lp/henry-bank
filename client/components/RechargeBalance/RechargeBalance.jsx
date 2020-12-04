import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Button, Container } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { recharge, getTransactions } from '../../redux/actions/transactions.js';
import { refresh } from '../../redux/actions/userActions.js';
import s from './styles.js';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import Loader from 'react-native-multi-loader';
import Spinner from 'react-native-loading-spinner-overlay';


const RechargeBalance = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setLoading(true);
        let obj = { id: user.idAccount }
        await dispatch(recharge(obj));
        await dispatch(refresh(user.id));
        await dispatch(getTransactions(user.id))
        setLoading(false)
        setModalVisible(!modalVisible);

    };

    const transaction = useSelector((state) => state.transactions);
    let dateFormat = transaction.createdAt.substring(0, 10).split('-').reverse().join('/');

    return (
        <Container style={s.container}>
            <Text style={s.title}>Recargar mediante efectivo</Text>
            <View style={s.infoContainer}>
                <View style={s.headerContainer}>
                    <View style={s.infoBox}>
                        <Text style={s.infoOne}>Usa este código siempre que quieras ingresar dinero a tu cuenta.</Text>
                    </View>
                    <TouchableOpacity disabled={!transaction.amount} onPress={() => setModalVisible(!modalVisible)}>
                        <Icon size={30} name='info-circle' style={!transaction.amount ? s.infoIconDisabled : s.infoIcon} />
                    </TouchableOpacity>
                </View>
                <View style={s.userCodeBox}>
                    <Text style={s.userCode}>{user.code}</Text>
                </View>
                <View style={s.infoBox}>
                    <Text style={s.infoTwo}>Mostrale este código al cajero en Rapipago o en Pago Fácil.</Text>
                </View>
                <Image style={{ width: '50%', height: '30%', alignSelf: 'center' }} source={require('../../assets/money.png')} />
                <Button style={s.button} onPress={() => handleSubmit()}>
                    <Text style={s.buttonText}>Confirmar Recarga</Text>
                </Button>
                <Button style={s.button} onPress={() => navigation.navigate('Inicio')}>
                    <Text style={s.buttonText}>Volver al inicio</Text>
                </Button>
            </View>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                size={'large'}
                overlayColor={'rgba(0, 0, 0, 0.8)'}
                color={'#4b81e7'}
                animation={'fade'}
                textContent={'Un momento, por favor...'}
                textStyle={{
                    color: 'white',
                    fontFamily: 'RedHatText_Regular',
                    fontWeight: 'normal'
                }}
                customIndicator={
                    <ActivityIndicator size={60} color={'#4b81e7'}/>
                }
            />
            <View>
                <Modal
                    isVisible={modalVisible}
                    animationIn='zoomIn'
                    animationInTiming={800}
                    animationOut='zoomOut'
                    animationOutTiming={800}
                    onBackdropPress={() => setModalVisible(!modalVisible)}
                >
                    <View style={s.modalContainer}>
                        <View>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Icon style={s.icon} color='red' name='times-circle' size={30} />
                            </TouchableOpacity>
                            <Text style={s.modalTitleText}>Recibo</Text>
                        </View>
                        <Text style={s.properties}>Fecha de recarga: {dateFormat}</Text>
                        <Text style={s.properties}>Monto: {transaction.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ARS</Text>
                        <Text style={s.properties}>Codigo de referencia: {transaction.refernece}</Text>
                        <LottieView style={s.animation} source={require('../../assets/lf30_editor_4tc8fsjh.json')} autoPlay loop={false} />
                    </View>
                </Modal>
            </View>
        </Container>
    );
};

export default RechargeBalance;