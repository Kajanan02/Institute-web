import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import attendance from "../../assets/Attendance.jpg";
import income from "../../assets/income.jpg";
import performance from "../../assets/performance.jpg"
import broadcast from "../../assets/broadcast.jpg"
import homeimage from "../../assets/homeimage.svg"
import logo from "../../assets/logo.png"
import C3Chart from "react-c3js";
import * as d3 from "d3";
import {useDispatch} from "react-redux";


function Home(props) {
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
            ["Attendance",40, 50, 70, 90, 80, 50],
            ["Date","2023-08-09", "2023-08-12", "2023-08-15", "2023-08-17", "2023-08-20", "2023-08-25"]
        ]
    };

    function drawGraph() {
        //Here You want data below two line
        const durationCurrentAggregated = [40, 50, 70, 90, 80, 50]
        const date =   ["2023-08-09", "2023-08-12", "2023-08-15", "2023-08-17", "2023-08-20", "2023-08-25"];

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
            colors : {
                ['Attendance'] : '#00AB55'
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
        <Layout>

            {/*<div className="row row-cols-1 row-cols-md-3 g-4 p-3">*/}
            {/*    <div className="col">*/}
            {/*        <div className="card h-100">*/}
            {/*            <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*                 aria-label="Placeholder: Image cap" src={attendance}*/}
            {/*                 preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*            <div className="card-body">*/}
            {/*                <h5 className="card-title"></h5>*/}
            {/*                <p className="card-text"></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="col">*/}
            {/*        <div className="card h-100">*/}
            {/*            <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*                 aria-label="Placeholder: Image cap" src={income}*/}
            {/*                 preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*            <div className="card-body">*/}
            {/*                <h5 className="card-title"></h5>*/}
            {/*                <p className="card-text"></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="col">*/}
            {/*        <div className="card h-100">*/}
            {/*            <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*                 aria-label="Placeholder: Image cap" src={performance}*/}
            {/*                 preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*            <div className="card-body">*/}
            {/*                <h5 className="card-title"></h5>*/}
            {/*                <p className="card-text"></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}
            {/*<div className="card-group p-3" >*/}
            {/*    <div className="card">*/}
            {/*        <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*              aria-label="Placeholder: Image cap" src={attendance}*/}
            {/*             preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}

            {/*        <div className="card-body home_card">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="card">*/}
            {/*        <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*             aria-label="Placeholder: Image cap" src={income}*/}
            {/*             preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*        <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*        <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*        <div className="card-body">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="card">*/}
            {/*        <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*             aria-label="Placeholder: Image cap" src={performance}*/}
            {/*             preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*        <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*        <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*        <div className="card-body">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={"p-5"}>
                <div className={"slide-container"}>
                <div className={"col-sm-6 mb-3 mb-sm-0 p-2"}>
                    <div className={""}>
                        <div className={"card-container"}>
                        <div >
                            <img src={homeimage} className={"card-image"} />
                        </div>
                        <div className={"card-container-body"}>
                            <div><h4 className={"card-title"}>Welcome To EDUZENT! </h4></div>
                            <div><p className={"card-text"}>We provide services to perfectly maintain data with the Highest Security</p></div>

                        </div>
                        </div>
                    </div>
                </div>
                <div id="carouselExampleCaptions" class="carousel slide pointer-event image-slide p-3 pt-4">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                className="active" aria-label="Slide 1" aria-current="true"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2" className=""></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3" className=""></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                                aria-label="Slide 4" className=""></button>
                    </div>
                    <div class="carousel-inner">

                        <div class="carousel-item active">
                            <img className="bd-placeholder-img card-img-top slider" width="100%" height="180"
                                         aria-label="Placeholder: Image cap" src={performance}
                                         preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#868e96"></rect>
                                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>
                            <div class="carousel-caption d-none d-md-block">
                                <h5></h5>
                                <p className={"slide-text"}>Good performance of our students in A/L</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                                    <img className="bd-placeholder-img card-img-top slider" width="100%" height="180"
                                         aria-label="Placeholder: Image cap" src={income}
                                         preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#868e96"></rect>
                                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>

                            <div class="carousel-caption d-none d-md-block">
                                <h5></h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                                    <img className="bd-placeholder-img card-img-top slider" width="100%" height="180"
                                          aria-label="Placeholder: Image cap" src={attendance}
                                         preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>
                                        <rect width="100%" height="100%" fill="#868e96"></rect>
                                        <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>
                            <div class="carousel-caption d-none d-md-block">
                                <h5></h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img className="bd-placeholder-img card-img-top slider" width="100%" height="180"
                                 aria-label="Placeholder: Image cap" src={broadcast}
                                 preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#868e96"></rect>
                            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>

                            <div class="carousel-caption d-none d-md-block">
                                <h5></h5>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                </div>
                <div className={"row p-2"}>
                    <div className={"col-sm-4 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body p-3"}>
                                {/*<img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
                                {/*     aria-label="Placeholder: Image cap" src={attendance}*/}
                                {/*     preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
                                {/*<rect width="100%" height="100%" fill="#868e96"></rect>*/}
                                {/*<text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
                                <div className={"card-text"}>Total Admissions</div>
                                <div><FeatherIcon className={"home-action-icons"} icon={"user-plus"} /></div>
                                <div className={"card-text_total"}>1,200</div>

                                {/*<div className={"seeInfo"}>*/}
                                {/*    /!*<div className={"card-text_text"}></div>*!/*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className={"card home_card"}>
                            <div className={"card-body p-3"}>
                                {/*<img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
                                {/*     aria-label="Placeholder: Image cap" src={income}*/}
                                {/*     preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
                                {/*<rect width="100%" height="100%" fill="#868e96"></rect>*/}
                                {/*<text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
                                <div className={"card-text"}>Attendance</div>
                                <div><FeatherIcon className={"home-action-icons"} icon={"user-check"} /></div>
                                <div className={"card-text_total"}>1,191</div>

                                {/*<div className={"seeInfo"}>*/}
                                {/*<div className={"card-text_text"}></div>*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body "}>
                                {/*<img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
                                {/*     aria-label="Placeholder: Image cap" src={performance}*/}
                                {/*     preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
                                {/*<rect width="100%" height="100%" fill="#868e96"></rect>*/}
                                {/*<text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}

                                <div className={"card-text"}>Total Income</div>
                                <div><FeatherIcon className={"home-action-icons"} icon={"dollar-sign"} /></div>
                                <div className={"card-text_total"}>228,000</div>

                                {/*<div className={"seeInfo"}>*/}
                                {/*    <div className={"card-text_text"}></div>*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={"row"}>
                        {/*<div className={"col-sm-6 mb-3 mb-sm-0"}>*/}
                        {/*    <div className={"card home_card"}>*/}
                        {/*        <div className={"card-body"}>*/}
                        {/*            <h5 className={"card-title"}></h5>*/}
                        {/*            <p className={"card-text"}></p>*/}
                        {/*            */}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className={"col-sm-"}>
                            <div className={""}>
                                <div className={""}>
                                    <div className={"container card-graph"}>
                                        <div className={"default-container"}>
                                            {loadGraph && dataSet.data &&<C3Chart area={{zerobased: false}} padding={{left: 45}} tooltip={dataSet.tooltip}
                                                                                  zoom={dataSet.zoom}

                                                                                  data={dataSet.data} subchart={{show: false}} onrendered={styleGraph}
                                                                                  axis={dataSet.axis}/>}
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

export default Home;