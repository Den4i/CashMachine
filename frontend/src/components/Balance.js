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
          <div align="center">
              <div>{new Date().toLocaleDateString('ru', options)}</div>
              <div>Номер карты: {cardNumber}</div>
              <div>Баланс: {balance}</div>
              <div>
                  <button onClick={()=> props.history.goBack()}>Назад</button>
                  <button onClick={() => {
                    props.dispatch(push('/'));
                    props.dispatch({type: 'RESET'});
                  }}>Выход</button>
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