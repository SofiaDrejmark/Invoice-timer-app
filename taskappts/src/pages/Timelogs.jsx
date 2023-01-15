import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContextjsx";
import axios from "axios";
import { Link } from "react-router-dom";

function Timelogs() {
  const [timelogs, setTimelogs] = useState([]);

  async function getTimelogs() {
    await axios
      .get(`http://localhost:3000/timelogs`)
      .then((res) => {
        setTimelogs(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getTimelogs();
    getTasks();
  }, []);

  const { tasks, getTasks } = useAppContext();
  const id = 1;
  const task = tasks.find((task) => task.id === id);

  {
    return (
      <main className="bodyDiv">
        

        
<section className="timerSection">

        <h3 className="timerH3">Choose task to start timer</h3>
        <ul className="taskUl">
          {tasks.map((task) => (
            <li key={task.id}>
              <Link to={`/tasks/${task.id}`}>{task.task}</Link>
            </li>
          ))}
        </ul>
        </section>
      </main>
    );
  }
}
export default Timelogs;
