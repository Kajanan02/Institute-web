import React, { useState } from 'react';
import Layout from "../../layout/layout";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import formHandler from "../../utils/FormHandler";
import { validateEvent } from "../../utils/validation";
import DtPicker from 'react-calendar-datetime-picker'
import FeatherIcon from "feather-icons-react";

const localizer = momentLocalizer(moment)

function Calender(props) {

    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [isModelVisible, setIsModalVisible] = useState(false);


    let events = [
        {
            id: 0,
            title: 'Board meeting',
            start: new Date(2023, 7, 29, 9, 0, 0),
            end: new Date(2023, 7, 29, 13, 0, 0),
            resourceId: 1,
        },
        {
            id: 1,
            title: 'MS training',
            start: new Date(2023, 7, 29, 17, 30, 0),
            end: new Date(2023, 7, 29, 16, 30, 0),
            resourceId: 2,
        },
        {
            id: 2,
            title: 'Team lead meeting',
            start: new Date(2023, 7, 29, 8, 30, 0),
            end: new Date(2023, 7, 29, 12, 30, 0),
            resourceId: [2, 3],
        },
        {
            id: 11,
            title: 'Birthday Party',
            textColor: 'red',
            start: new Date(2023, 7, 30, 7, 0, 0),
            end: new Date(2023, 7, 30, 10, 30, 0),
            resourceId: 4,
        },
    ]

    const [eventList, setEventList] = useState(events);


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
        setEventList([...eventList, data])
        setIsModalVisible(false);
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

    return (
        <Layout>
            <div className={"container"}>
                <div className={"d-flex justify-content-end my-4"}>
                    <button className={"btn btn-secondary marks-dropdown-btn mt-4 px-4 py-2"} onClick={() => setIsModalVisible(!isModelVisible)}>+ Add
                    </button>
                </div>
                <div className={"calender-container"}>
                    <div>
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={eventList}
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={event => {
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
                            <div className="sa-popup-header modal-header ">
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
                                            <div className={"select-round green-round " + (values.bgColor === "rgb(0 167 111 / 30%)" ? "selected-round" : "")} onClick={() => setValue({ bgColor: "rgb(0 167 111 / 30%)", textColor: "rgb(1 69 46)" })}>
                                                {values.bgColor === "rgb(0 167 111 / 30%)" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round purple-round " + (values.bgColor === "rgb(142 51 255 / 30%)" ? "selected-round" : "")} onClick={() => setValue({ bgColor: "rgb(142 51 255 / 30%)", textColor: "#3c0384" })}>
                                                {values.bgColor === "rgb(142 51 255 / 30%)" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round lightBlue-round " + (values.bgColor === "rgb(0 184 217 / 30%)" ? "selected-round" : "")} onClick={() => setValue({ bgColor: "rgb(0 184 217 / 30%)", textColor: "#015c6c" })}>
                                                {values.bgColor === "rgb(0 184 217 / 30%)" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round yellow-round " + (values.bgColor === "rgb(255 171 0 / 30%)" ? "selected-round" : "")} onClick={() => setValue({ bgColor: "rgb(255 171 0 / 30%)", textColor: "#7d5400" })}>
                                                {values.bgColor === "rgb(255 171 0 / 30%)" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round darkBlue-round " + (values.bgColor === "rgb(0 55 104 / 20%)" ? "selected-round" : "")} onClick={() => setValue({ bgColor: "rgb(0 55 104 / 20%)", textColor: "rgb(0 55 104)" })}>
                                                {values.bgColor === "rgb(0 55 104 / 20%)" && <FeatherIcon className={"text-white"} icon={"check"} />}
                                            </div>
                                            <div className={"select-round lightGreen-round " + (values.bgColor === "rgb(34 197 94 / 20%)" ? "selected-round" : "")} onClick={() => setValue({ bgColor: "rgb(34 197 94 / 20%)", textColor: "#028633" })}>
                                                {values.bgColor === "rgb(34 197 94 / 20%)" && <FeatherIcon className={"text-white"} icon={"check"} />}
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