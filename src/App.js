import './App.css';
import {createBrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/home";
import Student from "./components/student-list/student";
import Calender from "./components/calender/calender";
import Marks from "./components/marks/marks";
import Broadcast from "./components/broadcast/brodcast";
import QrScanner from "./components/qr-scanner/qr-scanner";
import Appointment from "./components/appointment/appointment";
import PaymentInvoice from "./components/payment-invoice/payment-invoice";
import Settings from "./components/settings/settings";
import Login from "./components/login/login";
import Loader from "./components/utils-components/loader";
import Usage from "./components/usage";
import ConfirmationDialog from "./components/utils-components/confirmation-dialog";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar-datetime-picker/dist/style.css'
import StudentProfile from "./components/student-list/studentProfile";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import StudentLayout from "./layout/student-layout";
import PrivateRoute from "./utils/PrivateRoute";
import Report from "./components/student/reports/report";
import StudentDashboard from "./components/student/student Dashboard/studentDashboard";
import StudentSetting from "./components/student/settings/student-setting";
import Settingss from "./components/settings/Settings-ss";
import Institute from "./components/institute/institute";
import Career from "./components/admin/Career/career";
import React, {useEffect, useState} from "react";
import mqtt from "mqtt";
import LeaderBoard from "./components/admin/Leaderboard/Leaderboard";
import { Payhere, AccountCategory } from '@payhere-js-sdk/client';
import MqttAuth from "./components/utils-components/mqtt-auth";
import PWAInstallPrompt from "./components/utils-components/beforeinstallprompt";


Payhere.init(process.env.REACT_APP_PAYHERE_MERCHANT_ID, AccountCategory.SANDBOX);



function App() {



    return (
        <div className="">
            <Loader/>
            <MqttAuth/>
            <PWAInstallPrompt/>
            <ConfirmationDialog/>
            <Routes>
                <Route exact path='/' element={<PrivateRoute/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/students" element={<Student/>}/>
                    <Route path="/calendar" element={<Calender/>}/>
                    <Route path="/marks" element={<Marks/>}/>
                    <Route path="/broadcast" element={<Broadcast/>}/>
                    <Route path="/qr-scanner" element={<QrScanner/>}/>
                    <Route path="/leaderboard" element={<LeaderBoard/>}/>
                    <Route path="/career" element={<Career/>}/>
                    <Route path="/appointment" element={<Appointment/>}/>
                    <Route path="/payment" element={<PaymentInvoice/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/student/*" element={<StudentLayout/>}/>
                    <Route path="/report/:studentId/student" element={<Report/>}/>
                    <Route path="/usage" element={<Usage/>}/>
                    <Route path="/students/:studentId" element={<StudentProfile/>}/>
                    <Route path="/settings/student" element={<StudentSetting />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/report" element={<Report />} />
                <Route path="/institute" element={<Institute />} />
                <Route path="/ass" element={<Settingss />} />
                <Route path="/usage" element={<Usage />} />
                                {/*<Route path="/profile/:studentId" element={<StudentProfile />} />*/}
                {/*<Route path="/profile/setting" element={<StudentSetting />} />*/}
            </Routes>
            <ToastContainer/>
        </div>
    );
}

export default App;
