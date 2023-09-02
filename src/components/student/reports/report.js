import React, {useState} from 'react';
import Layout from "../../../layout/layout";
import FeatherIcon from "feather-icons-react";
import {useDispatch} from "react-redux";

function Report(props) {
    const [marksList, setMarksList] = useState([{ No: 0o1, Date: 200012345678, subject: "Physics", marks: 80, rank: 0o3 },
        { No: 0o2, Date: 200012345679,  subject: "Physics", marks: 90, rank: 0o2 },
        { No: 0o3, Date: 200012345680,  subject: "Physics", marks: 95, rank: 0o1 },
        { No: 0o4, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o5, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o6, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o7, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o7, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o7, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o4, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 4, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o4, Date: 200012345681,  subject: "Physics", marks: 78, rank: 0o4 },
        { No: 0o4, Date: 200012345681, subject: "Physics", marks: 78, rank: 0o4 }])
    console.log(marksList)
    console.log(marksList[0])
    const [modalType, setModalType] = useState("view")
    const dispatch = useDispatch();
    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_marks_container"}>
                        <div><h3 className={"content-heading"}>Report</h3></div>
                        <div className={"table-btn-container d-flex justify-content-end pb-3"}>
                            <div className={"dropdown"}>
                                <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Subject
                                </button>
                                <ul class={"dropdown-menu dropdown-menu-dark"}>

                                    <li><a className={"dropdown-item"} href="#">Mathematics</a></li>
                                    <li><a className={"dropdown-item"} href="#">Physics</a></li>
                                    <li><a className={"dropdown-item"} href="#">Chemistry</a></li>
                                </ul>
                            </div>


                            <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                    aria-expanded="false">
                                <FeatherIcon className={"action-icons text-white"} icon={"bar-chart-2"} />
                                Graph
                            </button>

                            {/*<button className={"btn btn-secondary students-dropdown-btn"} type="button"*/}
                            {/*        aria-expanded="false">*/}
                            {/*    Export Data*/}
                            {/*</button>*/}

                        </div>
                    </div>
                    <div className={"table-container"}>
                        <table className={"table table-hover table-striped"} >
                            <thead className={"top-0 position-sticky h-45"}>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Date</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Marks</th>
                                <th scope="col">Rank</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {marksList.map((data, index) => (<tr>
                                <th scope="row">{index + 1}</th>
                                <td>{data.Date}</td>
                                <td>{data.subject}</td>
                                <td>{data.marks}</td>
                                <td>{data.rank}</td>
                                <td>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Report;