import React, {useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';
import {mapObject} from "underscore";
import MultiSelect from "@khanacademy/react-multi-select";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../assets/uplod-icon.svg";
import {studentData, subjectData} from "../student/damiData";
import formHandler from "../../utils/FormHandler";
import {validateStudent} from "../../utils/validation";
import {useDispatch, useSelector} from "react-redux";
import {toggleConfirmationDialog} from "../../redux/actions";

function Marks(props) {
  const [selectedBuyer, setSelectedBuyer] = useState([]);
  const [studentsList, setStudentsList] = useState(studentData)

  const buyerOption = subjectData;
  const [profilePic, setProfilePic] = useState(null);


  const {
    handleChange,
    handleSubmit,
    setValue,
    values,
    errors,
  } = formHandler(isLoading, validateStudent);

  function isLoading() {
    console.log("All are done")
  }

  function multiSelectOnChangeBuyer(selected) {
    setSelectedBuyer(selected);
    // setValue({previousBuyer: selected});
  }

  const handleChangeProfile = (file) => {
    setProfilePic(file);
  };

  useEffect(()=>{
    // setValue({name:"oppai"})
  },[])

  console.log(values)
  console.log(errors)

  const [marksList, setMarksList] = useState([{ No: 0o1, Reg: 200012345678, name: "Harsh", subject: "Physics", marks: 80, rank: 0o3 },
  { No: 0o2, Reg: 200012345679, name: "Kadyan", subject: "Physics", marks: 90, rank: 0o2 },
  { No: 0o3, Reg: 200012345680, name: "Harsh Kadyan", subject: "Physics", marks: 95, rank: 0o1 },
  { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o5, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o6, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o7, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 }])
  console.log(marksList)
  console.log(marksList[0])
  const [modalType, setModalType] = useState("view")
  const dispatch = useDispatch();

  const confirmationDialog = useSelector(state => {
    return state.setting.confirmationDialog
  });

  console.log(confirmationDialog)

  function handleDelete() {
    dispatch(toggleConfirmationDialog({
      isVisible: true,
      confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS DETAILS'),
      confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS DETAILS')
    }));
  }

  console.log()




  return (
    <Layout>
      <div className={"container"}>
        <div className={"container-widget"}>
          <div className={"students_marks_container"}>
            <div><h3 className={"content-heading"}>Students Marks</h3></div>
            <div className={"table-btn-container d-flex justify-content-end pb-3"}>
              <div className={"dropdown"}>
                {/*<button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                {/*  Stream*/}
                {/*</button>*/}
                {/*<ul className="dropdown-menu dropdown-menu-dark">*/}
                {/*  <li><a className={"dropdown-item active"} href="#">Biology</a></li>*/}
                {/*  <li><a className={"dropdown-item"} href="#">Physical Science</a></li>*/}
                {/*  <li><a className={"dropdown-item"} href="#">Commerce</a></li>*/}
                {/*  <li><a className={"dropdown-item"} href="#">Arts</a></li>*/}
                {/*  <li><a className={"dropdown-item"} href="#">Technology</a></li>*/}
                {/*</ul>*/}
              </div>
              <div className={"dropdown"}>
                {/*<button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                {/*  Subject*/}
                {/*</button>*/}
                {/*<ul class={"dropdown-menu dropdown-menu-dark"}>*/}
                {/*  <li><a className={"}dropdown-item active"} href="#">Action</a></li>*/}
                {/*  <li><a className={"dropdown-item"} href="#">Another action</a></li>*/}
                {/*  <li><a className={"dropdown-item"} href="#">Something else here</a></li>*/}
                {/*  <li><a className={"dropdown-item"} href="#">Separated link</a></li>*/}
                {/*</ul>*/}
              </div>
              <button type="button" className={"btn btn-secondary students-dropdown-btn"}
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => setModalType("Add")}>
              <FeatherIcon className={"action-icons text-white"} icon={"plus"}/>
                Add
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
                  <th scope="col">Rank</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {marksList.map((data, index) => (<tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data.Reg}</td>
                  <td>{data.name}</td>
                  <td>{data.subject}</td>
                  <td>{data.marks}</td>
                  <td>{data.rank}</td>
                  <td>
                    {/*<FeatherIcon className={"action-icons"} icon={"eye"} data-bs-toggle="modal"*/}
                    {/*               data-bs-target="#exampleModal" onClick={() => setModalType("View")}/>*/}
                    <FeatherIcon className={"action-icons"} icon={"edit"} data-bs-toggle="modal"
                                 data-bs-target="#exampleModal" onClick={() => setModalType("Edit")}/>
                    <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} onClick={handleDelete}/></td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={"modal fade"} id="exampleModal" aria-labelledby="exampleModalLabel"
           aria-hidden="true">
        <div className={"modal-dialog modal-dialog-centered box-popup modal-lg modal-dialog-scrollable"}>
          <div className={"modal-content"}>
            <div className={"modal-header"}>
              <h1 className={"modal-title fs-5"} id="exampleModalLabel">{modalType} Students Details</h1>
              <button type="button" className={"btn-close"} onClick={() => {
                setValue(mapObject(values, function(val, key) {
                  return val = '';
                }))
              }} data-bs-dismiss="modal"
                      aria-label="Close"></button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
              <div>

                <div className={"pop-up-form-container"}>
                  <div className={"row"}>
                    <div className={"col-md-6"}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input name={"name"} placeholder={"Enter Name"}
                               className={`form-control ${errors.name ? "border-red" : ""}`}
                               id="exampleInputEmail1"
                               onChange={handleChange}
                               value={values.name}
                        />
                        {errors.name && <p className={"warning-text"}>{errors.name}</p>}

                      </div>
                    </div>
                    <div className={"col-md-6"}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Reg.No</label>
                        <input type="number" name={"RegisterNumber"}
                               placeholder={"Enter Registration No"}
                               className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                      </div>
                    </div>
                    <div className={"col-md-6"}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1"
                               className="form-label">Subjects</label>
                        <div className={`form-control p-0`}>
                          <MultiSelect
                              className={"multi-select"}
                              options={buyerOption}
                              selected={selectedBuyer}
                              onSelectedChanged={multiSelectOnChangeBuyer}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={"col-md-6"}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Marks</label>
                        <input type="number" name={"marks"}
                               placeholder={"Enter Marks"}
                               className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                      </div>
                    </div>




                  </div>
                </div>
              </div>

              <div className={"modal-footer"}>
                <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Cancel
                </button>
                <button type="submit" className={"btn btn-secondary students-dropdown-btn"}>Update
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Marks;