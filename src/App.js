import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/home";
import Student from "./components/student/student";
import Calender from "./components/calender/calender";
import Marks from "./components/marks/marks";
import Broadcast from "./components/broadcast/brodcast";
import QrScanner from "./components/qr-scanner/qr-scanner";
import Appointment from "./components/appointment/appointment";
import PaymentInvoice from "./components/payment-invoice/payment-invoice";
import Settings from "./components/settings/settings";
import Login from "./components/login/login";

function App() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/student" element={<Student/>}/>
                <Route path="/calendar" element={<Calender/>}/>
                <Route path="/marks" element={<Marks/>}/>
                <Route path="/broadcast" element={<Broadcast/>}/>
                <Route path="/qr-scanner" element={<QrScanner/>}/>
                <Route path="/appointment" element={<Appointment/>}/>
                <Route path="/payment" element={<PaymentInvoice/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/logout" element={<Login/>}/>
                <Route path="/logout" element={<Settings/>}/>

            </Routes>
        </div>
    );
}

export default App;
