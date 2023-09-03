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

function MarksForm(props) {
    const buyerOption = subjectData;
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [studentsList, setStudentsList] = useState([]);
    const [update, setUpdate] = useState(false);
    const instituteId = localStorage.getItem("USER_ID");
    const dispatch = useDispatch();
    const [singleSelections, setSingleSelections] = useState([]);



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
    function multiSelectOnChangeSubjects(selected) {
        setSelectedBuyer(selected);
        setValue({subjects: selected});
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
    }, [update])

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
                                            className={`disabled-white ${errors.name ? "border-red" : ""}`}
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
                                        {errors.regNo && <p className={"text-red"}>{errors.regNo}</p>}

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
                                               value={values.marks}
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