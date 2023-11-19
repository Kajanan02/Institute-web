import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import {validateStateappointment} from "../../utils/validation";
import {togglæeConfirmationDialog, toggleLoader} from "../../redux/actions";
import axios from 'axios';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { isEmpty } from 'underscore';

function AppointmentForm(props) {
    const [appointmentList, setAppointmentList] = useState([])

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(stateAppoint, validateStateappointment);
    const instituteId = localStorage.getItem("USER_ID");
    const studentId = localStorage.getItem("STUDENT_ID");
    const [update, setUpdate] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [selectedAppoinment, setSelectedAppoinment] = useState({});
    const dispatch = useDispatch();
    const [singleSelections, setSingleSelections] = useState([]);


    function stateAppoint() {
        setIsSubmit(true)
    }
    function resetForm(){
        
    }

    useEffect(()=>{
        if(["View", "State"].includes(props.type) && !isEmpty(props.selectedAppointment)){
           
            initForm(props.selectedAppointment)
        }
    },[props.type,props.selectedAppointment])

    function statusUpdate(status){
        values.status = status
        console.log(props.selectedAppointment)
        console.log(props.selectedAppointment._id)

        dispatch(toggleLoader(true))
        axios.put(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/Appointment/${props.selectedAppointment._id}`, values)
        // axios.put(`${process.env.REACT_APP_HOST}/institute/${instituteId}/marks/${props.selectedMarks._id}`, values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {
            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setIsSubmit(false);
          setIsSubmit(false)
            resetForm()
            props.onHide()
        })

    }
   
    useEffect(() => {
        if (!isSubmit || props.type !== "Add") {
            return
        }
        // http://localhost:5000/api/institute/:instituteId/student/:studentId/appointment
        
        axios.post(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/Appointment` , values)
            .then((res) => {
                console.log(res.data)
                props.update()
                props.onHide();
                toast.success(`Successfully Appointment Created`)
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
                                {(["View", "State"].includes(props.type)) && (localStorage.getItem('ROLE') === "2") && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : ""}`}>Parent
                                            Name</label>
                                        <input name={"parentName"} placeholder={"Enter Parent Name"}
                                               className={` form-control  ${errors.parentName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}  `}

                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                            value={values.parentName || ""}


                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.parentName && <p className={"text-red"}>{errors.parentName}</p>}

                                    </div>
                                </div>}
                                {(["View", "State"].includes(props.type)) && (localStorage.getItem('ROLE') === "2") && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Student
                                            Name</label>
                                        <input name={"studentName"} placeholder={"Enter Parent Name"}
                                               className={`form-control ${errors.studentName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values?.studentId?.name || ""}

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

                                {["Add", "State","View"].includes(props.type) && <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Description</label>
                                        <textarea name={"description"} placeholder={"Enter Description"}
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
                {/*["View","Add"].includes(props.type) &&*/}
                {props.type === "State" && <div className='d-flex gap-2'>
                <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={()=>statusUpdate("ACCEPTED")}
                >
                    Accepeted
                </button>
               <button
                    type="button"
                    className={"btn btn-danger"}
                    onClick={()=>statusUpdate("DECLINE")}
                >
                    Decline
                </button>
                 <button
                    type="button"
                    className={"btn btn-warning"}
                    onClick={()=>statusUpdate("REQUESTED")}
                >
                    Request
                </button>
                </div>}
                {props.type === "Add" &&<button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    Add
                </button>}
            </Modal.Footer>
        </Modal>
    );
}

export default AppointmentForm;