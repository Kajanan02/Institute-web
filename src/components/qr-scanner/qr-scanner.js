import React, {useState} from 'react';
import {QrReader} from 'react-qr-reader';
import Layout from "../../layout/layout";
import QrImg from "../../assets/Qr-img.svg";
import QrIcon from "../../assets/Qr-icon.svg";

function QrScanner(props) {

    const [data, setData] = useState('No result');
    const [cameraVisible, setCameraVisible] = useState(false);

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
                                setData(result?.text);
                                alert(result?.text)
                            }
                            if (!!error) {
                                console.info(error);
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
            <p>{data}</p></Layout>
    );
}

export default QrScanner;