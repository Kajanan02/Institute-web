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
    const [performancee, setPerformance] = useState("");
    const dispatch = useDispatch();


    function calculatePerformanceState(input) {
        if (input >= 90) {
            return 'Excellent';
        } else if (input >= 70 && input < 90) {
            return 'Good';
        } else if (input >= 50 && input < 70) {
            return 'Average';
        } else if (input >= 30 && input < 50) {
            return 'Below Average';
        } else {
            return 'Poor';
        }
    }


    useEffect(() => {
        dispatch(toggleLoader(true))

        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/attendance`)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    },[])





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
                setDataSet(series)

                let curentMonthData = filteredData.filter((item) => item.date?.slice(5,7) === (new Date().getMonth()+1).toString() &&  item.studentId === getStudentId())
                let totalMarksArr = pluck(curentMonthData,"marks")
                let total = totalMarksArr.reduce((a, b) => a + b, 0)
                setPerformance(calculatePerformanceState(total/curentMonthData.length))
                console.log(curentMonthData)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])
    console.log(performancee)
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
                                    <div className={"card-text-motive"}><b>Motive</b> <FeatherIcon className={"home-action-icons ms-3"} icon={"award"} /></div>
                                    <div className={"card-text-msg"}>Education is the passport to the future, for tomorrow belongs to those who prepare for it today.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body p-3"}>
                                <div className={"card-text"}><b>Monthly Performance</b></div>
                                <div><FeatherIcon className={"home-action-icons "} size={50} icon={"user-check"} />  <b className={"ms-3 fs-4"}>{performancee}</b> </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body "}>

                                <div className={"card-text"}><b>Last Attendance</b></div>
                                <div className={"card-text-msg"}>Date : 19-11-2023</div>
                                <div className={"card-text-msg"}>Time : 10.05 am</div>
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