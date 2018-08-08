import axios from 'axios';
import {SET_CARDNUMBER, SET_ERROR, SET_PINCODE, SET_BALANCE, SET_CARDID } from './actionTypes';
import { push } from 'react-router-redux';

export function checkCardNumber(){
     return async (dispatch, getState) => {
        try {
            let state = getState();
            let cardNumber = state.cardReducer.cardNumber;

            await axios.post('card/check_number/', {number: cardNumber})
                    .then(response => {
                        if (response.data.success) {
                            if (response.data.incorrect !== 4) {
                                dispatch({type: SET_CARDNUMBER, cardNumber: cardNumber});
                                dispatch(push('/card/'))
                            } else {
                                dispatch({type: SET_ERROR, error: 'Карта заблокирована'});
                                dispatch(push('/error/'))
                            }
                        } else {
                            dispatch({type: SET_ERROR, error: 'Введен недействительный номер карты'});
                            dispatch(push('/error/'))
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });

        } catch (error) {
            console.error(error);
        }
    };
}


export function checkPincode(){
    return async (dispatch, getState) => {
        try {
            let state = getState();
            let {cardNumber, pincode} = state.cardReducer;
            await axios.post('/card/check_pin/', {number: cardNumber, pincode: pincode})
                .then(response => {
                    if (response.data.success === true){
                        dispatch({type: SET_PINCODE,  pincode: pincode});
                        dispatch({type: SET_ERROR,  error: ''});
                        dispatch({type: SET_CARDID,  cardId: response.data.cardId});
                        dispatch({type: SET_BALANCE,  balance: response.data.balance});
                        dispatch(push('operation/'));
                    } else if (!(response.data.success)) {
                        if (response.data.incorrect !== 4) {
                            dispatch({type: SET_ERROR, error: 'Введен неверный PIN'});
                            dispatch(push('/error/'));
                        } else {
                            dispatch({type: SET_ERROR,  error: 'Введен 4 раза неверный PIN, карта заблокирована'});
                            dispatch(push('/error/'));
                        }
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });
        } catch (error){
            console.error(error)
        }
    }
}

export function checkAmount() {
    return async (dispatch, getState) => {
        try {
            let state = getState();
            let {amount, cardId} = state.cardReducer;

            await axios.post('card/withdrawal_save/ ', { code: 'WI', card: cardId, detail: amount })
                    .then(response => {
                        if (response.data.success){
                            dispatch({type: SET_BALANCE,  balance: response.data.balance});
                            dispatch(push('/card/operation/withdrawal/report/'));
                        } else {
                            dispatch({type: SET_ERROR,  error: 'Недостаточно средств'});
                            dispatch(push('/error/'))
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });

        } catch (error){
            console.error(error);
        }
    }
}
