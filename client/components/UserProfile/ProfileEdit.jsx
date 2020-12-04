import React, { useState } from 'react';
import { Form, Item, Input, Label, View, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { update, refresh } from '../../redux/actions/userActions'
import s from './stylesEdit';

const ProfileEdit = ({ showModal, setLoading }) => {

  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [updateInfo, setUpdateInfo] = useState({
    username: user.username,
    email: user.email,
    phone_number: user.phone_number,
    adress: user.adress,
  });

  async function Handleup() {
    setLoading(true);
    await dispatch(update(updateInfo, user.id))
    await dispatch(refresh(user.id))
    setLoading(false);
    showModal();
  };

  return (
    <KeyboardAvoidingView>
        <View style={s.container}>
          <Text style={s.title}>Editar mis datos</Text>
          <Form style={s.form}>
            <Item floatingLabel>
              <Label style={s.label} >Nombre de usuario:</Label>
              <Input style={s.userData} value={updateInfo.username} onChangeText={username => setUpdateInfo({ ...updateInfo, username })}></Input>
            </Item>
            <Item floatingLabel>
              <Label style={s.label} >Email: </Label>
              <Input style={s.userData} value={updateInfo.email} onChangeText={email => setUpdateInfo({ ...updateInfo, email })}></Input>
            </Item>
            <Item floatingLabel>
              <Label style={s.label} >Teléfono:</Label>
              <Input style={s.userData} value={updateInfo.phone_number} onChangeText={phone_number => setUpdateInfo({ ...updateInfo, phone_number })}></Input>
            </Item>
            <Item floatingLabel>
              <Label style={s.label} >Dirección:</Label>
              <Input style={s.userData} value={updateInfo.adress} onChangeText={adress => setUpdateInfo({ ...updateInfo, adress })}></Input>
            </Item>
          </Form>
          <View style={s.buttonsContainer}>
            <TouchableOpacity onPress={() => Handleup()}>
              <Text style={s.button}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showModal()}>
              <Text style={s.button}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileEdit;
