import React from 'react';
import NumKeypad from './NumKeypad';
import InputMask from 'react-input-mask';
import {withRouter} from "react-router-dom";
import {getCardNumber, getPincode} from "../store/reducers";
import {connect} from "react-redux";
import {checkPincode} from '../actions/actions';
import {push} from "react-router-redux";


class InputPincode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pincode: ""};
    }

    pusher = (event) => {
        event.preventDefault();
        let num = event.target.value;

        if (this.state.pincode.length <= 4) {
            this.setState((previousState) => {
                  return {pincode: previousState.pincode + num};
            });
        }
    };

    componentWillUpdate = () => {
        this.props.dispatch({
            type: 'SET_PINCODE',
            pincode: this.state.pincode,
        });
    };

    render() {
        let {pincode} = this.props;
        return (
            <div align="center">
                <div><label>Введите 4-значный PIN</label></div>
                <InputMask type='text' name='pincode' value={pincode} mask="9999" maskChar="*"/>
                <NumKeypad pusher={this.pusher}/>

                <button onClick={() =>{this.props.dispatch(checkPincode())}}>OK</button>
                <button onClick={() => {this.setState({'pincode': ''})}}>Очистить</button>
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
        pincode: getPincode(state)
    };
}

export default connect(mapStateToProps)(withRouter(InputPincode));