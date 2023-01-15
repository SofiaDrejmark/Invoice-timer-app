import { useAppContext } from "../context/AppContext";
import {HiOutlineTrash} from "react-icons/Hi"
function TaskList() {
  const { tasks, projects, deleteTask } = useAppContext();

  return (
    <main className="taskListDiv">
      <div className="top">
        <h3>Task List</h3>
      </div>

      <table>
        {tasks.map((task) => {
          const project: any = projects.find(
            (project) => project.id === task.projectId
          );
          return (
            <tr>
              <td className="taskTd">
                Task Name: {task.task} <br />
                From project: {project.project}
                <br />
                <button onClick={() => deleteTask(task.id)}><HiOutlineTrash/></button>{" "}
              </td>
            </tr>
          );
        })}
      </table>
    </main>
  );
}

export default TaskList;
