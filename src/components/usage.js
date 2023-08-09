import React, {useEffect, useState} from 'react';
import Layout from "../layout/layout";
import {toggleConfirmationDialog} from "../redux/actions";
import {useDispatch} from "react-redux";
import 'c3/c3.css';
import C3Chart from "react-c3js";
import * as d3 from "d3";

function Usage(props) {

    const [dataSet, setDataSet] = useState({});
    const [loadGraph, setLoadGraph] = useState(false);
    const dispatch = useDispatch();
    function handleDelete() {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS WATER SOURCE'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE WATER SOURCE')
        }));
    }
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
            ["Marks",40, 50, 70, 90, 80, 50],
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
                ['Marks'].concat(durationCurrentAggregated),
                ['Date'].concat(date),
            ],
            colors : {
                ['Marks'] : '#00AB55'
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

    console.log(dataSet)

    return (
        <Layout>
            <button className={"btn btn-primary m-5"} onClick={handleDelete}>asd</button>
            <div className={"container"}>
                <div className={"default-container"}>
                    {loadGraph && dataSet.data &&<C3Chart area={{zerobased: false}} padding={{left: 45}} tooltip={dataSet.tooltip}
                              zoom={dataSet.zoom}

                              data={dataSet.data} subchart={{show: false}} onrendered={styleGraph}
                              axis={dataSet.axis}/>}
                </div>
            </div>
        </Layout>
    );
}

export default Usage;