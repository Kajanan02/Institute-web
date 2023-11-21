import React, { useEffect, useState } from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import studentSlider1 from "../../assets/studentSlider1.png";
import studentSlider2 from "../../assets/studentSlider2.png"
import studentSlider3 from "../../assets/studentSlider3.png"
import homeimage from "../../assets/homeimage.svg"
import Carousel from 'react-bootstrap/Carousel';
import {getName} from "../../utils/Authentication";
import Chart from 'react-apexcharts'


function Home(props) {

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
            enabled: false
        },
        colors:['#00b957'],
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


    return (
        <Layout>

            <div className={"container mt-4 mb-4"}>
                <div className={"row p-2 mb-4"}>
                    <div className={"col-md-6"}>
                        <div className={"studentCard-container"}>
                            <div className={"row p-2"}>
                                <div className={"col-md-6 card-image studentCard-image align-items-center"}>
                                    <img src={homeimage} alt="Home Image" className={" img-fluid img-responsive"} />
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"card-title studentCard-title"}><h4>Welcome back 👋 <br /> {getName()}</h4></div>
                                    {/*<div className={"card-title studentCard-title"}><h4>Welcome back 👋 <br /> {getName()}</h4></div>*/}
                                    <div className={"card-subtitle studentCard-text"}><p>Empowering your educational journey with tools, insights, and resources. Let's excel together!</p></div>
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
                                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"user-plus"} /></div>
                                    <div className={"card-text_total"}>1,200</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body p-3"}>
                                <div className={"card-text"}>Today's Attendance</div>
                                <div className={"d-flex align-items-center"}>
                                <div><FeatherIcon className={"home-action-icons me-3"} icon={"user-check"} /></div>
                                <div className={"card-text_total"}>1,191</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body "}>

                                <div className={"card-text"}>Total Pending Income</div>
                                <div className={"d-flex align-items-center"}>
                                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"dollar-sign"} /></div>
                                    <div className={"card-text_total"}>20,000</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-3 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body "}>

                                <div className={"card-text"}>Total Income</div>
                                <div className={"d-flex align-items-center"}>
                                <div><FeatherIcon className={"home-action-icons me-3"} icon={"dollar-sign"} /></div>
                                <div className={"card-text_total"}>228,000</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row m-1 p-2 mt-4"}>
                    <div className={"default-container"}>

                        <Chart options={options} series={options.series} type="area"  width={"100%"} height={320} />
                    </div>
                </div>
            </div>

        </Layout >
    );
}

export default Home;