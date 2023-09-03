import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import MarksForm from "./marksForm";
import {marksData ,subjectData } from "../marks/marksDamiData";
import {mapObject} from "underscore";
import formHandler from "../../utils/FormHandler";
import {useDispatch, useSelector} from "react-redux";
import {toggleConfirmationDialog, toggleLoader} from "../../redux/actions";
import {validatemarks} from "../../utils/validation";
import axios from 'axios';
import {toast} from "react-toastify";
import {ExportToCsv} from "export-to-csv";

function Marks(props) {
  const [marksList, setMarksList] = useState([])
  const [modalType, setModalType] = useState("view")
  const [modalShow, setModalShow] = useState(false);
  const [studentsList, setStudentsList] = useState(marksData)
  const [selectedBuyer, setSelectedBuyer] = useState([]);
  const buyerOption = subjectData;
  const [profilePic, setProfilePic] = useState(null);
  const [update, setUpdate] = useState(false);
  const instituteId = localStorage.getItem("USER_ID");
  const [deletedId, setDeletedId] = useState(null);
  const [selectedMarks, setSelectedMarks] = useState(null);

  const {
    handleChange,
    handleSubmit,
    setValue,
    values,
    errors,
  } = formHandler(isLoading, validatemarks);

  function isLoading() {
    console.log("All are done")
  }
  function multiSelectOnChangeBuyer(selected) {
    setSelectedBuyer(selected);
    setValue({previousBuyer: selected});
  }

  const handleChangeProfile = (file) => {
    setProfilePic(file);
  };


  console.log(values)
  console.log(errors)

  useEffect(() => {
    dispatch(toggleLoader(true))
    axios.get(`${process.env.REACT_APP_HOST}/institute/${instituteId}/getAllMarks`)
        .then((res) => {
            setMarksList(res.data)
        }).catch((err) => {
        console.log(err)
    }).finally(() => {
        dispatch(toggleLoader(false))
    })
}, [update])

  const dispatch = useDispatch();
  //
  const confirmationDialog = useSelector(state => {
    return state.setting.confirmationDialog
  });

  console.log(confirmationDialog)

  function handleDelete(id) {
    dispatch(toggleConfirmationDialog({
        isVisible: true,
        confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA'),
        confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS STUDENT DATA')
    }));
    setDeletedId(id)
    console.log("ads")
}

  console.log(confirmationDialog)
  console.log(deletedId)
  useEffect(()=>{
    if (!confirmationDialog || !confirmationDialog.onSuccess) {
        console.log("asdf")
        return;
    }
    console.log("asdasd")
    dispatch(toggleLoader(true))
    
    axios.delete(`${process.env.REACT_APP_HOST}/institute/${instituteId}/marks/${deletedId}/deleteMarks`)
        .then((res) => {
          setUpdate(!update)
            toast.success(`Successfully Deleted`)

        }).catch((err) => {
        console.log(err)
    }).finally(() => {
        dispatch(toggleLoader(false))
        setDeletedId(null)
    })
  },[confirmationDialog])

  function exportData() {
    const data = [];
    marksList.forEach((mark) => {
      console.log(mark)
      data.push({
        "Reg No": mark.nicNo,
        "Name": mark.name,
        "Subjects": mark.subject,
        "Marks": mark.marks,
        "Date Of Exam":mark.date?.slice(0,10),
      });
    });
    const opt = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: false,
      title: "Student Details",
      useBom: true,
      noDownload: false,
      headers: ["Reg No","Name","Subjects","Marks", "Date Of Exam"],
      filename: "MarksDetails",
      nullToEmptyString: true,
    };

    const csvExporter = new ExportToCsv(opt);
    csvExporter.generateCsv(data);
  }



  return (
    <Layout>
      <div className={"container"}>
        <div className={"container-widget"}>
          <div className={"students_marks_container"}>
            <div><h3 className={"content-heading"}>Students Marks</h3></div>
            <div className={"table-btn-container d-flex justify-content-end pb-3"}>
              {/*<div className={"dropdown"}>*/}
              {/*  <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
              {/*    Stream*/}
              {/*  </button>*/}
              {/*  <ul className="dropdown-menu dropdown-menu-dark">*/}
              {/*    <li><a className={"dropdown-item active"} href="#">Biology</a></li>*/}
              {/*    <li><a className={"dropdown-item"} href="#">Physical Science</a></li>*/}
              {/*    <li><a className={"dropdown-item"} href="#">Commerce</a></li>*/}
              {/*    <li><a className={"dropdown-item"} href="#">Arts</a></li>*/}
              {/*    <li><a className={"dropdown-item"} href="#">Technology</a></li>*/}
              {/*  </ul>*/}
              {/*</div>*/}
              {/*<div className={"dropdown"}>*/}
              {/*  <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
              {/*    Subject*/}
              {/*  </button>*/}
              {/*  <ul class={"dropdown-menu dropdown-menu-dark"}>*/}
              {/*    <li><a className={"}dropdown-item active"} href="#">Action</a></li>*/}
              {/*    <li><a className={"dropdown-item"} href="#">Another action</a></li>*/}
              {/*    <li><a className={"dropdown-item"} href="#">Something else here</a></li>*/}
              {/*    <li><a className={"dropdown-item"} href="#">Separated link</a></li>*/}
              {/*  </ul>*/}
              {/*</div>*/}

            {/*  <button type="button" className={"btn btn-secondary students-dropdown-btn"}*/}
            {/*    data-bs-toggle="modal" data-bs-target="#exampleModal"*/}
            {/*    onClick={() => setModalType("Add")}>*/}
            {/*  <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>*/}
            {/*    Add*/}
            {/*</button>*/}
              <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                      onClick={() => {
                        setModalType("Add");
                        setModalShow(true)
                      }}>
                <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>
                Add
              </button>
              <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                      aria-expanded="false">
                <FeatherIcon className={"action-icons text-white"} icon={"download"} />
                Import Data
              </button>
              <button className={"btn btn-secondary students-dropdown-btn"} type="button"
                      aria-expanded="false" onClick={exportData}>
                Export Data
              </button>

            </div>
          </div>
          <div className={"table-container"}>
            <table className={"table table-hover table-striped"} >
              <thead className={"top-0 position-sticky h-45"}>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Reg.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Date of Exam</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {marksList.map((data, index) => (<tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data.nicNo}</td>
                  <td>{data.name}</td>
                  <td>{data.subject}</td>
                  <td>{data.marks}</td>
                  <td>{data.date?.slice(0,10)}</td>
                  <td>
                    {/*<FeatherIcon className={"action-icons"} icon={"eye"} data-bs-toggle="modal"*/}
                    {/*               data-bs-target="#exampleModal" onClick={() => setModalType("View")}/>*/}
                    <FeatherIcon className={"action-icons"} icon={"edit"}
                                 onClick={() => {
                                   setModalType("Edit");
                                   setModalShow(true)
                                   setSelectedMarks(data)
                                 }}/>

                    <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} onClick={() => handleDelete(data._id)}/>
                  </td>
                </tr>))}
              </tbody>
            </table>
            {marksList.length === 0 && <div className={"text-center py-5 fw-bold"}>No Student Data Found,Please Add</div>}

          </div>
        </div>
      </div>
      <div className={"modal fade"} id="exampleModal" aria-labelledby="exampleModalLabel"
           aria-hidden="true">
        <div className={"modal-dialog modal-dialog-centered box-popup modal-lg modal-dialog-scrollable"}>
          <div className={"modal-content"}>
            <div className={"modal-header"}>
              <h1 className={"modal-title fs-5"} id="exampleModalLabel">{modalType} Students Details</h1>
              <button type="button" className={"btn-close"} onClick={() =>
              {
                setValue(mapObject(values, function(val, key) {
                  return val = '';
                }
                ))
              }
              } data-bs-dismiss="modal"
                      aria-label="Close"></button>
            </div>
          </div>
        </div>
      </div>
      <MarksForm
          show={modalShow}
          type={modalType}
          update={()=> setUpdate(!update)}
          onHide={() => setModalShow(false)}
          selectedMarks={selectedMarks}
      />

    </Layout>
  );
}

export default Marks;