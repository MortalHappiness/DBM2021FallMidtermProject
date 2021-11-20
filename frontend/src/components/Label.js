import { useMutation } from "@apollo/client";
import { Chip } from "@mui/material";
import { REMOVE_LABEL_MUTATION } from "../graphql";

export default function Label({ label, taskId, canDelete }) {
  const [removeLabel] = useMutation(REMOVE_LABEL_MUTATION);

  const remove = () => {
    removeLabel({
      variables: {
        labelId: label.id,
        taskId,
      },
    });
  };

  return (
    <Chip
      style={{ fontWeight: 500 }}
      key={label.id}
      label={label.name}
      size="small"
      sx={{ bgcolor: label.color, color: "text.secondary", margin: "3px" }}
      variant="outlined"
      onDelete={canDelete ? remove : undefined}
    />
  );
}
