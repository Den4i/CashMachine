import * as types from '../actions/actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    cardId: 0,
    cardNumber: '',
    pincode: '',
    error: '',
    balance: 0,
    amount: 0
});


export default function cardReducer (state = initialState, action = {}) {
    switch (action.type) {

        case types.SET_CARDNUMBER:
          return state.merge({
               cardNumber: action.cardNumber,
          });

        case types.SET_ERROR:
          return state.merge({
               error: action.error,
          });

        case types.SET_PINCODE:
            return state.merge({
                pincode: action.pincode
            });

        case types.SET_BALANCE:
            return state.merge({
                balance: action.balance
            });

        case types.SET_CARDID:
            return state.merge({
                cardId: action.cardId
            });

        case types.SET_AMOUNT:
            return state.merge({
                amount: action.amount
            });

        case types.RESET:
            return state.merge({
                cardId: '',
                cardNumber: '',
                pincode: '',
                error: '',
                balance: '',
                amount: ''
            });


        default:
            return state;
    }
}

export function getCardNumber(state) {
    return state.cardReducer.cardNumber;
}

export function getError(state) {
    return state.cardReducer.error;
}

export function getPincode(state) {
    return state.cardReducer.pincode;
}

export function getBalance(state) {
    return state.cardReducer.balance;
}

export function getCardId(state) {
    return state.cardReducer.cardId;
}

export function getAmount(state) {
    return state.cardReducer.amount;
}