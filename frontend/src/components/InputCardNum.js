import React from 'react';
import NumKeypad from './NumKeypad';
import InputMask from 'react-input-mask';
import {withRouter} from 'react-router-dom';
import {checkCardNumber} from '../actions/actions';
import {connect} from 'react-redux';
import {getCardNumber} from '../store/reducers';


class InputCardNum extends React.Component{
    constructor(props){
        super(props);
        this.state = {cardNumber: ""};
    }

    pusher = (event) => {
        event.preventDefault();
        let num = event.target.value;

        if (this.state.cardNumber.length < 16) {
            this.setState((previousState) => {
                return {cardNumber: previousState.cardNumber + num};
            });
        }
    };

    componentDidUpdate = () => {
        if (this.state.cardNumber.length === 16){
            this.props.dispatch({
                type: 'SET_CARDNUMBER',
                cardNumber: this.state.cardNumber,
            });
        }
    };

    dispatchOk = () => {
        this.props.dispatch(checkCardNumber());
    };

    dispatchClear = () => {
        this.setState({'cardNumber': ''});
    };

    render(){
        return (
            <div className={'inputcard'}>
                <label className={'inputcard__label'}>Введите 16-значный номер карты</label>
                <InputMask className={'inputcard__cardnumber'} type='text' name='cardNumber' value={this.state.cardNumber}
                                mask="9999 9999 9999 9999" maskChar="*" />
                <div className={'inputcard__numkeypad'}>
                    <NumKeypad pusher={this.pusher} dispatchOk={this.dispatchOk} dispatchClear={this.dispatchClear}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cardNumber: getCardNumber(state),
    };
}

export default connect(mapStateToProps)(withRouter(InputCardNum));