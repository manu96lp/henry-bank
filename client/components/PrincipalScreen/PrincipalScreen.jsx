import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { Container, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/actions/userActions';
import { getTransactions } from '../../redux/actions/transactions';
import DateTimePicker from '@react-native-community/datetimepicker';
import s from './style.js';
import TransactionItem from '../TransactionItem/TransactionItem';
import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';

import { API_URL } from '../../components/variables';

const PrincipalScreen = ({ navigation }) => {
    const user = useSelector((state) => state.userReducer);
    const transactionHistory = useSelector((state) => state.transactions.transactionHistory)
    const dispatch = useDispatch();

    const [initialDate, setInitialDate] = useState(new Date());
    const [limitDate, setLimitDate] = useState(new Date());
    const [showInitial, setShowInitial] = useState(false);
    const [showLimit, setShowLimit] = useState(false);
    const [visible, setVisible] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);

    const [dateOne, setDateOne] = useState('');
    const [dateTwo, setDateTwo] = useState('');

    const getResources = () => {
        dispatch(refresh(user.id));
        dispatch(getTransactions(user.id));
    };

    const onChangeOne = (event, selectedDate) => {
        let currentDate = selectedDate || initialDate
        setShowInitial(Platform.OS === 'ios');
        setInitialDate(currentDate);
        setDateOne(currentDate.toLocaleDateString('en-US'));
    };

    const onChangeTwo = (event, selectedDate) => {
        let currentDate = selectedDate || limitDate
        setShowLimit(Platform.OS === 'ios');
        setLimitDate(currentDate);
        setDateTwo(currentDate.toLocaleDateString('en-US'));
    };

    const showModeOne = () => {
        setShowInitial(true);
    };

    const showModeTwo = () => {
        setShowLimit(true);
    };

    useEffect(() => {
        getResources();
    }, []);

    const GetLeaks = () => {
        console.log('Fecha inicial', initialDate.toLocaleDateString('en-US'), 'fecha final', limitDate.toLocaleDateString('en-US'));
        console.log('ID USER:', user.id)
        axios.post(`http://${API_URL}/transaction/getRangoFecha`,
            {
                id: user.id,
                fechaInicio: initialDate.toLocaleDateString('en-US'),
                fechaFin: limitDate.toLocaleDateString('en-US')
            }
        ).then( resp => {
            if(resp.data.length === 0) return Alert.alert('No hay transacciones en el rango de fecha especificado.');
            
            setFiltered(resp.data);
            setVisible(false);
        })
            .catch(() => console.log('algo se rompio'))
    };



    return (
        <Container>
            <View style={s.container}>
                <Text style={s.headerTitle}>Balance total de la cuenta</Text>
                <Text style={s.balance}>{user.balanceArs ? user.balanceArs.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0} ARS</Text>
                {/* <Text style={s.balance}>{user.balanceUds ? user.balanceUdstoFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0} USD</Text> */}
                <TouchableOpacity style={s.button2} onPress={() => setVisible(!visible)}>
                    <Icon style={s.icon2} name='feature-search' color='white' size={25} />
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={visible}
                animationIn='zoomIn'
                animationInTiming={800}
                animationOut='zoomOut'
                animationOutTiming={800}
                onBackdropPress={() => setVisible(!visible)}
            >

                <View style={s.dateContainer}>
                    <Text style={s.titleModal}>Selecciona un intervalo</Text>
                    <Button style={s.optionDate} onPress={() => showModeOne()}>
                        <Text style={s.textDate}>Fecha inicial</Text>
                    </Button>
                    {
                        dateOne === '' ?
                            <Text style={s.date}>------</Text>
                            :
                            <Text style={s.date}>{dateOne}</Text>

                    }
                    <Button style={s.optionDate} onPress={() => showModeTwo()}>
                        <Text style={s.textDate}>Fecha Límite</Text>
                    </Button>
                    {
                        dateTwo === '' ?
                            <Text style={s.date}>------</Text>
                            :
                            <Text style={s.date}>{dateTwo}</Text>
                    }

                    <View style={s.buttonsCC}>
                        <TouchableOpacity style={s.optionModal} onPress={() => GetLeaks()}>
                            <Text style={s.textDate1}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.optionModal} onPress={() => setVisible(!visible)}>
                            <Text style={s.textDate1}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* INITIAL DATE */}
            <View>
                {
                    showInitial && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={initialDate}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChangeOne}
                        />
                    )
                }
            </View>
            {/* LIMIT DATE */}
            <View>
                {
                    showLimit && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={limitDate}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTwo}
                        />
                    )
                }
            </View>

            <ScrollView>
                {
                    filtered.length === 0 ?
                        transactionHistory.map((transaction, i) => (

                            <TransactionItem
                                name={transaction.title}
                                amount={transaction.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                date={transaction.createdAt}
                                type={transaction.transactionType}
                                referenceCode={transaction.refernece}
                                key={i}
                            />
                        )) 
                        :
                        filtered.map((transaction, i) => (

                            <TransactionItem
                                name={transaction.name}
                                amount={transaction.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                date={transaction.createdAt}
                                type={transaction.transactionType}
                                referenceCode={transaction.refernece}
                                key={i}
                            />
                        ))
                    }
            </ScrollView>
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
        </Container>

    );
};


export default PrincipalScreen;