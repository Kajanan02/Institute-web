import React from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';


function Home(props) {
    return (
        <Layout>
            <div className={"pt-3 ps-3"}>
                <div className={"row pb-3"}>
                    <div className={"col-sm-4 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}></h5>
                                <p className={"card-text"}>Today Income</p>
                                <p className={"card-text"}>1000000</p>
                                <p><FeatherIcon className={"action-icons"} icon={"trending-up"} /></p>
                                <p>this month</p>
                                <a href="#" className={"btn btn-primary home-btn"}>See Info</a>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className={"card home_card"}>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}></h5>
                                <p className={"card-text"}>Pending Income</p>
                                <p className={"card-text"}>1000000</p>
                                <p><FeatherIcon className={"action-icons"} icon={"trending-up"} /></p>
                                <p>this month</p>
                                <a href="#" className={"btn btn-primary home-btn"}>See Info</a>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}></h5>
                                <p className={"card-text"}>Attendance</p>
                                <p className={"card-text"}>1000000</p>
                                <p><FeatherIcon className={"action-icons"} icon={"users"} /></p>
                                <p>this month</p>
                                <a href="#" className={"btn btn-primary home-btn"}>See Info</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"col-sm- mb-3 mb-sm-0 pb-3"}>
                        <div className={"card home_card"}>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}></h5>
                                <p className={"card-text"}></p>
                                <a href="#" className={"btn btn-primary home-btn"}></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"row"}>
                        <div className={"col-sm-6 mb-3 mb-sm-0"}>
                            <div className={"card home_card"}>
                                <div className={"card-body"}>
                                    <h5 className={"card-title"}></h5>
                                    <p className={"card-text"}></p>
                                    <a href="#" className={"btn btn-primary"}></a>
                                </div>
                            </div>
                        </div>
                        <div className={"col-sm-6"}>
                            <div className={"card home_card"}>
                                <div className={"card-body"}>
                                    <h5 className={"card-title"}></h5>
                                    <p className={"card-text"}></p>
                                    <a href="#" className={"btn btn-primary"}></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;