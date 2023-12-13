import React, {useEffect, useState} from 'react';
import mqtt from "mqtt";
import {setMqttDetail, setUserDetail} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

function MqttAuth(props) {
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);
    const dispatch = useDispatch();

    const mqttData = useSelector(state => {
        return state.mqttDetail.data
    });



    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host));
    };

    useEffect(()=>{
        if(client){
            console.log(mqttData)
            if(mqttData?.type === "msg"){
                console.log("msg")
                client.publish("/ins-subs-msg", JSON.stringify(mqttData));
            }else {
                console.log("device")
                client.publish("device-ins/led", "1");
            }
        }
    },[mqttData])

    useEffect(() => {
        mqttConnect('wss://broker.hivemq.com:8884/mqtt')
    }, []);
    return (
        <></>
    );
}

export default MqttAuth;