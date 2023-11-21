import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import formHandler from "../../utils/FormHandler";
import {validatemarks} from "../../utils/validation";
import MultiSelect from "@khanacademy/react-multi-select";
import {marksData , subjectData} from "./marksDamiData";
import {toggleLoader} from "../../redux/actions";
import axios from "axios";
import {useDispatch} from "react-redux";
import {Typeahead} from "react-bootstrap-typeahead";
import {find, pluck} from "underscore";
import {toast} from "react-toastify";

function MarksForm(props) {
    const buyerOption = subjectData;
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [studentsList, setStudentsList] = useState([]);
    const instituteId = localStorage.getItem("USER_ID");
    const dispatch = useDispatch();
    const [singleSelections, setSingleSelections] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);



    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(ismarks, validatemarks);

    function ismarks() {
        setIsSubmit(true)

    }
    function multiSelectOnChangeBuyer(selected) {
          setSelectedBuyer(selected);
           setValue({previousBuyer: selected});
        }
    function multiSelectOnChangeSubjects(selected) {
        setSelectedBuyer(selected);
        setValue({subjects: selected});
    }

    function resetForm() {
        initForm({})
    }

    console.log(errors)
    console.log(values)


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


    useEffect(() => {
        if(!props.selectedMarks){
            return 
        }
        props.selectedMarks.date = props.selectedMarks.date.slice(0,10)
        initForm(props.selectedMarks)
        setSingleSelections([props.selectedMarks?.nicNo])

    }, [props.selectedMarks])


    useEffect(() => {
        if (!isSubmit || props.type !== "Add") {
            return
        }
        axios.post(`${process.env.REACT_APP_HOST}/institute/${instituteId}/createMarks`, values)
            .then((res) => {
                console.log(res.data)
                props.update()
                props.onHide();
                toast.success(`Successfully Marks created`)
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
        axios.put(`${process.env.REACT_APP_HOST}/institute/${instituteId}/marks/${props.selectedMarks._id}`, values)
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

    },[isSubmit])

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
                                        <label htmlFor="exampleInputEmail1" className="form-label">Reg.No</label>
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
                                        />
                                        {errors.regNO && <p className={"text-red"}>{errors.regNO}</p>}

                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input name={"name"} placeholder={"Enter Name"}
                                               className={`form-control disabled-white ${errors.name ? "border-red" : ""}`}
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
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Subjects</label>
                                        <select className={`form-control ${errors.subjects ? "border-red" : ""}`}
                                                onChange={handleChange}
                                                value={values.subject || ""}
                                                name={"subject"}
                                                aria-label="Default select example">
                                            <option hidden>Subjects</option>
                                            <option value="COMBINED_MATHEMATICS">Combined Mathematics</option>
                                            <option value="PHYSICS">Physics</option>
                                            <option value="CHEMISTRY">Chemistry</option>
                                            <option value="ICT">ICT</option>
                                            <option value="BIO_SCIENCE">Bio Science</option>
                                        </select>
                                        {errors.subjects && <p className={"text-red"}>{errors.subjects}</p>}
                                    </div>
                                </div>
                                    {/*<div className={"col-md-6"}>*/}
                                    {/*    <div className="mb-3">*/}
                                    {/*        <label htmlFor="exampleInputEmail1"*/}
                                    {/*               className="form-label">Subjects</label>*/}
                                    {/*        <div className={`form-control p-0`}>*/}
                                    {/*            <MultiSelect*/}
                                    {/*                className={"multi-select test"}*/}
                                    {/*                options={buyerOption}*/}
                                    {/*                selected={selectedBuyer}*/}
                                    {/*                onSelectedChanged={multiSelectOnChangeBuyer}*/}

                                    {/*            />*/}

                                    {/*        </div>*/}
                                    {/*        {errors.Subjects && selectedBuyer=='Select some items...' && <p className={"text-red"}>{errors.Subjects}</p>}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Marks</label>
                                        <input name={"marks"} placeholder={"Enter Marks"}
                                               className={`form-control ${errors.marks ? "border-red" : ""}`}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.marks || ""}
                                        />
                                        {errors.marks && <p className={"text-red"}>{errors.marks}</p>}

                                    </div>
                                </div>

                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Date of
                                            Exam</label>
                                        <input id="startDate"
                                               className={`form-control ${errors.date ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               name={"date"}
                                               value={values.date || ""}
                                               type="date"/>
                                        {errors.date && <p className={"text-red"}>{errors.date}</p>}
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