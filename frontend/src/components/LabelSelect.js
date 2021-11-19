import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { ADD_LABEL_MUTATION } from "../graphql";
import Label from "./Label";

export default function LabelSelect({ labels, taskId }) {
  const [selectedLabel, setSelectedLabel] = useState("");
  const [addLabel] = useMutation(ADD_LABEL_MUTATION);

  const handleChange = (event) => {
    setSelectedLabel(event.target.value);
  };

  const add = () => {
    if (selectedLabel) {
      addLabel({
        variables: {
          labelId: selectedLabel.id,
          taskId,
        },
      });
      setSelectedLabel("");
    }
  };

  return (
    <FormControl variant="standard">
      <Stack direction="row" spacing={1}>
        <Select
          id="label-select"
          value={selectedLabel}
          label="Label"
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Label key={selected} label={selected} />
            </Box>
          )}
        >
          <MenuItem value={null}>{"None"}</MenuItem>
          {labels.map((label) => (
            <MenuItem key={label.id} value={label}>
              {label.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={add}>Add!</Button>
      </Stack>
    </FormControl>
  );
}
