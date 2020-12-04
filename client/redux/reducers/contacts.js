import { LIST_CONTACTS , DELETE_CONTACTS, ADD_CONTACTO,UPDATE_CONTACTS} from '../actions/contacts.js';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {  
    listaContactos:[],
    contactoEncontrado:false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LIST_CONTACTS:
            return {
                ...state,
                listaContactos:action.contactos
            }
        case DELETE_CONTACTS:
            console.log( action.contacto)
            return{
                ...state,
                listaContactos: state.listaContactos.filter(cont=>cont.id !== action.contacto.id)
            }
        case ADD_CONTACTO:
            console.log("ENCONTRADO NO ENCONTRADO ",action.contacto)
            return{
                ...state,
                listaContactos: state.listaContactos.concat(action.contacto),
                contactoEncontrado: action.contacto ? false : true 
            }
        case UPDATE_CONTACTS:
            console.log( "EDITAR CONTACTO ",action.contactos)
           const contEditados = state.listaContactos.map( contacto=>{
                 if(contacto.id==action.contactos.id){
                    contacto.nickname=action.contactos.nickname
                } 
                return contacto
            })
            return{
                ...state,
                listaContactos: contEditados
            }
    
        default:
            return state;
    }

}


