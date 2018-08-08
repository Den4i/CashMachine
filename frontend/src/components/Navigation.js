import React from 'react';
import InputPincode from './InputPincode'
import InputCardNum from './InputCardNum';
import {Route, Switch} from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Operation from './Operations';
import Balance from "./Balance";
import Withdrawal from './Withdrawal';
import ReportResult from './ReportResult';

const Navigation = () => {
    return (
        <div>
            <Switch>
                  <Route exact path={'/'} component={InputCardNum}/>
                  <Route exact path={'/card'} component={InputPincode}/>
                  <Route path={'/card/operation/withdrawal/report'} component={ReportResult}/>
                  <Route path={'/card/operation/balance'} component={Balance}/>
                  <Route path={'/card/operation/withdrawal'} component={Withdrawal}/>
                  <Route path={'/card/operation'} component={Operation}/>

                  <Route path={'/error'} component={ErrorPage}/>
            </Switch>
        </div>
    )
};

export default Navigation;