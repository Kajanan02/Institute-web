import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import {validateinstitute} from "../../utils/validation";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
// import MultiSelect from "@khanacademy/react-multi-select";


function InstituteForm(props) {
    const [profilePic, setProfilePic] = useState(null);
    const handleChangeProfile = (file) => {
        setProfilePic(file);
    };

    // const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isInstitute, validateinstitute);

    function isInstitute() {

    }
    // function multiSelectOnChangeBuyer(selected) {
    //     setSelectedBuyer(selected);
    //     setValue({previousBuyer: selected});
    // }

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

        >
            <Modal.Header closeButton onHide={() => {
                if (!formSubmitted) {
                    initForm({});
                }
            }}>
                {<Modal.Title id="contained-modal-title-vcenter">
                    {props.type === "Add" &&<div> Add Institute Details</div>}
                    {props.type === "View" &&<div> View Institute Details</div>}
                    {props.type === "Edit" &&<div> Edit Institute Details</div>}
                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${props.type === "View"  ? " profile-view-text " : ""}`}>
                                            Name</label>
                                        <input name={"name"} placeholder={"Enter Name"}
                                               className={` form-control  ${errors.name ? "border-red" : ""} ${props.type === "View"  ? " form-control:disabled" : ""}  `}

                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.name || ""}


                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.name && <p className={"text-red"}>{errors.name}</p>}

                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${props.type === "View"  ? " profile-view-text " : ""}`}>
                                            Email</label>
                                        <input name={"email"} placeholder={"Enter Email"}
                                               className={` form-control  ${errors.email ? "border-red" : ""} ${props.type === "View"  ? " form-control:disabled" : ""}  `}

                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.email || ""}


                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.email && <p className={"text-red"}>{errors.email}</p>}


                                    </div>
                                </div>
                                {/*<div className={"col-md-6"}>*/}
                                {/*    <div className="mb-3">*/}
                                {/*        <label htmlFor="exampleInputEmail1"*/}
                                {/*               className="form-label">Subjects</label>*/}
                                {/*        <div className={`form-control p-0`}>*/}
                                {/*            <MultiSelect*/}
                                {/*                className={"multi-select test"}*/}
                                {/*                // options={buyerOption}*/}
                                {/*                selected={selectedBuyer}*/}
                                {/*                onSelectedChanged={multiSelectOnChangeBuyer}*/}

                                {/*            />*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${props.type === "View"  ? " profile-view-text " : ""}`}>
                                            Contact No</label>
                                        <input name={"phoneNumber"} placeholder={"Enter Phone No"}
                                               className={` form-control  ${errors.phoneNumber ? "border-red" : ""} ${props.type === "View"  ? " form-control:disabled" : ""}  `}

                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.phoneNumber || ""}


                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.phoneNumber && <p className={"text-red"}>{errors.phoneNumber}</p>}


                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${props.type === "View"  ? " profile-view-text " : ""}`}>
                                            Address</label>
                                        <input name={"address"} placeholder={"Enter Address"}
                                               className={` form-control  ${errors.address ? "border-red" : ""} ${props.type === "View"  ? " form-control:disabled" : ""}  `}

                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.address || ""}


                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.address && <p className={"text-red"}>{errors.address}</p>}


                                    </div>
                                </div>
                                {props.type !== "View" &&<div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className={`form-label d-block ${props.type !== "View" ? "" : ""}`}>Profile
                                            Picture</label>
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

export default InstituteForm;