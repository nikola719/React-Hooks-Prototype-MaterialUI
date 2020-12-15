import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { authActions } from "../../../store/actions";

const required = (value) => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
        );
    }
};

const Login = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn, isProcessing } = useSelector(state => state.authorization);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = useCallback((e) => {
        const username = e.target.value;
        setUsername(username);
    }, [username])

    const onChangePassword = useCallback((e) => {
        const password = e.target.value;
        setPassword(password);
    }, [password])

    const handleLogin = useCallback((e) => {
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            console.log('login called')
            dispatch(authActions.login(username, password))
        };
    }, [username, password])
    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <div className="col-md-12">
        <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

            <Form onSubmit={handleLogin} ref={form}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={isProcessing}>
                        {isProcessing && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>SignIn</span>
                    </button>
                </div>
                <div className="form-group">
                    <Link to={'/signup'}>Sign Up</Link>
                </div>

                {message && (
                    <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
        </div>
    );
};

export default Login;