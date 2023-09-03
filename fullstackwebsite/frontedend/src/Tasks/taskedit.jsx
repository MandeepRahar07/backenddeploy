import React, { useState, useEffect } from "react";

const Taskedit = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
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
  }, []);

  const handleEditClick = (taskId) => {
    setEditTaskId(taskId);
    // Find the task by ID and set it as the edited task
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
      setEditedTask(taskToEdit.title); // You can set other properties as well
    }
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/task/${taskId}`, {
        method: "PUT", // Use PUT to update the task
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: editedTask }), // Update the task's title
      });

      if (response.ok) {
        // If the task was edited successfully, update it in the state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, title: editedTask } : task
          )
        );
        setEditTaskId(null); // Clear the edit mode
      } else {
        console.error("Edit failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId(null); // Clear the edit mode
  };

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            {editTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{task.title}</h3>
                <h2>{task.status}</h2>
                <h3>{task.category}</h3>
                <button onClick={() => handleEditClick(task._id)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taskedit;
