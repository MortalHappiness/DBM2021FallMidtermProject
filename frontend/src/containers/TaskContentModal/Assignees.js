import { useState } from "react";
import { useMutation } from "@apollo/client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ASSIGN_TO_USER, UNASSIGN_FROM_USER } from "../../graphql";

import SectionTitle from "./SectionTitle";

const styles = {
  box: {
    color: "text.primary",
  },
};

export default function Assignees({ taskId, users, assignees }) {
  const [assignToUser] = useMutation(ASSIGN_TO_USER);
  const [unassignFromUser] = useMutation(UNASSIGN_FROM_USER);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (userId) => {
    assignToUser({ variables: { userId, taskId } });
    setAnchorEl(null);
  };

  const handleDelete = (userId) => {
    unassignFromUser({ variables: { userId, taskId } });
  };

  const unassignedUsers = users.filter(
    (user) => !assignees.some((assignee) => assignee.id === user.id)
  );

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
      {unassignedUsers.length !== 0 && (
        <Button onClick={handleClick}>+ Add more</Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {unassignedUsers.map((user) => (
          <MenuItem key={user.id} onClick={() => handleClose(user.id)}>
            {user.displayName}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
