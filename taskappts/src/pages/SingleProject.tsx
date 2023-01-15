import { useAppContext } from "../context/AppContext";

function SingleProject() {
  const sort = (project: any) => {
    const sortResult: any = tasks.filter(
      (task: any) => task.projectId === project.id
    );
    return sortResult.task.task;
  };
  const { tasks } = useAppContext();
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Project Name: </th>
            <th>Tasks in project</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td>{sort(task)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default SingleProject;
