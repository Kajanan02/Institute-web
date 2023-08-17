import React from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import attendance from "../../assets/Attendance.jpg";
import income from "../../assets/income.jpg";
import performance from "../../assets/performance.jpg"


function Home(props) {
    return (
        <Layout>

            {/*<div className="row row-cols-1 row-cols-md-3 g-4 p-3">*/}
            {/*    <div className="col">*/}
            {/*        <div className="card h-100">*/}
            {/*            <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*                 aria-label="Placeholder: Image cap" src={attendance}*/}
            {/*                 preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*            <div className="card-body">*/}
            {/*                <h5 className="card-title"></h5>*/}
            {/*                <p className="card-text"></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="col">*/}
            {/*        <div className="card h-100">*/}
            {/*            <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*                 aria-label="Placeholder: Image cap" src={income}*/}
            {/*                 preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*            <div className="card-body">*/}
            {/*                <h5 className="card-title"></h5>*/}
            {/*                <p className="card-text"></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="col">*/}
            {/*        <div className="card h-100">*/}
            {/*            <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*                 aria-label="Placeholder: Image cap" src={performance}*/}
            {/*                 preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*            <div className="card-body">*/}
            {/*                <h5 className="card-title"></h5>*/}
            {/*                <p className="card-text"></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}
            {/*<div className="card-group p-3" >*/}
            {/*    <div className="card">*/}
            {/*        <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*              aria-label="Placeholder: Image cap" src={attendance}*/}
            {/*             preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*            <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*            <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}

            {/*        <div className="card-body home_card">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="card">*/}
            {/*        <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*             aria-label="Placeholder: Image cap" src={income}*/}
            {/*             preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*        <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*        <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*        <div className="card-body">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="card">*/}
            {/*        <img className="bd-placeholder-img card-img-top" width="100%" height="180"*/}
            {/*             aria-label="Placeholder: Image cap" src={performance}*/}
            {/*             preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>*/}
            {/*        <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*        <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>*/}
            {/*        <div className="card-body">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={"pt-3 ps-3"}>
                <div className={"row pb-3"}>
                    <div className={"col-sm-4 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body"}>
                                <img className="bd-placeholder-img card-img-top" width="100%" height="180"
                                     aria-label="Placeholder: Image cap" src={attendance}
                                     preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#868e96"></rect>
                                <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>
                                {/*<div className={"card-text"}>Today Income</div>*/}
                                {/*<div className={"card-text_total"}>1000000</div>*/}
                                {/*<div><FeatherIcon className={"home-action-icons"} icon={"trending-up"} /></div>*/}
                                {/*<div className={"seeInfo"}>*/}
                                {/*    <div className={"card-text_text"}>this month</div>*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className={"card home_card"}>
                            <div className={"card-body"}>
                                <img className="bd-placeholder-img card-img-top" width="100%" height="180"
                                     aria-label="Placeholder: Image cap" src={income}
                                     preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#868e96"></rect>
                                <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>
                                {/*<div className={"card-text"}>Pending Income</div>*/}
                                {/*<div className={"card-text_total"}>1000000</div>*/}
                                {/*<div><FeatherIcon className={"home-action-icons"} icon={"trending-up"} /></div>*/}
                                {/*<div className={"seeInfo"}>*/}
                                {/*<div className={"card-text_text"}>this month</div>*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 mb-3 mb-sm-0"}>
                        <div className={"card home_card"}>
                            <div className={"card-body"}>
                                <img className="bd-placeholder-img card-img-top" width="100%" height="180"
                                     aria-label="Placeholder: Image cap" src={performance}
                                     preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#868e96"></rect>
                                <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>

                                {/*<div className={"card-text"}>Attendance</div>*/}
                                {/*<div className={"card-text_total"}>1000000</div>*/}
                                {/*<div><FeatherIcon className={"home-action-icons"} icon={"users"} /></div>*/}
                                {/*<div className={"seeInfo"}>*/}
                                {/*    <div className={"card-text_text"}>this month</div>*/}

                                {/*</div>*/}
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
                                    
                                </div>
                            </div>
                        </div>
                        <div className={"col-sm-6"}>
                            <div className={"card home_card"}>
                                <div className={"card-body"}>
                                    <h5 className={"card-title"}></h5>
                                    <p className={"card-text"}></p>

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