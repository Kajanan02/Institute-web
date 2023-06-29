import React from 'react';
import Bell from "../assets/bell-icon.svg";
import Msg from "../assets/msg-icon.svg";
import Profile from "../assets/profile-img.svg";
import FeatherIcon from 'feather-icons-react';

function Layout(props) {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white border-right">
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">


                        <div className={'w-100 mt-5 pt-4'}>
                            <div className={'side-menu-item active'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="home" className={'me-2'}/>
                                    <div className={''}>Home</div>
                                </div>
                            </div>

                            <div className={'side-menu-item'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="users" className={'me-2'}/>
                                    <div className={''}>Student</div>
                                </div>
                            </div>

                            <div className={'side-menu-item'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="calendar" className={'me-2'}/>
                                    <div className={''}>Calendar</div>
                                </div>
                            </div>

                            <div className={'side-menu-item'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="file-text" className={'me-2'}/>
                                    <div className={''}>Marks</div>
                                </div>
                            </div>

                            <div className={'side-menu-item'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="globe" className={'me-2'}/>
                                    <div className={''}>Broadcast</div>
                                </div>
                            </div>

                            <div className={'side-menu-item'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="users" className={'me-2'}/>
                                    <div className={''}>QR Scanner</div>
                                </div>
                            </div>
                            <div className={'side-menu-item'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="clock" className={'me-2'}/>
                                    <div className={''}>Appointment</div>
                                </div>
                            </div>

                            <div className={'side-menu-item'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="credit-card" className={'me-2'}/>
                                    <div className={''}>Payment& Invoice</div>
                                </div>
                            </div>

                            <div className={'w-100 border-bottom-d1d1d1'}/>
                            <div className={'side-menu-item mt-2'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="settings" className={'me-2'}/>
                                    <div className={''}>Settings</div>
                                </div>
                            </div>
                            <div className={'side-menu-item mt-2'}>
                                <div className={'d-flex cursor-pointer'}>
                                    <FeatherIcon icon="log-out" className={'me-2'}/>
                                    <div className={''}>Logout</div>
                                </div>
                            </div>

                        </div>



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
                </div>
            </div>
        </div>
    );
}

export default Layout;