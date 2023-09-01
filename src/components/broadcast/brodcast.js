import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import broadcasting from "../../assets/broadcasted (1).png";
import FeatherIcon from "feather-icons-react";
import {mapObject} from "underscore";
import MultiSelect from "@khanacademy/react-multi-select";
import {studentData, subjectData} from "../student/damiData";
import formHandler from "../../utils/FormHandler";
import {validateStudent} from "../../utils/validation";

function Broadcast(props) {
    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [studentsList, setStudentsList] = useState(studentData)
    const [modalType, setModalType] = useState("view")
    const buyerOption = subjectData;
    const [profilePic, setProfilePic] = useState(null);


    const {
        handleChange,
        handleSubmit,
        setValue,
        values,
        errors,
    } = formHandler(isLoading, validateStudent);

    function isLoading() {
        console.log("All are done")
    }

    function multiSelectOnChangeBuyer(selected) {
        setSelectedBuyer(selected);
        // setValue({previousBuyer: selected});
    }

    const handleChangeProfile = (file) => {
        setProfilePic(file);
    };

    useEffect(() => {
        // setValue({name:"oppai"})
    }, [])

    console.log(values)
    console.log(errors)

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
                            <div className={"mb-3"}>
                                <label for="exampleFormControlInput1"
                                       className={"form-label message-container"}></label>
                                <input type="text" className={"form-control lable1"} id="exampleFormControlInput1"
                                       placeholder="Message Topic"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" className={"form-label"}></label>
                                <textarea className={"form-control label1"} id="exampleFormControlTextarea1"
                                          placeholder="Message" rows="5"></textarea>
                            </div>
                            <div className={"dropdown-center pb-3"}>
                                <button className={"btn btn-secondary dropdown-toggle send-category-btn"} type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Send To
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a className={"dropdown-item"} href="#">
                                        Mathematics</a></li>
                                    <li><a className={"dropdown-item"} href="#">Physics</a></li>
                                    <li><a className={"dropdown-item"} href="#">Chemistry</a></li>
                                </ul>
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
                                    <button type="submit" className={"btn btn-secondary students-dropdown-btn"}>
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
