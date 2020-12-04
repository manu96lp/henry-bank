import { ADD_USER, LOGIN_USER,USER_BY_ID,UPDATE_AVATAR } from '../actions/userActions.js';
import AsyncStorage from '@react-native-community/async-storage';
import { act } from 'react-test-renderer';

const initialState = {
    id: null,
    avatar:"",
    name:'',
    username:'',
    surname:'',
    identityNumber: '',
    email: '',
    birthday:'',
    phone_number:'',
    adress:'',
    token: null,

    balanceArs: 0,
    balanceUsd: 0,
    code: "0",
    idAccount: null,
    cvu: ""
      
      
    
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userName: action.user.userName,
                email: action.user.email
            }
        case LOGIN_USER:
            console.log('SOY LA RESPUESTA', action.user)
            return {
                ...state,
                id: action.user.logUser.id, 
                name: action.user.logUser.name,
                username: action.user.logUser.username,
                identityNumber: action.user.logUser.identityNumber,
                token: action.user.token,
                email: action.user.logUser.email,
                balanceArs: action.user.logUser.account.balanceArs,
                balanceUsd: action.user.logUser.account.balanceUsd,
                code: action.user.logUser.account.code,
                idAccount: action.user.logUser.account.id,
                cvu:action.user.logUser.account.cvu,
                adress:action.user.logUser.adress,
                phone_number:action.user.logUser.phone_number,
            }
        case USER_BY_ID: 
            return {
                ...state,
                id: action.user.id,
                name: action.user.name,
                avatar:action.user.avatar,
                username: action.user.username,
                surname:action.user.surname,
                email: action.user.email,
                birthday:action.user.birthday,
                phone_number:action.user.phone_number,
                adress:action.user.adress,
                balanceArs: action.user.account.balanceArs,
                balanceUsd: action.user.account.balanceUsd,
                code: action.user.account.code,
                idAccount: action.user.account.id,
                identityNumber: action.user.identityNumber,
                cvu:action.user.account.cvu,
            }
        case UPDATE_AVATAR:
            console.log("SOY LA RESPUESTA AVATAR ",action.avatar)
            return {
                ...state,
                avatar:action.avatar
            }
        default:
            return state;
    }

}


