import React from 'react';
import NumKeypad from './NumKeypad';
import {getBalance, getCardId, getCardNumber} from "../store/reducers";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {checkAmount} from '../actions/actions';
import {push} from "react-router-redux";
import InputMask from 'react-input-mask';


class Withdrawal extends React.Component{
    constructor(props){
        super(props);
        this.state = {amountWithdrawal: ""};
    }

     pusher = (event) => {
        event.preventDefault();
        if (event.defaultPrevented){
            let num = event.target.value;

            this.setState((previousState) => {
                return {amountWithdrawal: previousState.amountWithdrawal + num};
            });
        }
    };

    saveAmount = () => {
        let amount = Number.parseInt(this.state.amountWithdrawal);
        this.props.dispatch({
            type: 'SET_AMOUNT',
            amount: amount
        });
    };

    render(){
        return (
          <div align="center">
              <div><label>Введите сумму для снятия</label></div>
              <InputMask type='text' name='amountWithdrawal' mask={9999999} value={this.state.amountWithdrawal}/>
              <NumKeypad pusher={this.pusher}/>
              <button onClick={() => {
                  this.saveAmount();
                  this.props.dispatch(checkAmount());
                }}>OK</button>
              <button onClick={() => {this.setState({'amountWithdrawal': ''})}}>Очистить</button>
              <button onClick={() => this.props.history.goBack()}>Назад</button>
              <button onClick={() => {
                    this.props.dispatch(push('/'));
                    this.props.dispatch({type: 'RESET'});
              }}>Выход</button>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cardNumber: getCardNumber(state),
        balance: getBalance(state),
        cardId: getCardId(state)
    };
}

export default connect(mapStateToProps)(withRouter(Withdrawal));