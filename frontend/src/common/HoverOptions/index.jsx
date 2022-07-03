import { HoverOptionsStyle } from "./styles";

export const HoverOptions = ({
  onClickDelete,
  onClickEdit,
  disableDelete = false,
  disableEdit = false,
}) => {

  return (
        <HoverOptionsStyle>
          <button disabled={disableEdit} onClick={onClickEdit}>
            Edit
          </button>
          <button disabled={disableDelete} onClick={onClickDelete}>
            Delete
          </button>
        </HoverOptionsStyle>
      
  );
};
