import { Fragment, useState } from "react";
import { toast } from "react-toastify";

import { TaskContainer } from "./style";
import { TaskModal } from "../TaskModal";
import { HoverOptions } from "src/common/HoverOptions";
import { ConfirmationModal } from "src/common/ConfirmationModal";

import checkBoxBlankImg from "src/assets/checkBoxBlank.svg";
import checkBoxCheckedImg from "src/assets/checkBoxChecked.svg";

import { api } from "src/api";

export const Task = ({
  id,
  name,
  finished,
  finishedAt,
  projectId,
  fetchTasks,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const closeEditModalAndFetchTasks = () => {
    setOpenEditModal(false);
    fetchTasks();
  };

  const confirmDeleteAndFetchTasks = (event) => {
    event.preventDefault();
    api
      .delete(`/projects/${projectId}/tasks/${id}`)
      .then((response) => {
        const message = response?.data?.message;
        toast.success(message);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      })
      .finally(() => {
        setOpenDeleteModal(false);
        fetchTasks();
      });
  };

  const finishTask = (event) => {
    event.preventDefault();

    api
      .post(`/projects/${projectId}/tasks/${id}/finish`)
      .then((response) => {
        const message = response?.data?.message;
        toast.success(message);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      })
      .finally(() => {
        fetchTasks();
      });
  };

  return (
    <Fragment>
      <TaskContainer finished={finished}>
        <div className="task-header">
          <button onClick={finishTask} disabled={finished}>
            <img
              src={finished ? checkBoxCheckedImg : checkBoxBlankImg}
              alt="checkbox"
            />
          </button>
          <h3 className="task-name">{name}</h3>
        </div>
        <div className="task-body">
          {finished && (
            <h3>Done at:<br></br>  
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              }).format(new Date(finishedAt))}
            </h3>
          )}     
          <HoverOptions
            onClickEdit={() => setOpenEditModal(true)}
            onClickDelete={() => setOpenDeleteModal(true)}
            disableEdit={finished}
            disableDelete={finished}
          />
        </div>
      </TaskContainer>
      <TaskModal
        isEdit
        projectData={{ name, id }}
        projectId={projectId}
        isOpen={openEditModal}
        onRequestClose={closeEditModalAndFetchTasks}
      />
      <ConfirmationModal
        entityName="task"
        isOpen={openDeleteModal}
        onSubmit={confirmDeleteAndFetchTasks}
        onRequestClose={() => setOpenDeleteModal(false)}
      />
    </Fragment>
  );
};
