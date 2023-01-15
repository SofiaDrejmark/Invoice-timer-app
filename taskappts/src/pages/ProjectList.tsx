import { useAppContext } from "../context/AppContext";
import {HiOutlineTrash} from "react-icons/Hi"
function ProjectList() {
  const { tasks, projects, deleteProject } = useAppContext();

  const sort = (project: any) => {
    const sortResult: any = tasks.filter(
      (task: any) => task.projectId === project.id
    );
    return sortResult.length;
  };

  return (
    <main className="taskListDiv">
      
        <h3>Project List</h3>
      
      <section>
        <table>
          <thead>
            <tr>
              <th>Project Name: </th>
              <th>Tasks in project</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => (
              <tr key={project.id}>
                <td>{project.project}</td>
                <td>{sort(project)}</td>{" "}
                <button onClick={() => deleteProject(project.id)}>
                <HiOutlineTrash/>
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default ProjectList;
