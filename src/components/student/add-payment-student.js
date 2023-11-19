import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import { FileUploader } from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import { validatePay } from "../../utils/validation";

function AddPaymentForm(props) {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [paymentPdf, setPaymentPdf] = useState(null);
    const handleChangeProfile = (file) => {
        setPaymentPdf(file);
    };

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isPaymentForm, validatePay);

    function isPaymentForm() {

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"

        >
            <Modal.Header closeButton onHide={() => {
                if (!formSubmitted) {
                    initForm({});
                }
            }}>
                {<Modal.Title id="contained-modal-title-vcenter">
                    {props.type === "Add" &&<div> Add Payment Details</div>}

                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${props.type === "View" ? " profile-view-text " : ""}`}>
                                            Amount</label>
                                        <input name={"amount"} placeholder={"Enter Amount"}
                                               className={` form-control  ${errors.amount ? "border-red" : ""} ${props.type === "View" ? " form-control:disabled" : ""}  `}

                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.amount || ""}


                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.amount && <p className={"text-red"}>{errors.amount}</p>}

                                    </div>
                                </div>

                                {props.type !== "View" && <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className={`form-label d-block ${props.type !== "View" ? "" : ""}`}>Payment Slip</label>
                                        <FileUploader handleChange={handleChangeProfile}>
                                            <div className={"file-uploader-container"}>
                                                <img src={uploadIcon} width={"27%"} />
                                                {!paymentPdf?.name ? <div>
                                                        <div className={"fw-semibold my-2"}>Drop or Select file
                                                        </div>
                                                        <div className={""}>Drop files here or click <span
                                                            className={"text-success text-decoration-underline mt-3"}>browse</span> thorough
                                                            your machine
                                                        </div>
                                                    </div> :
                                                    <div className={"fw-semibold my-2"}>{paymentPdf?.name}</div>
                                                }
                                            </div>
                                        </FileUploader>
                                    </div>
                                </div>}


                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>


                {props.type === "Add" && <button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    Add
                </button>}

            </Modal.Footer>
        </Modal>
    )
}

export default AddPaymentForm;