import React, { useState } from 'react';
import { View, Container, Text, Button } from 'native-base';
import { Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator } from "react-native";
import ProfileEdit from './ProfileEdit';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import Cvu from './Cvu';
import { updateAvatar } from '../../redux/actions/userActions'

const Profile = ({navigation}) => {
  const imgUser = require('../../assets/logoUser.png');
  const dispatch = useDispatch();

  const cvu = useSelector((state) => state.userReducer);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CvuModal, setCvuModal] = useState(false);

  const showModal = () => {
    visible ? null : Keyboard.dismiss();
    setVisible(!visible);
  };


  const user = useSelector((state) => state.userReducer);

  //CARGAR IMGANE

  const uploadImage = async (base64) => {
    return axios
      .post(
        "https://api.imgur.com/3/image",
        { image: base64, type: "base64" },
        {
          headers: { Authorization: `Client-ID 1966dd2e3c81149`, },
        }
      ).then(resp => {
        console.log("SOY EL LINK", resp.data.data.link)
        let data = {
          avatar: resp.data.data.link
        };
        dispatch(updateAvatar(data, user.id));

      })
  }

  const openGallery = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (resultPermission) {
      let imageSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      if (imageSelected.cancelled === false) {

        //console.log(JSON.stringify(resolve))
        uploadImage(imageSelected.base64)
        console.log('entre aca')
      }

    }
  }
  const handleLogOut = async() => {
    await AsyncStorage.clear();
    navigation.navigate('Ingresar');
  }
  return (

    <Container style={s.container}>
      <KeyboardAvoidingView 
          behavior='position'
        >
        <View style={s.imgContainer}>
          <TouchableOpacity onPress={() => showModal()} style={s.pencilContainer}>
            <Icon name='pencil' size={30} style={s.pencilIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setCvuModal(!CvuModal)} style={s.shareCvuIconContainer}>
            <Icon name='share-variant' size={28} style={s.shareCvuIcon} />
          </TouchableOpacity>

          <Image style={s.avatar} source={user.avatar ? { uri: `${user.avatar}` } : imgUser} />
          <TouchableOpacity onPress={openGallery} style={s.cameraContainer}>
            <Icon name='camera' size={25} style={s.cameraIcon} />
          </TouchableOpacity>
          
          <Text style={s.nickName}>{user.username}</Text>
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
      </KeyboardAvoidingView>

      <View style={s.infoContainer}>
      <TouchableOpacity onPress={handleLogOut} style={s.arrowContainer}>
            <Icon name='arrow-collapse-left' size={30} style={s.arrowIcon} />
          </TouchableOpacity>
        <Text style={s.infoCategory}>Nombre y Apellido:</Text>
        <Text style={s.infoUser}>{user.name}</Text>
        <Text style={s.infoCategory}>Email:</Text>
        <Text style={s.infoUser}>{user.email}</Text>
        <Text style={s.infoCategory}>DNI:</Text>
        <Text style={s.infoUser}>{user.identityNumber}</Text>
        <Text style={s.infoCategory}>Teléfono:</Text>
        <Text style={s.infoUser}>{user.phone_number}</Text>
        <Text style={s.infoCategory}>Dirección:</Text>
        <Text style={s.infoUser}>{user.adress}</Text>
      </View>

      <Modal
        isVisible={visible}
        animationIn='zoomIn'
        animationInTiming={800}
        animationOut='zoomOut'
        animationOutTiming={800}
        onBackdropPress={() => showModal()}
        style={{ height: 2000 }}
        deviceHeight={520}
      >
        <ProfileEdit
          showModal={showModal}
          setLoading={setLoading}
        />
      </Modal>

      <Modal
        isVisible={CvuModal}
        animationIn='zoomIn'
        animationInTiming={500}
        animationOut='zoomOut'
        animationOutTiming={500}
        onBackdropPress={() => setCvuModal(!CvuModal)}
      >
        <Cvu
          phone_number={user.phone_number}
          cvu={cvu.cvu}
          alias={cvu.username}
        />
      </Modal>
    </Container>

  )
}

export default Profile;