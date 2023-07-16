import React, { useState } from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Students(props) {

    const [studentsList, setStudentsList] = useState([{ No: 0o1, Reg: 200012345678, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o2, Reg: 200012345679, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o3, Reg: 200012345680, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o5, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o6, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o6, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" },
    { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", stream: "Physical Science", joindate: "15 June 2023" }])
    console.log(studentsList)
    console.log(studentsList[0])

    const [modalType, setModalType] = useState("view")

    const districts = [
        {
            value: 'Ampara',
            label: 'Ampara',
        },
        {
            value: 'Anuradhapura',
            label: 'Anuradhapura',
        },
        {
            value: 'Badulla',
            label: 'Badulla',
        },
        {
            value: 'Batticaloa',
            label: 'Batticaloa',
        },
        {
            value: 'Colombo',
            label: 'Colombo',
        },
        {
            value: 'Galle',
            label: 'Galle',
        },
        {
            value: 'Gampaha',
            label: 'Gampaha',
        },
        {
            value: 'Hambantota',
            label: 'Hambantota',
        },
        {
            value: 'Jaffna',
            label: 'Jaffna',
        },
        {
            value: 'Kalutara',
            label: 'Kalutara',
        },
        {
            value: 'Kandy',
            label: 'Kandy',
        },
        {
            value: 'Kegalle',
            label: 'Kegalle',
        },
        {
            value: 'Kilinochchi',
            label: 'Kilinochchi',
        },
        {
            value: 'Kurunegala',
            label: 'Kurunegala',
        },
        {
            value: 'Mannar',
            label: 'Mannar',
        },
        {
            value: 'Matale',
            label: 'Matale',
        },
        {
            value: 'Matara',
            label: 'Matara',
        },
        {
            value: 'Monaragala',
            label: 'Monaragala',
        },
        {
            value: 'Mullaitivu',
            label: 'Mullaitivu',
        },
        {
            value: 'Nuwara Eliya',
            label: 'Nuwara Eliya',
        },
        {
            value: 'Polonnaruwa',
            label: 'Polonnaruwa',
        },
        {
            value: 'Puttalam',
            label: 'Puttalam',
        },
        {
            value: 'Ratnapura',
            label: 'Ratnapura',
        },
        {
            value: 'Trincomalee',
            label: 'Trincomalee',
        },
        {
            value: 'Vavuniya',
            label: 'Vavuniya',
        },

    ];



    return (
        <Layout>
            <div className={"container"}>
                <div className={"p-5"}>
                    <div className={"students_container"}>
                        <div><h3 className={"content-heading"}>Students Details</h3></div>
                        <div className={"students-dropdown-container d-flex justify-content-end pb-3"}>
                            <div className={"marks-dropdown-container"}>


                                <button type="button" className={"btn btn-secondary students-dropdown-btn"} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setModalType("Add")}>
                                    <FeatherIcon className={"action-icons text-white"} icon={"plus"} />
                                    Add
                                </button>




                                <button className={"btn btn-secondary students-dropdown-btn"} type="button" aria-expanded="false">
                                    <FeatherIcon className={"action-icons text-white"} icon={"download"} />
                                    Import Data
                                </button>
                                <button className={"btn btn-secondary students-dropdown-btn"} type="button" aria-expanded="false">
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"table-container p-2"}>
                        <table className={"table table-hover table-striped"} >
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Reg.No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Stream</th>
                                    <th scope="col">Join Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsList.map((data, index) => (<tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.Reg}</td>
                                    <td>{data.name}</td>
                                    <td>{data.stream}</td>
                                    <td>{data.joindate}</td>
                                    <td>


                                        <FeatherIcon className={"action-icons"} icon={"eye"} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setModalType("View")} />
                                        <FeatherIcon className={"action-icons"} icon={"edit"} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setModalType("Edit")} />
                                        <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} />
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={"modal fade"} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={"modal-dialog modal-dialog-centered box-popup"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h1 className={"modal-title fs-5"} id="exampleModalLabel">{modalType} Students Details</h1>
                            <button type="button" className={"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>



                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Reg. No"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="First Name"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Last Name"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="NIC No"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Home Address"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Date of Birth"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-select-currency"
                                    select
                                    // value={age}
                                    label="Age"
                                    defaultValue="EUR"
                                >
                                 
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                        <MenuItem value={"Not Specified"}>Not Specified</MenuItem>

                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Contact No"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-select-currency"
                                    select
                                    label="District"
                                    defaultValue="EUR"
                                >
                                    {districts.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Mail Address"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Stream"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Subjects"
                                    defaultValue=""
                                />
                                <TextField
                                    id="outlined-required"
                                    label="Profile Image"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="NIC Front"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="NIC Back"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Location Details"
                                    defaultValue=""
                                />

                            </div>


                        </Box>



                        <div className={"modal-footer"}>
                            <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className={"btn btn-secondary students-dropdown-btn"}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default Students;
