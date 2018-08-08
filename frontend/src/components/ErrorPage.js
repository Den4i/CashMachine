import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getError} from "../store/reducers";
import {SET_PINCODE, SET_ERROR} from "../actions/actionTypes";


const ErrorPage = (props) => {
  return (
      <div align="center">
          {props.error}<br/>
          <button onClick={()=>{
              props.dispatch({
                  type: SET_ERROR,
                  error: ''
              });

              props.dispatch({
                  type: SET_PINCODE,
                  pincode: ''
              });

              props.history.goBack();
            }
          }>Назад</button>
      </div>
  )
};

function mapStateToProps(state) {
    return {
        error: getError(state)
    };
}

export default connect(mapStateToProps)(withRouter(ErrorPage));