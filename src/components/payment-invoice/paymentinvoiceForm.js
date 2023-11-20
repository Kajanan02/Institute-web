import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import {validateStatepayment} from "../../utils/validation";
import FeatherIcon from "feather-icons-react";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import {toggleLoader} from "../../redux/actions";
import axios from "axios";
import {useDispatch} from "react-redux";

function StatepaymentForm(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [directPayment, setDirectPayment] = useState(false);
    const [paymentSlip, setPaymentSlip] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const dispatch = useDispatch();


    const handleChangeSlip = (file) => {
        setPaymentSlip(file);
        // imageUpload(file, "profilePic")
    };


    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(statepayment, validateStatepayment);

    function statepayment() {

    }

    console.log(errors)
    console.log(values)
    function imageUpload(file, key) {
        console.log("Fille")

        dispatch(toggleLoader(true))
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "xi7icexi")
        data.append("cloud_name", "dacrccjrm")
        axios.put("https://api.cloudinary.com/v1_1/dacrccjrm/image/upload", data)
            .then((res) => {
                console.log(res.data.url)
                setValue({[key]: res.data.url})
            }).finally(() => dispatch(toggleLoader(false)))
    }


    useEffect(() => {
        // Initialize the form values when the modal is shown
        if (props.show) {
            initForm({});

            setFormSubmitted(false);
        }
    }, [props.show]);
    console.log(directPayment)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            scrollable={true}
        >
            <Modal.Header closeButton onHide={() => {
                if (!formSubmitted) {
                    initForm({});
                }
                setDirectPayment(false)

            }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {<Modal.Title id="contained-modal-title-vcenter">
                        {props.type === "Add" && <div> Add Payment Details</div>}
                        {props.type === "View" && <div> View Payment Details</div>}
                        {props.type === "State" && <div> Reply Payment Details</div>}
                    </Modal.Title>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body scrollable>

                {props.type === "Add" && !directPayment && <div>
                    <button type="button" className={"btn btn-secondary students-dropdown-btn payment-method-btn"}
                            onClick={() => {
                                // setModalType("Add");
                                // setModalShow(true)
                            }}>
                        {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"}/>*/}
                        Online Payment
                    </button>
                    <button type="button" className={"btn btn-secondary students-dropdown-btn payment-method-btn"}
                            onClick={() => {
                                setDirectPayment(true)
                            }}>
                        {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"}/>*/}
                        Direct Payment
                    </button>
                </div>}
                {directPayment && <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                {<div
                                    className={`  ${["View", "State"].includes(props.type) ? " col-md-6" : "col-md-12"}  `}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Student
                                            Name</label>
                                        <input name={"studentName"} placeholder={"Enter Parent Name"}
                                               className={`form-control ${errors.studentName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentName || ""}

                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentName && <p className={"text-red"}>{errors.studentName}</p>}

                                    </div>
                                </div>}
                                {props.type === "Add" && <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className="form-label">Student NIC</label>
                                        <input name={"studentNIC"} placeholder={"Enter Topic"}
                                               className={`form-control ${errors.studentNIC ? "border-red" : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentNIC || ""}
                                               aria-describedby="emailHelp"/>
                                        {errors.studentNIC && <p className={"text-red"}>{errors.studentNIC}</p>}
                                    </div>
                                </div>}

                                {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Reg.No</label>
                                        <input name={"regNo"} placeholder={"Enter Reg No"}
                                               className={`form-control ${errors.regNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.regNo || ""}

                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.regNo && <p className={"text-red"}>{errors.regNo}</p>}

                                    </div>
                                </div>}


                                {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Date </label>
                                        <input id="startDate"
                                               className={`form-control ${errors.date ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               onChange={handleChange}
                                               name={"date"}
                                               value={values.date || ""}
                                               type="date"

                                               disabled={["View", "State"].includes(props.type)}/>
                                        {errors.date && <p className={"text-red"}>{errors.date}</p>}
                                    </div>
                                </div>}
                                {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Time </label>
                                        <input id="startTime"
                                               className={`form-control ${errors.time ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               onChange={handleChange}
                                               name={"time"}
                                               value={values.time || ""}
                                               type="time"

                                               disabled={["View", "State"].includes(props.type)}/>
                                        {errors.time && <p className={"text-red"}>{errors.time}</p>}
                                    </div>
                                </div>}

                                {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Payment
                                            Method</label>
                                        <input name={"paymentMethod"} placeholder={"Enter Payment Method"}
                                               className={`form-control ${errors.paymentMethod ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.paymentMethod || ""}
                                               aria-describedby="emailHelp"

                                               disabled={["View", "State"].includes(props.type)}/>
                                        {errors.paymentMethod && <p className={"text-red"}>{errors.paymentMethod}</p>}
                                    </div>
                                </div>}
                                {<div
                                    className={`  ${["View", "State"].includes(props.type) ? " col-md-6" : "col-md-12"}  `}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Amount</label>
                                        <input name={"amount"} placeholder={"Enter Amount"}
                                               className={`form-control ${errors.amount ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.amount || ""}
                                               aria-describedby="emailHelp"

                                               disabled={["View", "State"].includes(props.type)}/>
                                        {errors.amount && <p className={"text-red"}>{errors.amount}</p>}
                                    </div>
                                </div>}

                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label d-block">Profile
                                            Picture</label>
                                        <FileUploader handleChange={handleChangeSlip}>
                                            <div className={"file-uploader-container"}>
                                                <img src={uploadIcon} width={"27%"}/>
                                                {!paymentSlip?.name ? <div>
                                                        <div className={"fw-semibold my-2"}>Drop or Select file
                                                        </div>
                                                        <div className={""}>Drop files here or click <span
                                                            className={"text-success text-decoration-underline mt-3"}>browse</span> thorough
                                                            your machine
                                                        </div>
                                                    </div> :
                                                    <div className={"fw-semibold my-2"}>{paymentSlip?.name}</div>
                                                }
                                            </div>
                                        </FileUploader>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>}
            </Modal.Body>
            <Modal.Footer>


                <button
                    type="button"
                    className={"btn btn-secondary"}
                    onClick={() => {
                        if (!formSubmitted) { // Prevent hiding the modal if the form is submitted
                            props.onHide();
                            initForm({});
                        }
                        setDirectPayment(false)
                    }}
                >
                    Cancel
                </button>


                {props.type === "State" && <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={handleSubmit}
                >
                    Paid
                </button>}
                {props.type === "State" && <button
                    type="button"
                    className={"btn btn-danger"}
                    onClick={handleSubmit}
                >
                    Pending
                </button>}

                {props.type !== "Add" && <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={handleSubmit}
                >
                    Pay
                </button>}
            </Modal.Footer>
        </Modal>
    );
}

export default StatepaymentForm;