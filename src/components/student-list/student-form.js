import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import MultiSelect from "@khanacademy/react-multi-select";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import formHandler from "../../utils/FormHandler";
import {validateParent, validateStudent} from "../../utils/validation";
import {subjectData} from "./damiData";
import FormStepper from "./FormStepper";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setMqttDetail, toggleLoader} from "../../redux/actions";
import {toast} from "react-toastify";
import StudentLocationAdd from "./student-location";

function StudentForm(props) {
    console.log(props)
    const [parentMode, setParentMode] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const buyerOption = subjectData;
    const [profilePic, setProfilePic] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [parentSubmit, setParentSubmit] = useState(false);
    const [nicFront, setNicFront] = useState(null);
    const [updateStudent, setUpdateStudent] = useState(false);
    const [nicBack, setNicBack] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isLoading, currentStep === 1 ? validateStudent : validateParent);

    const dispatch = useDispatch();
    const instituteId = localStorage.getItem("USER_ID");
    console.log(currentStep)

    function isLoading() {
        if (props.type === "Edit") {
            setUpdateStudent(true)
        } else {
            if (currentStep === 1) {
                setCurrentStep(2)
                console.log("student Done")
                setIsSubmit(true)
            }
            if (currentStep === 2) {
                console.log("parent Done")
                setIsSubmit(true)
                setParentSubmit(true)
            }
        }
    }

    console.log(values);

    useEffect(() => {
        if (props.from === "studentProfile") {
            setCurrentStep(2)
            setParentMode(true)
        }
    }, [props.from]);

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

    function resetForm() {
        initForm({})
        setProfilePic(null)
        setNicFront(null)
        setNicBack(null)
    }

    console.log(errors)
    console.log(values)

    function multiSelectOnChangeSubjects(selected) {
        setSelectedBuyer(selected);
        setValue({subjects: selected});
    }

    const handleChangeProfile = (file) => {
        setProfilePic(file);
        imageUpload(file, "profilePic")
    };

    const handleChangeNicFront = (file) => {
        setNicFront(file);
        imageUpload(file, "nicFront")
    };

    const handleChangeNicBack = (file) => {
        setNicBack(file);
        imageUpload(file, "nicBack")
    };


    useEffect(() => {
        if (!isSubmit) {
            return
        }

        values.password = "123456"
        console.log(values)
        dispatch(toggleLoader(true))
        if (currentStep === 2) {
            values.studentId = props.studentId ? props.studentId : studentId
        }
        axios.post(`${process.env.REACT_APP_HOST}/institute/${instituteId}/${parentSubmit ? 'createParent' : 'createStudent'}`, values)
            .then((res) => {
                console.log(res.data)
                props.update();
                if (!parentSubmit) {
                    setStudentId(res.data._id)
                }
                if (parentSubmit) {
                    let msg = `Parent Account Successfully created your username is ${values.nicNo} and password is 123456`
                    console.log(msg)
                    console.log(values.phoneNumber)
                    dispatch(setMqttDetail({"mobileNumber": values.phoneNumber, "body": msg, "type": "msg"}))
                } else {
                    let msg = `Student Account Successfully created your username is ${values.nicNo} and password is 123456`
                    console.log(msg)
                    console.log(values.phoneNumber)
                    dispatch(setMqttDetail({"mobileNumber": values.phoneNumber, "body": msg, "type": "msg"}))
                }
                toast.success(`Successfully ${parentSubmit ? 'Parent' : 'Student'} created`)
            }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setIsSubmit(false);
            setParentSubmit(false)
            resetForm()

            if (parentSubmit) {
                setStudentId(null);
                props.onHide()

            }
        })
    }, [isSubmit]);

    function studentGeoLocation(position) {
        let data = {}
        data.gpscoordinates = position
        setValue({location: position});
    }

    useEffect(() => {
        if (!updateStudent) {
            return
        }
        dispatch(toggleLoader(true))
        axios.put(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${props.selectedStudent._id}`, values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {
            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setIsSubmit(false);
            setUpdateStudent(false)
            resetForm()
            props.onHide()
        })

    }, [updateStudent])


    useEffect(() => {
        // Initialize the form values when the modal is shown
        if (props.type === "Edit") {
            initForm(props.selectedStudent);
            setSelectedBuyer(props.selectedStudent?.subjects)
            setCurrentStep(1); // Reset step to 1
            setFormSubmitted(false);
        }
    }, [props.type, props.selectedStudent]);

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
                    resetForm()
                }
            }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {parentMode ? "Add Parent Details" : props.type === "Add" ? "Add Student Details" : "Edit Student Details"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body scrollable>

                {(props.type !== "Edit" && !parentMode) && <FormStepper currentStep={currentStep}/>}

                <form>
                    <div>
                        {!props.from && <div
                            className="step-text">Step {currentStep}: {currentStep === 1 ? "Student" : "Parent"} Details
                        </div>}
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input name={"name"} placeholder={"Enter Name"}
                                               className={`form-control ${errors.name ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.name || ""}
                                        />
                                        {errors.name && <p className={"text-red"}>{errors.name}</p>}

                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">NIC
                                            No</label>
                                        <input name={"nicNo"} placeholder={"Enter NIC No"}
                                               className={`form-control ${errors.nicNo ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.nicNo || ""}
                                               aria-describedby="emailHelp"/>
                                        {errors.nicNo && <p className={"text-red"}>{errors.nicNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Address</label>
                                        <input name={"address"} placeholder={"Enter Address"}
                                               className={`form-control ${errors.address ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.address || ""}
                                               aria-describedby="emailHelp"/>
                                        {errors.address && <p className={"text-red"}>{errors.address}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Contact
                                            No</label>
                                        <input name={"phoneNumber"}
                                               placeholder={"Enter Contact No"}
                                               className={`form-control ${errors.phoneNumber ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.phoneNumber || ""}
                                               aria-describedby="emailHelp"/>
                                        {errors.phoneNumber && <p className={"text-red"}>{errors.phoneNumber}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" name={"email"} placeholder={"Enter Email"}
                                               value={values.email || ""} onChange={handleChange}
                                               className={`form-control ${errors.email ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               aria-describedby="emailHelp"/>
                                        {errors.email && <p className={"text-red"}>{errors.email}</p>}
                                    </div>
                                </div>
                                {currentStep === 1 && <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Parent
                                            Contact</label>
                                        <input type="email" name={"parentContact"} placeholder={"Enter parent Contact"}
                                               value={values.parentContact || ""} onChange={handleChange}
                                               className={`form-control ${errors.parentContact ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               aria-describedby="emailHelp"/>
                                        {errors.parentContact && <p className={"text-red"}>{errors.parentContact}</p>}
                                    </div>
                                </div>}
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Gender</label>
                                        <select className={`form-control ${errors.gender ? "border-red" : ""}`}
                                                onChange={handleChange}
                                                value={values.gender || ""}
                                                name={"gender"}
                                                aria-label="Default select example">
                                            <option hidden>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Not Specified">Not Specified</option>
                                        </select>
                                        {errors.gender && <p className={"text-red"}>{errors.gender}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Date of
                                            Birth</label>
                                        <input id="startDate"
                                               className={`form-control ${errors.dob ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               name={"dob"}
                                               value={values.dob || ""}
                                               type="date"/>
                                        {errors.dob && <p className={"text-red"}>{errors.dob}</p>}
                                    </div>
                                </div>
                                {currentStep === 1 &&
                                    <div className={"col-md-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">Subjects</label>
                                            <div className={`form-control ${errors.subjects ? "border-red" : ""} p-0`}>
                                                <MultiSelect
                                                    // className={`form-control`}
                                                    // onChange={handleChange}
                                                    value={values.subjects || []}
                                                    options={buyerOption}
                                                    selected={selectedBuyer}
                                                    onSelectedChanged={multiSelectOnChangeSubjects}
                                                />
                                            </div>
                                            {errors.subjects && <p className={"text-red"}>{errors.subjects}</p>}
                                        </div>
                                    </div>
                                }
                                {currentStep === 2 &&
                                    <div className={"col-md-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">Relationship to Student</label>
                                            <select
                                                className={`form-control ${errors.relationship ? "border-red" : ""}`}
                                                onChange={handleChange}
                                                value={values.relationship || ""}
                                                name={"relationship"}
                                                aria-label="Default select example">
                                                <option>Relationship to Student</option>
                                                <option value="Male">Father</option>
                                                <option value="Female">Mother</option>
                                                <option value="Not Specified">Guardian</option>
                                            </select>
                                            {errors.relationship && <p className={"text-red"}>{errors.relationship}</p>}
                                        </div>
                                    </div>
                                }






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
                            resetForm()
                        }
                    }}
                >
                    Cancel
                </button>

                {/*{currentStep === 2 && (*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        className={"btn btn-secondary"}*/}
                {/*        onClick={() => setCurrentStep(1)}*/}
                {/*    >*/}
                {/*        Cancel*/}
                {/*    </button>*/}
                {/*)}*/}
                <button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    {parentMode ? "Add" : props.type === "Edit" ? "Update" : currentStep === 1 ? "Next" : "Update"}
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default StudentForm;