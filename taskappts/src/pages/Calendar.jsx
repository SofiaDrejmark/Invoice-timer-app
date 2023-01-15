import React, { useEffect } from "react";
import { useAppContext } from "../contexts/AppContextjsx";
import axios from "axios";
function Calendar() {
  const { timelogs, setTimelogs } = useAppContext();
  const id = 1;
  const timelog = timelogs.find((timelog) => timelog.id === id);
 
  function getTimelogs() {
    axios.get("http://localhost:3000/timelogs").then((response) => {
      setTimelogs(response.data);
    });
  }
  useEffect(() => {
    getTimelogs();
  }, []);

  return (
    <main className="bodyDiv">
     
        <h2>Timelogs</h2>
      
      
      <ul className="timelogUl">
        {timelogs.map((timelog) => (
          <li key={timelog.id}>
            <h3>
              Start time:
             {timelog.start}
            </h3>

            <h3>
              Stop time:
               {timelog.stop}
            </h3>

            <h3>Time: {timelog.time}</h3>
           
            <h3>Task nr: {timelog.taskId}</h3>
          </li>
        ))}
      </ul>
      
    </main>
  );
}

export default Calendar;
