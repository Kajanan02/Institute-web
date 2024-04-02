import React from 'react';
import BANNER from "../../assets/login-banner.png"
import Logo from "../../assets/eduzon.svg"
import formHandler from "../../utils/FormHandler";
import {validateLogin} from "../../utils/validation";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setUserDetail, toggleLoader} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import {initialNavigate, loadCredential} from "../../utils/Authentication";

function Login(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(process.env.REACT_APP_HOST)

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = formHandler(isLogin, validateLogin);

    function isLogin() {
        dispatch(toggleLoader(true))
        axios.post(`${process.env.REACT_APP_HOST}/users/auth`, values)
            .then((res) => {
                console.log(res.data)
                loadCredential(res.data)
                dispatch(setUserDetail(res.data))
                toast.success("Successfully Login");
                localStorage.setItem("INSTITUTE_ID", res.data._id)
                if (res.data.role === "3") {
                    console.log(res.data._id)
                    localStorage.setItem("STUDENT_ID", res.data._id)
                    localStorage.setItem("INSTITUTE_ID", res.data.instituteId)
                }
                if (res.data.role === "4") {
                    localStorage.setItem("STUDENT_ID", res.data.studentId)
                    localStorage.setItem("INSTITUTE_ID", res.data.instituteId)
                }
                navigate(initialNavigate(res.data.role));

            }).catch((err) => {
            console.log(err?.response)
            if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message)
            } else {
                toast.error("Something went wrong")
            }
        }).finally(() => {
            dispatch(toggleLoader(false))
        })

    }


    return (
        <div class="login-body">
            <div className="login-small">
                <div className="login-image">
                    <img className={"ms-5"} src={Logo} alt=""/>
                </div>
                <div className="login-head"><b>HI,Welcome back EduForge</b></div>
            </div>
            <div className={"login-container"}>
                <div className="login-img">
                    <img src={BANNER} alt="Login-Banner"/>
                </div>
                <div className="full-container">
                    <div className="login-sig">
                        <b>Sign in to EduForge</b>
                    </div>
                    {/*<div className={"login-nuser"}>*/}
                    {/*    New user? <a className="login-sign" href="http://127.0.0.1:5500/index.html">Create an account</a>*/}
                    {/*</div>*/}
                    <br/>
                    <div className="login-form-inner">
                        <form action="#" className="full-container form-login">
                            <div className="login-field">
                                <input className={`form-control ${errors.username ? "border-red" : ""}`} type="text"
                                       name={"username"} onChange={handleChange} placeholder="Username"/>
                            </div>
                            {errors.username && <p className={"text-red"}>{errors.username}</p>}
                            <div className="login-field">
                                <input className={`form-control ${errors.password ? "border-red" : ""}`} type="password"
                                       name={"password"} onChange={handleChange} placeholder="Password"/>
                            </div>
                            {errors.password && <p className={"text-red"}>{errors.password}</p>}
                            <br/>
                            {/*<a className="login-forgot" href="">Forgot Password?</a>*/}

                            <div className="login-field login-btn">
                                <div className="login-login-btn-layer">
                                    <input type="submit" value="Login" onClick={handleSubmit}/>
                                </div>
                                <br/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;