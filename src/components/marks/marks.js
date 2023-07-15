import React, { useState } from 'react';
import Layout from "../../layout/layout";
import FeatherIcon from 'feather-icons-react';

function Marks(props) {

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
  { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 },
  { No: 0o4, Reg: 200012345681, name: "Harsh Kadyan", subject: "Physics", marks: 78, rank: 0o4 }])
  console.log(marksList)
  console.log(marksList[0])




  return (
    <Layout>
      <div className={"container"}>
        <div className={"p-5"}>
          <div className={"students_marks_container"}>
            <div><h3 className={"content-heading"}>Students Marks</h3></div>
            <div className={"marks-dropdown-container d-flex justify-content-end pb-3"}>
              <div className={"dropdown"}>
                <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Stream
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item active" href="#">Biology</a></li>
                  <li><a class="dropdown-item" href="#">Physical Science</a></li>
                  <li><a class="dropdown-item" href="#">Commerce</a></li>
                  <li><a class="dropdown-item" href="#">Arts</a></li>
                  <li><a class="dropdown-item" href="#">Technology</a></li>
                </ul>
              </div>
              <div class="dropdown">
                <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Subject
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item active" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </div>
              <div class="dropdown">
                <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  From
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item active" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </div>
              <div class="dropdown">
                <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  To
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item active" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </div>
              <div class="dropdown">
                <button className={"btn btn-secondary dropdown-toggle marks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Add
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item active" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={"table-container "}>
            <table className={"table table-hover table-striped "} >
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
                  <th scope="row">{data.No}</th>
                  <td>{data.Reg}</td>
                  <td>{data.name}</td>
                  <td>{data.subject}</td>
                  <td>{data.marks}</td>
                  <td>{data.rank}</td>
                  <td><FeatherIcon className={"action-icons"} icon={"eye"} />
                    <FeatherIcon className={"action-icons"} icon={"edit"} />
                    <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} /></td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Marks;