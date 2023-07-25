import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import MultiSelect from "@khanacademy/react-multi-select";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import {studentData, subjectData} from "./damiData";
import formHandler from "../../utils/FormHandler";
import {validateStudent} from "../../utils/validation";
import {mapObject} from "underscore";

function Students(props) {

    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [studentsList, setStudentsList] = useState(studentData)
    const [modalType, setModalType] = useState("view")
    const buyerOption = subjectData;
    const [profilePic, setProfilePic] = useState(null);


    const {
        handleChange,
        handleSubmit,
        setValue,
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

    console.log(values)
    console.log(errors)


    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Students Details</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"marks-dropdown-container"}>


                                <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setModalType("Add")}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>
                                    Add
                                </button>


                                <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                        aria-expanded="false">
                                    <FeatherIcon className={"action-icons text-white"} icon={"download"}/>
                                    Import Data
                                </button>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                        aria-expanded="false">
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"table-container p-2 pt-0 "}>
                        <table className={"table table-hover table-striped sa-table-width"}>
                            <thead>
                            <tr className={"position-sticky top-0 pt-1 h-45"}>
                                <th scope="col">No</th>
                                <th scope="col">Reg.No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Stream</th>
                                <th scope="col">Join Date</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentsList.map((data, index) => (<tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.Reg}</td>
                                <td>{data.name}</td>
                                <td>{data.stream}</td>
                                <td>{data.joindate}</td>
                                <td className={"table-action"}>


                                    <FeatherIcon className={"action-icons"} icon={"eye"} data-bs-toggle="modal"
                                                 data-bs-target="#exampleModal" onClick={() => setModalType("View")}/>
                                    <FeatherIcon className={"action-icons"} icon={"edit"} data-bs-toggle="modal"
                                                 data-bs-target="#exampleModal" onClick={() => setModalType("Edit")}/>
                                    <FeatherIcon className={"action-icons text-red"} icon={"trash-2"}/>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div className={"modal fade"} id="exampleModal" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className={"modal-dialog modal-dialog-centered box-popup modal-lg modal-dialog-scrollable"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h1 className={"modal-title fs-5"} id="exampleModalLabel">{modalType} Students Details</h1>
                            <button type="button" className={"btn-close"} onClick={() => {
                               setValue(mapObject(values, function(val, key) {
                                    return val = '';
                                }))
                            }} data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
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

                            <div className={"modal-footer"}>
                                <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel
                                </button>
                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}>Update
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </Layout>
    );
}

export default Students;
