import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../../utils/FormHandler";
import {validateLeaderBoard} from "../../../utils/validation";
// import {marksData , subjectData} from "./marksDamiData";
import {toggleLoader} from "../../../redux/actions";
import axios from "axios";
import {useDispatch} from "react-redux";
import {Typeahead} from "react-bootstrap-typeahead";
import {find, isEmpty, pluck} from "underscore";
import {toast} from "react-toastify";

function LeaderBoardForm(props) {
    // const buyerOption = subjectData;
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [studentsList, setStudentsList] = useState([]);
    const instituteId = localStorage.getItem("USER_ID");
    const [singleSelections, setSingleSelections] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);


    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(stateLeaderBoard, validateLeaderBoard);

    const [formSubmitted, setFormSubmitted] = useState(false);

    function stateLeaderBoard() {
        setIsSubmit(true)

    }

    function resetForm() {
        initForm({});
    }

    function multiSelectOnChangeBuyer(selected) {
        setSelectedBuyer(selected);
        setValue({previousBuyer: selected});
    }

    function multiSelectOnChangeSubjects(selected) {
        setSelectedBuyer(selected);
        setValue({subjects: selected});
    }

    useEffect(() => {
        dispatch(toggleLoader(true))
        //http://localhost:5000/api/institute/students
        axios.get(`${process.env.REACT_APP_HOST}/institute/students`)
            .then((res) => {
                setStudentsList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])

    useEffect(() => {
        if (["Edit"].includes(props.type) && !isEmpty(props.selectedLeaderBoard)) {

            initForm(props.selectedLeaderBoard)
        }
    }, [props.type, props.selectedLeaderBoard])


    useEffect(() => {
        if (!isSubmit || props.type !== "Add") {
            return
        }

        //http://localhost:5000/api/leaderBoard
        axios.post(`${process.env.REACT_APP_HOST}/leaderBoard`, values)
            .then((res) => {
                console.log(res.data)
                props.update()
                props.onHide();
                toast.success(`Successfully Leader Board Created`)
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

    useEffect(() => {
        if (!isSubmit || props.type !== "Edit") {
            return
        }
        dispatch(toggleLoader(true))

        //http://localhost:5000/api/leaderBoard/:id
        axios.put(`${process.env.REACT_APP_HOST}/leaderBoard/${values._id}`, values)
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

    }, [isSubmit])

    const dispatch = useDispatch();

    console.log(errors)
    console.log(values)

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
                    {props.type === "Add" && <div> Add Leader Board Details</div>}
                    {props.type === "Edit" && <div> Edit Leader Board Details</div>}

                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Reg.No</label>
                                        <Typeahead
                                            id="basic-typeahead-single"
                                            labelKey="name"
                                            className={`disabled-white ${errors.regNo ? "border-red" : ""}`}
                                            onChange={(res) => {
                                                setValue({regNo: res[0]})
                                                setValue({
                                                    instituteName: find(studentsList, {nicNo: res[0]})?.instituteId?.name
                                                })
                                                setValue({name: find(studentsList, {nicNo: res[0]})?.name})
                                                setValue({studentId: find(studentsList, {nicNo: res[0]})?._id})
                                                setSingleSelections(res)
                                            }}
                                            options={pluck(studentsList, "nicNo")}
                                            placeholder="Choose a state..."
                                            selected={singleSelections}
                                        />
                                        {errors.regNo && <p className={"text-red"}>{errors.regNo}</p>}

                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input name={"name"} placeholder={"Enter Name"}
                                               className={`form-control disabled-white ${errors.course ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.name || ""}
                                               disabled={true}
                                        />
                                        {errors.name && <p className={"text-red"}>{errors.name}</p>}

                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Institute
                                            Name</label>
                                        <input name={"name"} placeholder={"Enter Name"}
                                               className={`form-control disabled-white ${errors.instituteName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.instituteName || ""}
                                               disabled={true}
                                        />
                                        {errors.instituteName && <p className={"text-red"}>{errors.instituteName}</p>}

                                    </div>
                                </div>

                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Subject</label>
                                        <select
                                            className={`form-control ${errors.subject ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.subject || ""}
                                            name={"subject"}
                                            aria-label="Default select example">
                                            <option hidden>Subject</option>
                                            <option value="COMBINED MATHEMATICS">Combined Mathematics</option>
                                            <option value="PHYSICS">Physics</option>
                                            <option value="CHEMISTRY">Chemistry</option>
                                            <option value="ICT">ICT</option>
                                            <option value="BIO_SCIENCE">Bio Science</option>
                                        </select>
                                        {errors.subject && <p className={"text-red"}>{errors.subject}</p>}
                                    </div>
                                </div>
                                {/* <div className={"col-md-6"}>
                                  <div className="mb-3">
                                       <label htmlFor="exampleInputEmail1"
                                             className="form-label">Subjects</label>
                                     <div className={`form-control p-0`}>
                                <MultiSelect
                                               className={"multi-select test"}
                                            //    options={buyerOption}
                                          selected={selectedBuyer}
                                             onSelectedChanged={multiSelectOnChangeBuyer}

                                           />

                                   </div>
                                   {errors.Subjects && selectedBuyer=='Select some items...' && <p className={"text-red"}>{errors.Subjects}</p>}
                                   </div>
                                </div> */}
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Marks</label>
                                        <input name={"marks"} placeholder={"Enter Marks"}
                                               className={`form-control ${errors.course ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.marks || ""}
                                        />
                                        {errors.marks && <p className={"text-red"}>{errors.marks}</p>}

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

export default LeaderBoardForm;