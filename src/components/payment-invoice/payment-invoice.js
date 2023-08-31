import React, { useEffect, useState } from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import MultiSelect from "@khanacademy/react-multi-select";
import { FileUploader } from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import { studentData, subjectData } from "./damiData";
import formHandler from "../../utils/FormHandler";
import { validateStudent } from "../../utils/validation";
import { mapObject } from "underscore";

function PaymentInvoice(props) {

    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [appointmentList, setappointmentList] = useState(studentData)
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

    useEffect(() => {
        // setValue({name:"oppai"})
    }, [])

    console.log(values)
    console.log(errors)




    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Payment Invoice</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"table-btn-container"}>

                                <div className={"appointment-search"}>
                                    <div className="container-fluid">
                                        <form className="d-flex" role="search">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                        </form>
                                    </div>
                                </div>

                                <button type="button" className={"btn btn-secondary students-dropdown-btn "}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setModalType("Add")}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"} />
                                    Add
                                </button>

                                <button type="button" className={"btn btn-secondary students-dropdown-btn "}
                                        // data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setModalType("graph")}>
                                    {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"} />*/}
                                    Graph
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className={"table-container p-2 pt-0 "}>
                        <table className={"table table-hover table-striped sa-table-width"}>

                            <thead>
                            <tr className={"position-sticky top-0 pt-1 h-45"}>

                                <th scope="col">No</th>
                                <th scope="col">Date </th>
                                <th scope="col">Time </th>
                                <th scope="col">Name</th>
                                <th scope="col">Method</th>
                                <th scope="col">Reg.No</th>
                                <th scope="col">State</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {appointmentList.map((data, index) => (<tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>

                                <td>{data.date}</td>
                                <td>{data.Time}</td>
                                <td>{data.student_name}</td>
                                <td>{data.Method}</td>
                                <td>{data.Reg}</td>
                                <td ><div className={"appointment_state"} data-bs-dismiss="modal" data-bs-toggle="modal"
                                          data-bs-target="#exampleModal2" onClick={() => setModalType("View")}>{data.state}</div></td>


                                <td className={"table-action"}>




                                    {/* <FeatherIcon className={"action-icons"} icon={"edit"} data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onClick={() => setModalType("Edit")} /> */}
                                    <FeatherIcon className={"action-icons"} icon={"eye"} data-bs-toggle="modal"
                                                 data-bs-target="#exampleModal1" onClick={() => setModalType("View")} />
                                    {/* <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} /> */}
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
                            <h1 className={"modal-title fs-5"} id="exampleModalLabel">{modalType} Payment Details</h1>
                            <button type="button" className={"btn-close"} onClick={() => {
                                setValue(mapObject(values, function (val, key) {
                                    return val = '';
                                }))
                            }} data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div>

                                <div className={"pop-up-form-container"}>
                                    <div className={"row"}>
                                        <div className={"col-md-12"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Student Name</label>
                                                <input name={"Student_Name"} placeholder={"Enter Student Name"}
                                                       className={`form-control ${errors.name ? "border-red" : ""}`}
                                                       id="exampleInputStudentName"
                                                       onChange={handleChange}
                                                       value={values.Topic}
                                                />
                                                {errors.name && <p className={"warning-text"}>{errors.Student_Name}</p>}

                                            </div>
                                        </div>



                                        <div className={"col-md-12"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputDesiription1"
                                                       className="form-label">student NIC</label>
                                                <input type="desiription" name={"student_NIC"} placeholder={"Enter student NIC"}
                                                       className="form-control" id="exampleInputstudentNIC"
                                                       aria-describedby="student_NIC" />
                                            </div>
                                        </div>

                                        <div className={"col-md-12"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputDesiription1"
                                                       className="form-label">Amount</label>
                                                <input type="desiription" name={"Amount"} placeholder={"Enter Amount"}
                                                       className="form-control" id="exampleInputAmount"
                                                       aria-describedby="Amount" />
                                            </div>
                                        </div>










                                    </div>
                                </div>
                            </div>

                            <div className={"modal-footer"}>
                                <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel
                                </button>
                                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}> Pay
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className={"modal fade"} id="exampleModal1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className={"modal-dialog modal-dialog-centered box-popup modal-lg modal-dialog-scrollable"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h1 className={"modal-title fs-5"} id="exampleModalLabel">{modalType} Payment Invoice Details</h1>
                            <button type="button" className={"btn-close"} onClick={() => {
                                setValue(mapObject(values, function (val, key) {
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
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">Reg.No</label>
                                                <input type="email" name={"address"} placeholder={"Enter Reg.No"}
                                                       className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Student Name</label>
                                                <input name={"Student_name"} placeholder={"Enter Name"}
                                                       className={`form-control ${errors.name ? "border-red" : ""}`}
                                                       id="exampleInputEmail1"
                                                       onChange={handleChange}
                                                       value={values.Student_name}
                                                />
                                                {errors.name && <p className={"warning-text"}>{errors.Student_name}</p>}

                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Date </label>
                                                <input id="startDate" className="form-control" type="date" />
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Time </label>
                                                <input id="startTime" className="form-control" type="Time" />
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">Payment Method</label>
                                                <input type="email" name={"address"} placeholder={"Enter Payment Method"}
                                                       className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">Amount</label>
                                                <input type="email" name={"address"} placeholder={"Enter Amount"}
                                                       className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp" />
                                            </div>
                                        </div>










                                    </div>
                                </div>
                            </div>

                            {/*<div className={"modal-footer"}>*/}
                            {/*    <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel*/}
                            {/*    </button>*/}
                            {/*    <button type="submit" className={"btn btn-success"}> Active*/}
                            {/*    </button>*/}
                            {/*    <button type="submit" className={"btn btn-danger"}>Pending*/}
                            {/*    </button>*/}
                            {/*    <button type="submit" className={"btn btn-warning"}> Banned*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </form>

                    </div>
                </div>
            </div>

            <div className={"modal fade"} id="exampleModal2" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className={"modal-dialog modal-dialog-centered box-popup modal-lg modal-dialog-scrollable"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h1 className={"modal-title fs-5"} id="exampleModalLabel">{modalType} Payment Invoice Details</h1>
                            <button type="button" className={"btn-close"} onClick={() => {
                                setValue(mapObject(values, function (val, key) {
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
                                                <label htmlFor="exampleInputEmail1" className="form-label">Parent Name</label>
                                                <input name={"Parent_name"} placeholder={"Enter Name"}
                                                       className={`form-control ${errors.name ? "border-red" : ""}`}
                                                       id="exampleInputEmail1"
                                                       onChange={handleChange}
                                                       value={values.Parent_name}
                                                />
                                                {errors.name && <p className={"warning-text"}>{errors.Parent_name}</p>}

                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Student Name</label>
                                                <input name={"Student_name"} placeholder={"Enter Name"}
                                                       className={`form-control ${errors.name ? "border-red" : ""}`}
                                                       id="exampleInputEmail1"
                                                       onChange={handleChange}
                                                       value={values.Student_name}
                                                />
                                                {errors.name && <p className={"warning-text"}>{errors.Student_name}</p>}

                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Date </label>
                                                <input id="startDate" className="form-control" type="date" />
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Time </label>
                                                <input id="startTime" className="form-control" type="Time" />
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">Payment Method</label>
                                                <input type="email" name={"address"} placeholder={"Enter Payment Method"}
                                                       className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">Amount</label>
                                                <input type="email" name={"address"} placeholder={"Enter Amount"}
                                                       className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        {/*<div className={"col-md-6"}>*/}
                                        {/*    <div className="mb-3">*/}
                                        {/*        <label htmlFor="exampleInputEmail1" className="form-label">Contact*/}
                                        {/*            No</label>*/}
                                        {/*        <input type="email" name={"phoneNumber"}*/}
                                        {/*               placeholder={"Enter Contact No"}*/}
                                        {/*               className="form-control" id="exampleInputEmail1"*/}
                                        {/*               aria-describedby="emailHelp" />*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}









                                    </div>
                                </div>
                            </div>

                            <div className={"modal-footer"}>
                                <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel
                                </button>
                                <button type="submit" className={"btn btn-success"}> paid
                                </button>

                                <button type="submit" className={"btn btn-danger"}> Declined
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default PaymentInvoice;