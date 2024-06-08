import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import User from "../../assets/BasicDetails.svg";
import ToggleLayout from "../utils-components/toggle-layout";
import {without} from "underscore";
import QRCode from "qrcode.react";
import {useParams} from "react-router-dom";
import axios from "axios";
import StudentLocationView from "./student-location-view";
import Profile from "../../assets/profile-img.svg";
import {useDispatch} from "react-redux";
import {toggleLoader} from "../../redux/actions";
import layoutDefaultProfile from "../../assets/layoutDefaultProfile.jpg";
import StudentForm from './student-form';

function StudentProfile() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [visibleToggleIndex, setVisibleToggleIndex] = useState([1]);
    const [seletedStudent, setSelectedStudent] = useState({});
    const {studentId} = useParams()
    // const { parentId } = useParams()
    const instituteId = localStorage.getItem("USER_ID");
    // const [profileImage, setProfileImage] = useState(layoutDefaultProfile);
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState("view")
    const [update, setUpdate] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {
        ///institute/:instituteId/student/:id
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}`)
            .then((res) => {
                setSelectedStudent(res.data)


            }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [update])

    // useEffect(() => {
    //     ///institute/:instituteId/student/:id
    //     dispatch(toggleLoader(true))
    //     axios.get(`${process.env.REACT_APP_HOST}/institute/${instituteId}/parent/${parentId}`)

    //         .then((res) => {
    //             setSelectedParent(res.data)
    //         }).finally(() => {
    //             dispatch(toggleLoader(false))
    //         })
    // }, [])


    // function updateProfileImage(Profile) {
    //     setProfileImage(Profile);
    // }

    console.log(seletedStudent?.parentId?._id);

    // const seletedStudent = {
    //     name: 'V. Janushankan',
    //     imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    //     imageSize: 90,
    //     nicNo: "200028000530",
    //     address: "No. 132/ 141, Nilaveli Road, Alesgarden, Trincomalee.",
    //     phoneNumber: "0711439088",
    //     mail: "janushankan1006@gmail.com",
    //     gender: "Male",
    //     dob: "10/06/2023",
    //     subjects: ["Combined Mathematics", "Physics"],
    //     nicFront: 'https://www.w3schools.com/bootstrap5/cinqueterre.jpg',
    //     nicBack: 'https://www.w3schools.com/bootstrap5/cinqueterre.jpg',
    // };
    const openModal = (imageUrl, imageCaption) => {
        setSelectedImage({url: imageUrl, caption: imageCaption});
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    function toggle(index) {
        if (visibleToggleIndex.includes(index)) {
            let data = without(visibleToggleIndex, index);
            setVisibleToggleIndex(data)
        } else {
            setVisibleToggleIndex(oldArray => [...oldArray, index]);
        }
    }


    return (
        <Layout>
            <div className={"mt-5 mb-5"}>
                <ToggleLayout image={User} title={"View Students Details"} dropDown={false}
                              visibleToggleIndex={visibleToggleIndex}
                              toggleIndex={1}
                              onVisibleToggleIndexChange={(index) => toggle(index)}>
                    <div className="accordion-content p-5">
                        <div className="row">
                            <div className={"d-flex align-items-center flex-column flex-lg-row"}>
                                <div>
                                    <img
                                        className="avatar profile-img float-start"
                                        src={seletedStudent.profilePic ? seletedStudent.profilePic : layoutDefaultProfile}
                                        alt={'Photo of ' + seletedStudent.name}
                                        style={{
                                            width: seletedStudent.imageSize,
                                            height: seletedStudent.imageSize
                                        }}
                                    />
                                </div>
                                <div className={"ms-lg-4"}>
                                    <h4 className={"profile-name"}>{seletedStudent.name}</h4>
                                    <h4 className={"profile-name profile-view-text"}>Student</h4>
                                </div>
                            </div>

                            <div className={"pop-up-form-container"}>
                                <div className={"row label-align mt-3"}>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Name:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail2"
                                                   className="form-label">{seletedStudent.name || "-"}</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">NIC
                                                No:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">{seletedStudent.nicNo || "-"}</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Address:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">{seletedStudent.address || "-"}</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Contact
                                                No:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">{seletedStudent.phoneNumber || "-"}</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Email:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">{seletedStudent.email || "-"}</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Gender:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">{seletedStudent.gender || "-"}</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Date of
                                                Birth:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">{seletedStudent.dob || "-"}</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Subjects:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">{seletedStudent.subjects && seletedStudent.subjects.length > 0 ? seletedStudent.subjects.map(e => e.replace("_", " ").toUpperCase()).join(', ').toString() : 'No subjects available'}</label>
                                        </div>
                                    </div>




                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">QR :</label>

                                            <div>
                                                <QRCode className="qr-img"
                                                        value={studentId}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        {modalOpen && (
                                            <div className="nic-expand-modal" onClick={closeModal}>
                                                <div className="nic-modal-content"
                                                     onClick={(e) => e.stopPropagation()}>
                                                        <span className="nic-close" onClick={closeModal}>
                                                            &times;
                                                        </span>
                                                    <img src={selectedImage.url} alt={`NIC Front`}
                                                         className="nic-enlarged-image"/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {!seletedStudent?.parentId?._id ? <div className="d-flex justify-content-end my-4">
                                        <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                                aria-expanded="false" onClick={() => {
                                            setModalType("Add")
                                            setModalShow(true)
                                        }}
                                        >
                                            Add Parent
                                        </button>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </ToggleLayout>


                {seletedStudent?.parentId?._id ?
                    <ToggleLayout image={User} title={"View Parent Details"} dropDown={false}
                                  visibleToggleIndex={visibleToggleIndex}
                                  toggleIndex={2}
                                  onVisibleToggleIndexChange={(index) => toggle(index)}>


                        <div className="accordion-content rounded p-5">
                            <div className="row">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-2">
                                        <div className="d-flex-start align-items-center justify-content-start">
                                            <img
                                                className="avatar profile-img float-start"
                                                src={Profile}
                                                alt={'Photo of ' + seletedStudent.name}
                                                style={{
                                                    width: seletedStudent.imageSize,
                                                    height: seletedStudent.imageSize
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-10">
                                        <div
                                            className="d-flex-start flex-row align-items-center justify-content-center">
                                            <h4 className={"profile-name"}>{seletedStudent?.parentId?.name}</h4>
                                            <h4 className={"profile-name profile-view-text"}>Parent</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className={"pop-up-form-container"}>
                                    <div className={"row label-align mt-3"}>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">Name:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail2"
                                                       className="form-label">{seletedStudent?.parentId?.name || "-"}</label>
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">NIC No:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">{seletedStudent?.parentId?.nicNo || "-"}</label>
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">Address:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">{seletedStudent?.parentId?.address || "-"}</label>
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">Contact
                                                    No:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">{seletedStudent?.parentId?.phoneNumber || "-"}</label>
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">Email:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">{seletedStudent?.parentId?.email || "-"}</label>
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">Gender:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">{seletedStudent?.parentId?.gender || "-"}</label>
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">Date of
                                                    Birth:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">{seletedStudent?.parentId?.dob || "-"}</label>
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label profile-view-text">Relationship to
                                                    Student:&nbsp;</label>
                                                <label htmlFor="exampleInputEmail1"
                                                       className="form-label">{seletedStudent?.parentId?.relationship || "Father"}</label>
                                            </div>
                                        </div>
                                        {/*<div className={"col-6"}>*/}
                                        {/*    <div className="mb-3">*/}
                                        {/*        <label htmlFor="exampleInputEmail1"*/}
                                        {/*            className="form-label profile-view-text">NIC Front:&nbsp;</label>*/}
                                        {/*        <img*/}
                                        {/*            className="avatar profile-img-display"*/}
                                        {/*            src={seletedStudent.nicFront}*/}
                                        {/*            alt={'Photo of ' + seletedStudent.name + ' (NIC Front)'}*/}
                                        {/*            style={{*/}
                                        {/*                width: 90,*/}
                                        {/*                height: 90,*/}
                                        {/*                borderRadius: 12,*/}
                                        {/*                cursor: 'pointer',*/}
                                        {/*            }}*/}
                                        {/*            onClick={() => openModal(seletedStudent.nicFront, 'NIC Front Image')}*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className={"col-6"}>*/}
                                        {/*    <div className="mb-3">*/}
                                        {/*        <label htmlFor="exampleInputEmail1"*/}
                                        {/*            className="form-label profile-view-text">NIC Back:&nbsp;</label>*/}
                                        {/*        <img*/}
                                        {/*            className="avatar profile-img-display img-fluid"*/}
                                        {/*            src={seletedStudent.nicBack}*/}
                                        {/*            alt={'Photo of ' + seletedStudent.name + ' (NIC Front)'}*/}
                                        {/*            style={{*/}
                                        {/*                width: 90,*/}
                                        {/*                height: 90,*/}
                                        {/*                borderRadius: 12,*/}
                                        {/*                cursor: 'pointer',*/}
                                        {/*            }}*/}
                                        {/*            onClick={() => openModal(seletedStudent.nicBack, 'NIC Back Image')}*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ToggleLayout> : null}
            </div>
            <StudentForm
                from={"studentProfile"}

                id={seletedStudent.name}
                show={modalShow}
                type={modalType}
                studentId={seletedStudent._id}
                onHide={() => setModalShow(false)}
                update={() => setUpdate(!update)}
                // selectedStudent={selectedStudent}
            />

        </Layout>
    );
}

export default StudentProfile;
