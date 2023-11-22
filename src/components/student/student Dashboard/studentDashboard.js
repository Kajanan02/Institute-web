import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import attendance from "../../../assets/Attendance.jpg";
import studentSlider1 from "../../../assets/studentSlider1.png";
import studentSlider2 from "../../../assets/studentSlider2.png"
import studentSlider3 from "../../../assets/studentSlider3.png"
import homeimage from "../../../assets/homeimage.svg"

import { useDispatch } from "react-redux";
import Carousel from 'react-bootstrap/Carousel';
import {getInstituteId, getName, getStudentId} from "../../../utils/Authentication";
import ReportGraph from "../reports/report-graph";
import {optionsGraph, rankMarks} from "../../../utils/utils";
import {toggleLoader} from "../../../redux/actions";
import axios from "axios";
import {pluck, uniq} from "underscore";


function StudentDashboard(props) {
    const [dataSet, setDataSet] = useState({});
    const dispatch = useDispatch();





    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/getAllMarks`)
            .then((res) => {
                let data = rankMarks(res.data,"rank")
                let filteredData = data.filter((item) => item.studentId === getStudentId())
                let subList = uniq(pluck(filteredData,"subject"))
                console.log(subList)
                let series = []
                for (const subListElement of subList) {
                    let obj = {}
                    let subItem = filteredData.filter((item) => item.subject === subListElement)
                    obj.name = subListElement
                    obj.data = subItem.map((item) => {
                        let data = {}
                        data.x = item.date?.slice(0,10)
                        data.y = item.marks
                        return data
                    })
                    series.push(obj)
                }
                console.log(series)
                setDataSet(series)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])
    return (
        <div>

            <div className={"container mt-4 mb-4"}>
                <div className={"row p-2 mb-4"}>
                    <div className={"col-md-6"}>
                        <div className={"studentCard-container"}>
                            <div className={"row p-2"}>
                                <div className={"col-md-6"}>
                                    <div className={"card-title studentCard-title"}><h4>Welcome back 👋 <br /> {getName()}</h4></div>
                                    <div className={"card-subtitle studentCard-text"}><p>Empowering your educational journey with tools, insights, and resources. Let's excel together!</p></div>
                                </div>
                                <div className={"col-md-6 card-image studentCard-image align-items-center"}>
                                    <img src={homeimage} alt="Home Image" className={" img-fluid img-responsive"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6"}>
                        <Carousel data-bs-theme="dark" className="student-carousel">
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid studentSlider-img"
                                    src={studentSlider1}
                                    alt="First slide"
                                />
                                {/* <Carousel.Caption>
                                    <h5>First slide label</h5>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid studentSlider-img"
                                    src={studentSlider2}
                                    alt="Second slide"
                                />
                                {/* <Carousel.Caption>
                                    <h5>Second slide label</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 img-fluid studentSlider-img"
                                    src={studentSlider3}
                                    alt="Third slide"
                                />
                                {/* <Carousel.Caption>
                                    <h5>Third slide label</h5>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                    </p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>



                <div className={"row p-2 mt-4"}>
                    <div className={"col-sm-6 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"dashboardStudent p-3"}>
                                <div className={"admissionCard"}>
                                <div className={"card-text"}>Total Admissions</div>
                                <div><FeatherIcon className={"home-action-icons"} icon={"user-plus"} /></div>
                                <div className={"card-text_total"}>1,200</div></div>
                                <div className={"admissionCard-Content"}><h6>Discover your path to <br/><FeatherIcon className={"home-action-icons"} icon={"award"} /> success with us. </h6></div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body p-3"}>
                                <div className={"card-text"}>Monthly Attendance</div>
                                <div><FeatherIcon className={"home-action-icons"} icon={"user-check"} /></div>
                                <div className={"card-text_total"}>1,191</div>

                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body "}>

                                <div className={"card-text"}>Upcoming Exam</div>
                                <div><FeatherIcon className={"home-action-icons"} icon={"dollar-sign"} /></div>
                                <div className={"card-text_total"}>228,000</div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row p-2 mt-4"}>
                        {dataSet.length >0 && <ReportGraph options={optionsGraph}
                                      dataSet={dataSet}/>}
                </div>
            </div>

        </div >
    );
}

export default StudentDashboard;