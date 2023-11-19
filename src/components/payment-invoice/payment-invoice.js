import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import {paymentData} from "./damiData";
import StatepaymentForm from "./paymentinvoiceForm";
import {isInstituteAccount, isParentAccount} from "../../utils/Authentication";
import AddPaymentForm from "../student/add-payment-student";


function PaymentInvoice(props) {
    const [paymentList, setpaymentList] = useState(paymentData)
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [studentModalShow, setStudentModalShow] = useState(false);


    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Payment Invoice</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"table-btn-container"}>

                                <div className={"appointment-search"}>
                                    <div className="container-fluid">
                                        <form className="d-flex" role="search">
                                            <input className="form-control me-2" type="search" placeholder="Search"
                                                   aria-label="Search"/>
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                        </form>
                                    </div>
                                </div>

                                <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                                        onClick={() => {
                                            setModalType("Add");
                                            if(isParentAccount()) {
                                            setStudentModalShow(true)
                                            }else {
                                                setModalShow(true)
                                            }
                                        }}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>
                                    Add
                                </button>

                                {isInstituteAccount() &&<button type="button" className={"btn btn-secondary students-dropdown-btn "}
                                    // data-bs-toggle="modal" data-bs-target="#exampleModal"
                                         onClick={() => setModalType("graph")}>
                                    {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"} />*/}
                                    Graph
                                </button>}

                            </div>
                        </div>
                    </div>

                    <div className={"table-container p-2 pt-0 "}>
                        <table className={"table table-hover table-striped sa-table-width"}>

                            <thead>
                            <tr className={"position-sticky top-0 pt-1 h-45"}>

                                <th scope="col">No</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Name</th>
                                <th scope="col">Method</th>
                                <th scope="col">Reg.No</th>
                                <th scope="col">State</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {paymentList.map((data, index) => (<tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>

                                <td>{data.date}</td>
                                <td>{data.Time}</td>
                                <td>{data.student_name}</td>
                                <td>{data.Method}</td>
                                <td>{data.Reg}</td>
                                <td>
                                    <div className={"appointment_state"}
                                         onClick={() => {
                                             if(isParentAccount()) {
                                                 return
                                             }
                                             setModalType("State");
                                             setModalShow(true)
                                         }}>{data.state}</div>

                                </td>


                                <td className={"table-action"}>
                                    <div
                                        onClick={() => {
                                            setModalType("View");
                                            setModalShow(true)
                                        }}>
                                        <FeatherIcon className={"action-icons"} icon={"eye"}/>
                                    </div>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <StatepaymentForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
            />
            <AddPaymentForm
                show={studentModalShow}
                type={modalType}
                onHide={() => setStudentModalShow(false)}
                />
        </Layout>
    );
}

export default PaymentInvoice;