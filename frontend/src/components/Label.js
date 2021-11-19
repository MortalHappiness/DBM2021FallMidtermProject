import { useMutation } from '@apollo/client';
import { Chip } from '@mui/material';
import { REMOVE_LABEL_MUTATION } from '../graphql';

export default function Label({ label, taskId, canDelete }) {

  const [removeLabel] = useMutation(REMOVE_LABEL_MUTATION);

  const remove = () => {
    removeLabel({
      variables: {
        labelId: label.id,
        taskId,
      },
    });
  }

  return <Chip
    key={label.id}
    label={label.name}
    size="small"
    sx={{ backgroundColor: label.color }}
    variant="outlined"
    onDelete={canDelete ? remove : undefined}
  />;
}
