import React from 'react';
import NumKeypad from './NumKeypad';
import InputMask from 'react-input-mask';
import {withRouter} from "react-router-dom";
import {getPincode} from "../store/reducers";
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

        if (this.state.pincode.length < 4) {
            this.setState((previousState) => {
                  return {pincode: previousState.pincode + num};
            });
        }
    };

    componentDidUpdate = () => {
        this.props.dispatch({
            type: 'SET_PINCODE',
            pincode: this.state.pincode,
        });
    };

    dispatchOk = () => {
        this.props.dispatch(checkPincode());
    };

    dispatchClear = () => {
        this.setState({'pincode': ''});
    };

    render() {
        let {pincode} = this.props;
        return (
            <div className={'inputpin'}>
                <label className={'inputpin__label'}>Введите 4-значный PIN</label>
                <InputMask className={'inputpin__pincode'} type='text' name='pincode' value={pincode} mask="9999" maskChar="*"/>
                <div className={'inputpin__numkeypad'}>
                    <NumKeypad pusher={this.pusher} dispatchOk={this.dispatchOk} dispatchClear={this.dispatchClear}/>
                </div>

                <button className={'inputpin__reset'} onClick={() => {
                    this.props.dispatch(push('/'));
                    this.props.dispatch({type: 'RESET'});
                }}>Выход</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        pincode: getPincode(state)
    };
}

export default connect(mapStateToProps)(withRouter(InputPincode));