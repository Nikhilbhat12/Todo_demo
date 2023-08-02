import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState({ id: null, text: "" });

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTaskHandler = (task) => {
    setEditTask({ id: task.id, text: task.text });
  };

  const updateTask = () => {
    if (editTask.text.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === editTask.id ? { ...task, text: editTask.text } : task
      )
    );
    setEditTask({ id: null, text: "" });
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}{" "}
            </span>
            <button onClick={() => editTaskHandler(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editTask.id !== null && (
        <div>
          <input
            type="text"
            value={editTask.text}
            onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
          />
          <button onClick={updateTask}>Update</button>
        </div>
      )}
    </div>
  );
};

export default App;
