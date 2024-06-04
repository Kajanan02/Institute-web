import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import studentSlider1 from "../../assets/studentSlider1.png";
import studentSlider2 from "../../assets/studentSlider2.png"
import studentSlider3 from "../../assets/studentSlider3.png"
import homeimage from "../../assets/homeimage.svg"
import Carousel from 'react-bootstrap/Carousel';
import {getInstituteId, getName, isParentAccount, isStudentAccount} from "../../utils/Authentication";
import Chart from 'react-apexcharts'
import {useNavigate} from "react-router-dom";
import {toggleLoader} from "../../redux/actions";
import axios from "axios";
import {useDispatch} from "react-redux";
import {monthArray} from "../../utils/utils";
import {pluck, uniq} from "underscore";


function Home(props) {

    const navigate = useNavigate();

    const [totalStudents, setTotalStudents] = useState([]);
    const [todayPayment, setTodayPayment] = useState(0);
    const [monthPayment, setMonthPayment] = useState(0);
    const [todayAttendance, setTodayAttendance] = useState(0);
    const [attendanceSeries, setAttendanceSeries] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (isParentAccount()) {
            navigate("/student")
        }
        if (isStudentAccount()) {
            navigate("/student")
        }
    }, []);

    var options = {
        series: [{
            name: 'Attendance',
            data: [55, 75, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 350,
            // type: 'area'
        },
        dataLabels: {
            enabled: true
        },
        colors: ['#00b957'],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
                colorStops: [{
                    offset: 0,
                    color: "rgba(0,255,136,0.69)",
                    opacity: 1
                }, {
                    offset: 100,
                    color: "rgba(0,255,136,0.19)",
                    opacity: 1
                }]

            }
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'date',
            categories: ["2023-09-19", "2023-09-20", "2023-09-21", "2023-09-22", "2023-09-23", "2023-09-24", "2023-09-25"]
        },
        tooltip: {
            backgroundColor: '#ff0000',
            x: {
                format: 'dd/MM/yy'
            },
        },
    };

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/getAllStudents`)
            .then((res) => {
                setTotalStudents(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/fees`)
            .then((res) => {
                let data = res.data
                let filteredData = data.filter((item) => item.month === monthArray[new Date().getMonth()])
                let date = new Date().toISOString().slice(0, 10)
                let filterByToday = data.filter((item) => item.createdAt.slice(0, 10) === date)
                console.log(filterByToday)
                let total = filteredData.reduce((a, b) => a + Number(b.feesAmount), 0)
                let totalToday = filterByToday.reduce((a, b) => a + Number(b.feesAmount), 0)
                setTodayPayment(totalToday)
                setMonthPayment(total)
                console.log(monthArray[new Date().getMonth()])


            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])

    useEffect(() => {
        dispatch(toggleLoader(true))

        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/attendance`)
            .then((res) => {
                console.log(res.data)
                let date = new Date().toISOString().slice(0, 10)
                let filterByToday = res.data.filter((item) => item.date.slice(0, 10) === date)
                let filterByMonth = res.data.filter((item) => item.date.slice(5, 7) === (new Date().getMonth() + 1).toString())
                let mapData = filterByMonth.map((item) => ({...item, date: item.date.slice(0, 10)}))
                let datas = []
                let dateArr = uniq(pluck(mapData, "date"))
                for (const dateArrElement of dateArr) {
                    let subItem = mapData.filter((item) => item.date === dateArrElement)
                    let item = {}
                    item.x = dateArrElement
                    item.y = subItem.length.toString()
                    datas.push(item)
                }
                console.log(datas)
                setAttendanceSeries([{data: datas, name: "Attendance"}])
                console.log(filterByToday)
                setTodayAttendance(filterByToday.length)

            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])


    return (
        <Layout>

            <div className={"container mt-4 mb-4"}>
                <div className={"row p-2 mb-4"}>
                    <div className={"col-md-6"}>
                        <div className={"studentCard-container"}>
                            <div className={"row p-2"}>
                                <div className={"col-md-6 card-image studentCard-image align-items-center"}>
                                    <img src={homeimage} alt="Home Image" className={" img-fluid img-responsive"}/>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"card-title studentCard-title"}><h4>Welcome back 👋 <br/> {getName()}
                                    </h4></div>
                                    {/*<div className={"card-title studentCard-title"}><h4>Welcome back 👋 <br /> {getName()}</h4></div>*/}
                                    <div className={"card-subtitle studentCard-text"}><p>Empowering your educational
                                        journey with tools, insights, and resources. Let's excel together!</p></div>
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


                <div className={"row  mt-4"}>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body p-3"}>
                                <div className={"card-text"}>Total Admissions</div>
                                <div className={"d-flex align-items-center"}>
                                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"user-plus"}/></div>
                                    <div className={"card-text_total"}>{totalStudents.length}</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body p-3"}>
                                <div className={"card-text"}>Today's Attendance</div>
                                <div className={"d-flex align-items-center"}>
                                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"user-check"}/></div>
                                    <div className={"card-text_total"}>{todayAttendance}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body "}>

                                <div className={"card-text"}>Today Income</div>
                                <div className={"d-flex align-items-center"}>
                                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"dollar-sign"}/></div>
                                    <div
                                        className={"card-text_total"}>{new Intl.NumberFormat().format(todayPayment)}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body "}>

                                <div className={"card-text"}>Current Month Income</div>
                                <div className={"d-flex align-items-center"}>
                                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"dollar-sign"}/></div>
                                    <div
                                        className={"card-text_total"}>{new Intl.NumberFormat().format(monthPayment)}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row m-1 p-2 mt-4"}>
                    <div className={"default-container"}>

                        {attendanceSeries.length > 0 &&
                            <Chart options={options} series={attendanceSeries} type="area" width={"100%"}
                                   height={320}/>}
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default Home;