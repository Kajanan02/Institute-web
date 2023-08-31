import './App.css';
import { Route, Routes } from "react-router-dom";
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
import 'react-calendar-datetime-picker/dist/index.css'
import StudentProfile from "./components/student-list/studentProfile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <div className="">
            <Loader />
            <ConfirmationDialog />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/student" element={<Student />} />
                <Route path="/calendar" element={<Calender />} />
                <Route path="/marks" element={<Marks />} />
                <Route path="/broadcast" element={<Broadcast />} />
                <Route path="/qr-scanner" element={<QrScanner />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/payment" element={<PaymentInvoice />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/usage" element={<Usage />} />
                <Route path="/profile/:studentId" element={<StudentProfile />} />

            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
