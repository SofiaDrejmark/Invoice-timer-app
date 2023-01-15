import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000";

//INTERFACE
interface Invoice {
  id: number;
  taskId: number;
  status: string;
  customer: string;
  daysLeft: number;
  timelogId: number;
  totalprice: number;
  hourPrice: number;
  date: any;
}

interface Task {
  id: number;
  projectId: number;
  projectName: string;
  task: string;
  completed: boolean;
}

interface Project {
  id: number;
  project: string;
  completed: boolean;
}

interface Timelog {
  id: number;
  taskId: number;
  time: number;
  start: Date;
  stop: Date;
  taskName: string;
}

//CONTEXTINTERFACE
interface AppContextInterface {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: number) => void;

  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;

  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;

  timelogs: Timelog[];
  addTimelog: (timelog: Timelog) => void;
  deleteTimelog: (id: number) => void;
}

//CREATECONTEXT
export const AppContext = createContext<AppContextInterface | null>(null);

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  //USESTATE
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [timelogs, setTimelogs] = useState<Timelog[]>([]);

  //GET
  async function getInvoices() {
    await axios.get(`${baseURL}/invoices`).then((response: any) => {
      setInvoices(response.data);
    });
  }

  async function getTasks() {
    await axios.get(`${baseURL}/tasks`).then((response: any) => {
      setTasks(response.data);
    });
  }

  async function getProjects() {
    await axios.get(`${baseURL}/projects`).then((response: any) => {
      setProjects(response.data);
    });
  }

  async function getTimelogs() {
    await axios.get(`${baseURL}/timelogs`).then((response: any) => {
      setTimelogs(response.data);
    });
  }

  //ADD
  async function addInvoice(invoice: Invoice) {
    await axios.post(`${baseURL}/invoices`);
    setInvoices((prevInvoices) => [...prevInvoices, invoice]);
  }

  async function addTask(task: Task) {
    await axios.post(`${baseURL}/tasks`);
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  async function addProject(project: Project) {
    await axios.post(`${baseURL}/projects`);
    setProjects((prevProjects) => [...prevProjects, project]);
  }

  async function addTimelog(timelog: Timelog) {
    await axios.post(`${baseURL}/timelogs`);
    setTimelogs((prevTimelogs) => [...prevTimelogs, timelog]);
  }

  //DELETE
  async function deleteProject(id: number) {
    await axios.delete(`${baseURL}/projects/${id}`);
    getProjects();
  }

  async function deleteInvoice(id: number) {
    await axios.delete(`${baseURL}/invoices/${id}`);
    getInvoices();
  }

  async function deleteTask(id: number) {
    await axios.delete(`${baseURL}/tasks/${id}`);
    getTasks();
  }

  async function deleteTimelog(id: number) {
    await axios.delete(`${baseURL}/timelogs/${id}`);
    getTimelogs();
  }

  //USEEFFECT
  useEffect(() => {
    getInvoices();
    getTasks();
    getProjects();
    getTimelogs();
  }, []);

  return (
    <AppContext.Provider
      value={{
        invoices,
        addInvoice,
        tasks,
        addTask,
        projects,
        addProject,
        deleteProject,
        timelogs,
        addTimelog,
        deleteInvoice,
        deleteTimelog,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Something went wrong");
  }

  return context;
}
