import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Singup/Singup";
import Login from "./Login/Login";
import Tasks from "./Tasks/Tasks";
import TaskAdd from "./Tasks/taskadd";
import Taskdelete from "./Tasks/tasksdelete";
import Taskedit from "./Tasks/taskedit";


function App() {
  return (
    <div className="App">
      <h1>TODO APP</h1>
      <Routes>
        <Route path="/singup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/tasks" element={<Tasks></Tasks>}></Route>
        <Route path="/taskadd" element={<TaskAdd></TaskAdd>}></Route>
        <Route path="/taskdelete" element={<Taskdelete></Taskdelete>}></Route>
        <Route path="/taskedit" element={<Taskedit></Taskedit>}></Route>
      </Routes>
    </div>
  );
}

export default App;
