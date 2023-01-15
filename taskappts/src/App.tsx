import "./App.css";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import ProjectList from "./pages/ProjectList";
import TaskList from "./pages/TaskList";
import InvoiceList from "./pages/InvoiceList";
import SingleProject from "./pages/SingleProject";
import New from "./pages/New";
import Calendar from "./pages/Calendar";
import Overwiew from "./pages/Overwiew";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Timelogs from "./pages/Timelogs";
import Root from "./components/Root";
import SingleTask from "./pages/SingleTask";

import { AppProviderjsx } from "./contexts/AppContextjsx";

function App() {
  return (
    <div className="App">
      <AppProviderjsx>
        <AppProvider>
          <Router>
            <Root />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/new" element={<New />} />
              <Route path="/projectlist" element={<ProjectList />} />
              <Route path="/tasklist" element={<TaskList />} />
              <Route path="/invoicelist" element={<InvoiceList />} />
              <Route path="/projects/:projectId" element={<SingleProject />} />

              <Route path="/calendar" element={<Calendar />} />
              <Route path="/overwiew" element={<Overwiew />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/timelogs" element={<Timelogs />} />
              <Route path="/tasks/:taskId" element={<SingleTask />} />
            </Routes>
          </Router>
        </AppProvider>
      </AppProviderjsx>
    </div>
  );
}

export default App;
