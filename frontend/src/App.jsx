import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error("Invalid data format:", res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <header id="header">Student Name List</header>
      <ul>
        {students.map((student) => (
          <li key={student.ID || Math.random()}>
            {student.ID} - <strong>{student.Name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
