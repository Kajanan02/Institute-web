import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import StatepaymentForm from "./paymentinvoiceForm";
import {getInstituteId, isInstituteAccount, isParentAccount} from "../../utils/Authentication";
import {toggleLoader} from "../../redux/actions";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, pluck, uniq, values} from "underscore";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import Chart from "react-apexcharts";
import {monthArray} from "../../utils/utils";


function PaymentInvoice(props) {
    const [paymentList, setPaymentList] = useState([])
    const [paymentAllList, setPaymentAllList] = useState([])
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [studentModalShow, setStudentModalShow] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState({})
    const [update, setUpdate] = useState(false);
    const [graph, setGraph] = useState(false);
    const [graphData, setGraphData] = useState(false);
    const instituteId = localStorage.getItem("USER_ID");
    const studentId = localStorage.getItem("STUDENT_ID");
    const navigation = useNavigate();
    const userData = useSelector(state => {
        return state.userDetail.data
    });

    console.log(userData)
    const params = useLocation();

    console.log(params)
    console.log(props)

    useEffect(() => {
        if (params?.search && isParentAccount() && userData?.studentId?.name) {
            let values = {}
            values.name = userData?.studentId?.name
            values.studentNicNo = userData?.studentId?.nicNo
            values.month = "NOVEMBER"
            values.feesAmount = 1500
            values.status = "PAID"
            values.method = "ONLINE"

            axios.post(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/student/${studentId}/fees`, values)
                .then((res) => {
                    toast.success(`Successfully Payment added`)
                    navigation("/payment")
                }).catch((err) => {
                toast.error("Something went wrong")
            }).finally(() => {
                dispatch(toggleLoader(false))
                setUpdate(!update)
            })
        }
    }, [userData]);

    useEffect(() => {
        dispatch(toggleLoader(true))
        //router.route('/:instituteId/fees').get(getFeesAll);
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/fees`)
            .then((res) => {
                if (isParentAccount()) {
                    setPaymentList(res.data.filter((data) => data.studentId === studentId))
                    setPaymentAllList(res.data.filter((data) => data.studentId === studentId))
                } else {
                    setPaymentList(res.data)
                    setPaymentAllList(res.data)
                    let temp = []
                    let subList = uniq(pluck(res.data, "month"))

                    console.log(subList)
                    for (const subListElement of monthArray) {

                        if (subList.includes(subListElement)) {
                            let data = {}
                            // data.name = subListElement
                            let totalArr = res.data.filter((item) => item.month === subListElement).map((item) => {
                                return item.feesAmount
                            })
                            let total = totalArr.reduce((a, b) => a + Number(b), 0)
                            data.x = subListElement
                            data.y = total.toString()

                            console.log(data)

                            temp.push(data)
                        }
                    }

                    console.log(temp)
                    setGraphData([{name: "Payment", data: temp}])

                }

            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [update])

    console.log(graphData)

    const dispatch = useDispatch();

    console.log(selectedPayment);

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(paymentAllList, function (item) {
                return values(pick(item, 'month', 'name', 'method', 'studentNicNo')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase());
            });
            setPaymentList(res);
            console.log(res)
        } else {
            setPaymentList(paymentAllList);
        }
    }

    function colorChange(status) {

        switch (status) {
            case "PAID":
                return "bg-success text-white"
            case "DECLINE":
                return "bg-danger text-white"
            default:
                return ""

        }

    }

    const optionsGraph = {
        chart: {
            height: 350,
            // type: 'area'
        },
        dataLabels: {
            enabled: true
        },
        colors: ['#00b957', '#008ffb', '#ad00b9'],
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.7,
                opacityTo: 0.4,
            }
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'category',
        },
        tooltip: {
            backgroundColor: '#ff0000',
            x: {
                format: 'month'
            },
        },
    };


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
                                            <input className="form-control me-2" onChange={handleSearch} type="search"
                                                   placeholder="Search"
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

                                {isInstituteAccount() &&
                                    <button type="button" className={"btn btn-secondary students-dropdown-btn "}
                                        // data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => setGraph(!graph)}>
                                        {/*<FeatherIcon className={"action-icons text-white"} icon={"plus"} />*/}
                                        {graph ? "Table" : "Graph"}
                                    </button>}

                            </div>
                        </div>
                    </div>

                    {!graph && <div className={"table-container p-2 pt-0 "}>
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
                                    <div
                                        className={"appointment_state " + (colorChange(data.status)) + (isInstituteAccount() ? " cursor-pointer" : "")}
                                        onClick={() => {
                                            if (isParentAccount() || data.status === "PAID") {
                                                return
                                            }
                                            let temp = {...data}
                                            temp.date = data.date?.slice(0, 10)
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
                                            temp.date = data.date?.slice(0, 10)
                                            setSelectedPayment(temp)
                                        }}/>

                                    </div>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                        {paymentList.length === 0 &&
                            <div className={"text-center py-5 fw-bold"}>No Payment Data Found,Please Add</div>}
                    </div>}

                    {graph && <div className={"row m-1 p-2 mt-4"}>
                        <div className={"default-container"}>

                            {graphData.length > 0 &&
                                <Chart options={optionsGraph} series={graphData} type="area" width={"100%"}
                                       height={320}/>}
                        </div>
                    </div>}
                </div>
            </div>

            <StatepaymentForm
                show={modalShow}
                type={modalType}
                onHide={() => setModalShow(false)}
                selectedPayment={selectedPayment}
                update={() => setUpdate(!update)}
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