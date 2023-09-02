import React from 'react';
import BANNER from "../../assets/login-banner.png"
import Logo from "../../assets/logo.png"
import formHandler from "../../utils/FormHandler";
import {validateLogin} from "../../utils/validation";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {toggleLoader} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import {loadCredential} from "../../utils/Authentication";

function Login(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(process.env.REACT_APP_HOST)

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isLogin, validateLogin);

    function isLogin() {
        dispatch(toggleLoader(true))
        axios.post(`${process.env.REACT_APP_HOST}/users/auth`, values)
            .then((res) => {
                console.log(res.data)
                loadCredential(res.data)
                toast.success("Successfully Login");
                navigate("/");
            }).catch((err) => {
                if(err?.response?.data?.message){
                    toast.error(err?.response?.data?.message)
                }else {
                    toast.error("Something went wrong")
                }
        }).finally(() => {
            dispatch(toggleLoader(false))
        })

    }


    return (
        <div class="login-body">
            <div class="login-head"><b>Welcome back EDUZENT</b></div>
            <div class="login-image">
                <img className={"ms-5"} src={Logo} alt=""/>
            </div>
            <div class="login-img">
                <img src={BANNER} alt="Login-Banner"/>
            </div>
            <div class="login">
                <div>
                    <div class="login-sig">
                        <b>Sign in to EDUZENT</b>
                    </div>
                </div>
                <div class="full-container">
                    <div>
                        New user? <a class="login-sign" href="http://127.0.0.1:5500/index.html">Create an account</a>
                    </div>
                    <br/>
                    <div class="login-form-inner">
                        <form action="#" class="full-container form-login">
                            <div class="login-field">
                                <input className={`form-control ${errors.username ? "border-red" : ""}`} type="text"
                                       name={"username"} onChange={handleChange} placeholder="Username"/>
                            </div>
                            {errors.username && <p className={"text-red"}>{errors.username}</p>}
                            <div class="login-field">
                                <input className={`form-control ${errors.password ? "border-red" : ""}`} type="password"
                                       name={"password"} onChange={handleChange} placeholder="Password"/>
                            </div>
                            {errors.password && <p className={"text-red"}>{errors.password}</p>}
                            <br/>
                            <a class="login-forgot" href="">Forgot Password?</a>
                            <div class="login-field login-btn">
                                <div class="login-login-btn-layer">

                                    <div type="submit" value="Login" onClick={handleSubmit}> Login</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;