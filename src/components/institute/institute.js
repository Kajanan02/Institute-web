import React, {useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from "feather-icons-react";
import InstituteForm from "./instituteForm";
import {useDispatch} from "react-redux";
import {toggleConfirmationDialog} from "../../redux/actions";
import {instituteData} from "../institute/instituteDamiData";
// import {appointmentData} from "../appointment/damiData";


function Institute(props) {
    const [instituteList, setInstituteList] = useState(instituteData)
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);

    function handleDelete() {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS DETAILS'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS DETAILS')
        }));
    }
    // const [List, setMarksList] = useState([{ No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3},
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 },
    // { No: 0o1, Reg: 200012345678, name: "Harsh", email: "Physics", contact: 80, address: 0o3 }])
    // console.log(marksList)
    // console.log(marksList[0])

    const dispatch = useDispatch();
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
                                    <td>{data.contact}</td>
                                    <td>{data.address}</td>
                                    <td>
                                        <FeatherIcon className={"action-icons"} icon={"eye"}
                                                     onClick={() => {
                                                         setModalType("View");
                                                         setModalShow(true)
                                                     }}/>
                                        <FeatherIcon className={"action-icons"} icon={"edit"}
                                                     onClick={() => {
                                                         setModalType("Edit");
                                                         setModalShow(true)
                                                     }}/>

                                        <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} onClick={handleDelete}/>
                                    </td>
                                </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            <InstituteForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
            />



        </Layout>
    );
}

export default Institute;