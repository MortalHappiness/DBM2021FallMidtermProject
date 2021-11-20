import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  InputLabel,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useState } from "react";
import {
  CREATE_LABEL_MUTATION,
  GET_PROJECT_QUERY,
  GET_LABEL_COLORS_QUERY,
} from "../graphql";
import Label from "../components/Label";
import Labels from "./TaskContentModal/Labels";
import Loading from "../components/Loading";

export default function CreateLabelForm({ projectId, labels }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(null);
  const { loading, error, data } = useQuery(GET_LABEL_COLORS_QUERY);
  const [createLabel] = useMutation(CREATE_LABEL_MUTATION, {
    refetchQueries: [GET_PROJECT_QUERY],
  });

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  const labelColors = JSON.parse(data.labelColors);

  const handleTooltipClick = () => {
    setColor(labelColors.DEFAULT);
    setShow(true);
  };

  const add = async () => {
    if (name && color) {
      try {
        await createLabel({
          variables: {
            data: {
              name,
              color,
              projectId,
            },
          },
        });
        setName("");
        setColor(labelColors.DEFAULT);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Box>
      <Tooltip title="Create Label">
        <IconButton onClick={handleTooltipClick}>
          <LocalOfferOutlinedIcon color="action" />
        </IconButton>
      </Tooltip>

      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>Labels</DialogTitle>
        <DialogContent>
          <Labels labels={labels}></Labels>
          <Divider sx={{ my: 2 }} />
          <Typography
            sx={{ color: "text.secondary" }}
            variant="subtitle2"
            component="div"
            gutterBottom
          >
            Create a new label
          </Typography>
          <Stack direction="column" spacing={2}>
            <TextField
              autoFocus
              fullWidth
              name="name"
              label="Name"
              size="small"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <FormControl>
              <InputLabel id="color">Color</InputLabel>
              <Select
                sx={{ bgcolor: color }}
                fullWidth
                labelId="color"
                label="Color"
                size="small"
                name="color"
                onChange={(e) => setColor(e.target.value)}
                value={color}
              >
                {Object.entries(labelColors).map(([colorName, colorValue]) => {
                  return (
                    <MenuItem
                      sx={{ bgcolor: colorValue }}
                      key={colorName}
                      value={colorValue}
                    >
                      {colorName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography
            sx={{ color: "text.secondary" }}
            variant="subtitle2"
            component="div"
            gutterBottom
          >
            Preview
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Label label={{ name: name || "label preview", color }}></Label>
            <Button onClick={add} variant="contained" color="success">
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
