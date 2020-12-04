import {RECHARGE , TRANSFER, GET_TRANSACTIONS,GET_SUMATORIA, RECHARGE_CARD } from '../actions/transactions.js';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {  
    title: null,
    description: "",
    transactionType:"",
    amount: 0,
    refernece: "",
    currency: "",
    createdAt: "",
    income: 0,
    transactionHistory: [],
    sumatoria:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECHARGE:
            return {
                ...state,
                description: action.transaction.description,
                transactionType: action.transaction.transactionType,
                amount: action.transaction.amount,
                refernece: action.transaction.refernece,
                currency: action.transaction.currency,
                createdAt: action.transaction.createdAt,
                income: state.income + action.transaction.amount
            }
        case GET_TRANSACTIONS: 
            return {
                ...state,
                transactionHistory: action.transactions
            }
        case TRANSFER:
                return {
                    ...state,
                    description: action.transaction.description,
                    transactionType: action.transaction.transactionType,
                    amount: action.transaction.amount,
                    refernece: action.transaction.refernece,
                    currency: action.transaction.currency,
                    createdAt: action.transaction.createdAt,
                    income: state.income + action.transaction.amount
                }
        case GET_SUMATORIA :
                return {
                    ...state,
                    sumatoria:action.obj
                }

        default:
            return state;
    }

}


