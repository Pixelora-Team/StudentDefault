import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 
import { ClipLoader } from "react-spinners"; 


const App = () => {
  const [students, setStudents] = useState([]);
  const [defaulters, setDefaulters] = useState([]);
  const [lateComers, setLateComers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    setLoading(true); 
    axios
      .get("https://jsonbackendmain.onrender.com/Student")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error("Invalid data format:", res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // Hide loader after fetching
  }, []);

  const handleCheckboxChange = (student, category) => {
    if (category === "defaulter") {
      setDefaulters((prev) =>
        prev.some((s) => s.ID === student.ID)
          ? prev.filter((s) => s.ID !== student.ID)
          : [...prev, student]
      );
    } else if (category === "latecomer") {
      setLateComers((prev) =>
        prev.some((s) => s.ID === student.ID)
          ? prev.filter((s) => s.ID !== student.ID)
          : [...prev, student]
      );
    }
  };

  const sendMessageToMyWhatsApp = () => {
    const defaultstd = defaulters.map((student) => ` ${student.ID} ${student.StudentName}`).join("\n");
    const latecomerstd = lateComers.map((student) => `${student.ID} ${student.StudentName}`).join("\n");
    const twocomers = defaulters.filter((s) => lateComers.some((l) => l.ID === s.ID));
    const comers = twocomers.map((student) => ` ${student.ID} ${student.StudentName}`).join("\n");

    const message = encodeURIComponent(
      `${currentDate}\nDefaulter & Latecomer Summary: \n\n ` +
        `Defaulters:\n${defaultstd || "None"}\n\n ` +
        `Late Comers:\n${latecomerstd || "None"}\n\n ` +
        `Late Comers and Defaulters :\n${comers || "None"}\n\n` +
        `Thank you all`
    );

    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div className="container">
      <header id="header">
        <h1 className="title">Student Defaulter Tracker</h1>
      </header>

      {loading ? (
  <div className="loader-container">
    <ClipLoader color={"#36D7B7"} size={50} />
  </div>
) : (
        <>
          <table id="studentTable">
            <thead>
              <tr>
                <th>Register No</th>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Defaulter</th>
                <th>Late Comer</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.ID} className="tableRow">
                  <td>{student.RegisterNo}</td>
                  <td>{student.Rollno}</td>
                  <td>{student.StudentName}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={defaulters.some((s) => s.ID === student.ID)}
                      onChange={() => handleCheckboxChange(student, "defaulter")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={lateComers.some((s) => s.ID === student.ID)}
                      onChange={() => handleCheckboxChange(student, "latecomer")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div id="listtank">
            {defaulters.length > 0 && (
              <div className="listContainer">
                <h3 className="listTitle">Defaulters List (Date: {currentDate})</h3>
                <ul className="studentList">
                  {defaulters.map((student) => (
                    <li key={student.ID} className="listItem">
                      {student.ID} - {student.StudentName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lateComers.length > 0 && (
              <div className="listContainer">
                <h3 className="listTitle">Late Comers List (Date: {currentDate})</h3>
                <ul className="studentList">
                  {lateComers.map((student) => (
                    <li key={student.ID} className="listItem">
                      {student.Rollno} - {student.StudentName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {defaulters.some((s) => lateComers.some((l) => l.ID === s.ID)) && (
              <div className="listContainer">
                <h3 className="listTitle">Defaulters & Late Comers</h3>
                <ul className="studentList">
                  {defaulters
                    .filter((s) => lateComers.some((l) => l.ID === s.ID))
                    .map((student) => (
                      <li key={student.ID} className="listItem">
                        {student.Rollno} - {student.StudentName}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <button id="whatsappButton" onClick={sendMessageToMyWhatsApp}>
            Send WhatsApp Message
          </button>
        </>
      )}
    </div>
  );
};

export default App;
