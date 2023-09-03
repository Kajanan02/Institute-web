import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import {appointmentData} from "./damiData";
import FeatherIcon from 'feather-icons-react';
import AppointmentForm from "./appointmentForm";
import {isParentAccount} from "../../utils/Authentication";

function Appointment(props) {
    const [appointmentList, setAppointmentList] = useState(appointmentData)
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);


    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Appointment</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"table-btn-container"}>

                                <div className={"appointment-search"}>
                                    <div className="container-fluid">
                                        <form className="d-flex" role="search">
                                            <input className="form-control me-2" type="search" placeholder="Search"
                                                   aria-label="Search"/>
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                        </form>
                                    </div>
                                </div>
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
                    </div>
                    <div className={"table-container p-2 pt-0 "}>
                        <table className={"table table-hover table-striped sa-table-width"}>
                            <thead>
                            <tr className={"position-sticky top-0 pt-1 h-45"}>
                                <th scope="col">No</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Parent Name</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Reg.No</th>
                                <th scope="col">State</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {appointmentList.map((data, index) => (<tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>

                                <td>{data.date}</td>
                                <td>{data.Time}</td>
                                <td>{data.parent_name}</td>
                                <td>{data.student_name}</td>
                                <td>{data.Reg}</td>
                                <td>
                                    <div className={"appointment_state"}
                                             onClick={() => {

                                                 if(isParentAccount()) {
                                                     return
                                                 }
                                             setModalShow(true)
                                                 setModalType("State");
                                         }
                                    }>{data.state}</div>

                                </td>
                                <td className={"table-action"}>

                                    <div type="button"
                                            onClick={() => {
                                                setModalType("View");
                                                setModalShow(true)
                                            }}>
                                        <FeatherIcon className={"action-icons"} icon={"eye"} onClick={() => setModalType("View")}/>

                                    </div>


                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AppointmentForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
            />

        </Layout>
    );
}

export default Appointment;