import React, { useEffect, useState } from 'react';
import Bell from "../assets/bell-icon.svg";
import Msg from "../assets/msg-icon.svg";
import Profile from "../assets/layoutDefaultProfile.jpg";
import SideClose from "../assets/carbon_side-panel-close.svg";
import FeatherIcon from 'feather-icons-react';
import { NavLink } from "react-router-dom";
import {find, pluck} from "underscore";
import { useDispatch, useSelector } from 'react-redux'
import { changeToggle, setUserDetail, toggleLoader } from "../redux/actions";
import Logo from "../../src/assets/eduzon.svg"
import {
    getInstituteId,
    getName,
    getRoleName, getStudentId, getUserId, isAdminAccount, isAppointmentAccess,
    isCareerAccess,
    isInstituteAccount,
    isParentAccount, isReportAccess, isStudentAccount,
    signOut
} from "../utils/Authentication";
import Career from "../assets/career-logo.svg";
import NotificationBox from './NotificationBox';
import axios from "axios";
import {toast} from "react-toastify";

function Layout({children}) {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [notificationsList, setNotificationsList] = useState([])
    const instituteId = localStorage.getItem("USER_ID");
    const [studentsList, setStudentsList] = useState([]);
    const [studentId, setStudentId] = useState(null)
    const [update, setUpdate] = useState(false);
    const open = useSelector(state => {
        return state.setting.toggle
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([
        
    ]);

    // useEffect(() => {
    //     if (!isInstituteAccount)
    //         dispatch(toggleLoader(true))
    //     // router.route('/:instituteId/student/:studentId/broadcast').get(studentNotification);
    //     axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/student/${getStudentId()}/broadcast`)
    //         .then((res) => {
    //             console.log(res.data)
    //             setNotifications(res.data)
    //             setNotificationsList(res.data)
    //
    //
    //         }).catch((err) => {
    //             console.log(err)
    //         }).finally(() => {
    //             dispatch(toggleLoader(false))
    //         })
    // }, [update])
    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/getAllStudents`)
            .then((res) => {
                setStudentId(res.data)
                setStudentId(find(studentsList,{nicNo:res[0]})?._id)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                dispatch(toggleLoader(false))
            })
    }, [])

    const userData = useSelector(state => {
        return state.userDetail.data
    });

    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
    };

    const markAllRead = () => {
        const updatedNotifications = notifications.map((notification) => ({
            ...notification,
            read: true,
        }));
        setNotifications(updatedNotifications);
    };

    function toggleDrawer() {
        dispatch(changeToggle(!open));
    }

    function homePath() {
        let id = localStorage.getItem("USER_ID")
        if (isInstituteAccount()) {
            return "/"
        } else if (isStudentAccount() || isParentAccount()) {
            return "/student"
        }  else {
            return "/institute"
        }
    }
    function settingPath() {
        let id = localStorage.getItem("USER_ID")
        if (isInstituteAccount()) {
            return "/settings"
        } else if (isStudentAccount() || isParentAccount()) {
            return "/settings/student"
        }  else {
            return "/institute"
        }
    }

    useEffect(() => {
        if(isInstituteAccount() && getUserId()){
            dispatch(toggleLoader(false))
            axios.get(`${process.env.REACT_APP_HOST}/users/${getUserId()}/profile`)
                .then((res) => {
                    let userData = res.data
                    dispatch(setUserDetail(userData))
                }).catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                }).finally(() => {
                    dispatch(toggleLoader(false))
                })
        }else if(isStudentAccount() && getUserId()){
            dispatch(toggleLoader(false))
            //{{baseUrl}}/institute/64a8ec4c0c9f2a365061f338/student/64f38ca524b79dfa5745aa81
            axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/student/${getUserId()}`)
                .then((res) => {
                    let userData = res.data
                    dispatch(setUserDetail(userData))
                }).catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                }).finally(() => {
                    dispatch(toggleLoader(false))
                })
        } else if(isParentAccount() && getUserId()){
            dispatch(toggleLoader(false))
            //{{baseUrl}}/institute/64a8ec4c0c9f2a365061f338/parent/65535d095851b30e84e1dc38
            axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/parent/${getUserId()}`)
                .then((res) => {
                    let userData = res.data
                    dispatch(setUserDetail(userData))
                }).catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                }).finally(() => {
                    dispatch(toggleLoader(false))
                })
        }
    }, []);

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap overflow-auto">
                <div className={(!open ? " col-xl-2" : " w-100px") + (!show ? " mobile-navbar-hide " :" mobile-show ") + " col-auto col-md-1 px-0 bg-default border-right min-vh-100 trans"}>
                    <div className={"logo"}>
                        {!open && <div className={"edulogo"}>
                            <img className={"logosvg ms-4"} src={Logo} alt=""/>
                        </div>}
                        <div className={"close-btn-container mobile-hide"} onClick={toggleDrawer}>
                            <img src={SideClose} alt="SideClose" className={!!open ? "rotate-180" :""}/>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white pt-4">


                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active " : "side-menu-item "}
                                to={homePath()}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="home" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={'trans-1'}>Home</div>}
                                </div>
                            </NavLink>
                        </div>


                        {isInstituteAccount() && <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/students"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="users" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Student</div>}
                                </div>
                            </NavLink>
                        </div>}

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

                        {isInstituteAccount()&&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/marks"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="file-text" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Marks</div>}
                                </div>
                            </NavLink>
                        </div>}
                        {<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/leaderBoard"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="gitlab" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>LeaderBoard</div>}
                                </div>
                            </NavLink>
                        </div>}
                        {isReportAccess() &&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={`/report/${studentId}/student`}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="file-text" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Report</div>}
                                </div>
                            </NavLink>
                        </div>}

                        {isCareerAccess() &&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/career"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="book" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Career</div>}
                                </div>
                            </NavLink>
                        </div>}


                        {isInstituteAccount() &&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/broadcast"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="globe" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Broadcast</div>}
                                </div>
                            </NavLink>
                        </div>}

                        {isInstituteAccount() &&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/qr-scanner"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="users" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>QR Scanner</div>}
                                </div>
                            </NavLink>
                        </div>}

                        {isAppointmentAccess()&&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/appointment"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="clock" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Appointment</div>}
                                </div>
                            </NavLink>
                        </div>}

                        {isAppointmentAccess()&&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/payment"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="credit-card" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>{isInstituteAccount() ? "Payment & Invoice" : "Payment"}</div>}
                                </div>
                            </NavLink>
                        </div>}

                        <div className={'w-100 border-bottom-d1d1d1 mb-3'}/>

                        {!isAdminAccount() &&<div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={settingPath()}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="settings" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Settings</div>}
                                </div>
                            </NavLink>
                        </div>}

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                onClick={signOut}
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/login"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="log-out" className={!open ? 'me-2' : "ms-1"}/>
                                    {!open && <div className={''}>Logout</div>}
                                </div>
                            </NavLink>
                        </div>


                    </div>
                </div>
                <div className="col p-0">
                    <nav className="navbar navbar-expand-lg bg-default border-bottom-d1d1d1 px-4">
                        <div className="container-fluid nav-iconset flex-nowrap">
                            <button className="navbar-toggler " type="button" onClick={()=>setShow(!show)}>
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse " id="">
                                <ul className="navbar-nav ms-auto align-items-center flex-row">
                                    <li className="nav-item">
                                        {/*<a className="nav-link active position-relative px-2" aria-current="page" href="#">*/}
                                        {/*    {notifications.some((notification) => !notification.read) && (*/}
                                        {/*        <div className="red-dot" />*/}
                                        {/*    )}*/}
                                        {/*    <img src={Bell} onClick={toggleNotification} />*/}
                                        {/*</a>*/}
                                    </li>
                                    {/*<li className="nav-item px-2">*/}
                                    {/*    <a className="nav-link  position-relative" aria-current="page" href="#">*/}

                                    {/*        <img src={Msg}/></a>*/}
                                    {/*</li>*/}
                                    <li className="nav-item px-2">
                                        <a className="nav-link  position-relative p-0" aria-current="page" href="#">

                                            <img src={Profile} className="rounded-circle user-profile mr-2" />
                                        </a>
                                    </li>
                                    <li className="nav-item pe-2 flex-column nav-profile">
                                        <p className="nav-profileName mb-0">{userData.name}<br />
                                            <small className="text-muted mt-0 mb-0 py-0 nav-profileName nav-profileRole">{getRoleName()}</small>
                                        </p>
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
            {showNotification && (
                <NotificationBox
                    notifications={notifications}
                    onClose={closeNotification}
                    markAsRead={markAsRead}
                    markAllRead={markAllRead}
                />
            )}
        </div>
    );
}

export default Layout;