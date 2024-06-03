import React, {useEffect, useState} from 'react';
import formHandler from "../../utils/FormHandler";
import {validateStudentPasswordSettings} from "../../utils/validation";
import axios from "axios";
import {getInstituteId, getUserId, isInstituteAccount, isStudentAccount} from "../../utils/Authentication";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {toggleLoader} from "../../redux/actions";

function PasswordSetting(props) {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useDispatch();


    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(passwordUpdate, validateStudentPasswordSettings);


    function passwordUpdate() {
        console.log("done");
        setFormSubmitted(true);
    }

    useEffect(() => {
        if (!formSubmitted) {
            return
        }
        dispatch(toggleLoader(true))
        let data = {}
        data.password = values.newPassword
        if (isInstituteAccount()) {
            axios.put(`${process.env.REACT_APP_HOST}/users/${getUserId()}/profile`, data)
                .then((res) => {
                    toast.success("Password Updated Successfully")
                }).catch((err) => {
                toast.error("Something went wrong")
                console.log(err)
            }).finally(() => {
                dispatch(toggleLoader(false));
                setFormSubmitted(false)
            })
        }
        if (isStudentAccount()) {
            axios.put(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/student/${getUserId()}`, data)
                .then((res) => {
                    toast.success("Password Updated Successfully")
                }).catch((err) => {
                console.log(err)
                toast.error("Something went wrong")
            }).finally(() => {
                dispatch(toggleLoader(false))
                setFormSubmitted(false)
            })
        }
    }, [formSubmitted]);

    return (
        <div className={"form-container pt-3 mt-5"}>
            <form className={"row student-settings-form"}>
                <div class={"col-md-6"}>
                    <div className={"mb-3"}>
                        <h6><label htmlFor="exampleInputEmail1"
                                   className="settings-form-text">New Password</label></h6>
                        <input type="password" name={"newPassword"} id="exampleInputAddress"
                               placeholder={"Enter Current Password"}
                               className={`form-control ${errors.newPassword ? "border-red" : ""}`}
                               onChange={handleChange}
                        />
                        {errors.newPassword && <p className={"text-red"}>{errors.newPassword}</p>}
                    </div>
                </div>
                <div class={"col-md-6"}>
                    <div className={"mb-3"}>
                        <h6><label htmlFor="exampleInputEmail1"
                                   className="settings-form-text">Confirm Password</label></h6>
                        <input type="password" name={"confirmPassword"} id="exampleInputEmail"
                               placeholder={"Enter New Password"}
                               className={`form-control ${errors.confirmPassword ? "border-red" : ""}`}
                               onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className={"text-red"}>{errors.confirmPassword}</p>}
                    </div>
                </div>


                <div className={"modal-footer student-settings-btn"}>

                    <button type="submit" className={"btn btn-secondary students-dropdown-btn"}
                            onClick={handleSubmit}>Update Password
                    </button>

                </div>

            </form>
        </div>
    );
}

export default PasswordSetting;