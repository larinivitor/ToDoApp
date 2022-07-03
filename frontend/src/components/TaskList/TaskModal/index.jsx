import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Modal } from "src/common/Modal";
import { FormErrors } from "src/common/FormErrors";

import { api } from "src/api";

export const TaskModal = ({
  isOpen,
  onRequestClose,
  isEdit = false,
  projectId,
  projectData = { id: "", name: "" },
}) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!isEdit) return;
    const { name } = projectData;
    setName(name);
  }, [isOpen]);

  const clearForm = () => {
    setName("");
    setErrors([]);
  };

  const validateForm = () => {
    const errors = [];
    if (!name) errors.push("Name can not be empty");

    setErrors(errors);
    return !errors.length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) return;

    return isEdit ? editTask() : createTask();
  };

  const editTask = () => {
    const { id } = projectData;
    api
      .patch(`/projects/${projectId}/tasks/${id}`, { name })
      .then((response) => {
        const message = response?.data?.message;
        toast.info(message);

        clearForm();
        onRequestClose();
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      });
  };

  const createTask = () => {
    api
      .post(`/projects/${projectId}/tasks`, { name })
      .then((response) => {
        const message = response?.data?.message;
        toast.success(message);

        clearForm();
        onRequestClose();
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      });
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    clearForm();
    onRequestClose();
  };

  return (
    <Modal
      isEdit={isEdit}
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Save" : "Create"}
    >
      <h1>{isEdit ? "Edit Task" : "New Task"} </h1>
      <input
        placeholder="Task name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <FormErrors errors={errors} />
    </Modal>
  );
};
