import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import s from './styles';

const TransactionItem = ({ type, date, name, amount, referenceCode }) => {

    let dateFormat = date.substring(0, 10).split('-').reverse().join('/');
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity style={s.container} onLongPress={() => setModalVisible(!modalVisible)}>
                <View style={s.infoContainer}>
                    {
                        type === 'recharge' ?

                            <Icon name='wallet-plus-outline' size={50} color='#FFD700' style={{ marginTop: '2%' }} />
                            
                            :
                
                            /* type === 'conversionArs' || 'conversionUsd' ?

                            <Icon2 name='sync-alt' size={50} color='#27AE60' style={{ marginTop: '2%' }} />

                            : */
                            
                            <Icon name='account-circle' size={50} color='#4b81e7' style={{ marginTop: '2%' }} />
                    }
                    <View style={s.subInfoContainer}>
                        <Text style={s.title}>{name}</Text>
                        <Text style={s.date}>{dateFormat}</Text>
                    </View>
                </View>
                {
                    type === 'transfer' ?

                        <View style={s.amountContainerNegative}>
                            <Text style={s.amountNegative}>- {amount} ARS</Text>
                        </View>
                        :
                        <View style={s.amountContainer}>
                            <Text style={s.amount}>+ {amount} ARS</Text>
                        </View>
                }
            </TouchableOpacity>
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
                                <Icon2 style={s.icon} color='red' name='times-circle' size={30} />
                            </TouchableOpacity>
                            {
                                type === 'recharge' ?

                                    <View>
                                        <Text style={s.modalTitleText}>Recarga</Text>
                                        <Text style={s.properties}>Entidad: {name}</Text>
                                    </View>

                                    :

                                    type === 'transfer' ?

                                        <View>
                                            <Text style={s.modalTitleText}>Envio</Text>
                                            <Text style={s.properties}>Para: {name}</Text>
                                        </View>
                                        :

                                        <View>
                                            <Text style={s.modalTitleText}>Transferencia</Text>
                                            <Text style={s.properties}>De: {name}</Text>
                                        </View>
                            }

                        </View>

                        {
                            type === 'recharge' ?

                                <Text style={s.properties}>Fecha de recarga: {dateFormat}</Text>

                                :

                                <Text style={s.properties}>Fecha de transferencia: {dateFormat}</Text>
                        }

                        <Text style={s.properties}>Monto: {amount} ARS</Text>
                        <Text style={s.properties}>Código de referencia: {referenceCode}</Text>
                        <LottieView style={s.animation} source={require('../../assets/lf30_editor_4tc8fsjh.json')} autoPlay loop={false} />
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default TransactionItem;
