import React from 'react';
import Layout from "../../layout/layout";
import broadcast from "../../assets/broadcast.svg";

function Broadcast(props) {
    return (
        <Layout>
            <div className={"ps-3 broadcast_container"}>
                <div className={"content-heading pt-3"}><h3>Broadcast Message</h3></div>

                <div className={"broadcast_sub_container pt-5"}>
                    <div className={"broadcast-image pt-4"}>
                        <img src={broadcast} alt={"broadcast_image"} />
                    </div>
                    <div className={"broadcast_msg_container"}>
                    <div className={"mb-3"}>
                        <label for="exampleFormControlInput1" className={"form-label message-container"}></label>
                        <input type="text" className={"form-control lable1"} id="exampleFormControlInput1" placeholder="Message Topic" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" className={"form-label"}></label>
                        <textarea className={"form-control label1"} id="exampleFormControlTextarea1" placeholder="Message" rows="5"></textarea>
                    </div>
                    <p></p>
                    <div className={"dropdown-center pb-3"}>
                        <button className={"btn btn-secondary dropdown-toggle send-category-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Send To
                        </button>
                        <ul class="dropdown-menu">
                            <li><a className={"dropdown-item"} href="#">
                                Mathematics</a></li>
                            <li><a className={"dropdown-item"} href="#">Physics</a></li>
                            <li><a className={"dropdown-item"} href="#">Chemistry</a></li>
                        </ul>
                    </div>

                    <div className={"d-grid gap-2 d-md-block broadcast-send"}>
                        <button className={"btn btn-primary broadcast-send-btn"} type="button">Send</button>
                    </div>
                </div>

                </div>
            </div>
        </Layout>
    )
}

export default Broadcast;
