import React, {useState} from 'react';
import Layout from "../../../layout/layout";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../../assets/uplod-icon.svg";
import {subjectData} from "../../student-list/damiData";
import formHandler from "../../../utils/FormHandler";
import {validateStudentSettings} from "../../../utils/validation";
import {validateStudentPasswordSettings} from "../../../utils/validation";
import PasswordSetting from "../../password-setting/password-setting";

function StudentSetting(props) {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
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
        handlePasswordSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isStudentSetting, validateStudentSettings);

    function isStudentSetting() {
        // if (currentStep === 1) {
        //     resetForm()
        //     setCurrentStep(2)
        //     console.log("student Done")
        // }
        // if (currentStep === 2) {
        //     console.log("parent Done")
        // }
    }


    // function resetForm() {
    //     initForm({})
    //     setProfilePic(null)
    //     setNicFront(null)
    //     setNicBack(null)
    // }


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

    console.log(errors)
    console.log(values)

    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div><h3 className={"content-heading pb-4"}>Students Settings</h3></div>
                    <div className={"form-container"}>
                        <form className={"row student-settings-form"} onSubmit={handleSubmit}>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">First
                                        Name</label></h6>
                                    <input type="text" name={"firstname"}
                                           className={`form-control form-input ${errors.firstname ? "border-red" : ""}`}
                                           onChange={handleChange}
                                           id="exampleInputfName"
                                           placeholder={"Enter First name"}
                                    />
                                    {errors.firstname && <p className={"text-red"}>{errors.firstname}</p>}
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Last
                                        Name</label></h6>
                                    <input type="text" name={"lastname"}
                                           id="exampleInputlName"
                                           placeholder={"Enter Last name"}
                                           className={`form-control ${errors.lastname ? "border-red" : ""}`}
                                           onChange={handleChange}
                                    />
                                    {errors.lastname && <p className={"text-red"}>{errors.lastname}</p>}
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Gender</label></h6>
                                    <input type="text" name={"gender"} id="exampleInputGender"
                                           placeholder={"Enter Gender"}
                                           className={`form-control ${errors.gender ? "border-red" : ""}`}
                                           onChange={handleChange}
                                    />
                                    {errors.gender && <p className={"text-red"}>{errors.gender}</p>}
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Date
                                        of Birth</label></h6>
                                    <input type="date" name={"dob"} id="exampleInputdate"
                                           placeholder={"Enter Date of birth"}
                                           className={`form-control ${errors.dob ? "border-red" : ""}`}
                                           onChange={handleChange}
                                    />
                                    {errors.dob && <p className={"text-red"}>{errors.dob}</p>}
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">NIC
                                        No</label></h6>
                                    <input type="text" name={"nicNo"} id="exampleInputNicNo"
                                           placeholder={"Enter NIC No"}
                                           className={`form-control ${errors.nicNo ? "border-red" : ""}`}
                                           onChange={handleChange}
                                    />
                                    {errors.nicNo && <p className={"text-red"}>{errors.nicNo}</p>}
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Contact
                                        No</label></h6>
                                    <input type="number" name={"phoneNumber"} id="exampleInputContactNo"
                                           placeholder={"Enter Contact No"}
                                           className={`form-control ${errors.phoneNumber ? "border-red" : ""}`}
                                           onChange={handleChange}
                                    />
                                    {errors.phoneNumber && <p className={"text-red"}>{errors.phoneNumber}</p>}
                                </div>
                            </div>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Address</label></h6>
                                    <input type="text" name={"address"} id="exampleInputAddress"
                                           placeholder={"Enter Address"}
                                           className={`form-control ${errors.address ? "border-red" : ""}`}
                                           onChange={handleChange}
                                    />
                                    {errors.address && <p className={"text-red"}>{errors.address}</p>}
                                </div>
                            </div>
                            <div class={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="settings-form-text">Email</label></h6>
                                    <input type="email" name={"email"} id="exampleInputEmail"
                                           placeholder={"Enter Email"}
                                           className={`form-control ${errors.email ? "border-red" : ""}`}
                                           onChange={handleChange}
                                    />
                                    {errors.email && <p className={"text-red"}>{errors.email}</p>}
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
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="form-label d-block settings-form-text">NIC
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
                                    <h6><label htmlFor="exampleInputEmail1"
                                               className="form-label d-block settings-form-text">NIC
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

export default StudentSetting;