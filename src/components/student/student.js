import React, { useState } from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';

function Students(props) {

    const [studentsList, setStudentsList] = useState([{ No: 0o1, Reg: 200012345678, name: "Harsh", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o2, Reg: 200012345679, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o3, Reg: 200012345680, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o5, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o6, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o6, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" }])
    console.log(studentsList)
    console.log(studentsList[0])




    return (
        <Layout>
            <div className={"container"}>
                <div className={"p-5"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Students Details</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"marks-dropdown-container"}>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button" aria-expanded="false">
                                    +
                                </button>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button" aria-expanded="false">
                                    Filter
                                </button>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button" aria-expanded="false">
                                    Import Data
                                </button>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button" aria-expanded="false">
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"table-container p-2"}>
                        <table className={"table table-hover"} >
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Reg.No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Stream</th>
                                    <th scope="col">Join Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsList.map((data, index) => (<tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{data.Reg}</td>
                                    <td>{data.name}</td>
                                    <td>{data.stream}</td>
                                    <td>{data.joindate}</td>
                                    <td><FeatherIcon className={"action-icons"} icon={"eye"} />
                                        <FeatherIcon className={"action-icons"} icon={"edit"} />
                                        <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} /></td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default Students;