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
import { getInstituteId, getStudentId, isInstituteAccount ,getUserId} from '../../utils/Authentication';
import {isParentAccount} from "../../utils/Authentication";
import { Link } from 'react-router-dom';
import {changeToggle, setUserDetail} from "../../redux/actions";
import PaymentModal from "./paymentModal";


function StatepaymentForm(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [studentId, setStudentId] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const [directPayment, setDirectPayment] = useState(false);
    const [onlinePayment, setOnlinePayment] = useState(false);
    const [paymentSlip, setPaymentSlip] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const instituteId = localStorage.getItem("USER_ID");
    const [studentsList, setStudentsList] = useState([]);
    const [singleSelections, setSingleSelections] = useState([]);
    

    const dispatch = useDispatch();


    const handleChangeSlip = (file) => {
        setPaymentSlip(file);
        imageUpload(file, "paymentSlip")
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
        setSingleSelections([])

    }

    useEffect(()=>{
        if(isInstituteAccount()){
            setDirectPayment(true)
        }
    },[])

    useEffect(()=>{
        if(["View", "State"].includes(props.type) && !isEmpty(props.selectedPayment)){
           
            initForm(props.selectedPayment)
            setSingleSelections([props.selectedPayment.studentNicNo])
        }
    },[props.type,props.selectedPayment])
    useEffect(()=>{
        if(["View", "State"].includes(props.type) && !isEmpty(props.selectedPayment)){
           
            initForm(props.selectedPayment)
            setSingleSelections([props.selectedPayment.studentNicNo])
        }
    },[props.type,props.selectedPayment])

    function statusUpdate(status){
        values.status = status
        console.log(props.selectedPayment)
        console.log(props.selectedPayment._id)

        dispatch(toggleLoader(true))
        axios.put(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/student/${studentId}/fees/${props.selectedPayment._id}`, values)
        // router.route('/:instituteId/student/:studentId/fees/:id').put(editFees);
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
        values.method= isInstituteAccount() ? "INSTITUTE" : "DIRECT_PAYMENT"
        values.status=isInstituteAccount() ? "PAID" :"REQUESTED"
        let student
        if(isParentAccount()){
            student = localStorage.getItem("STUDENT_ID")
        }

        
        axios.post(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/student/${isParentAccount() ? student :studentId}/fees` , values)
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
    
   

    
    

    // useEffect(() => {
    //     // Initialize the form values when the modal is shown
    //     if (props.show) {
    //         initForm({});

    //         setFormSubmitted(false);
    //     }
    // }, [props.show]);
    // console.log(directPayment)

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/getAllStudents`)
            .then((res) => {
                setStudentsList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])
    useEffect(() => {
        if(!isParentAccount()){
            return
        }
        dispatch(toggleLoader(true))
        let studentID = localStorage.getItem("STUDENT_ID")
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/student/${studentID}`)
        .then((res) => {
            
            let userData = res.data
            console.log(userData);
            console.log(userData._id);
            setValue({name:userData.name})
            setValue({studentNicNo:userData.nicNo})
            setSingleSelections([userData.nicNo])


        }).catch((err) => {
        console.log(err)
        toast.error("Something went wrong")
    }).finally(() => {
      dispatch(toggleLoader(false))
    })
    }, [])
    console.log(values);

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
                    setSingleSelections([])
                }
                if(!isInstituteAccount()) {
                    setDirectPayment(false)
                }
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

                {props.type === "Add" && !directPayment && !onlinePayment && <div className={"d-flex justify-content-around"}>
                    <button type="button" className={"btn-payment-method"}
                            onClick={() => {
                                setDirectPayment(true)
                            }}>
                        {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"}/>*/}
                        Direct Payment
                    </button>
                    <button type="button" className={"btn-payment-method"}
                            onClick={() => {
                                setOnlinePayment(true)
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
                                                console.log(res);
                                                setValue({studentId:res[0]})
                                                setValue({name:find(studentsList,{nicNo:res[0]})?.name})
                                                setValue({studentNicNo:res[0]})
                                                setSingleSelections(res)
                                                setStudentId(find(studentsList,{nicNo:res[0]})?._id)
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
                                         className={`form-control  ${errors.name ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                              // className={`form-control ${errors.name ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled" : ""}`}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.name || ""}
                                            //    disabled={true}

                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.name && <p className={"text-red"}>{errors.name}</p>}

                                    </div>
                                </div>}

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

                                {(isInstituteAccount()  && (directPayment || ([ "View"].includes(props.type))))|| (isParentAccount()  && (directPayment)) && <div className={"col-md-12"}>
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
                                </div>}
                                {values.paymentSlip &&["View","State"].includes(props.type)&&
                                    <div className={"col-md-12"}>
                                        <label htmlFor="exampleInputEmail1" className={`form-label ${["View", "State"].includes(props.type) ? " profile-view-text " : "form-label"}`}>Payment Slip</label>     
                                    <img src={values.paymentSlip} className='w-100' alt="Nature"/>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>

                </form>}
                {onlinePayment &&<PaymentModal
                    orderId={45896588}
                    name="Just For You Mom Ribbon Cake"
                    amount="4500"
                />}
            </Modal.Body>
            { (directPayment || (["View", "State",].includes(props.type))) && <Modal.Footer>


                <button
                    type="button"
                    className={"btn btn-secondary"}
                    onClick={() => {
                        if (!formSubmitted) { // Prevent hiding the modal if the form is submitted
                            props.onHide();
                            initForm({});
                            setSingleSelections([])
                            if(!isInstituteAccount()) {
                                setDirectPayment(false)
                            }
                        }
                        setDirectPayment(false)
                    }}
                >
                    Cancel
                </button>


                {isInstituteAccount() && props.type === "State" && <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={()=>statusUpdate("APPROVED")}
                >
                    Approved
                </button>}
                
                {isInstituteAccount() &&props.type === "State" && <button
                    type="button"
                    className={"btn btn-danger"}
                    onClick={()=>statusUpdate("DECLINE")}
                >
                    Decline
                </button>}

                {props.type !== "State" && directPayment&&<button
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