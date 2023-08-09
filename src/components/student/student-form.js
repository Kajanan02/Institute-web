import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import MultiSelect from "@khanacademy/react-multi-select";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import formHandler from "../../utils/FormHandler";
import {validateStudent} from "../../utils/validation";
import {studentData, subjectData} from "./damiData";

function StudentForm(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const buyerOption = subjectData;
    const [profilePic, setProfilePic] = useState(null);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isLoading, validateStudent);

    function isLoading() {
        console.log("All are done")
    }

    function multiSelectOnChangeBuyer(selected) {
        setSelectedBuyer(selected);
        // setValue({previousBuyer: selected});
    }

    const handleChangeProfile = (file) => {
        setProfilePic(file);
    };

    useEffect(()=>{
        // setValue({name:"oppai"})
    },[])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.type === "Add" ? "Add Student Details" : "Edit Student Details"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>

                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input name={"name"} placeholder={"Enter Name"}
                                               className={`form-control ${errors.name ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.name}
                                        />
                                        {errors.name && <p className={"warning-text"}>{errors.name}</p>}

                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Nic
                                            No</label>
                                        <input type="email" name={"nicNo"} placeholder={"Enter Nic No"}
                                               className="form-control" id="exampleInputEmail1"
                                               aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Address</label>
                                        <input type="email" name={"address"} placeholder={"Enter Address"}
                                               className="form-control" id="exampleInputEmail1"
                                               aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Contact
                                            No</label>
                                        <input type="email" name={"phoneNumber"}
                                               placeholder={"Enter Contact No"}
                                               className="form-control" id="exampleInputEmail1"
                                               aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" name={"email"} placeholder={"Enter Email"}
                                               className="form-control" id="exampleInputEmail1"
                                               aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Gender</label>
                                        <select className="form-select" placeholder={"Enter Contact No"}
                                                aria-label="Default select example">
                                            <option>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Not Specified">Not Specified</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Date of
                                            Birth</label>
                                        <input id="startDate" className="form-control" type="date"/>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Subjects</label>
                                        <div className={`form-control p-0`}>
                                            <MultiSelect
                                                className={"multi-select"}
                                                options={buyerOption}
                                                selected={selectedBuyer}
                                                onSelectedChanged={multiSelectOnChangeBuyer}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label d-block">Profile
                                            pic</label>
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
                                        <label htmlFor="exampleInputEmail1" className="form-label d-block">NIC
                                            Front</label>
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
                                        <label htmlFor="exampleInputEmail1" className="form-label d-block">NIC
                                            Back</label>
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
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className={"btn btn-secondary"} onClick={props.onHide}>Cancel
                </button>
                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}>Update
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default StudentForm;