import React, { useEffect, useState } from "react";
import axios from "axios";
import OverwiewNav from "../components/OverweiwNav";
import { Outlet, useParams } from "react-router-dom";
import { HiOutlineTrash} from "react-icons/Hi";
import { useAppContext } from "../contexts/AppContextjsx";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const params = useParams();

  const { projects, setProjects } = useAppContext();

  const project = projects.find((project) => {
    return project.id === parseInt(params.projectId);
  });
  // Styling
  const style = {
    style1: {
      color: "rgba(0, 0, 0, 0.233)",
      textDecoration: "line-through",
    },
    style2: {
      backgroundColor: "rgba(169, 207, 183, 0.861)",
    },
  };

  function getProjects() {
    axios.get("http://localhost:3000/projects").then((response) => {
      setProjects(response.data);
    });
  }
  useEffect(() => {
    getProjects();
  }, []);

  function getTasks() {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getTasks();
    getProjects();
  }, []);

  async function deleteTask(id) {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    getTasks();
  }

  async function complete(id) {
    const task = tasks.find((task) => task.id === id);
    await axios.patch(`http://localhost:3000/tasks/${id}`, {
      completed: !task.completed,
    });
    getTasks();
  }

  return (
    <main className="bodyDiv">
      <Outlet />
      <OverwiewNav />
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            className="taskLi"
            key={task.id}
            style={task.completed ? style.style2 : undefined}
          >
            <section className="taskDiv">
              <input
                className="checkbox"
                type="checkbox"
                onChange={() => complete(task.id)}
                checked={task.completed || false}
              />
              <h5
                className="taskP"
                style={task.completed ? style.style1 : undefined}
              >
                {task.task}
              </h5>
              <button
                className="deleteButton"
                onClick={() => deleteTask(task.id)}
              >
                <HiOutlineTrash/>
              </button>
            </section>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Tasks;
