import React, { useState } from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import { studentData } from "./damiData";
import StudentForm from "./student-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleConfirmationDialog } from "../../redux/actions";

function Students(props) {

    const [studentsList, setStudentsList] = useState(studentData)
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();


    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS STUDENT DATA')
        }));
        setDeletedId(id)
    }


    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Students Details</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"table-btn-container"}>


                                <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                                    onClick={() => {
                                        setModalType("Add");
                                        setModalShow(true)
                                    }}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"} />
                                    Add
                                </button>


                                <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                    aria-expanded="false">
                                    <FeatherIcon className={"action-icons text-white"} icon={"download"} />
                                    Import Data
                                </button>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                    aria-expanded="false">
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"table-container p-2 pt-0 "}>
                        <table className={"table table-hover table-striped sa-table-width"}>
                            <thead>
                                <tr className={"position-sticky top-0 pt-1 h-45"}>
                                    <th scope="col">No</th>
                                    <th scope="col">Reg.No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Stream</th>
                                    <th scope="col">Join Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsList.map((data, index) => (<tr key={index + "asd"}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.Reg}</td>
                                    <td>{data.name}</td>
                                    <td>{data.stream}</td>
                                    <td>{data.joindate}</td>
                                    <td className={"table-action"}>


                                        <FeatherIcon className={"action-icons"} icon={"eye"}
                                            onClick={() => {
                                                navigate("/profile/" + data.Reg)
                                            }} />
                                        <FeatherIcon className={"action-icons"} icon={"edit"}
                                            onClick={() => {
                                                setModalType("Edit")
                                                setModalShow(true)
                                            }} />
                                        <FeatherIcon className={"action-icons text-red"} icon={"trash-2"}
                                            onClick={() => handleDelete(data.Reg)} />
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <StudentForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
            />

        </Layout>
    );
}

export default Students;
