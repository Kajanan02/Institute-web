import React, { useEffect, useState } from 'react';
import Layout from "../../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import attendance from "../../../assets/Attendance.jpg";
import studentSlider1 from "../../../assets/studentSlider1.png";
import studentSlider2 from "../../../assets/studentSlider2.png"
import studentSlider3 from "../../../assets/studentSlider3.png"
import homeimage from "../../../assets/homeimage.svg"
import logo from "../../../assets/logo.png"
import C3Chart from "react-c3js";
import * as d3 from "d3";
import { useDispatch } from "react-redux";
import Carousel from 'react-bootstrap/Carousel';


function StudentDashboard(props) {
    const [dataSet, setDataSet] = useState({});
    const [loadGraph, setLoadGraph] = useState(false);
    const dispatch = useDispatch();
    function styleGraph() {
        if (window.innerWidth < 769) {
            d3.select(".c3-axis-x-label").attr("dy", "42px");
            d3.selectAll(".tick").style("font-size", "7px");
            d3.select(".c3-axis-y-label").attr("dy", "-34px");
        } else {
            d3.select(".c3-axis-y-label").attr("dy", "-36px");
        }
        d3.selectAll(".c3-legend-item").attr("x", "400");
    }

    async function addDataGraphDate(graphData) {
        await new Promise((resolve, reject) => {
            resolve(1); setDataSet(graphData)
        });
    }

    const data = {
        columns: [
            ["Attendance", 40, 50, 70, 90, 80, 50],
            ["Date", "2023-08-09", "2023-08-12", "2023-08-15", "2023-08-17", "2023-08-20", "2023-08-25"]
        ]
    };

    function drawGraph() {
        //Here You want data below two line
        const durationCurrentAggregated = [40, 50, 70, 90, 80, 50]
        const date = ["2023-08-09", "2023-08-12", "2023-08-15", "2023-08-17", "2023-08-20", "2023-08-25"];

        const graphData = {};
        graphData.data = null;
        graphData.axis = null;
        const tooltip = {
            format: {
                value: function (value, ratio, id, index) {
                    return value;
                }
            },
        };

        const data = {
            x: 'Date',

            // xFormat: '%Y-%m-%d',
            columns: [
                ['Attendance'].concat(durationCurrentAggregated),
                ['Date'].concat(date),
            ],
            colors: {
                ['Attendance']: '#00AB55'
            },
            // unload: unload(weatherTab),
            type: 'area-spline',
        };
        let axis

        axis = {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                },
                label: {
                    text: 'Date',
                    position: 'outer-center',
                },
            },
            y: {
                label: {
                    text: "Attendance",
                    position: 'outer-middle',

                }
            },
        };
        const zoom = {
            rescale: true

        };
        graphData['data'] = data;
        graphData['axis'] = axis;
        graphData['tooltip'] = tooltip;
        graphData['zoom'] = zoom;

        addDataGraphDate(graphData).then(() => {
            setLoadGraph(true);
            console.log("drawing graph");
        });

    }

    useEffect(() => {
        setLoadGraph(false);
        drawGraph();
    }, []);

    console.log(dataSet)

    return (
        <div>

            <div className={"container mt-4 mb-4"}>
                <div className={"row p-2 mb-4"}>
                    <div className={"col-md-6"}>
                        <div className={"studentCard-container"}>
                            <div className={"row p-2"}>
                                <div className={"col-md-6"}>
                                    <div className={"card-title studentCard-title"}><h4>Welcome back 👋 <br /> Janushankan</h4></div>
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
                    <div className={"default-container"}>
                        {loadGraph && dataSet.data && <C3Chart area={{ zerobased: false }} padding={{ left: 45 }} tooltip={dataSet.tooltip}
                            zoom={dataSet.zoom}

                            data={dataSet.data} subchart={{ show: false }} onrendered={styleGraph}
                            axis={dataSet.axis} />}
                    </div>
                </div>
            </div>

        </div >
    );
}

export default StudentDashboard;