import React from 'react';
import Layout from "./layout";
import {Route, Routes} from "react-router-dom";
import Report from "../components/student/reports/report";
import StudentDashboard from "../components/student/student Dashboard/studentDashboard";

function StudentLayout(props) {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<StudentDashboard/>}/>

                <Route path=":studentId/career" element={<Report/>}/>
            </Routes>
        </Layout>
    );
}

export default StudentLayout;