import React, {useEffect, useState} from 'react';
import Layout from "../../../layout/layout";
import FeatherIcon from "feather-icons-react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {toggleLoader} from "../../../redux/actions";
import {marksData} from "./marksData";
import C3Chart from "react-c3js";
import * as d3 from "d3";

function Report(props) {

    const [marksList, setMarksList] = useState(marksData)
    const [dataSet, setDataSet] = useState({});
    const [loadGraph, setLoadGraph] = useState(false);
    const [graph,setGraph] = useState(false);

    // const instituteId = "64a8ec4c0c9f2a365061f338"
    // const studentId = localStorage.getItem("STUDENT_ID")
    // const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(toggleLoader(true))
    //     axios.get(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/marks`)
    //         .then((res) => {
    //             setMarksList(res.data)
    //         }).catch((err) => {
    //         console.log(err)
    //     }).finally(() => {
    //         dispatch(toggleLoader(false))
    //     })
    // }, [])

    console.log(marksList)
    console.log(marksList[0])

    async function addDataGraphDate(graphData) {
        await new Promise((resolve, reject) => {
            resolve(1); setDataSet(graphData)
        });
    }
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
                ['Marks'].concat(durationCurrentAggregated),
                ['Date'].concat(date),
            ],
            colors: {
                ['Marks']: '#00AB55'
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
                    text: "Marks",
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


    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_marks_container"}>
                        <div><h3 className={"content-heading"}>Report</h3></div>
                        <div className={"table-btn-container d-flex justify-content-end pb-3"}>
                            {!graph && <div className={"dropdown"}>
                                <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Subject
                                </button>
                                <ul class={"dropdown-menu dropdown-menu-dark"}>

                                    <li><a className={"dropdown-item"} href="#">Mathematics</a></li>
                                    <li><a className={"dropdown-item"} href="#">Physics</a></li>
                                    <li><a className={"dropdown-item"} href="#">Chemistry</a></li>
                                </ul>
                            </div>}


                            <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                    aria-expanded="false" onClick={()=> setGraph(!graph)}>
                                <FeatherIcon className={"action-icons text-white"} icon={"bar-chart-2"} />
                                {graph ? "Table" : "Graph"}
                            </button>

                            {/*<button className={"btn btn-secondary students-dropdown-btn"} type="button"*/}
                            {/*        aria-expanded="false">*/}
                            {/*    Export Data*/}
                            {/*</button>*/}

                        </div>
                    </div>
                    {!graph &&<div className={"table-container"}>
                        <table className={"table table-hover table-striped"}>
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
                                <td>{data.subject.replace("_"," ")}</td>
                                <td>{data.marks}</td>
                                <td>{data.rank}</td>
                                <td>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                        {marksList.length === 0 &&
                            <div className={"text-center py-5 fw-bold"}>No Report Data Found</div>}

                    </div>}
                    {graph &&<div className={"default-container d-flex align-items-center"} style={{height: "600px"}}>
                        {loadGraph && dataSet.data &&
                            <C3Chart area={{zerobased: false}} padding={{left: 45,right:45}} tooltip={dataSet.tooltip}
                                     zoom={dataSet.zoom}

                                     data={dataSet.data} subchart={{show: false}} onrendered={styleGraph}
                                     axis={dataSet.axis}/>}
                    </div>}
                </div>
            </div>
        </Layout>
    );
}

export default Report;