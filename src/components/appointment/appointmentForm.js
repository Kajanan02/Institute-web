import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import {validateStateappointment} from "../../utils/validation";

function AppointmentForm(props) {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(stateAppoint, validateStateappointment);

    function stateAppoint() {

    }

    console.log(errors)
    console.log(values)


    console.log(props.type)

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
            }}>
                {<Modal.Title id="contained-modal-title-vcenter">
                    {props.type === "Add" &&<div> Add Appointment Details</div>}
                    {props.type === "View" &&<div> View Appointment Details</div>}
                    {props.type === "State" &&<div> Reply Appointment Details</div>}
                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : ""}`}>Parent
                                            Name</label>
                                        <input name={"parentName"} placeholder={"Enter Parent Name"}
                                               className={` form-control  ${errors.parentName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}  `}

                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                            value={values.parentName || "nava"}


                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.parentName && <p className={"text-red"}>{errors.parentName}</p>}

                                    </div>
                                </div>}
                                {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Student
                                            Name</label>
                                        <input name={"studentName"} placeholder={"Enter Parent Name"}
                                               className={`form-control ${errors.studentName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentName || ""}

                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentName && <p className={"text-red"}>{errors.studentName}</p>}

                                    </div>
                                </div>}
                                {<div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Topic</label>
                                        <input name={"topic"} placeholder={"Enter Topic"}
                                               className={`form-control ${errors.topic ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.topic || ""}
                                               aria-describedby="emailHelp"

                                               disabled={["View", "State"].includes(props.type)}/>


                                        {errors.topic && <p className={"text-red"}>{errors.topic}</p>}
                                    </div>
                                </div>}
                                {<div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Date </label>
                                        <input id="startDate"
                                               className={`form-control ${errors.date ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               onChange={handleChange}
                                               name={"date"}
                                               value={values.date || ""}
                                               type="date"

                                               disabled={["View", "State"].includes(props.type)}/>

                                        {errors.date && <p className={"text-red"}>{errors.date}</p>}
                                    </div>
                                </div>}
                                {<div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Time </label>
                                        <input id="startTime"
                                               className={`form-control  ${errors.time ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               onChange={handleChange}
                                               name={"time"}
                                               value={values.time || ""}
                                               type="time"

                                               disabled={["View", "State"].includes(props.type)}/>
                                        {errors.time && <p className={"text-red"}>{errors.time}</p>}
                                    </div>
                                </div>}

                                {["Add", "State"].includes(props.type) && <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className="form-label">Description</label>
                                        <textarea name={"description"} placeholder={"Enter Description"}
                                                  className={`form-control ${errors.description ? "border-red" : ""}`}
                                                  id="exampleInputEmail5"
                                                  onChange={handleChange}
                                                  value={values.description || ""}
                                                  aria-describedby="emailHelp"/>
                                        {errors.description && <p className={"text-red"}>{errors.description}</p>}
                                    </div>
                                </div>}


                            </div>
                        </div>
                    </div>
                </form>
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
                    }}
                >
                    Cancel
                </button>
                {/*["View","Add"].includes(props.type) &&*/}
                {props.type === "State" && <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={handleSubmit}
                >
                    Accepeted
                </button>}
                {props.type === "State" && <button
                    type="button"
                    className={"btn btn-warning"}
                    onClick={handleSubmit}
                >
                    Decline
                </button>}
                {props.type === "State" && <button
                    type="button"
                    className={"btn btn-danger"}
                    onClick={handleSubmit}
                >
                    Request
                </button>}
                {props.type === "Add" && <button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    Submit
                </button>}
            </Modal.Footer>
        </Modal>
    );
}

export default AppointmentForm;