import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import formHandler from "../../../utils/FormHandler";
import { validateCreer } from "../../../utils/validation";

function CareerForm(props) {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(stateAppoint, validateCreer);

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
                    {props.type === "Add" && <div> Add Career Details</div>}
                    {props.type === "View" && <div> View Career Details</div>}

                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>


                                {<div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Course </label>
                                        <input name={"course"} placeholder={"Enter Course Name"}
                                            className={`form-control ${errors.course ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            id="exampleInputEmail5"
                                            onChange={handleChange}
                                            value={values.course || ""}
                                            aria-describedby="emailHelp"

                                            disabled={["View", "State"].includes(props.type)} />


                                        {errors.course && <p className={"text-red"}>{errors.course}</p>}
                                    </div>
                                </div>}

                                {<div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Degree Programme </label>
                                        <input name={"degreeProgramme"} placeholder={"Enter Degree Programme"}
                                            className={`form-control ${errors.degreeProgramme ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            id="exampleInputEmail5"
                                            onChange={handleChange}
                                            value={values.degreeProgramme || ""}
                                            aria-describedby="emailHelp"

                                            disabled={["View", "State"].includes(props.type)} />


                                        {errors.degreeProgramme && <p className={"text-red"}>{errors.degreeProgramme}</p>}
                                    </div>
                                </div>}

                                {<div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Available Universities </label>
                                        <input name={"availableUniversities"} placeholder={"Enter Available Universities"}
                                            className={`form-control ${errors.availableUniversities ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            id="exampleInputEmail5"
                                            onChange={handleChange}
                                            value={values.availableUniversities || ""}
                                            aria-describedby="emailHelp"

                                            disabled={["View", "State"].includes(props.type)} />


                                        {errors.availableUniversities && <p className={"text-red"}>{errors.availableUniversities}</p>}
                                    </div>
                                </div>}

                                {<div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Mediumof Instructions </label>
                                        <input name={"mediumofInstructions"} placeholder={"Enter Mediumof Instructions"}
                                            className={`form-control ${errors.mediumofInstructions ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            id="exampleInputEmail5"
                                            onChange={handleChange}
                                            value={values.mediumofInstructions || ""}
                                            aria-describedby="emailHelp"

                                            disabled={["View", "State"].includes(props.type)} />


                                        {errors.mediumofInstructions && <p className={"text-red"}>{errors.mediumofInstructions}</p>}
                                    </div>
                                </div>}

                                {<div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Duration </label>
                                        <input name={"duration"} placeholder={"Enter Duration"}
                                            className={`form-control ${errors.duration ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            id="exampleInputEmail5"
                                            onChange={handleChange}
                                            value={values.duration || ""}
                                            aria-describedby="emailHelp"

                                            disabled={["View", "State"].includes(props.type)} />


                                        {errors.duration && <p className={"text-red"}>{errors.duration}</p>}
                                    </div>
                                </div>}

                                {<div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Duration</label>
                                        
                                        <textarea id="exampleFormControlTextarea1"
                                            rows="5" placeholder={"Enter Duration"}
                                            className={`form-control label1 ${errors.description ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}

                                            onChange={handleChange}
                                            value={values.description || ""}
                                            aria-describedby="emailHelp"

                                            disabled={["View", "State"].includes(props.type)}>
                                        </textarea>


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

export default CareerForm;