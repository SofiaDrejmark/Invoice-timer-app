import { useAppContext } from "../context/AppContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/Hi";
function New() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { tasks, projects, timelogs, deleteInvoice } = useAppContext();
  const [selectedTask, setSelectedTask] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [customer, setCustomer] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<any>();
  const baseURL = "http://localhost:3000";

  //INTERFACE
  interface Invoice {
    id: number;
    taskId: number;
    status: string;
    customer: string;
    daysLeft: number;
    price: number;
    timelogId: number;
    totalprice: number;
  }
  interface ContextInterface {
    invoices: Invoice[];
    addInvoice: (invoice: Invoice) => void;
  }

  async function addInvoice(invoice: Invoice) {
    await axios.post(`${baseURL}/invoices`, {
      taskId: selectedTask,
      status: "unpaid",
      customer: customer,
      daysLeft: 30,
      price: price,
      totalprice: totalPrice,
      timelogId: timelog.id,
    });
    getInvoices();
  }

  async function getInvoices() {
    await axios
      .get(`${baseURL}/invoices`)
      .then((response: any) => {
        setInvoices(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getInvoices();
  }, []);

  const timelog: any = timelogs.find((timelog) => {
    return timelog;
  });

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPrice(parseInt(e.target.value));
    priceFunc();
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCustomer("");
  }

  function handleAdd(e: any) {
    addInvoice(e.target.value);
  }

  const [selectedProject, setSelectedProject] = useState<string>("");

  const filteredTasks = tasks.filter(
    (task) => task.projectId === parseInt(selectedProject)
  );

  const filteredTimelogs = timelogs.filter(
    (timelog) => timelog.taskId === parseInt(selectedTask)
  );

  timelogs.filter((timelog) => timelog.taskId === parseInt(selectedTime));

  function priceFunc() {
    let hours: number = 0;
    hours = timelog.time / 60 / 60;
    let hourPrice: number = Math.floor(price * hours * 10);
    setTotalPrice(hourPrice);
  }

  useEffect(() => {
    priceFunc();
  }, []);

  return (
    <main className="bodyDivNew">
      <form onSubmit={handleSubmit}>
        <select
          name="selectedProject"
          onChange={(e: any) => {
            setSelectedProject(e.target.value);
          }}
          required
          id="selectedProject"
          value={selectedProject}
        >
          <option value="project">--Please choose project--</option>
          {projects.map((project) => (
            <option value={project.id}>{project.project}</option>
          ))}
        </select>

        <select
          name="selectedTask"
          onChange={(e: any) => {
            setSelectedTask(e.target.value);
          }}
          required
          id="selectedTask"
          value={selectedTask}
        >
          <option value="task">--Please choose task--</option>
          {filteredTasks.map((task) => (
            <option value={task.id}>{task.task}</option>
          ))}
        </select>

        <select
          name="selectedTimelog"
          onChange={(e: any) => {
            setSelectedTime(e.target.value);
          }}
          required
          id="selectedTime"
          value={selectedTime}
        >
          <option value="timelog">--Please choose time--</option>
          {filteredTimelogs.map((timelog) => (
            <option value={timelog.id}>{timelog.time}</option>
          ))}
        </select>

        <label>Customer Name: </label>

        <input
          type="text"
          onChange={({ target }) => {
            setCustomer(target.value);
          }}
          value={customer}
          name="text"
        />

        <label>Price/ hour: </label>

        <input type="number" onChange={handleOnChange} value={price} />

        <button type="submit" onClick={handleAdd}>
          Add Invoice
        </button>
      </form>

      <section className="invoices">
        {invoices.map((invoice) => (
          <div>
            <p>Customer Name: {invoice.customer}</p>
            <p>
              Total Price: {invoice.totalprice} SEK <br /> Status:{" "}
              {invoice.status} <br />
            </p>
            <button onClick={() => deleteInvoice(invoice.id)}>
              <HiOutlineTrash />
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default New;
