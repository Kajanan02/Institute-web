import React, {useState} from 'react';
import Layout from "../../layout/layout";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import formHandler from "../../utils/FormHandler";
import {validateinstitutesetting,validateinstitutesettingpassword} from "../../utils/validation";

function Settings(props) {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(institutesetting, validateinstitutesetting);

    function institutesetting() {

    }
    console.log(errors)
    console.log(values)


    console.log(props.type)

    return (
        <Layout>

            <div className={"container"}>
                <div className={"container-widget"}>
                    <div><h3 className={"content-heading pb-4"}>Settings</h3></div>
                    <div><h5>Profile Settings</h5></div>
                    <div className={"form-container"}>
                        <form  onSubmit={handleSubmit} className={"row student-settings-form"}>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">First
                                        Name</label></h6>
                                    <input name={"name"} placeholder={"Enter First Name"}
                                           className={`form-control ${errors.firstname ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.firstname || ""}
                                    />
                                    {errors.firstname && <p className={"text-red"}>{errors.firstname}</p>}

                                </div>
                            </div>
                            <div className={"col-md-6"}>
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
                            </div>


                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Contact
                                        No</label></h6>
                                    <input name={"name"} placeholder={"Enter  Contact No"}
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
                                    <input name={"name"} placeholder={"Enter Address"}
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

                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"} onClick={handleSubmit}>Update
                                </button>

                            </div>



                        </form>
                    </div>
                    <div className={"mt-5"}><h5>Password Settings</h5></div>
                    <div className={"form-container pt-3"}>
                        <form className={"row student-settings-form"}>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Current
                                        Password
                                    </label></h6>
                                    <input name={"currentPassword"} placeholder={"Enter Current Password"}
                                           className={`form-control ${errors.currentPassword ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.currentPassword || ""}
                                    />
                                    {props.type === "State" &&errors.currentPassword && <p className={"text-red"}>{errors.currentPassword}</p>}

                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">New Password
                                    </label></h6>
                                    <input name={"newPassword"} placeholder={"Enter New Password"}
                                           className={`form-control ${errors.newPassword ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           onChange={handleChange}
                                           value={values.newPassword || ""}
                                    />
                                    {props.type === "State" &&errors.newPassword && <p className={"text-red"}>{errors.newPassword}</p>}

                                </div>
                            </div>

                            <div className={"modal-footer student-settings-btn"}>

                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"} onClick={handleSubmit}>Update Password
                                </button>

                            </div>
                            {/*{<button*/}
                            {/*    type="submit"*/}
                            {/*    className={"btn btn-secondary students-dropdown-btn"}*/}
                            {/*    onClick={handleSubmit}*/}
                            {/*>*/}
                            {/*    Update Password*/}
                            {/*</button>}*/}


                        </form>
                    </div>
                </div>
            </div>


        </Layout>
    );
}

export default Settings;