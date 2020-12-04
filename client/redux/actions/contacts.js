import axios from 'axios';
export const  LIST_CONTACTS = "LIST_CONTACTS";
export const DELETE_CONTACTS = "DELETE_CONTACTS"
export const UPDATE_CONTACTS = "UPDATE_CONTACTS"
export const ADD_CONTACTO = "ADD_CONTACTO"
import { API_URL } from '../../components/variables';

export function allContacts(id){

    return function(dispatch){
        
        return axios.get(`http://${API_URL}/contact/${id}`)
        .then(resp=>{
            console.log(resp.data)
             dispatch({
                type:LIST_CONTACTS,
                contactos:resp.data
            }) 
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };
};
export function deleteContact(id){

    return function(dispatch){
        
        return axios.delete(`http://${API_URL}/contact/${id}`)
        .then(resp=>{
            console.log(resp.data)
             dispatch({
                type:DELETE_CONTACTS,
                contacto:resp.data
            }) 
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };
};


export function addContact(contacto){

    return function(dispatch){
        
        return axios.post(`http://${API_URL}/contact/add`,contacto)
        .then(resp=>{
            console.log(resp.data)
             dispatch({
                type:ADD_CONTACTO,
                contacto:resp.data
            }) 
        })
        .catch(err=>{
            alert("El Usuario no existe")
            console.log('Soy el error', err)
        })
    };
};

export function addContactWithPhone(contacto){
            return {
                type:ADD_CONTACTO,
                contacto:contacto.data
            }
};

export function updateContact(id,data){

    return function(dispatch){
        
        return axios.put(`http://${API_URL}/contact/${id}`,data)
        .then(resp=>{
            console.log(resp.data)
             dispatch({
                type:UPDATE_CONTACTS,
                contactos:resp.data
            }) 
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };
};