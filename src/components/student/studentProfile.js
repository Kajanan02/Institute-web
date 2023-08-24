import React, {useState} from 'react';
import Layout from "../../layout/layout";
import {subjectData} from "./damiData";
import FeatherIcon from 'feather-icons-react';
import User from "../../assets/BasicDetails.svg";
import ToggleLayout from "../utils-components/toggle-layout";
import {without} from "underscore";

function StudentProfile() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [visibleToggleIndex, setVisibleToggleIndex] = useState([1]);


    const user = {
        name: 'V. Janushankan',
        imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
        imageSize: 90,
        nicNo: "200028000530",
        address: "No. 132/ 141, Nilaveli Road, Alesgarden, Trincomalee.",
        phoneNumber: "0711439088",
        mail: "janushankan1006@gmail.com",
        gender: "Male",
        dob: "10/06/2023",
        subjects: ["Combined Mathematics", "Physics"],
        nicFront: 'https://www.w3schools.com/bootstrap5/cinqueterre.jpg',
        nicBack: 'https://www.w3schools.com/bootstrap5/cinqueterre.jpg',
    };
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
                            <div className={"row"}>
                                <div className="flex flex-column">
                                    <img
                                        className="avatar profile-img float-start"
                                        src={user.imageUrl}
                                        alt={'Photo of ' + user.name}
                                        style={{
                                            width: user.imageSize,
                                            height: user.imageSize
                                        }}
                                    />
                                    <h4 className={"profile-name text-indent"}>{user.name}</h4>
                                    <h4 className={"profile-name text-indent profile-view-text"}>Student</h4>
                                </div>
                            </div>

                            <div className={"pop-up-form-container"}>
                                <div className={"row label-align mt-3"}>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Name:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail2" className="form-label">V.
                                                Janushankan</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">NIC
                                                No:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">200028000530</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Address:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label">No. 132/
                                                141,
                                                Nilaveli Road, Alesgarden, Trincomalee.</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Contact
                                                No:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">0711439088</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Email:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">janushankan1006@gmail.com</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Gender:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">Male</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Date of
                                                Birth:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label">10/06/2000</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">Subjects:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label">Combined
                                                Mathematics, Physics</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">NIC
                                                Front:&nbsp;</label>
                                            <img
                                                className="avatar profile-img-display"
                                                src={user.nicFront}
                                                alt={'Photo of ' + user.name + ' (NIC Front)'}
                                                style={{
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 12,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => openModal(user.nicFront, 'NIC Front Image')}
                                            />
                                            {modalOpen && (
                                                <div className="nic-expand-modal" onClick={closeModal}>
                                                    <div className="nic-modal-content"
                                                         onClick={(e) => e.stopPropagation()}>
                                                            <span className="nic-close" onClick={closeModal}>
                                                                &times;
                                                            </span>
                                                        <img src={user.nicFront} alt={`NIC Front`}
                                                             className="nic-enlarged-image"/>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1"
                                                   className="form-label profile-view-text">NIC
                                                Back:&nbsp;</label>
                                            <img
                                                className="avatar profile-img-display img-fluid"
                                                src={user.nicBack}
                                                alt={'Photo of ' + user.name + ' (NIC Front)'}
                                                style={{
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 12,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => openModal(user.nicBack, 'NIC Back Image')}
                                            />
                                            {modalOpen && (
                                                <div className="nic-expand-modal" onClick={closeModal}>
                                                    <div className="nic-modal-content"
                                                         onClick={(e) => e.stopPropagation()}>
                                                            <span className="nic-close" onClick={closeModal}>
                                                                &times;
                                                            </span>
                                                        <img src={user.nicBack} alt={`NIC Back`}
                                                             className="nic-enlarged-image"/>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ToggleLayout>



            <ToggleLayout image={User} title={"View Parent Details"} dropDown={false}
                          visibleToggleIndex={visibleToggleIndex}
                          toggleIndex={2}
                          onVisibleToggleIndexChange={(index) => toggle(index)}>


                <div className="accordion-content rounded p-5">
                    <div className="row">
                        <div className={"row"}>
                            <div className="flex flex-column">
                                <img
                                    className="avatar profile-img float-start"
                                    src={user.imageUrl}
                                    alt={'Photo of ' + user.name}
                                    style={{
                                        width: user.imageSize,
                                        height: user.imageSize
                                    }}
                                />
                                <h4 className={"profile-name text-indent"}>{user.name}</h4>
                                <h4 className={"profile-name text-indent profile-view-text"}>Parent</h4>
                            </div>
                        </div>

                        <div className={"pop-up-form-container"}>
                            <div className={"row label-align mt-3"}>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">Name:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail2" className="form-label">V.
                                            Janushankan</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">NIC No:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">200028000530</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">Address:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail1" className="form-label">No. 132/ 141,
                                            Nilaveli Road, Alesgarden, Trincomalee.</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">Contact
                                            No:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">0711439088</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">Email:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">janushankan1006@gmail.com</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">Gender:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail1" className="form-label">Male</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">Date of
                                            Birth:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">10/06/2000</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">Relationship to
                                            Student:&nbsp;</label>
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label">Father</label>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">NIC Front:&nbsp;</label>
                                        <img
                                            className="avatar profile-img-display"
                                            src={user.nicFront}
                                            alt={'Photo of ' + user.name + ' (NIC Front)'}
                                            style={{
                                                width: 90,
                                                height: 90,
                                                borderRadius: 12,
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => openModal(user.nicFront, 'NIC Front Image')}
                                        />
                                        {modalOpen && (
                                            <div className="nic-expand-modal" onClick={closeModal}>
                                                <div className="nic-modal-content"
                                                     onClick={(e) => e.stopPropagation()}>
                                                            <span className="nic-close" onClick={closeModal}>
                                                                &times;
                                                            </span>
                                                    <img src={user.nicFront} alt={`NIC Front`}
                                                         className="nic-enlarged-image"/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label profile-view-text">NIC Back:&nbsp;</label>
                                        <img
                                            className="avatar profile-img-display img-fluid"
                                            src={user.nicBack}
                                            alt={'Photo of ' + user.name + ' (NIC Front)'}
                                            style={{
                                                width: 90,
                                                height: 90,
                                                borderRadius: 12,
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => openModal(user.nicBack, 'NIC Back Image')}
                                        />
                                        {modalOpen && (
                                            <div className="nic-expand-modal" onClick={closeModal}>
                                                <div className="nic-modal-content"
                                                     onClick={(e) => e.stopPropagation()}>
                                                            <span className="nic-close" onClick={closeModal}>
                                                                &times;
                                                            </span>
                                                    <img src={user.nicBack} alt={`NIC Back`}
                                                         className="nic-enlarged-image"/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ToggleLayout>
            </div>
        </Layout>
    );
}

export default StudentProfile;
