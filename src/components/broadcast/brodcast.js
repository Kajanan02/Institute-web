import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import broadcasting from "../../assets/broadcasted (1).png";
import FeatherIcon from "feather-icons-react";
import {mapObject} from "underscore";
import {subjectData} from "../student-list/damiData";
import formHandler from "../../utils/FormHandler";
import {validateBroadcast} from "../../utils/validation";
import axios from 'axios';
import {toast} from "react-toastify";
import {toggleLoader} from "../../redux/actions";
import {useDispatch} from "react-redux";

function Broadcast(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [studentsList, setStudentsList] = useState([])
    const [modalType, setModalType] = useState("view")
    const buyerOption = subjectData;
    const [profilePic, setProfilePic] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const instituteId = localStorage.getItem("USER_ID");


    const {
        handleChange,
        handleSubmit,
        setValue,
        values,
        errors,
        initForm,
    } = formHandler(stateBroadcast, validateBroadcast);

    function isLoading() {
        console.log("All are done")
    }


    function multiSelectOnChangeBuyer(selected) {
        setSelectedBuyer(selected);
        // setValue({previousBuyer: selected});
    }

    function stateBroadcast() {
        setIsSubmit(true)
    }

    function resetForm() {
        initForm({});
    }

    const handleChangeProfile = (file) => {
        setProfilePic(file);
    };

    useEffect(() => {
        // setValue({name:"oppai"})
    }, [])

    console.log(values)
    console.log(errors)
    useEffect(() => {
        if (!isSubmit) {
            return
        }

        //router.route('/:instituteId/broadcast').post(createBroadcast);
        axios.post(`${process.env.REACT_APP_HOST}/institute/${instituteId}/broadcast`, values)
            .then((res) => {
                console.log(res.data)
                //props.update()
                //props.onHide();
                toast.success(`Successfully Broadcast Created`)
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
        <Layout>
            <div className={"container"}>
                <div className={"container-widget broadcast_container"}>
                    <div className={"content-heading pt-3"}><h3>Broadcast Message</h3></div>
                    <div className={"broadcast_sub_container pt-5 mt-5"}>
                        <div className={"broadcast-image pt-2"}>
                            <img src={broadcasting} alt={"broadcast_image"}/>
                        </div>
                        <div className={"broadcast_msg_container p-3"}>
                            {<div className={"col-md-12"}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail5"
                                           className={"form-label"}> Topic </label>
                                    <input name={"messageTopic"} placeholder={"Enter Topic"}
                                           className={`form-control ${errors.messageTopic ? "border-red" : ""}  `}
                                           id="exampleInputEmail5"
                                           onChange={handleChange}
                                           value={values.messageTopic || ""}
                                           aria-describedby="emailHelp"


                                    />


                                    {errors.messageTopic && <p className={"text-red"}>{errors.messageTopic}</p>}
                                </div>
                            </div>}

                            {<div className={"col-md-12"}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail5"
                                           className={"form-label"}>Message</label>
                                    <textarea name={"message"} placeholder={"Enter Message"} rows="5"
                                              className={`form-control ${errors.message ? "border-red" : ""} `}
                                              id="exampleInputEmail5"
                                              onChange={handleChange}
                                              value={values.message || ""}
                                              aria-describedby="emailHelp"
                                    />
                                    {errors.message && <p className={"text-red"}>{errors.message}</p>}
                                </div>
                            </div>}

                            <div className={"dropdown-center pb-3"}>
                                <select className={`form-control ${errors.sender ? "border-red" : ""}`}
                                        onChange={handleChange}
                                        value={values.sender || ""}
                                        name={"sender"}
                                        aria-label="Default select example">
                                    <option hidden>Sent To</option>
                                    <option value="COMBINED_MATHEMATICS">Combined Mathematics</option>
                                    <option value="PHYSICS">Physics</option>
                                    <option value="CHEMISTRY">Chemistry</option>
                                    <option value="ICT">ICT</option>
                                    <option value="BIO_SCIENCE">Bio Science</option>
                                </select>
                                {errors.sender && <p className={"text-red"}>{errors.sender}</p>}
                            </div>
                            <div className={"d-grid gap-2 d-md-block broadcast-send"}>
                                <button className={"btn btn-primary broadcast-send-btn"} type={"button"}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setModalType("Add")}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"send"}/>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"modal fade"} id={"exampleModal"} aria-labelledby={"exampleModalLabel"}
                     aria-hidden="true">
                    <div className={"modal-dialog modal-dialog-centered box-popup modal-lg modal-dialog-scrollable"}>
                        <div className={"modal-content"}>
                            <div className={"modal-header"}>
                                <h1 className={"modal-title fs-5"} id="exampleModalLabel"></h1>
                                <button type="button" className={"btn-close"} onClick={() => {
                                    setValue(mapObject(values, function (val, key) {
                                        return val = '';
                                    }))
                                }}
                                        data-bs-dismiss="modal"
                                        aria-label="Close">
                                </button>
                            </div>
                            <form className="modal-body" onSubmit={handleSubmit}>
                                <div>
                                    <div className={"pop-up-form-container"}>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <div className="mb-3">
                                                    <p>Do you want to send this Message?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"modal-footer"}>
                                    <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className={"btn btn-secondary students-dropdown-btn"}
                                        onClick={handleSubmit}
                                        data-bs-dismiss="modal"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Broadcast;
