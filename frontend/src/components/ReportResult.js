import React from 'react';
import {withRouter} from "react-router-dom";
import {getAmount, getBalance, getCardNumber} from "../store/reducers";
import {connect} from "react-redux";
import {push} from "react-router-redux";

const ReportResult = (props) => {
    let {cardNumber, balance, amount} = props;
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'Europe/Moscow',
        hour: 'numeric',
        minute: 'numeric'
    };
    return (
        <div align="center">
            <div>Номер карты: {cardNumber}</div>
            <div>Дата операции: {new Date().toLocaleDateString('ru', options)}</div>
            <div>Баланс: {balance}</div>
            <div>Сумма снятия: {amount}</div>
            <div>
                <button onClick={() => props.history.goBack()}>Назад</button>
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
        balance: getBalance(state),
        amount: getAmount(state)
    };
}

export default connect(mapStateToProps)(withRouter(ReportResult));