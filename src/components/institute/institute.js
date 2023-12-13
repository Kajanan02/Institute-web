import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from "feather-icons-react";
import InstituteForm from "./instituteForm";
import {useDispatch, useSelector} from "react-redux";
import {toggleConfirmationDialog, toggleLoader} from "../../redux/actions";
import {instituteData} from "../institute/instituteDamiData";
import axios from "axios";
import {toast} from "react-toastify";
// import {appointmentData} from "../appointment/damiData";


function Institute(props) {
    const [instituteList, setInstituteList] = useState([])
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState(null)
    const [selectedInstituteId, setSelectedInstituteId] = useState(null)
    const users = localStorage.getItem("USER_ID");

    const dispatch = useDispatch();

    const confirmationDialog = useSelector(state => {
        return state.setting.confirmationDialog
    });

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/users/allprofile`)
            .then((res) => {
                setInstituteList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [update])
    function handleDelete(id) {
        setSelectedInstituteId(id)
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS DETAILS'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS DETAILS')
        }));
    }

    useEffect(()=>{
        if (!confirmationDialog || !confirmationDialog.onSuccess || !selectedInstituteId) {
            console.log("asdf")
            return;
        }
        console.log("asdasd")
        dispatch(toggleLoader(true))
        axios.delete(`${process.env.REACT_APP_HOST}/users/${selectedInstituteId}/deleteUser`)
            .then((res) => {
                setUpdate(!update)
                toast.success(`Successfully Deleted`)

                setUpdate(!update)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
            setSelectedInstituteId(null)
        })
    },[confirmationDialog])

    return (
        <Layout>
                <div className={"container"}>
                    <div className={"container-widget"}>
                        <div className={"students_marks_container"}>
                            <div><h3 className={"content-heading"}>Institute</h3></div>
                            <div className={"table-btn-container d-flex justify-content-end pb-3"}>
                                {/*<div className={"dropdown"}>*/}
                                {/*  <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                                {/*    Stream*/}
                                {/*  </button>*/}
                                {/*  <ul className="dropdown-menu dropdown-menu-dark">*/}
                                {/*    <li><a className={"dropdown-item active"} href="#">Biology</a></li>*/}
                                {/*    <li><a className={"dropdown-item"} href="#">Physical Science</a></li>*/}
                                {/*    <li><a className={"dropdown-item"} href="#">Commerce</a></li>*/}
                                {/*    <li><a className={"dropdown-item"} href="#">Arts</a></li>*/}
                                {/*    <li><a className={"dropdown-item"} href="#">Technology</a></li>*/}
                                {/*  </ul>*/}
                                {/*</div>*/}
                                {/*<div className={"dropdown"}>*/}
                                {/*  <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                                {/*    Subject*/}
                                {/*  </button>*/}
                                {/*  <ul class={"dropdown-menu dropdown-menu-dark"}>*/}
                                {/*    <li><a className={"}dropdown-item active"} href="#">Action</a></li>*/}
                                {/*    <li><a className={"dropdown-item"} href="#">Another action</a></li>*/}
                                {/*    <li><a className={"dropdown-item"} href="#">Something else here</a></li>*/}
                                {/*    <li><a className={"dropdown-item"} href="#">Separated link</a></li>*/}
                                {/*  </ul>*/}
                                {/*</div>*/}

                                {/*  <button type="button" className={"btn btn-secondary students-dropdown-btn"}*/}
                                {/*    data-bs-toggle="modal" data-bs-target="#exampleModal"*/}
                                {/*    onClick={() => setModalType("Add")}>*/}
                                {/*  <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>*/}
                                {/*    Add*/}
                                {/*</button>*/}
                                <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                                        onClick={() => {
                                            setModalType("Add");
                                            setModalShow(true)
                                        }}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>
                                    Add
                                </button>



                            </div>
                        </div>
                        <div className={"table-container"}>
                            <table className={"table table-hover table-striped"} >
                                <thead className={"top-0 position-sticky h-45"}>
                                <tr>
                                    <th scope="col">No</th>

                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact No</th>
                                    <th scope="col">Address</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {instituteList.map((data, index) => (<tr>
                                    <th scope="row">{index + 1}</th>

                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phoneNumber}</td>
                                    <td>{data.address}</td>
                                    <td>
                                        <FeatherIcon className={"action-icons"} icon={"eye"}
                                                     onClick={() => {
                                                         setModalType("View");
                                                         setSelectedInstitute(data)
                                                         setModalShow(true)
                                                     }}/>
                                        <FeatherIcon className={"action-icons"} icon={"edit"}
                                                     onClick={() => {
                                                         setSelectedInstitute(data)
                                                         setModalType("Edit");
                                                         setModalShow(true)
                                                     }}/>


                                        <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} onClick={()=>handleDelete(data._id)}/>
                                    </td>
                                </tr>))}
                                </tbody>
                            </table>
                            {instituteList.length === 0 && <div className={"text-center py-5 fw-bold"}>No Institute Data Found,Please Add</div>}

                        </div>
                    </div>
                </div>
            <InstituteForm
                show={modalShow}
                type={modalType}
                selectedInstitute={selectedInstitute}
                update={()=>setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedInstitute(null)
                }}
            />



        </Layout>
    );
}

export default Institute;