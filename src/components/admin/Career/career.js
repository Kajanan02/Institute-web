import React, {useEffect, useState} from 'react';
import Layout from "../../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import CareerForm from "./careerForm";
import {isAdminAccount} from "../../../utils/Authentication";
import {toggleConfirmationDialog, toggleLoader} from "../../../redux/actions";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, values} from "underscore";
import {toast} from "react-toastify";

function Career(props) {
    const [careerList, setCareerList] = useState([])
    const [careerAllList, setCareerAllList] = useState([])
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const instituteId = localStorage.getItem("USER_ID");
    const studentId = localStorage.getItem("STUDENT_ID");
    const [update, setUpdate] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState({})
    const [deletedId, setDeletedId] = useState(null);

    console.log(selectedCareer);

    useEffect(() => {
        dispatch(toggleLoader(true))
        //http://localhost:5000/api/getAllCareers
        axios.get(`${process.env.REACT_APP_HOST}/getAllCareers`)
            .then((res) => {
                setCareerList(res.data)
                setCareerAllList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [update])
    const confirmationDialog = useSelector(state => {
        return state.setting.confirmationDialog
    });

    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS STUDENT DATA')
        }));
        setDeletedId(id)
        console.log("ads")
    }

    useEffect(() => {
        if (!confirmationDialog || !confirmationDialog.onSuccess || !deletedId) {
            console.log("asdf")
            return;
        }
        console.log("asdasd")
        dispatch(toggleLoader(true))

        //http://localhost:5000/api/career/:id
        axios.delete(`${process.env.REACT_APP_HOST}/career/${deletedId}`)
            .then((res) => {
                setUpdate(!update)
                toast.success(`Successfully Deleted`)

            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
            setDeletedId(null)
        })
    }, [confirmationDialog])


    const dispatch = useDispatch();

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(careerAllList, function (item) {
                return values(pick(item, 'course', 'degreeProgramme', 'duration', 'availableUniversities')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase());
            });
            setCareerList(res);
            console.log(res)
        } else {
            setCareerList(careerAllList);
        }
    }


    console.log();


    return (
        <Layout>
            {/* <div className={"d-flex fw-bold justify-content-center align-items-center mt-5 fs-1"}> */}
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Career</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"table-btn-container"}>

                                <div className={"appointment-search"}>
                                    <div className="container-fluid">
                                        <form className="d-flex" role="search">
                                            <input className="form-control me-2" onChange={handleSearch} type="search"
                                                   placeholder="Search"
                                                   aria-label="Search"/>
                                        </form>
                                    </div>
                                </div>
                                <div></div>
                                {isAdminAccount() &&
                                    <button type="button" className={"btn btn-secondary students-dropdown-btn"}
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
                                <th scope="col">Course</th>
                                <th scope="col">Degree Programme</th>
                                <th scope="col">Available Universities</th>
                                {/* <th scope="col">description</th>                                 */}
                                <th scope="col">Duration</th>
                                <th scope="col"></th>


                            </tr>
                            </thead>
                            <tbody>
                            {careerList.map((data, index) => (<tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>

                                {/* <td>{data.CourseCode}</td> */}
                                <td>{data.course}</td>
                                <td>{data.degreeProgramme}</td>
                                <td>{data.availableUniversities}</td>
                                {/* <td>{data.Description}</td> */}
                                <td>{data.duration}</td>
                                {/* <td>
                                {data.state}
                                    

                                </td> */}
                                <td className={"table-action"}>

                                    <td>
                                        <FeatherIcon className={"action-icons"} icon={"eye"}
                                                     onClick={() => {
                                                         setModalType("View");
                                                         setSelectedCareer(data)
                                                         setModalShow(true)
                                                     }}/>
                                        {isAdminAccount() && <FeatherIcon className={"action-icons"} icon={"edit"}
                                                                          onClick={() => {
                                                                              setSelectedCareer(data)
                                                                              setModalType("Edit");
                                                                              setModalShow(true)
                                                                          }}/>}


                                        {isAdminAccount() &&
                                            <FeatherIcon className={"action-icons text-red"} icon={"trash-2"}
                                                         onClick={() => handleDelete(data._id)}/>}
                                    </td>


                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                        {careerList.length === 0 &&
                            <div className={"text-center py-5 fw-bold"}>No Career Data Found,Please Add</div>}
                    </div>
                </div>
            </div>

            <CareerForm
                show={modalShow}
                type={modalType}
                selectedCareer={selectedCareer}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedCareer(null)
                }}
            />

            {/* </div> */}
        </Layout>
    );
}

export default Career;