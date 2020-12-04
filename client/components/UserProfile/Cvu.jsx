import React from 'react';
import * as Linking from 'expo-linking';
import { List, ListItem, Text,View,Body } from 'native-base';
import { TouchableOpacity } from 'react-native';
import s from './stylesEdit';

const Cvu = ({ phone_number,cvu,alias}) => {
const handleCallPress = async () =>{
  await Linking.openURL(`https://wa.me/99999?text= CVU: ${cvu} Alias: ${alias}`)
 // await Linking.openURL(`sms:${phone_number}+?body= CVU: ${cvu} Alias: ${alias}`)
}
  return (
        <View style={s.container}>
          <Text style={s.title}>CVU (Clave Virtual Uniforme)</Text>
          
          <List>
            <ListItem>
              <Text note>CVU:</Text>
              <Body>
                <Text >{cvu}</Text>
              </Body>
            </ListItem>
            <ListItem>
                <Text note>Alias:</Text>
              <Body>
                <Text >{alias}</Text>
              </Body>
            </ListItem>
          </List>
       
          <View style={s.buttonsContainer}>
            <TouchableOpacity onPress={() => handleCallPress()}>
              <Text style={s.button}>Compartir mi CVU</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
};

export default Cvu;
