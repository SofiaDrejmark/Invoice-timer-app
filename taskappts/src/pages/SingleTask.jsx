import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContextjsx";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { HiArrowLeft } from "react-icons/Hi";

function SingleTask() {
  const [seconds, setSeconds] = useState(0);
  const [counting, setCounting] = useState(false);
  const [start, setStart] = useState(0);

  const { tasks, getTasks } = useAppContext();

  const id = 1;
  const params = useParams();
  const task = tasks.find((task) => {
    return task.id === parseInt(params.taskId);
  });

  async function saveTimelog() {
    await axios.post("http://localhost:3000/timelogs", {
      start: start,
      stop: Date(),
      time: seconds,
      taskId: task.id,
    });
    setCounting(false);
    setSeconds(0);
  }

  useEffect(() => {
    let count = null;
    if (counting) {
      count = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!counting && seconds !== 0) {
      clearInterval(count);
    }
    return () => clearInterval(count);
  }, [counting, seconds]);

  function startTimer() {
    setCounting(true);
    setStart(Date());
  }

  return (
    <main className="bodyDiv">
     
      <Link to={`/timelogs`}>
        <button className="backButton">
          <HiArrowLeft />
        </button>
      </Link>
      <section className="singleDiv">
        <h2 key={task.id}>{task.task}</h2>
        <h2>{seconds}</h2>
        <button className="timerButton" onClick={startTimer}>
          Start
        </button>
        <button onClick={saveTimelog}>Save and reset</button>
      </section>
    </main>
  );
}

export default SingleTask;
