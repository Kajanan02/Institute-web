import React, {useEffect, useState} from 'react';
import Layout from "../../../layout/layout";
import FeatherIcon from "feather-icons-react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {toggleLoader} from "../../../redux/actions";
import {filterDataByKey, optionsGraph, rankMarks} from "../../../utils/utils";
import {getInstituteId, getStudentId} from "../../../utils/Authentication";
import {pluck, uniq} from "underscore";
import ReportGraph from "./report-graph";

function Report(props) {

    const [marksList, setMarksList] = useState([])
    const [marksListAll, setMarksListAll] = useState([])
    const [dataSet, setDataSet] = useState({});
    const [loadGraph, setLoadGraph] = useState(false);
    const [graph, setGraph] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/getAllMarks`)
            .then((res) => {
                let data = rankMarks(res.data, "rank")
                let filteredData = data.filter((item) => item.studentId === getStudentId())
                console.log(filteredData)
                setMarksList(filteredData)
                setMarksListAll(filteredData)
                let subList = uniq(pluck(filteredData, "subject"))
                console.log(subList)
                let series = []
                for (const subListElement of subList) {
                    let obj = {}
                    let subItem = filteredData.filter((item) => item.subject === subListElement)
                    obj.name = subListElement
                    obj.data = subItem.map((item) => {
                        let data = {}
                        data.x = item.date?.slice(0, 10)
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
                                <ul className={"dropdown-menu dropdown-menu-dark"}>

                                    <li><a className={"dropdown-item cursor-pointer"}
                                           onClick={() => setMarksList(filterDataByKey(marksListAll, "All"))}>All</a>
                                    </li>
                                    {uniq(pluck(marksListAll, "subject")).map((item, index) => <li><a
                                        className={"dropdown-item cursor-pointer"} key={index + item}
                                        onClick={() => setMarksList(filterDataByKey(marksListAll, item))}>{item.replace("_", " ")}</a>
                                    </li>)}
                                </ul>
                            </div>}


                            <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                                    aria-expanded="false" onClick={() => setGraph(!graph)}>
                                <FeatherIcon className={"action-icons text-white"} icon={"bar-chart-2"}/>
                                {graph ? "Table" : "Graph"}
                            </button>

                            {/*<button className={"btn btn-secondary students-dropdown-btn"} type="button"*/}
                            {/*        aria-expanded="false">*/}
                            {/*    Export Data*/}
                            {/*</button>*/}

                        </div>
                    </div>
                    {!graph && <div className={"table-container"}>
                        <table className={"table table-hover table-striped"}>
                            <thead className={"top-0 position-sticky h-45"}>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Date</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Marks</th>
                                <th scope="col">Rank</th>
                            </tr>
                            </thead>
                            <tbody>
                            {marksList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                                <tr key={index + "marksReports"}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.date?.slice(0, 10)}</td>
                                    <td>{data.subject.replace("_", " ")}</td>
                                    <td>{data.marks}</td>
                                    <td>{data.rank}</td>

                                </tr>))}
                            </tbody>
                        </table>
                        {marksList.length === 0 &&
                            <div className={"text-center py-5 fw-bold"}>No Report Data Found</div>}

                    </div>}
                    {graph && <ReportGraph options={optionsGraph}
                                           dataSet={dataSet}/>}
                </div>
            </div>
        </Layout>
    );
}

export default Report;