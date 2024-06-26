import { Link, useParams } from 'react-router-dom';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaCog,
  FaSearch,
  FaChevronDown,
  FaFilter
} from 'react-icons/fa';
import { assignments, enrollments, grades, users } from '../../Database';
import './index.css';

function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter(assignment => assignment.course === courseId);
  const es = enrollments.filter(enrollment => enrollment.course === courseId);

  return (
    <div className="w-100 mt-5 pe-5">
      <div className="d-flex justify-content-end">
        <button className="btn btn-light mx-2 d-flex justify-content-start align-items-center">
          <FaSignInAlt />
          <span className="px-2">Import</span>
        </button>
        <button className="btn btn-light dropdown-toggle mx-2 d-flex justify-content-start align-items-center">
          <FaSignOutAlt />
          <span className="ps-2">Export</span>
        </button>
        <button className="btn btn-light d-flex justify-content-start align-items-center">
          <FaCog />
        </button>
      </div>
      <div className="ms-2 container-fluid">
        <div className="row"></div>
        <div className="row gx-2">
          <div className="col-6">
            <label htmlFor="student-names" className="form-label fw-bold">
              Student Names
            </label>
            <div className="input-group">
              <span className="input-group-text bg-transparent">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control d-inline-flex focus-ring focus-ring-danger py-1 px-2 text-decoration-none input-search"
                id="student-names"
                placeholder="Search Students"
              />
              <span className="input-group-text bg-transparent">
                <FaChevronDown />
              </span>
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="assignment-names" className="form-label fw-bold">
              Assignment Names
            </label>
            <div className="input-group">
              <span className="input-group-text bg-transparent">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control d-inline-flex focus-ring focus-ring-danger py-1 px-2 text-decoration-none input-search"
                id="assignment-names"
                placeholder="Search Assignments"
              />
              <span className="input-group-text bg-transparent">
                <FaChevronDown />
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-light ms-3 mt-2 d-flex justify-content-start align-items-center"
        type="button"
      >
        <FaFilter className="me-1" /> Apply Filters
      </button>
      <div className="table-responsive ms-3 mt-2">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="text-start">Student Name</th>
              {as.map(assignment => (
                <th
                  key={assignment._id}
                  className="fw-normal text-center"
                  style={{ fontSize: 14 }}
                >
                  {assignment.name} <br />
                  <span className="fs-12">Out of 100</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {es.map(enrollment => {
              const user = users.find(user => user._id === enrollment.user);
              return (
                <tr key={enrollment._id}>
                  <td className="text-danger">
                    <Link
                      className="link-danger link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                      to="#"
                    >
                      {user?.firstName} {user?.lastName}
                    </Link>
                  </td>
                  {as.map(assignment => {
                    const grade = grades.find(
                      grade =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id
                    );
                    return (
                      grade?.grade && (
                        <td key={grade._id} className="text-center">
                          {grade?.grade}
                        </td>
                      )
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;
