import React, { useState } from "react";

const TaskAdd = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");


  const handleAddTask = async () => {
    try {
      const response = await fetch("http://localhost:8000/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: title, status: status, category: category }),

      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        console.log(tasks);
         // Clear the input field
      } else {
        console.error("Task creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="New Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
           <input
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
              <input
            type="text"
            placeholder="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        {/* Display the tasks */}
        {tasks.map((task) => (
  <div key={task.title}>
    <h3>{task.title}</h3>
    <h2>{task.status}</h2>
    <h3>{task.category}</h3>
  </div>
))}


      </div>
    </div>
  );
};

export default TaskAdd;
