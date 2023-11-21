import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import {validateStatePayment} from "../../utils/validation";
import FeatherIcon from "feather-icons-react";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import {toggleLoader} from "../../redux/actions";
import axios from "axios";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import { isEmpty } from 'underscore';
import {Typeahead} from "react-bootstrap-typeahead";
import {find, pluck} from "underscore";


function StatepaymentForm(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [directPayment, setDirectPayment] = useState(false);
    const [paymentSlip, setPaymentSlip] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const instituteId = localStorage.getItem("USER_ID");
    const studentId = localStorage.getItem("STUDENT_ID");
    const [studentsList, setStudentsList] = useState([]);
    const [singleSelections, setSingleSelections] = useState([]);
    

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
    } = formHandler(statePayment, validateStatePayment);

    function statePayment() {
        setIsSubmit(true)
    }

    function resetForm(){
        initForm({})
    }

    useEffect(()=>{
        if(["View", "State"].includes(props.type) && !isEmpty(props.selectedPayment)){
           
            initForm(props.selectedPayment)
        }
    },[props.type,props.selectedPayment])

    useEffect(() => {
        if(!props.selectedMarks){
            return 
        }
        props.selectedMarks.date = props.selectedMarks.date.slice(0,10)
        initForm(props.selectedMarks)
        setSingleSelections([props.selectedMarks?.nicNo])

    }, [props.selectedMarks])

    function statusUpdate(status){
        values.status = status
        console.log(props.selectedPayment)
        console.log(props.selectedPayment._id)

        dispatch(toggleLoader(true))
        //router.route('/:instituteId/student/:studentId/fees/:id').put(editFees);
        axios.put(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/fees/${props.selectedPayment._id}`, values)
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
        
        axios.post(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/fees` , values)
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
        if (!isSubmit || props.type !== "directPayment") {
            return
        }
        //router.route('/:instituteId/student/:studentId/fees').post(createFees);
        axios.post(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/fees` , values)
            .then((res) => {
                console.log(res.data)
                props.update()
                props.onHide();
                toast.success(`Successfully Payment Created`)
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
        if(["View", "State"].includes(props.type) && !isEmpty(props.selectedFees)){
           
            initForm(props.selectedFees)
        }
    },[props.type,props.selectedFees])

    function statusUpdate(status){
        values.status = status
        console.log(props.selectedFees)
        console.log(props.selectedFees._id)

        dispatch(toggleLoader(true))
        //router.route('/:instituteId/student/:studentId/fees/:id').put(editFees)
        axios.put(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/fees/${props.selectedFees_id}`, values)
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
        // Initialize the form values when the modal is shown
        if (props.show) {
            initForm({});

            setFormSubmitted(false);
        }
    }, [props.show]);
    console.log(directPayment)

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${instituteId}/getAllStudents`)
            .then((res) => {
                setStudentsList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])

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

                {props.type === "Add" && !directPayment && <div className={"d-flex justify-content-around"}>
                    <button type="button" className={"btn-payment-method"}
                            onClick={() => {
                                setDirectPayment(true)
                            }}>
                        {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"}/>*/}
                        Direct Payment
                    </button>
                    <button type="button" className={"btn-payment-method"}
                            onClick={() => {
                                // setModalType("Add");
                                // setModalShow(true)
                            }}>
                        {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"}/>*/}
                        Online Payment
                    </button>

                </div>}
                {(directPayment || (["View", "State",].includes(props.type))) && <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                            <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Student NIC No</label>
                                        <Typeahead
                                            id="basic-typeahead-single"
                                            labelKey="name"
                                            className={`disabled-white ${errors.regNO ? "border-red" : ""}`}
                                            onChange={(res)=> {
                                               setValue({nicNo:res[0]})
                                                setValue({name:find(studentsList,{nicNo:res[0]})?.name})
                                                setValue({studentId:find(studentsList,{nicNo:res[0]})?._id})
                                                setSingleSelections(res)
                                            }}
                                            options={pluck(studentsList,"nicNo")}
                                            placeholder="Choose a state..."
                                            selected={singleSelections}
                                            disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.regNO && <p className={"text-red"}>{errors.regNO}</p>}

                                    </div>
                                </div>
                                {(directPayment || (["View", "State",].includes(props.type))) &&<div
                                    className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Student
                                            Name</label>
                                        <input name={"studentName"} placeholder={"Enter Student Name"}
                                               className={`form-control ${errors.name ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.name || ""}

                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.name && <p className={"text-red"}>{errors.name}</p>}

                                    </div>
                                </div>}
                                {/* {props.type === "Add" && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className="form-label">Student NIC No</label>
                                        <input name={"studentNIC"} placeholder={"Enter NIC No"}
                                               className={`form-control ${errors.studentNIC ? "border-red" : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentNIC || ""}
                                               aria-describedby="emailHelp"/>
                                        {errors.studentNIC && <p className={"text-red"}>{errors.studentNIC}</p>}
                                    </div>
                                </div>} */}
                                

                                {/* {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
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
                                </div>} */}


                                {/* {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
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
                                </div>} */}

                                {["View", "State"].includes(props.type) && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Payment
                                            Method</label>
                                        <input name={"method"} placeholder={"Enter Payment Method"}
                                               className={`form-control ${errors.method ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.method || ""}
                                               aria-describedby="emailHelp"

                                               disabled={["View", "State"].includes(props.type)}/>
                                        {errors.method && <p className={"text-red"}>{errors.method}</p>}
                                    </div>
                                </div>}

                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                            className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Month</label>
                                        <select className={`form-control ${errors.month ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.month || ""}
                                            name={"month"}
                                            aria-label="Default select example"
                                            disabled={["View", "State"].includes(props.type)}>
                                            <option hidden>Month</option>
                                            <option value="JANUARY">January</option>
                                            <option value="FEBRUARY">February</option>
                                            <option value="MARCH">March</option>
                                            <option value="APRIL">April</option>
                                            <option value="MAY">May</option>
                                            <option value="JUNE">June</option>
                                            <option value="JULY">July</option>
                                            <option value="AUGUST">August</option>
                                            <option value="SEPTEMBER">September</option>
                                            <option value="OCTOBER">October</option>
                                            <option value="NOVEMBER">November</option>
                                            <option value="DECEMBER">December</option>
                                            
                                        </select>
                                        {errors.month && <p className={"text-red"}>{errors.month}</p>}
                                    </div>
                                </div>

                                {<div
                                     className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail5"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Amount</label>
                                        <input name={"feesAmount"} placeholder={"Enter Amount"}
                                               className={`form-control ${errors.feesAmount ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.feesAmount || ""}
                                               aria-describedby="emailHelp"

                                               disabled={["View", "State"].includes(props.type)}/>
                                        {errors.feesAmount && <p className={"text-red"}>{errors.feesAmount}</p>}
                                    </div>
                                </div>}

                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Payment Slip</label>
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
            { (directPayment || (["View", "State",].includes(props.type))) && <Modal.Footer>


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
                    className={"btn btn-warning"}
                    onClick={handleSubmit}
                >
                    Pending
                </button>}
                {props.type === "State" && <button
                    type="button"
                    className={"btn btn-danger"}
                    onClick={handleSubmit}
                >
                    Decline
                </button>}

                {directPayment&&<button
                    type="button"
                    className={"btn btn-success"}
                    onClick={handleSubmit}
                >
                    Pay
                </button>}
            </Modal.Footer>}
        </Modal>
    );
}

export default StatepaymentForm;