import axios from 'axios';

export const RECHARGE = 'RECHARGE'; 
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const TRANSFER = "TRANSFER";
export const GET_SUMATORIA = "GET_SUMATORIA"

import { API_URL } from '../../components/variables';

export function recharge(transaction){

    return function(dispatch){
      
        return axios.post(`http://${API_URL}/transaction/recharge`, transaction)
        .then(resp=>{
             dispatch({
                type:RECHARGE,
                transaction:resp.data
            }) 
        })
        .catch(err=>{
            console.log('ERROR AL RECARGAR', err)
        })
    };
};

export function sumarPeriodo(data){
    return function(dispatch){
   axios.post(`http://${API_URL}/transaction/getbydate`,data)
    .then(resp => {
      //console.log("ENTRE A LA CONSULTA ", resp.data )
          dispatch({
            type: GET_SUMATORIA,
            obj:resp.data
          })    
      }).catch(err=>{
          console.log(err)
      })
    }
}
export function rechargeCard(transaction){

    return function(dispatch){
      
        return axios.post(`http://${API_URL}/transaction/recharge_card`, transaction)
        .then(resp=>{
             dispatch({
                type:RECHARGE_CARD,
                transaction:resp.data
            }) 
        })
        .catch(err=>{
            console.log('ERROR AL RECARGAR', err)
        })
    };
};

export function getTransactions(userId){

    return function(dispatch){
      
        return axios.get(`http://${API_URL}/transaction/getTransaction/${userId}`)
        .then(resp=>{
             dispatch({
                type: GET_TRANSACTIONS,
                transactions: resp.data
            }) 
        })
        .catch(err=>{
            console.log('ERROR EN TRAER EL HISTORIAL DE TRANSACCIONES', err)
        })
    };
};

export function tranfer(transaction){

    return function(dispatch){
      
        return axios.post(`http://${API_URL}/transaction/transfer`, transaction)
        .then(resp=>{
             dispatch({
                type:TRANSFER,
                transaction:resp.data
            }) 
        })
        .catch(err=>{
            console.log('ERROR AL TRASFERIR', err)
        })
    };
};
