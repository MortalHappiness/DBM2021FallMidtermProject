import { useState } from "react";
import { useMutation } from "@apollo/client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ADD_LABEL_MUTATION } from "../../graphql";

import Label from '../../components/Label';
import SectionTitle from './SectionTitle';

export default function Labels({ title, taskId, labels, activeLabels, canAdd, canDelete }) {
  const [addLabel] = useMutation(ADD_LABEL_MUTATION);
  activeLabels = activeLabels || labels

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAddLabel = (labelId) => {
    addLabel({ variables: { labelId, taskId } });
    setAnchorEl(null);
  };

  const inactiveLabels = labels.filter(
    (label) => !activeLabels.some((activeLabel) => activeLabel.id === label.id)
  );

  return (
    <Box>
      <SectionTitle title={title || ""} />
      {activeLabels.map((label) => (
        <Label key={label.id} label={label} taskId={taskId} canDelete={canDelete} />
      ))}
      {canAdd && !!inactiveLabels.length && (
        <Button onClick={handleClick}>+ Add more</Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {inactiveLabels.map((label) => (
          <MenuItem key={label.id} onClick={() => handleAddLabel(label.id)}>
            {label.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}