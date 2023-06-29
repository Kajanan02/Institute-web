import React from 'react';
import Bell from "../assets/bell-icon.svg";
import Msg from "../assets/msg-icon.svg";
import Profile from "../assets/profile-img.svg";
import FeatherIcon from 'feather-icons-react';
import {NavLink} from "react-router-dom";

function Layout({children}) {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white border-right">
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100  pt-5">

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active mt-5" : "side-menu-item mt-5"}
                            to={"/"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="home" className={'me-2'}/>
                                <div className={''}>Home</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/student"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="users" className={'me-2'}/>
                                <div className={''}>Student</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/calendar"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="calendar" className={'me-2'}/>
                                <div className={''}>Calendar</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/marks"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="file-text" className={'me-2'}/>
                                <div className={''}>Marks</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/broadcast"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="globe" className={'me-2'}/>
                                <div className={''}>Broadcast</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/qr-scanner"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="users" className={'me-2'}/>
                                <div className={''}>QR Scanner</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/appointment"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="clock" className={'me-2'}/>
                                <div className={''}>Appointment</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/payment"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="credit-card" className={'me-2'}/>
                                <div className={''}>Payment & Invoice</div>
                            </div>
                        </NavLink>

                        <div className={'w-100 border-bottom-d1d1d1 mb-3'}/>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/settings"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="settings" className={'me-2'}/>
                                <div className={''}>Settings</div>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                            to={"/logout"}>
                            <div className={'d-flex'}>
                                <FeatherIcon icon="log-out" className={'me-2'}/>
                                <div className={''}>Logout</div>
                            </div>
                        </NavLink>


                    </div>
                </div>
                <div className="col p-0">
                    <nav className="navbar navbar-expand-lg bg-white border-bottom-d1d1d1 px-4">
                        <div className="container-fluid">
                            {/*<a className="navbar-brand" href="#">Navbar</a>*/}
                            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ms-auto align-items-center">
                                    <li className="nav-item">
                                        <a className="nav-link active position-relative px-2" aria-current="page"
                                           href="#">
                                            <div className="red-dot"/>
                                            <img src={Bell}/>
                                        </a>
                                    </li>
                                    <li className="nav-item px-2">
                                        <a className="nav-link  position-relative" aria-current="page" href="#">

                                            <img src={Msg}/></a>
                                    </li>
                                    <li className="nav-item px-2">
                                        <a className="nav-link  position-relative p-0" aria-current="page" href="#">

                                            <img src={Profile}/>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;