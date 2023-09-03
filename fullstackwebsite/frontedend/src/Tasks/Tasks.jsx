import React, { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the correct header name "Authorization"
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the tasks state with the fetched data
        setTasks(data);
      })
      .catch((err) => console.error(err));
  }, []); // Pass an empty dependency array to run the effect only once

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        {tasks.map((task) => (
          <div key={task._id}> {/* Add a unique key for each task */}
            <h3>{task.title}</h3>
            <h2>{task.status}</h2>
            <h3>{task.category}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
