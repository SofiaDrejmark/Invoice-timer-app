import React, { useEffect, useState } from "react";
import axios from "axios";
import OverwiewNav from "../components/OverweiwNav";
import { Outlet, Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/Hi";
import { useAppContext } from "../contexts/AppContextjsx";

function Projects() {
  const { projects, project, setProject, setProjects } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  function getProjects() {
    axios
      .get("http://localhost:3000/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getProjects();
  }, []);

  async function addProject() {
    await axios.post("http://localhost:3000/projects", {
      project: project,
      completed: false,
    });
    getProjects();
    setProject("");
  }

  async function deleteProject(id) {
    await axios.delete(`http://localhost:3000/projects/${id}`);
    getProjects();
  }

  function handleChange(e) {
    setProject(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setProject("");
  }

  function addAndRemoveModal() {
    addProject(project);
    setShowModal(false);
  }

  return (
    <main className="bodyDiv">
      <Outlet />
      <OverwiewNav />

      <section className="addProjectDiv">
        <button onClick={openModal}>New Project</button>
        {showModal ? (
          <section className="modalContainer">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={handleChange}
                value={project}
                name="text"
                placeholder="Write a project"
              ></input>
              <button onClick={addAndRemoveModal}>Add Project</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </section>
        ) : null}
      </section>
      <section className="projects">
        <h3>Choose project to add new task</h3>
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="projectDiv">
              <Link to={`/projects/${project.id}`}>
                <h5 className="projectP">{project.project}</h5>
              </Link>
              <button
                className="deleteButton"
                onClick={() => deleteProject(project.id)}
              >
                <HiOutlineTrash />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Projects;
