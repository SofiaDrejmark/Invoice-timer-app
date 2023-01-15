import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000";

export const AppContextjsx = createContext();

export function AppProviderjsx({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [start, setStart] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [project, setProject] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [task, setTask] = useState("");
  const [counting, setCounting] = useState(false);
  const [tasks, setTasks] = useState([
    {
      projectId: project.id,
      projectName: project.project,
      completed: false,
      task: ""
    },
  ]);

  const [projects, setProjects] = useState([
    {
      project: "",
      completed: false
    },
  ]);

  const [timelogs, setTimelogs] = useState([
    {
      start: start,
      stop: Date(),
      time: seconds,
      taskId: task.id,
      taskName: task.task
    },
  ]);

  function getProjects() {
    axios.get(`${baseURL}/projects`).then((response) => {
      setProjects(response.data);
    });
  }
  useEffect(() => {
    getProjects();
  }, []);

  function getTasks() {
    axios.get(`${baseURL}/tasks`).then((response) => {
      setTasks(response.data);
    });
  }
  useEffect(() => {
    getTasks();
  }, []);

  function getTimelogs() {
    axios.get(`${baseURL}/timelogs`).then((response) => {
      setTimelogs(response.data);
    });
  }
  useEffect(() => {
    getTimelogs();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const providerValue = {
    task,
    setTask,
    tasks,
    setTasks,
    getTasks,
    showTaskModal,
    setShowTaskModal,
    projects,
    getProjects,
    setProjects,
    project,
    setProject,
    getTimelogs,
    timelogs,
    setTimelogs,
    start,
    setStart,
    seconds,
    setSeconds,
    openModal,
    showModal,
    setShowModal,
    counting,
    setCounting,
  };

  return (
    <AppContextjsx.Provider value={providerValue}>{children}</AppContextjsx.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContextjsx);

  if (!context) {
    throw new Error("Something went wrong");
  }

  return context;
}
