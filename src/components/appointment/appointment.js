import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import {appointmentData} from "./damiData";
import FeatherIcon from 'feather-icons-react';
import AppointmentForm from "./appointmentForm";
import {isParentAccount} from "../../utils/Authentication";
import {toggleConfirmationDialog, toggleLoader} from "../../redux/actions";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {values, pick, filter, pluck} from "underscore";


function Appointment(props) {
    const [appointmentList, setAppointmentList] = useState([])
    const [appointmentAllist, setAppointmentAllList] = useState([])
    const [modalType, setModalType] = useState("view")
    const [selectedAppointment, setSelectedAppointment] = useState({})
    const [modalShow, setModalShow] = useState(false);
    const instituteId = localStorage.getItem("USER_ID");
    const studentId = localStorage.getItem("STUDENT_ID");
    const [update, setUpdate] = useState(false);
    // const [marksList, setMarksList] = useState([])

    useEffect(() => {
        dispatch(toggleLoader(true))
        // http://localhost:5000/api/institute/:instituteId/getAllAppointments
        axios.get(`${process.env.REACT_APP_HOST}/institute/${instituteId}/getAllAppointments`)
            .then((res) => {
                if(isParentAccount()){
                    setAppointmentList(res.data.filter((data)=> data.studentId._id === studentId)) 
                    setAppointmentAllList(res.data.filter((data)=> data.studentId._id === studentId)) 
                }else{
                    setAppointmentList(res.data)
                setAppointmentAllList(res.data)

                }
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [update])

    
    const dispatch = useDispatch();

    console.log(selectedAppointment);

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(appointmentAllist, function (item) { return values(pick(item, 'date',  'time', 'studentId.name','studentId?.nicNo')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase()); });
            setAppointmentList(res);
            console.log(res)
        } else {
            setAppointmentList(appointmentAllist);
        }
    }

    function colorChange(status){

        switch(status){
            case "DECLINE":
                return "bg-danger text-white"
            case "REQUESTED":
                return "bg-warning text-dark"
            default:
                return ""
            
        }

    }

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
                                            
                                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                            <input className="form-control appointment_btn me-2 w-50" onChange={handleSearch} type="search" placeholder="Search"
                                       aria-label="Search"/>
                                        </form>
                                    </div>
                                </div>
                                {isParentAccount() &&<button type="button" className={"btn btn-secondary students-dropdown-btn"}
                                        onClick={() => {
                                            setModalType("Add");
                                            setModalShow(true)
                                        }}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>
                                    Add
                                </button>}
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
                                {(localStorage.getItem('ROLE') === "2") &&<th scope="col">Parent Name</th>}
                               {(localStorage.getItem('ROLE') === "2") &&<th scope="col">Student Name</th>}
                                <th scope="col">Reg.No</th>
                                <th scope="col">State</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                            appointmentList.map((data, index) => (<tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>

                                <td>{data.date?.slice(0,10)}</td>
                                <td>{data.time}</td>
                                {(localStorage.getItem('ROLE') === "2") &&<td>{data.parentName}</td>}
                                {(localStorage.getItem('ROLE') === "2")&&<td>{ data.studentId?.name}</td>}
                                <td>{data.studentId?.nicNo}</td>
                                <td>
                                    <div className={"appointment_state " + (colorChange(data.status))}
                                             onClick={() => {
                                                 if(isParentAccount()) {
                                                     return
                                                 }
                                                 let temp = {...data}
                                                 temp.date = data.date?.slice(0,10)
                                                 setSelectedAppointment(temp)
                                             setModalShow(true)
                                                 setModalType("State");
                                         }
                                    }>{data.status}</div>

                                </td>
                                <td className={"table-action"}>

                                    <div type="button"
                                            onClick={() => {
                                                setModalType("View");
                                                setModalShow(true)
                                            }}>
                                        <FeatherIcon className={"action-icons"} icon={"eye"} onClick={() => {
                                            setModalType("View")
                                            let temp = {...data}
                                            temp.date = data.date?.slice(0,10)
                                            setSelectedAppointment(temp)
                                            }}/>

                                    </div>


                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                        {appointmentList.length === 0 && <div className={"text-center py-5 fw-bold"}>No Appointment Data Found,Please Add</div>}
                    </div>
                </div>
            </div>

            <AppointmentForm
                show={modalShow}
                type={modalType}
                selectedAppointment={selectedAppointment}
                update={()=> setUpdate(!update)}
                onHide={() => setModalShow(false)}
            />

        </Layout>
    );
}

export default Appointment;