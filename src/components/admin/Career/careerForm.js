import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import formHandler from "../../../utils/FormHandler";
import { validateCareer } from "../../../utils/validation";
import { isEmpty } from 'underscore';import axios from 'axios';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {togglæeConfirmationDialog, toggleLoader} from "../../../redux/actions";


function CareerForm(props) {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(stateCareer, validateCareer);
    
    const [isSubmit, setIsSubmit] = useState(false);

    function stateCareer() {
        setIsSubmit(true)

    }
    function resetForm(){
        
    }


    useEffect(()=>{
        if(["View", "Edit"].includes(props.type) && !isEmpty(props.selectedCareer)){
           
            initForm(props.selectedCareer)
        }
    },[props.type,props.selectedCareer])

    useEffect(() => {
        if (!isSubmit || props.type !== "Add") {
            return
        }
        
        //http://localhost:5000/api/career
        axios.post(`${process.env.REACT_APP_HOST}/career` , values)
            .then((res) => {
                console.log(res.data)
                 props.update()
                props.onHide();
                toast.success(`Successfully Career Created`)
            }).catch((err) => {
            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setIsSubmit(false);
            resetForm()
            // if (parentSubmit) {
            //     setStudentId(null);
            //     props.onHide()

            // }
        })
    }, [isSubmit]);

    useEffect(()=>{
        if(!isSubmit || props.type !== "Edit"){
            return
        }
        dispatch(toggleLoader(true))
        //http://localhost:5000/api/career/:id
        axios.put(`${process.env.REACT_APP_HOST}/career/${values._id}`, values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {

            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setIsSubmit(false);
            resetForm()
            props.onHide()
        })

    },[isSubmit])
    
    const dispatch = useDispatch();

   

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
                    {props.type === "Edit" && <div> Edit Career Details</div>}

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
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Medium of Instructions </label>
                                        <input name={"medium"} placeholder={"Enter Medium of Instructions"}
                                            className={`form-control ${errors.medium ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            id="exampleInputEmail5"
                                            onChange={handleChange}
                                            value={values.medium || ""}
                                            aria-describedby="emailHelp"

                                            disabled={["View", "State"].includes(props.type)} />


                                        {errors.medium && <p className={"text-red"}>{errors.medium}</p>}
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

                                { <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Description</label>
                                        <textarea name={"description"} placeholder={"Enter Description"} rows="5"
                                                  className={`form-control ${errors.description ? "border-red" : ""}${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                                  id="exampleInputEmail5"
                                                  onChange={handleChange}
                                                  value={values.description || ""}
                                                  aria-describedby="emailHelp"
                                                  disabled={["View", "State"].includes(props.type)}/>
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

export default CareerForm;