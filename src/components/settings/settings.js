import React from 'react';
import Layout from "../../layout/layout";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";

function Settings(props) {
    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div><h3 className={"content-heading pb-4"}>Settings</h3></div>
                    <div><h5>Profile Settings</h5></div>
                    <div className={"form-container"}>
                        <form className={"row student-settings-form"}>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">First
                                        Name</label></h6>
                                    <input type="text" className="form-control form-input"
                                                                   id="exampleInputfName"
                                                                   placeholder={"Enter First name"}/>
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Last
                                        Name</label></h6>
                                    <input type="text" className="form-control" id="exampleInputlName"
                                           placeholder={"Enter Last name"}/>
                                </div>
                            </div>


                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Contact
                                        No</label></h6>
                                    <input type="number" className="form-control" id="exampleInputContactNo"
                                           placeholder={"Enter Contact No"}/>
                                </div>
                            </div>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Address</label></h6>
                                    <input type="text" className={"form-control"} id="exampleInputAddress"
                                           placeholder={"Enter Address"}/>
                                </div>
                            </div>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Email</label></h6>
                                    <input type="email" className="form-control" id="exampleInputEmail"
                                           placeholder={"Enter Email"}/>
                                </div>
                            </div>


                            <div className={"modal-footer student-settings-btn"}>

                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}>Update Profile
                                </button>

                            </div>

                        </form>
                    </div>
                    <div className={"mt-5"}><h5>Password Settings</h5></div>
                    <div className={"form-container pt-3"}>
                        <form className={"row student-settings-form"}>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Current Password</label></h6>
                                    <input type="password" className={"form-control"} id="exampleInputAddress"
                                           placeholder={"Enter Current Password"}/>
                                </div>
                            </div>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">New Password</label></h6>
                                    <input type="password" className="form-control" id="exampleInputEmail"
                                           placeholder={"Enter New Password"}/>
                                </div>
                            </div>


                            <div className={"modal-footer student-settings-btn"}>

                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}>Update Password
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </Layout>
    );
}

export default Settings;