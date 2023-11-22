import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import formHandler from "../../utils/FormHandler";
import { validateEvent } from "../../utils/validation";
import DtPicker from 'react-calendar-datetime-picker'
import FeatherIcon from "feather-icons-react";
import {getInstituteId, isAdminAccount, isInstituteAccount} from "../../utils/Authentication";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {toggleLoader} from "../../redux/actions";

const localizer = momentLocalizer(moment)

function Calender(props) {
    const dispatch = useDispatch();
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [isModelVisible, setIsModalVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);


    let events = [
        {
            id: 0,
            title: 'Maths class',
            start: new Date(2023, 7, 29, 9, 0, 0),
            end: new Date(2023, 7, 29, 13, 0, 0),
            resourceId: 1,
        },
        {
            id: 1,
            title: 'Chemistry training',
            start: new Date(2023, 7, 29, 17, 30, 0),
            end: new Date(2023, 7, 29, 16, 30, 0),
            resourceId: 2,
        },
        {
            id: 2,
            title: 'Physics mechanics class',
            start: new Date(2023, 7, 29, 8, 30, 0),
            end: new Date(2023, 7, 29, 12, 30, 0),
            resourceId: [2, 3],
        },
        {
            id: 11,
            title: 'physics MCQ',
            textColor: 'red',
            start: new Date(2023, 7, 30, 7, 0, 0),
            end: new Date(2023, 7, 30, 10, 30, 0),
            resourceId: 4,
        },
    ]

    const [eventList, setEventList] = useState([]);


    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event)
        const style = {
            backgroundColor: event?.bgColor ? event?.bgColor : '#262c3163',
            borderRadius: '5px',
            opacity: 0.8,
            color: event?.textColor ? event?.textColor : "#12171c",
            border: '0px',
            display: 'block',
        };
        return {
            style,
        };
    };


    const {
        handleChange,
        handleSubmit,
        setValue,
        values,
        initForm,
        deleteErrors,
        errors,
    } = formHandler(isLoading, validateEvent);


    function isLoading() {
        console.log("loading")
        let data = {
            // id: eventList.length + 1,
            textColor: values.textColor,
            bgColor: values.bgColor,
            title: values.title,
            start: new Date(values.start.year, values.start.month - 1, values.start.day, values.start.hour, values.start.minute, 0),
            end: new Date(values.end.year, values.end.month - 1, values.end.day, values.end.hour, values.end.minute, 0),
            // resourceId: 9,
        }
        // setEventList([...eventList, data])
        console.log(values)
        setIsModalVisible(false);
        setIsSubmitted(true)
    }

    console.log(eventList)

    function resetForm() {
        const values = {};
        initForm({ ...values });
        Object.keys(values).forEach((key) => delete values[key]);
        deleteErrors(errors);
        setIsModalVisible(false);
        setIsUpdateAvailable(false);
    }
    function getDateInfo(date) {
        return {
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            month: date.getMonth() + 1, // Adding 1 because getMonth() returns 0-indexed month (0 for January, 1 for February, etc.)
            year: date.getFullYear(),
        };
    }

    useEffect(() => {
        if(!isSubmitted){
            return
        }
        let data = {...values}
        console.log(values)
        values.color = values.color ? values.color : '#8E0018FF'
        data.start = `${values?.start?.year}:${values?.start?.month}:${values?.start?.day}:${values?.start?.hour}:${values?.start?.minute}`
        data.end = `${values?.end?.year}:${values?.end?.month}:${values?.end?.day}:${values?.end?.hour}:${values?.end?.minute}`
        dispatch(toggleLoader(true))
        axios.post(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/calender`, data)
            .then(()=>toast.success("Successfully Added"))
            .catch((err)=>toast.error("Something went wrong"))
            .finally(()=> {
                dispatch(toggleLoader(false))
                setIsSubmitted(false)
            })
    }, [isSubmitted]);

    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_HOST}/institute/${getInstituteId()}/calender`)
            .then((res)=>{
                console.log(res.data)
                let data = res.data.map((data) =>{
                    let item = {...data}
                    //     start: new Date(2023, 7, 29, 17, 30, 0),
                    if(item.start){

                        let start = new Date(item.start)
                        const year = start?.getFullYear();
                        const month = Number((start?.getMonth() + 1).toString().padStart(2, '0')) // Adding 1 to month because it's zero-based
                        const day = Number(start?.getDate().toString().padStart(2, '0'));
                        const hours = Number(start?.getHours().toString().padStart(2, '0'));
                        const minutes = Number(start?.getMinutes().toString().padStart(2, '0'));
                        item.start = {year: year, month: month, day: day, hour: hours, minute: minutes}
                    } if(item.end) {
                        let end = new Date(item.end)

                        const year = end.getFullYear();
                        const month = Number((end.getMonth() + 1).toString().padStart(2, '0')); // Adding 1 to month because it's zero-based
                        const day = Number(end.getDate().toString().padStart(2, '0'));
                        const hours = Number(end.getHours().toString().padStart(2, '0'));
                        const minutes = Number(end.getMinutes().toString().padStart(2, '0'));
                        item.end = {year: year, month: month, day: day, hour: hours, minute: minutes}
                    }
                    return item
                })

                console.log(data);
                setEventList(data)
            })
    },[])

    return (
        <Layout>
            <div className={"container"}>
                <div className={"d-flex justify-content-end my-4"}>
                    {(isInstituteAccount() || isAdminAccount()) &&<button className={"btn btn-secondary marks-dropdown-btn mt-4 px-4 py-2"}
                             onClick={() => setIsModalVisible(!isModelVisible)}>+ Add
                    </button>}
                </div>
                <div className={"calender-container " + (!isInstituteAccount() ? "mt-5":"")}>
                    <div>
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={eventList}
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={event => {
                            if(!isInstituteAccount() || !isAdminAccount()){
                                return;
                            }
                            setIsModalVisible(true);
                            setIsUpdateAvailable(true);
                            console.log(event)
                            let value = {
                                title: event.title,
                                start: getDateInfo(event.start),
                                end: getDateInfo(event.end),
                            }
                            initForm(value)
                        }}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '80vh', width: '80vw' }}
                    />
                </div>

                {isModelVisible && <div className="sa-popup-bg">
                    <div className="sa-popup">
                        <form onSubmit={handleSubmit} className={'sa-modal-box-style overflow-visible   '}>
                            <div className="sa-popup-header modal-header border-radious-top-9">
                                <span className={'sa-model-heading'}>

                                    {!isUpdateAvailable ? "Add Event" : "Edit Event"} </span>
                                <div className="sa-popup-close-icon"
                                    onClick={resetForm}>
                                    <FeatherIcon className={"sa-modal-close-icon"} icon={"x"} />
                                </div>
                            </div>
                            <div className="sa-popup-content px-3">


                                <div className={"col-md-6"}>
                                    <div className="mb-3 me-3">
                                        <label htmlFor="exampleInputEmail1"
                                            className="form-label">Title</label>
                                        <input name={"title"} placeholder={"Enter Name"}
                                            className={`form-control ${errors.title ? "border-red" : ""}`}
                                            id="exampleInputEmail1"
                                            onChange={handleChange}
                                            value={values.title || ""}
                                        />
                                        {errors.title && <p className={"text-red"}>{errors.title}</p>}

                                    </div>
                                </div>

                                <div className={"col-md-6"}>
                                    <div className="mb-3 ">
                                        <label htmlFor="exampleInputEmail1"
                                            className="form-label">Start Time</label>
                                        <DtPicker
                                            inputClass={`form-control ${errors.start ? "border-red" : ""}`}
                                            onChange={(time) => setValue({ start: time })}
                                            withTime
                                            initValue={values.start}
                                            showTimeInput
                                        />
                                        {errors.start && <p className={"text-red"}>{errors.start}</p>}

                                    </div>
                                </div>


                                <div className={"col-md-6"}>
                                    <div className="mb-3 me-3">
                                        <label htmlFor="exampleInputEmail1"
                                            className="form-label">End Time</label>
                                        <DtPicker
                                            inputClass={`form-control ${errors.end ? "border-red" : ""}`}
                                            onChange={(time) => setValue({ end: time })}
                                            withTime
                                            showTimeInput
                                        />
                                        {errors.end && <p className={"text-red"}>{errors.end}</p>}

                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3 me-3">
                                        <label htmlFor="exampleInputEmail1"
                                            className="form-label">Color</label>
                                        <div className={"d-flex gap-3"}>
                                            <div className={"select-round green-round " + (values.color === "#01452EFF" ? "selected-round" : "")} onClick={() => setValue({ color: "#01452EFF", textColor: "rgb(1 69 46)" })}>
                                                {values.color === "#01452EFF" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round purple-round " + (values.color === "#3C0384FF" ? "selected-round" : "")} onClick={() => setValue({ color: "#3C0384FF", textColor: "#3c0384" })}>
                                                {values.color === "#3C0384FF" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round lightBlue-round " + (values.color === "#015C6CFF" ? "selected-round" : "")} onClick={() => setValue({ color: "#015C6CFF", textColor: "#015c6c" })}>
                                                {values.color === "#015C6CFF" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round yellow-round " + (values.color === "#7D5400FF" ? "selected-round" : "")} onClick={() => setValue({ color: "#7D5400FF", textColor: "#7d5400" })}>
                                                {values.color === "#7D5400FF" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round darkBlue-round " + (values.color === "#003768FF" ? "selected-round" : "")} onClick={() => setValue({ color: "#003768FF", textColor: "rgb(0 55 104)" })}>
                                                {values.color === "#003768FF" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round lightGreen-round " + (values.color === "#028633FF" ? "selected-round" : "")} onClick={() => setValue({ color: "#028633FF", textColor: "#028633" })}>
                                                {values.color === "#028633FF" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            {/*<div className={"select-round orange-round "+ (values.bgColor === "rgb(0, 167, 111)" ? "selected-round" :"")} onClick={()=> setValue({bgColor: "",textColor: ""})}>*/}
                                            {/*    <FeatherIcon className={"text-white"} icon={"check"}/>*/}
                                            {/*</div>*/}
                                            <div className={"select-round red-round " + (values.bgColor === "#ff56304d" ? "selected-round" : "")} onClick={() => setValue({ bgColor: "#ff56304d", textColor: "#6f1501" })}>
                                                {values.bgColor === "#ff56304d" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="sa-popup-footer">
                                <div className={"d-flex justify-content-between"}>
                                    <FeatherIcon className={"text-red cursor-pointer"} icon={"trash-2"} />
                                    <div>


                                        <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                                        <button type="submit"
                                            className="btn btn-secondary ms-3 px-3 marks-dropdown-btn">{isUpdateAvailable ? "Update" : "Save"}</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>}


            </div>
        </Layout>
    );
}

export default Calender;