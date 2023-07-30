import React from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import MultiSelect from "@khanacademy/react-multi-select";
import { subjectData } from "./damiData";

function StudentProfile() {
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
        subjects: ["Combined Mathematics", "Physics"]
    };

    const buyerOption = subjectData;

    return (
        <Layout>
            <div className="container text-left pt-5">
                <div><h3 className={"content-heading pb-3"}>View Students Details</h3></div>
                <div className="row">
                    <div className="col-md-auto view-div shadow-sm p-3 mb-5 bg-white rounded text-center p-4 col-s">
                        <div className="flex flex-column justify-content-center align-items-center">
                            <img
                                className="avatar proImg"
                                src={user.imageUrl}
                                alt={'Photo of ' + user.name}
                                style={{
                                    width: user.imageSize,
                                    height: user.imageSize
                                }}
                            />
                            <h4>{user.name}</h4>
                        </div>
                    </div>

                    <div className="col-8 view-div shadow-sm p-3 mb-5 bg-white rounded">
                        <div>
                            <div className={"pop-up-form-container"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Name:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail2" className="form-label tx1">V. Janushankan</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">NIC No:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label tx1">200028000530</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Address:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label tx1">No. 132/ 141, Nilaveli Road, Alesgarden, Trincomalee.</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Contact No:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label tx1">0711439088</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label tx1">janushankan1006@gmail.com</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Gender:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label tx1">Male</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label tx1">10/06/2000</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Subjects:&nbsp;</label>
                                            <label htmlFor="exampleInputEmail1" className="form-label tx1">Combined Mathematics, Physics</label>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">NIC Front:&nbsp;</label>
                                            <img
                                                className="avatar"
                                                src={user.imageUrl}
                                                alt={'Photo of ' + user.nicFront}
                                                style={{
                                                    width: 150,
                                                    height: 100,
                                                    borderRadius: 12,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">NIC Back:&nbsp;</label>
                                            <img
                                                className="avatar"
                                                src={user.imageUrl}
                                                alt={'Photo of ' + user.nicBack}
                                                style={{
                                                    width: 150,
                                                    height: 100,
                                                    borderRadius: 12,
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default StudentProfile;
