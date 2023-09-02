import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import {validatemarks} from "../../utils/validation";
import MultiSelect from "@khanacademy/react-multi-select";
import {marksData} from "./marksDamiData";

function MarksForm(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const buyerOption = marksData;
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(ismarks, validatemarks);

    function ismarks() {

    }
    function multiSelectOnChangeBuyer(selected) {
          setSelectedBuyer(selected);
           setValue({previousBuyer: selected});
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
                    {props.type === "Add" &&<div> Add Marks Details</div>}
                    {props.type === "Edit" &&<div> Edit Marks Details</div>}

                </Modal.Title>}
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
                                        <label htmlFor="exampleInputEmail1" className="form-label">Reg.No</label>
                                        <input name={"regNo"} placeholder={"Enter Reg.No"}
                                               className={`form-control ${errors.regNo ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.regNo}
                                        />
                                        {errors.regNo && <p className={"warning-text"}>{errors.regNo}</p>}

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
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Marks</label>
                                        <input name={"marks"} placeholder={"Enter Marks"}
                                               className={`form-control ${errors.marks ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.marks}
                                        />
                                        {errors.marks && <p className={"warning-text"}>{errors.marks}</p>}

                                    </div>
                                </div>


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

                {props.type === "Add" &&<button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    Add
                </button>}
                {props.type === "Edit" && <button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    Update
                </button>}
            </Modal.Footer>
        </Modal>
    );
}

export default MarksForm;