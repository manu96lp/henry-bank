import React,{useEffect,useState}  from 'react';
import s from './stylesContacts'
import {Image , TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Container, View, Text, Button,Form,Item,Input,Label} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem} from 'react-native-elements';
import {allContacts , deleteContact,addContact,updateContact} from '../../redux/actions/contacts';
import Modal from 'react-native-modal'; 
import * as Contacts from 'expo-contacts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


 
const  Contactos = ()=>{
  const contactos = useSelector((state) => state.contactos);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [LengthCont , setLengthCont] = useState(contactos.listaContactos.length)
  const [currentContact , setCurrent] = useState()
  const [modalDelete,setModalDelete] = useState(false)
  const [modalAdd,setModalAdd] = useState(false)
  const [modalEdit,setModalEdit] = useState(false)
  const [input, setInput] = useState({
    email: '',
    nickname: ''
  });
  useEffect( () => {
    dispatch(allContacts(user.id))
  },[LengthCont])
  console.log("SON LOS CONTACTOS ",contactos)
  
  const Tab = createMaterialTopTabNavigator();

  const setImportContacts = () => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
      
        if (data.length > 0) {
          let text = data.find((v) => v.name === "Manu")
          if (text[0] !== '+') {
            Linking.openURL(`whatsapp://send?text=¿Todavía no estas usando Nova? Proba la billetera virtual aca: https://play.google.com/store/apps &phone=+54 9 ${text.phoneNumbers[0].number}`).catch( (err) => console.log(err) );
          }
          else {
            Linking.openURL(`whatsapp://send?text=¿Todavía no estas usando Nova? Proba la billetera virtual aca: https://play.google.com/store/apps &phone=${text.phoneNumbers[0].number}`).catch( (err) => console.log(err) );
          }
          console.log(text);

        }
      }
    })()
  }

  const selectContactDelete=(id)=>{
    setCurrent(id)
    setModalDelete(!modalDelete)
  }
  const selectContactEdit=(data)=>{
    setCurrent(data)
    setInput({ ...input, nickname:data.nickname })
    setModalEdit(!modalEdit)
  }
  
  const delte =  (currentContact)=>{
  setModalDelete(!modalDelete)
    dispatch(deleteContact(currentContact))
  }
  const handleSubmitEdit =  () => {
    setModalEdit(!modalEdit)
    dispatch(updateContact(currentContact.id,{nickname:input.nickname , user_id:user.id}))
  };

  const handleSubmitAdd  =  () => {
    console.log(input)
    setModalAdd(!modalAdd)
    dispatch(addContact({id:user.id,email:input.email,nickname:input.nickname}))
  };

  let renderItem = ({ item }) => (

  <ListItem bottomDivider containerStyle={s.item}>
      <Image source={require('../../assets/logoUser.png')} style={{width:40, height:40}}/>
      <ListItem.Content>
        <ListItem.Title>{item.nickname}</ListItem.Title>
        <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
  </ListItem>
     
  ) 
  const renderHiddenItem = (data, rowMap) => (
    <View style={s.rowBack}>
        <TouchableOpacity style={s.BtnLeft} onPress={() => selectContactEdit(data.item)}>
            <Text style={{color:"white" , fontFamily: 'RedHatText_Regular',}}>Editar</Text>
           {/*  <Icon style={s.addUser} size={35} name='delete-alert-outline' /> */}
        </TouchableOpacity>
        <TouchableOpacity style={s.BtnRight} onPress={() => selectContactDelete(data.item.id)}>
            <Text style={{color:"white" , fontFamily: 'RedHatText_Regular',}}>Borrar</Text>
           {/*  <Icon style={s.addUser} size={35} name='delete-alert-outline' /> */}
        </TouchableOpacity>
    </View>
);
  return (

<View style={s.container}>
  {/* MODAL EDIT */}
  <Text style={s.header}>Contactos</Text>
<Modal
    avoidKeyboard={false}
    isVisible={modalEdit}
    animationInTiming={600}
    animationOutTiming={600}
    onBackdropPress={() => setModalEdit(!modalEdit)}>
    <View style={s.modalAdd}>
    <Text style={s.title}>Editar contacto</Text>
      <Form >
        <Item floatingLabel>
          <Label >Nombre</Label>
          <Input value={input.nickname} onChangeText={nickname => setInput({ ...input, nickname })}/>
        </Item>
      </Form>
      <View style={s.buttonsContainer}>
      <TouchableOpacity onPress={() => setModalEdit(!modalEdit)}>
          <Text style={s.button}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSubmitEdit()}>
              <Text style={s.button}>Agregar</Text>
      </TouchableOpacity>
      </View>
      
    </View> 
  </Modal>
 {/* MODAL AGREGAR CONTACTO */}
  <Modal
    avoidKeyboard={false}
    isVisible={modalAdd}
    animationInTiming={600}
    animationOutTiming={600}
    onBackdropPress={() => setModalAdd(!modalAdd)}>
    <View style={s.modalAdd}>
    <Text style={s.title}>Agregar Contacto</Text>
      <Form >
        <Item floatingLabel>
          <Label >Email</Label>
          <Input  onChangeText={email => setInput({ ...input, email })} />
        </Item>
        <Item floatingLabel>
          <Label >Nombre</Label>
          <Input onChangeText={nickname => setInput({ ...input, nickname })}/>
        </Item>
      </Form>
      <View style={s.buttonsContainer}>
      <TouchableOpacity onPress={() => setModalAdd(!modalAdd)}>
          <Text style={s.button}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSubmitAdd()}>
              <Text style={s.button}>Agregar</Text>
      </TouchableOpacity>
      </View>
    </View> 
  </Modal>

{/* MODAL ELIMINAR CONTACTO */}
  <Modal
    avoidKeyboard={false}
    isVisible={modalDelete}
    animationInTiming={600}
    animationOutTiming={600}
    onBackdropPress={() => setModalDelete(!modalDelete)}>
    <View style={s.modalDelete}>
      <Text style={s.title}>Está seguro que desea eliminar el Contacto ?</Text>
      <View style={s.buttonsContainer}>
      <TouchableOpacity onPress={() => delte(currentContact)}>
          <Text style={s.button}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalDelete(!modalDelete)}>
              <Text style={s.button}>Cancelar</Text>
      </TouchableOpacity>
      </View>
    </View> 
  </Modal> 

  <SwipeListView
    keyExtractor={(item, index) => index.toString()}
    data={contactos.listaContactos}
    renderItem={renderItem}
    renderHiddenItem={renderHiddenItem}
    rightOpenValue={-75}
    leftOpenValue={75}
    previewRowKey={'0'}
    previewOpenValue={-40}
    previewOpenDelay={3000}
  />
    
  <TouchableOpacity style={s.addButton}
    underlayColor='transparent' onPress={() => setModalAdd(!modalAdd)}>
      <Icon style={s.addUser} size={35} name='account-plus' />
  </TouchableOpacity>
</View>
)}

export default Contactos;