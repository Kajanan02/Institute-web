import React, {useEffect, useState} from 'react';
import Layout from "../../../layout/layout";
import {careerData} from "./damiData";
import FeatherIcon from 'feather-icons-react';
import CareerForm from "./careerForm";
import {isParentAccount} from "../../../utils/Authentication";

function Career(props) {
    const [careerList, setcareerList] = useState(careerData)
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);


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
                                <th scope="col">Course </th>
                                <th scope="col">Degree Programme</th>
                                <th scope="col">Available Universities</th>
                                {/* <th scope="col">description</th>                                 */}
                                <th scope="col">Duration</th>
                                <th scope="col"> </th>
                                
                               
                            </tr>
                            </thead>
                            <tbody>
                            {careerList.map((data, index) => (<tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>

                                {/* <td>{data.CourseCode}</td> */}
                                <td>{data.Course}</td>
                                <td>{data.DegreeProgramme}</td>
                                <td>{data.AvailableUniversities}</td>
                                {/* <td>{data.Description}</td> */}
                                <td>{data.Duration}</td>
                                {/* <td>
                                {data.state}
                                    

                                </td> */}
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

            <CareerForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
            />  
               
            {/* </div> */}
        </Layout>
    );
}

export default Career;