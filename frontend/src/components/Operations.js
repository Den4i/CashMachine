import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {getCardNumber, getPincode, getCardId} from '../store/reducers';
import {connect} from 'react-redux';
import {push} from "react-router-redux";


const Operations = (props) => {
    let operationSave = async () => {
        let {cardId} = props;
        await axios.post('/api/operation/ ', { code: 'Ba', card: cardId })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });
    };

  return (
       <div className={'operations'}>
           <button onClick={() => {operationSave(); props.history.push('balance/')}} className={'operations__balance'}>Баланс</button>
           <button onClick={() => props.history.push('withdrawal/')} className={'operations__withdrawal'}>Снять сумму</button>
           <button onClick={() => {
                    props.dispatch(push('/'));
                    props.dispatch({type: 'RESET'});
           }} className={'operations__reset'}>Выход</button>
       </div>
  )
};

function mapStateToProps(state) {
    return {
        cardNumber: getCardNumber(state),
        pincode: getPincode(state),
        cardId: getCardId(state)
    };
}

export default connect(mapStateToProps)(withRouter(Operations));