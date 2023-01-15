import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { GiCoins } from "react-icons/Gi";
import {HiOutlineTrash} from "react-icons/Hi"
import {GrTask} from "react-icons/Gr"
function Feed() {
  const { tasks, deleteTimelog, projects, invoices, timelogs } =
    useAppContext();

  let projectsLength = 0;
  for (let i = 0; i < projects.length; i++) {
    projectsLength++;
  }

  let tasksLength = 0;
  for (let i = 0; i < tasks.length; i++) {
    tasksLength++;
  }

  let invoicesLength = 0;
  for (let i = 0; i < invoices.length; i++) {
    invoicesLength++;
  }

  const timelog: any = timelogs.find((timelog) => {
    return timelog;
  });

  const pastMonth = dayjs().subtract(30, "days");
  const timelogFilter: any = timelogs.filter((time) =>
    pastMonth.isBefore(time.start, "days")
  );

  //antalet kronor som fakturerats det senate året
  const pastYear: any = dayjs().subtract(12, "months");
  const yearAmount: any = invoices.filter((date) =>
    pastYear.isBefore(date.date, "months")
  );

  let prices: any = yearAmount.map(function (i: any) {
    return i.totalprice;
  });

  let totalSumPrice: number = prices.reduce(function (a: number, b: number) {
    return a + b;
  }, 0);

  return (
    <main className="bodyDiv">
      <article className="introSection">

        <p className="introP">
          <span className="welcomeSpan">Welcome </span>to this page were you can create projects and tasks connected
          to the project. Here you can take time with the timer how long it
          takes to finish a task and create invoices for the tasks.
        </p>
        
         <img className="feedImg" src="feed.jpg" />
      </article>
      <section className="feedDiv">
        <section className="amountDiv">
          <GiCoins /> Total amount invoices:
          <span className="amount">{totalSumPrice} SEK</span>
        </section>

        <ul className="feedUl">
          <Link to="/projectlist">
            <li className="projectsLi">
            <p>See all Projects</p>
              <span>{projectsLength}</span>
              
            </li>
          </Link>
          <Link to="tasklist">
            <li className="tasksLi">
             <p> See all Tasks</p>
             <span>{tasksLength}</span>
              
            </li>
          </Link>
          <Link to="/invoicelist">
            {" "}
            <li className="invoicesLi">
            <p>See all Invoices</p>
              <span>{invoicesLength}</span>
              
            </li>
          </Link>
        </ul>

        <section className="goToInvoiceDiv">
          <Link to="/new">
            <h3>Create new invoice</h3>
          </Link>
        </section>

        <section>
          <ul className="timelogUl">
           <h5> Timelogs from latest 30 days</h5>
            {timelogFilter.map((filteredTimelog: any) => (
              <li key={filteredTimelog.id}>
                <h3>
                  {" "}
                  Date:
                  <br /> {filteredTimelog.stop}
                </h3>

                <h3>Time: {filteredTimelog.time}</h3>
                <br />
                <h3>Task nr: {filteredTimelog.taskId}</h3>
                <button onClick={() => deleteTimelog(timelog.id)}>
                <HiOutlineTrash/>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default Feed;
