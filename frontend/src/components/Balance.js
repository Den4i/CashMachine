import React from 'react';
import {withRouter} from "react-router-dom";
import {getBalance, getCardNumber} from "../store/reducers";
import {connect} from "react-redux";
import {push} from "react-router-redux";


const Balance = (props) => {
    let {cardNumber, balance} = props;
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'Europe/Moscow'
    };
    return (
          <div className={'balance'}>
              <label className={'balance__date'}>Дата операции: {new Date().toLocaleDateString('ru', options)}</label>
              <div className={'balance__cardNumber'}>Номер карты: {cardNumber}</div>
              <div className={'balance__balance'}>Баланс: {balance}</div>
              <div className={'balance__footer'}>
                  <button onClick={()=> props.history.goBack()} className={'balance__back'}>Назад</button>
                  <button onClick={() => {
                        props.dispatch(push('/'));
                        props.dispatch({type: 'RESET'});
                  }} className={'balance__reset'}>Выход</button>
              </div>
          </div>
    )
};

function mapStateToProps(state) {
    return {
        cardNumber: getCardNumber(state),
        balance: getBalance(state)
    };
}

export default connect(mapStateToProps)(withRouter(Balance));