import { useMutation } from "@apollo/client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

import { UNASSIGN_FROM_USER } from "../../graphql";

import SectionTitle from "./SectionTitle";

const styles = {
  box: {
    color: "text.primary",
  },
};

export default function Assignees({ taskId, users, assignees }) {
  const [unassignFromUser] = useMutation(UNASSIGN_FROM_USER);

  const handleDelete = (userId) => {
    unassignFromUser({ variables: { userId, taskId } });
  };

  return (
    <Box sx={styles.box}>
      <SectionTitle title="assignees" />
      {assignees.map((assignee) => (
        <Chip
          key={assignee.id}
          avatar={<Avatar>{assignee.displayName[0]}</Avatar>}
          label={assignee.displayName}
          onDelete={() => handleDelete(assignee.id)}
        />
      ))}
    </Box>
  );
}
