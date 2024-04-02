import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import formHandler from "../../utils/FormHandler";
import {validateInstituteSetting} from "../../utils/validation";
import PasswordSetting from "../password-setting/password-setting";
import {setUserDetail, toggleLoader} from "../../redux/actions";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getUserId, isInstituteAccount} from "../../utils/Authentication";
import {toast} from "react-toastify";

function Settings(props) {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(institutesetting, validateInstituteSetting);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({})


    function institutesetting() {
        setFormSubmitted(true)
    }

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/users/allprofile`)
            .then((res) => {
                setUserData(res.data.filter((item) => item._id === getUserId())[0])
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])

    useEffect(() => {
        initForm(userData);
    }, [userData]);


    useEffect(() => {
        if (!formSubmitted) {
            return
        }
        dispatch(toggleLoader(true))
        axios.put(`${process.env.REACT_APP_HOST}/users/${getUserId()}/profile`, values)
            .then((res) => {
                localStorage.setItem("NAME", res.data.name)
                dispatch(setUserDetail(res.data))
                toast.success("Profile Updated Successfully")
            }).catch((err) => {
            toast.error("Something went wrong")
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
            setFormSubmitted(false)
        })

    }, [formSubmitted])


    return (
        <Layout>

            <div className={"container"}>
                <div className={"container-widget"}>
                    <div><h3 className={"content-heading pb-4"}>Settings</h3></div>

                    <div className={"form-container"}>
                        <form onSubmit={handleSubmit} className={"row student-settings-form"}>
                            {!isInstituteAccount() && <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">
                                        Name</label></h6>
                                    <input name={"name"} placeholder={"Enter First Name"}
                                           className={`form-control ${errors.firstname ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.firstname || ""}
                                    />
                                    {errors.firstname && <p className={"text-red"}>{errors.firstname}</p>}

                                </div>
                            </div>}
                            {!isInstituteAccount() && <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Last
                                        Name</label></h6>
                                    <input name={"name"} placeholder={"Enter Last Name"}
                                           className={`form-control ${errors.lastname ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.lastname || ""}
                                    />
                                    {errors.lastname && <p className={"text-red"}>{errors.lastname}</p>}

                                </div>
                            </div>}
                            {isInstituteAccount() && <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Name</label>
                                    </h6>
                                    <input name={"name"} placeholder={"Enter Last Name"}
                                           className={`form-control ${errors.name ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.name || ""}
                                    />
                                    {errors.name && <p className={"text-red"}>{errors.name}</p>}

                                </div>
                            </div>}
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Contact
                                        No</label></h6>
                                    <input name={"phoneNumber"} placeholder={"Enter  Contact No"}
                                           className={`form-control ${errors.phoneNumber ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.phoneNumber || ""}
                                    />
                                    {errors.phoneNumber && <p className={"text-red"}>{errors.phoneNumber}</p>}

                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Address
                                    </label></h6>
                                    <input name={"address"} placeholder={"Enter Address"}
                                           className={`form-control ${errors.address ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.address || ""}
                                    />
                                    {errors.address && <p className={"text-red"}>{errors.address}</p>}

                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Email
                                    </label></h6>
                                    <input name={"email"} placeholder={"Enter Email"}
                                           className={`form-control ${errors.email ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.email || ""}
                                    />
                                    {errors.email && <p className={"text-red"}>{errors.email}</p>}

                                </div>
                            </div>
                            <div className={"modal-footer student-settings-btn"}>

                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}
                                        onClick={handleSubmit}>Update
                                </button>

                            </div>

                        </form>
                    </div>
                    <PasswordSetting/>
                </div>
            </div>
        </Layout>
    );
}

export default Settings;