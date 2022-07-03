import { useState, useEffect } from "react";
import { PageContent } from "src/common/PageContent";

import { TaskAddButton, Container, PageHeader } from "./style";
import { TaskModal } from "./TaskModal";
import { Task } from "./Task";

import { api } from "src/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export const TaskList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("");

  const [, , projectId] = window.location.pathname.split("/");

  const history = useHistory();

  const fetchTasks = () => {
    api
      .get(`/projects/${projectId}/tasks`)
      .then((response) => {
        const { data } = response;
        setTasks(data);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      });
  };

  const getProjectName = () => {
    api
      .get(`/projects/${projectId}`)
      .then((response) => {
        const { data } = response;
        setProjectName(data.name);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      });
  };

  useEffect(fetchTasks, []);
  useEffect(getProjectName, []);

  const closeModalAndFetchTasks = () => {
    setOpenModal(false);
    fetchTasks();
  };

  return (
    <PageContent>
      <Container>
        <PageHeader>
          <h1>{projectName}</h1>
          <TaskAddButton onClick={() => setOpenModal(true)}>Add Task</TaskAddButton>
          <button onClick={() => history.goBack()}>Back</button>
        </PageHeader>
        {tasks.map(({ _id, name, finished, finishedAt }) => (
          <Task
            key={_id}
            id={_id}
            name={name}
            finished={Boolean(finished)}
            finishedAt={finishedAt}
            projectId={projectId}
            fetchTasks={fetchTasks}
          />
        ))}
      </Container>
      <TaskModal
        projectId={projectId}
        isOpen={openModal}
        onRequestClose={closeModalAndFetchTasks}
      />
    </PageContent>
  );
};
