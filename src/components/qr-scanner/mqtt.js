import React, {useEffect, useState} from 'react';
import mqtt from "mqtt";
function Mqtt(props) {


    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);
    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host));
    };

    // useEffect(() => {
    //     // Update MQTT broker URL and port with your own
    //     const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
    //
    //     client.on('connect', () => {
    //         console.log('Connected to MQTT broker');
    //         setClient(client);
    //     });
    //
    //     client.on('error', (err) => {
    //         console.error('Connection error:', err);
    //         // Handle connection error
    //     });
    //
    //     return () => {
    //         // Disconnect MQTT client when component unmounts
    //         if (client) {
    //             client.end();
    //         }
    //     };
    // }, []);



    const mqttPublish = (context) => {
        if (client) {
            // const { topic, qos, payload } = context;
            // client.publish(topic, payload, { qos }, error => {
            //     if (error) {
            //         console.log('Publish error: ', error);
            //     }
            // });
            client.publish("device-ins/led", "1");
        }
    }

    const mqttPublishOff = (context) => {
        if (client) {
            // const { topic, qos, payload } = context;
            // client.publish(topic, payload, { qos }, error => {
            //     if (error) {
            //         console.log('Publish error: ', error);
            //     }
            // });
            client.publish("device-ins/led", "0");
        }
    }



    console.log(connectStatus)
    useEffect(() => {
        console.log(client)
    }, [client]);

    useEffect(() => {
        mqttConnect('wss://broker.hivemq.com:8884/mqtt')
    }, []);

    // mqttConnect('wss://broker.hivemq.com:8000/mqtt')
    function lightOn() {
        console.log("call")
        client.on("connect", () => {
            console.log("connected")
            client.subscribe("presence", (err) => {
                if (!err) {
                    client.publish("device-ins/led", "1");
                }
            });
        });
    }

    // useEffect(() => {
    //     // Update MQTT broker URL and port with your own
    //     const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');
    //
    //     client.on('connect', () => {
    //         console.log('Connected to MQTT broker');
    //         setClient(client);
    //     });
    //
    //     client.on('error', (err) => {
    //         console.error('Connection error:', err);
    //         // Handle connection error
    //     });
    //
    //     return () => {
    //         // Disconnect MQTT client when component unmounts
    //         if (client) {
    //             client.end();
    //         }
    //     };
    // }, []);

    const handlePublish = () => {
        console.log(client)
        if (client) {
            client.publish('device-ins/led', 1);
            // setMessage(''); // Clear message input after publishing
        } else {
            // Handle missing client, topic, or message
            console.error('Client not connected or missing topic/message');
        }
    };

    // useEffect(() => {
    //     if (client) {
    //         console.log(client)
    //         client.on('connect', () => {
    //             setConnectStatus('Connected');
    //         });
    //         client.on('error', (err) => {
    //             console.error('Connection error: ', err);
    //             client.end();
    //         });
    //         client.on('reconnect', () => {
    //             setConnectStatus('Reconnecting');
    //         });
    //         client.on('message', (topic, message) => {
    //             const payload = { topic, message: message.toString() };
    //             setPayload(payload);
    //         });
    //     }
    // }, [client]);


    useEffect(() => {
        if(props.led){
            mqttPublish()
        }

    }, [props.led]);


    return (
        <div>
            <button className={"btn btn-secondary marks-dropdown-btn mt-4 px-5 py-2"} onClick={mqttPublish}>Light On</button>
            <button className={"btn btn-secondary marks-dropdown-btn mt-4 px-5 py-2"} onClick={mqttPublishOff}>Light Off</button>
        </div>
    );
}

export default Mqtt;