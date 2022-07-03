import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Modal } from "src/common/Modal";
import { FormErrors } from "src/common/FormErrors";

import { api } from "src/api";

export const ProjectModal = ({
  isOpen,
  onRequestClose,
  isEdit = false,
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

    return isEdit ? editProject() : createProject();
  };

  const editProject = () => {
    const { id } = projectData;
    api
      .patch(`/projects/${id}`, { name })
      .then((response) => {
        const message = response?.data?.message;
        toast.success(message);

        onRequestClose();
        clearForm();
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      });
  };

  const createProject = () => {
    api
      .post("/projects", { name })
      .then((response) => {
        const message = response?.data?.message;
        toast.success(message);

        onRequestClose();
        clearForm();
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      });
  };

  const handleOnRequestClose = (event) => {
    clearForm();
    onRequestClose();
    event.preventDefault();
  };
  return (
    <Modal
      isEdit={isEdit}
      isOpen={isOpen}
      onRequestClose={handleOnRequestClose}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Save" : "Create"}
    >
      <h1>{isEdit ? "Edit Project" : "New Project"} </h1>
      <input
        placeholder="Project name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <FormErrors errors={errors} />
    </Modal>
  );
};
