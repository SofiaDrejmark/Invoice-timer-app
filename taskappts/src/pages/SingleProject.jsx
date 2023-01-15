import React from "react";
import { useAppContext } from "../contexts/AppContextjsx";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { HiArrowLeft } from "react-icons/Hi";

function SingleProject() {
  const { projects, task, setTask, getTasks } = useAppContext();

  const id = 1;
  const params = useParams();
  const project = projects.find((project) => {
    return project.id === parseInt(params.projectId);
  });

  async function addTask() {
    await axios.post("http://localhost:3000/tasks", {
      task: task,
      projectId: project.id,
      completed: false,
    });
    getTasks();
    setTask("");
  }

  function handleChange(e) {
    setTask(e.target.value);
  }

  return (
    <main className="bodyDiv">
      <div className="topDiv">
        <h2>Timer</h2>
      </div>
      <Link to={`/projects`}>
        <button className="backButton">
          <HiArrowLeft />
        </button>
      </Link>
      <section className="singleDiv">
        <h3>Project Name:</h3>
        <h2 key={project.id}>{project.project}</h2>
        <h3>Add new task to project:</h3>
        <input
          type="text"
          onChange={handleChange}
          value={task}
          name="text"
          placeholder="Write a task"
        ></input>
        <Link to={`/tasks`}>
          {" "}
          <button onClick={addTask}>Add Task</button>
        </Link>
      </section>
    </main>
  );
}

export default SingleProject;
