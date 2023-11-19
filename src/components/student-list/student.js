import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import StudentForm from "./student-form";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toggleConfirmationDialog, toggleLoader} from "../../redux/actions";
import {ExportToCsv} from "export-to-csv";
import axios from "axios";
import {toast} from "react-toastify";
import {values,pick,filter} from "underscore";

function Students(props) {

    const [studentsList, setStudentsList] = useState([])
    const [studentsAllist, setStudentsAllList] = useState([])
    const [modalType, setModalType] = useState("view")
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();
    const instituteId = localStorage.getItem("USER_ID");

    const dispatch = useDispatch();


    const confirmationDialog = useSelector(state => {
        return state.setting.confirmationDialog
    });

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${instituteId}/getAllStudents`)
            .then((res) => {
                setStudentsList(res.data)
                setStudentsAllList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [update])




    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS STUDENT DATA')
        }));
        setDeletedId(id)
        console.log("ads")
    }

    console.log(confirmationDialog)
    console.log(deletedId)
    useEffect(()=>{
        if (!confirmationDialog || !confirmationDialog.onSuccess) {
            console.log("asdf")
            return;
        }
        console.log("asdasd")
        dispatch(toggleLoader(true))
        axios.delete(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${deletedId}`)
            .then((res) => {
             setUpdate(!update)
                toast.success(`Successfully Deleted`)

            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
            setDeletedId(null)
        })
    },[confirmationDialog])

    function exportData() {
        const data = [];
        studentsAllist.forEach((student) => {
            data.push({
                "Name": student.name,
                "Date of Birth": student.dob,
                "Gender":student.gender,
                "NIC No": student.nicNo,
                "Address ": student.address,
                "Subjects ": student.subjects.map(e => e.replace("_"," ")).join(","),
                "Joined Date":student.createdAt.slice(0,10),
                "Email": student.email ? student.email : " - ",
            });
        });
        const opt = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalseparator: ".",
            showLabels: true,
            showTitle: false,
            title: "Student Details",
            useBom: true,
            noDownload: false,
            headers: ["Name", "Date of Birth", "Gender", "NIC No", "Address ", "Subjects ", "Joined Date","Email"],
            filename: "StudentDetails",
            nullToEmptyString: true,
        };

        const csvExporter = new ExportToCsv(opt);
        csvExporter.generateCsv(data);
    }

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(studentsAllist, function (item) { return values(pick(item, 'name',  'gender', 'createdAt','nicNo')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase()); });
            setStudentsList(res);
            console.log(res)
        } else {
            setStudentsList(studentsAllist);
        }
    }

    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Students Details</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"table-btn-container"}>
                                <input className="form-control me-2 w-50" onChange={handleSearch} type="search" placeholder="Search"
                                       aria-label="Search"/>

                                <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                                        onClick={() => {
                                            setModalType("Add");
                                            setModalShow(true)
                                        }}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>
                                    Add
                                </button>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                        aria-expanded="false" onClick={exportData}>
                                    Export Data
                                </button>


                                {/*<button className={"btn btn-secondary students-dropdown-btn"} type="button"*/}
                                {/*        aria-expanded="false">*/}
                                {/*    <FeatherIcon className={"action-icons text-white"} icon={"download"}/>*/}
                                {/*    Import Data*/}
                                {/*</button>*/}
                                {/* <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                        aria-expanded="false" onClick={exportData}>
                                    Export Data
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className={"table-container p-2 pt-0 "}>
                        <table className={"table table-hover table-striped sa-table-width"}>
                            <thead>
                            <tr className={"position-sticky top-0 pt-1 h-45"}>
                                <th scope="col">No</th>
                                <th scope="col">NIC No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Join Date</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentsList.map((data, index) => (<tr key={data._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.nicNo}</td>
                                <td>{data.name}</td>
                                <td>{data.gender}</td>
                                <td>{data.createdAt?.slice(0,10)}</td>
                                <td className={"table-action"}>


                                    <FeatherIcon className={"action-icons"} icon={"eye"}
                                                 onClick={() => {
                                                     navigate("/students/" + data._id)
                                                 }}/>
                                    <FeatherIcon className={"action-icons"} icon={"edit"}
                                                 onClick={() => {
                                                     setModalType("Edit")
                                                     setModalShow(true)
                                                     setSelectedStudent(data)
                                                 }}/>
                                    <FeatherIcon className={"action-icons text-red"} icon={"trash-2"}
                                                 onClick={() => handleDelete(data._id)}/>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                        {studentsList.length === 0 && <div className={"text-center py-5 fw-bold"}>No Student Data Found,Please Add</div>}
                    </div>
                </div>
            </div>

            <StudentForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
                update={()=>setUpdate(!update)}
                selectedStudent={selectedStudent}
            />

        </Layout>
    );
}

export default Students;
