import React, {useState} from 'react';
import {QrReader} from 'react-qr-reader';
import Layout from "../../layout/layout";
import QrImg from "../../assets/Qr-img.svg";
import QrIcon from "../../assets/Qr-icon.svg";
import axios from "axios";
import {initialNavigate, loadCredential} from "../../utils/Authentication";
import {toast} from "react-toastify";
import {setMqttDetail, toggleLoader} from "../../redux/actions";
import {useDispatch} from "react-redux";

function QrScanner(props) {

    const [data, setData] = useState('No result');
    const [cameraVisible, setCameraVisible] = useState(false);
    const dispatch = useDispatch();
    const instituteId = localStorage.getItem("USER_ID");
    const [led,setLed]= useState(false)



    function updateAttendece(studentId) {
        dispatch(toggleLoader(true))
        axios.post(`${process.env.REACT_APP_HOST}/institute/${instituteId}/student/${studentId}/attendance`)
            .then((res) => {
                console.log(res.data)
                toast.success("Successfully attendance updated");
                dispatch(setMqttDetail({"mobileNumber":"0765471338","body":"1"}))
                setLed(true)

            }).catch((err) => {
            if(err?.response?.data?.message){
                toast.error(err?.response?.data?.message)
            }else {
                toast.error("Something went wrong")
            }
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }

    console.log(data)

    return (
        <Layout>
            <div className={"container"}>

                {!cameraVisible ?

                    <div className={"d-flex justify-content-center align-items-center flex-column mt-5"}>
                        <img src={QrImg} width={"35%"}/>
                    </div> :
                    <div className={"w-45 m-auto"}>
                    <QrReader
                        constraints={{facingMode:"environment"}}
                        onResult={(result, error) => {
                            console.log(result);
                            if (!!result) {
                                console.log(data ===result.text)
                                if(data ===result.text) {
                                    return
                                }
                                setData(result?.text);
                                updateAttendece(result?.text)
                                // alert(result?.text)
                            }
                            if (!!error) {
                                // console.info(error);
                            }
                        }}

                        style={{width: '100%'}}
                 />
                    </div>
                }
                <div className={"d-flex justify-content-center"}>
                    <button className={"btn btn-secondary marks-dropdown-btn mt-4 px-5 py-2"} onClick={()=> setCameraVisible(!cameraVisible)}><img src={QrIcon} className={"me-3"} width={"25px"}/> Scan QR Code</button>
                </div>
            </div>
            <p onClick={()=> setData("No result")}>{data}</p>
        {/*<Mqtt led={led}/>*/}
        </Layout>
    );
}

export default QrScanner;