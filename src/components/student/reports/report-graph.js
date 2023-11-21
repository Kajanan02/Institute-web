import React from 'react';
import Chart from "react-apexcharts";

function ReportGraph(props) {
    return (
        <div className={"default-container "} style={{height: "600px"}}>
            <Chart options={props.options} series={props.dataSet} type="area" width={"100%"} height={"100%"}/>
        </div>
    );
}

export default ReportGraph;