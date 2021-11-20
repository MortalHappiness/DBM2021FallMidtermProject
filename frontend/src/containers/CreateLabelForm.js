import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useState } from "react";
import { CREATE_LABEL_MUTATION, GET_PROJECT_QUERY } from "../graphql";
import Label from '../components/Label';
import Labels from './TaskContentModal/Labels';

const DefaultLabelColor = '#ffffff';
const ColorSuggestions = [
  '#FFFFFF',
  '#EBECED',
  '#E9E5E3',
  '#FAEBDD',
  '#FBF3DB',
  '#DDEDEA',
  '#DDEBF1',
  '#EAE4F2',
  '#F4DFEB',
  '#FBE4E4'
].map(t => t.toLowerCase());

export default function CreateLabelForm({ projectId, labels }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(DefaultLabelColor);
  const [createLabel] = useMutation(CREATE_LABEL_MUTATION, {
    refetchQueries: [GET_PROJECT_QUERY],
  });

  const add = () => {
    if (name && color) {
      createLabel({
        variables: {
          data: {
            name,
            color,
            projectId,
          },
        },
      });
      setName('');
      setColor(DefaultLabelColor);
      // setShow(false);
    }
  };

  return (
    <Box>
      <Tooltip title="Create Label">
        <IconButton onClick={() => setShow(true)}>
          <LocalOfferOutlinedIcon color="action" />
        </IconButton>
      </Tooltip>


      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>Create Label</DialogTitle>
        <DialogContent>
          <Divider sx={{ my: 2 }} />
          <Labels labels={labels}></Labels>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row">
            <TextField
              autoFocus
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              sx={{ my: 1, mx:2 }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Box>
              <Select
                style={{ backgroundColor: color }}
                name="color"
                onChange={(e) => setColor(e.target.value)}
                value={color}
              >
                {
                  ColorSuggestions.map(c => {
                    return <MenuItem style={{ backgroundColor: c, color: 'gray' }} key={c} value={c}>{c}</MenuItem>
                  })
                }
              </Select>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Label label={{ name: name || "label preview", color }}></Label>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={add} variant="contained" color="success">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
}
