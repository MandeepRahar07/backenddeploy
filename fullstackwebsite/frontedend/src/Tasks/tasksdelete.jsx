import React, { useState, useEffect } from "react";

const Taskdelete = () => {
  const [tasks, setTasks] = useState([]);

  const deletask = ()=>{
    fetch("http://localhost:8000/tasks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        })
        .catch((err) => console.error(err));
  }

  useEffect(() => {
    deletask()
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        // If the task was deleted successfully, remove it from the state
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        deletask();
      } else {
        console.error("Delete failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <h2>{task.status}</h2>
            <h3>{task.category}</h3>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taskdelete;
