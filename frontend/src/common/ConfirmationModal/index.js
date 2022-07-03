import { Modal } from "../Modal";

export const ConfirmationModal = ({
  entityName,
  isOpen,
  onRequestClose,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSubmit={onSubmit}
      submitLabel={`Yes, delete ${entityName}`}
    >
      <h1>{`Delete ${entityName}`} </h1>
      <h3>Are you sure? It can not be undone</h3>
    </Modal>
  );
};
