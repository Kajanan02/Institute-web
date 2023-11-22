import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import {paymentData} from "./damiData";
import StatepaymentForm from "./paymentinvoiceForm";
import {getInstituteId, isInstituteAccount, isParentAccount} from "../../utils/Authentication";
import AddPaymentForm from "../student/add-payment-student";
import {toggleConfirmationDialog,setUserDetail, toggleLoader} from "../../redux/actions";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {values, pick, filter, pluck} from "underscore";
import {toast} from "react-toastify";





function PaymentInvoice(props) {
    const [paymentList, setPaymentList] = useState([])
    const [paymentAllList, setPaymentAllList] = useState([])
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [studentModalShow, setStudentModalShow] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState({})
    const [update, setUpdate] = useState(false);
    const instituteId = localStorage.getItem("USER_ID");
    const studentId = localStorage.getItem("STUDENT_ID");
    
    
    useEffect(() => {
        dispatch(toggleLoader(true))
        //router.route('/:instituteId/fees').get(getFeesAll);
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/fees`)
        .then((res) => {
            if(isParentAccount()){
                setPaymentList(res.data.filter((data)=> data.studentId === studentId)) 
                setPaymentAllList(res.data.filter((data)=> data.studentId === studentId)) 
            }else{
                setPaymentList(res.data)
                setPaymentAllList(res.data)

            }
            
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [update])
    
    const dispatch = useDispatch();

    console.log(selectedPayment);

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(paymentAllList, function (item) { return values(pick(item, 'month',  'name', 'method', 'studentNicNo')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase()); });
            setPaymentList(res);
            console.log(res)
        } else {
            setPaymentList(paymentAllList);
        }
    }

    function colorChange(status){

        switch(status){
            case "APPROVED":
                return "bg-success text-white"
            case "DECLINE":
                return "bg-danger text-white"
            default:
                return ""
            
        }

    }

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
                                            <input className="form-control me-2" onChange={handleSearch} type="search" placeholder="Search"
                                                   aria-label="Search"/>
                                        </form>
                                    </div>
                                </div>

                                <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                                        onClick={() => {
                                            setModalType("Add");
                                            // if(isParentAccount()) {
                                            // setStudentModalShow(true)
                                            // }else {
                                                setModalShow(true)
                                            // }
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
                                <th scope="col">Month</th>
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
                                <td>{data.month}</td>
                                <td>{data.name}</td>
                                <td>{data.method}</td>
                                <td>{data.studentNicNo}</td>
                                <td>
                                <div className={"appointment_state " + (colorChange(data.status))}
                                             onClick={() => {
                                                //  if(isParentAccount()) {
                                                //      return
                                                //  }
                                                let temp = {...data}
                                                temp.date = data.date?.slice(0,10)
                                                setSelectedPayment(temp)
                                                setModalShow(true)
                                                setModalType("State");
                                         }
                                    }>{data.status}</div>

                                </td>


                                <td className={"table-action"}>
                                    <div type="button"
                                        onClick={() => {
                                            setModalType("View");
                                            setModalShow(true)
                                        }}>
                                        <FeatherIcon className={"action-icons"} icon={"eye"} onClick={() => {
                                            setModalType("View")
                                            let temp = {...data}
                                            temp.date = data.date?.slice(0,10)
                                            setSelectedPayment(temp)
                                            }}/>

                                    </div>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                        {paymentList.length === 0 && <div className={"text-center py-5 fw-bold"}>No Payment Data Found,Please Add</div>}
                    </div>
                </div>
            </div>

            <StatepaymentForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
                selectedPayment={selectedPayment}
                update={()=> setUpdate(!update)}
            />
            {/* <AddPaymentForm
                show={studentModalShow}
                type={modalType}
                selectedPayment={selectedPayment}
                update={()=> setUpdate(!update)}
                onHide={() => setStudentModalShow(false)}
                /> */}
        </Layout>
    );
}

export default PaymentInvoice;