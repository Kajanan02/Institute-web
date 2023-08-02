import React, {useState} from 'react';
import Bell from "../assets/bell-icon.svg";
import Msg from "../assets/msg-icon.svg";
import Profile from "../assets/profile-img.svg";
import SideClose from "../assets/carbon_side-panel-close.svg";
import FeatherIcon from 'feather-icons-react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {changeToggle} from "../redux/actions";

function Layout({children}) {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const open = useSelector(state => {
        return state.setting.toggle
    });

    function toggleDrawer() {
        dispatch(changeToggle(!open));
        // setOpen(!open)
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap overflow-auto">
                <div
                    className={(!open ? " col-xl-2" : " w-100px") + (!show ? " mobile-navbar-hide " :" mobile-show ") + " col-auto col-md-1 px-0 bg-default border-right min-vh-100 trans"}>
                    <div className={"close-btn-container mobile-hide"} onClick={toggleDrawer}>
                        <img src={SideClose} alt="SideClose" className={!!open && "rotate-180"}/>
                    </div>
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white pt-4">


                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active " : "side-menu-item "}
                                to={"/"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="home" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={'trans-1'}>Home</div>}
                                </div>
                            </NavLink>
                        </div>


                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/student"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="users" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Student</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/calendar"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="calendar" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Calendar</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/marks"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="file-text" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Marks</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/broadcast"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="globe" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Broadcast</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/qr-scanner"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="users" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>QR Scanner</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/appointment"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="clock" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Appointment</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/payment"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="credit-card" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Payment & Invoice</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={'w-100 border-bottom-d1d1d1 mb-3'}/>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/settings"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="settings" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Settings</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/logout"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="log-out" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Logout</div>}
                                </div>
                            </NavLink>
                        </div>


                    </div>
                </div>
                <div className="col p-0">
                    <nav className="navbar navbar-expand-lg bg-white border-bottom-d1d1d1 px-4">
                        <div className="container-fluid nav-iconset flex-nowrap">
                            <button className="navbar-toggler " type="button" onClick={()=>setShow(!show)}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            
                            <div className="collapse navbar-collapse " id="">
                                <ul className="navbar-nav ms-auto align-items-center flex-row">
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
                        <div className={ show ? "nav-shadow opacity-100" : "invisible opacity-0"} onClick={()=>setShow(!show)}/>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;