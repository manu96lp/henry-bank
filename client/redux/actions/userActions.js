import axios from 'axios';
export const ADD_USER = "ADD_USER";
export const LOGIN_USER = "LOGIN_USER";
export const USER_BY_ID ="USER_BY_ID";
export const UPDATE_AVATAR= "UPDATE_AVATAR"

import { API_URL } from '../../components/variables';

export function createUser(user){

    return function(dispatch){
      
        return axios.post(`http://${API_URL}/user/`, user)
        .then(resp=>{
            dispatch({
                type:ADD_USER,
                user:resp.data
            })
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };
};


export function login (data){

    return async function(dispatch){
      
        return await axios.post(`http://${API_URL}/auth/login`, data)
        .then( resp =>{
            dispatch({
                type:LOGIN_USER,
                user:resp.data
            })
        })
        .catch(err=>{
            console.log('Soy el error de Redux', err)
        })
    };
};

export function updateAvatar(data,id){
    return function (dispatch){
    return axios.put(`http://${API_URL}/user/avatar/${id}`,JSON.stringify(data),{
        headers: {"Content-Type": "application/json"},
      })
       .then(resp=>{
        dispatch({
            type:UPDATE_AVATAR,
            avatar:resp.data
        })
           console.log("imagen subida")
       }) 
       .catch(err=>{console.log(err)})
   }
}
export function update(data, id){

    return function(dispatch){
        return axios.put(`http://${API_URL}/user/update/${id}`, data,
        {headers:{'accept':'application/json','content-type':'application/json'}})
        .then( resp =>{
            console.log(resp, 'soy el update de actions')
        })
        .catch(err=>{
            console.log('Soy el error del put', err)
        })
    };
};

export function refresh (data){

    return function(dispatch){
        return axios.get(`http://${API_URL}/user/user/${data}`)
        .then( resp =>{
            dispatch({
                type:USER_BY_ID,
                user:resp.data
            })
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };
};
//http://localhost:3000/user/user/1

