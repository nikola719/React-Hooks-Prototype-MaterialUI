import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers/history';
import HomePage from './main/pages/home/HomePage';
import Login from './main/pages/login/Login';
import Resgister from './main/pages/register/Register';
import { useSelector } from 'react-redux';
import SignIn from './main/pages/login/SignIn';

function App() {
    const { isProcessing } = useSelector(state => state.authorization)
    // if(isProcessing) {
    //     return (
    //         <div>
    //             <p>Loading ...</p>
    //         </div>
    //     )
    // }
    return (
        <Router history={history}>
            <Route exact path="/" component={HomePage}/> 
            <Route exact path="/signin" component={SignIn}/> 
            <Route exact path="/signup" component={Resgister}/> 
        </Router>
    );
}

export default App;
