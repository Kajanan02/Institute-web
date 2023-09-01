import React, {useState} from 'react';
import Layout from "../../../layout/layout";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../../assets/uplod-icon.svg";
import {subjectData} from "../../student-list/damiData";
import formHandler from "../../../utils/FormHandler";
import {validateParent, validateStudent} from "../../../utils/validation";

function StudentSetting(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const buyerOption = subjectData;
    const [profilePic, setProfilePic] = useState(null);
    const [nicFront, setNicFront] = useState(null);
    const [nicBack, setNicBack] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isLoading, currentStep === 1 ? validateStudent : validateParent);

    function isLoading() {
        if (currentStep === 1) {
            resetForm()
            setCurrentStep(2)
            console.log("student Done")
        }
        if (currentStep === 2) {
            console.log("parent Done")
        }
    }

    function resetForm() {
        initForm({})
        setProfilePic(null)
        setNicFront(null)
        setNicBack(null)
    }

    console.log(errors)
    console.log(values)

    function multiSelectOnChangeSubjects(selected) {
        setSelectedBuyer(selected);
        setValue({subjects: selected});
    }

    const handleChangeProfile = (file) => {
        setProfilePic(file);
    };

    const handleChangeNicFront = (file) => {
        setNicFront(file);
    };

    const handleChangeNicBack = (file) => {
        setNicBack(file);
    };

    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div><h3 className={"content-heading pb-4"}>Students Settings</h3></div>
                    <div className={"form-container"}>
                        <form className={"row student-settings-form"}>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <div><h6><label htmlFor="exampleInputEmail1" className="settings-form-text">First
                                        Name</label></h6></div>
                                    <div className={"pt-0"}><input type="text" className="form-control form-input" id="exampleInputfName" placeholder={"Enter First name"}/></div>
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text" >Last
                                        Name</label></h6>
                                    <input type="text" className="form-control" id="exampleInputlName" placeholder={"Enter Last name"}/>
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Gender</label></h6>
                                    <input type="text" className="form-control" id="exampleInputGender" placeholder={"Enter Gender"}/>
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text" >Date
                                        of Birth</label></h6>
                                    <input type="date" className="form-control" id="exampleInputdate" placeholder={"Enter Date of birth"}/>
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text" >NIC
                                        No</label></h6>
                                    <input type="text" className="form-control" id="exampleInputNicNo" placeholder={"Enter NIC No"}/>
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Contact
                                        No</label></h6>
                                    <input type="number" className="form-control" id="exampleInputContactNo" placeholder={"Enter Contact No"}/>
                                </div>
                            </div>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Address</label></h6>
                                    <input type="text" className={"form-control"} id="exampleInputAddress" placeholder={"Enter Address"}/>
                                </div>
                            </div>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Email</label></h6>
                                    <input type="email" className="form-control" id="exampleInputEmail" placeholder={"Enter Email"}/>
                                </div>
                            </div>
                            <div className={"col-md-12"}>
                                <div className="mb-3">
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="form-label d-block settings-form-text">Profile
                                        Picture</label></h6>
                                    <FileUploader handleChange={handleChangeProfile}>
                                        <div className={"file-uploader-container"}>
                                            <img src={uploadIcon} width={"27%"}/>
                                            {!profilePic?.name ? <div>
                                                    <div className={"fw-semibold my-2"}>Drop or Select file
                                                    </div>
                                                    <div className={""}>Drop files here or click <span
                                                        className={"text-success text-decoration-underline mt-3"}>browse</span> thorough
                                                        your machine
                                                    </div>
                                                </div> :
                                                <div className={"fw-semibold my-2"}>{profilePic?.name}</div>
                                            }
                                        </div>
                                    </FileUploader>
                                </div>
                            </div>
                            <div className={"col-md-12"}>
                                <div className="mb-3">
                                    <h6><label htmlFor="exampleInputEmail1" className="form-label d-block settings-form-text">NIC
                                        Front</label></h6>
                                    <FileUploader handleChange={handleChangeNicFront}>
                                        <div className={"file-uploader-container"}>
                                            <img src={uploadIcon} width={"27%"}/>
                                            {!nicFront?.name ? <div>
                                                    <div className={"fw-semibold my-2"}>Drop or Select file
                                                    </div>
                                                    <div className={""}>Drop files here or click <span
                                                        className={"text-success text-decoration-underline mt-3"}>browse</span> thorough
                                                        your machine
                                                    </div>
                                                </div> :
                                                <div className={"fw-semibold my-2"}>{nicFront?.name}</div>
                                            }
                                        </div>
                                    </FileUploader>
                                </div>
                            </div>
                            <div className={"col-md-12"}>
                                <div className="mb-3">
                                    <h6><label htmlFor="exampleInputEmail1" className="form-label d-block settings-form-text">NIC
                                        Back</label></h6>
                                    <FileUploader handleChange={handleChangeNicBack}>
                                        <div className={"file-uploader-container"}>
                                            <img src={uploadIcon} width={"27%"}/>
                                            {!nicBack?.name ? <div>
                                                    <div className={"fw-semibold my-2"}>Drop or Select file
                                                    </div>
                                                    <div className={""}>Drop files here or click <span
                                                        className={"text-success text-decoration-underline mt-3"}>browse</span> thorough
                                                        your machine
                                                    </div>
                                                </div> :
                                                <div className={"fw-semibold my-2"}>{nicBack?.name}</div>
                                            }
                                        </div>
                                    </FileUploader>
                                </div>
                            </div>
                            <div className={"modal-footer student-settings-btn"}>

                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}>Update
                                </button>
                                <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className={"form-container pt-3 mt-5"}>
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
                                <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default StudentSetting;