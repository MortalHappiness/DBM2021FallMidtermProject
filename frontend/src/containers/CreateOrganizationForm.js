
import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CREATE_ORG_MUTATION } from "../graphql/mutations.js";

export default function CreateOrganizationForm() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [createOrg] = useMutation(CREATE_ORG_MUTATION);

  const add = () => {
    createOrg({
      variables: {
        data: {
          name,
        },
      },
    });
    setShow(false);
  };

  return (
    <Box>
      <Button onClick={() => setShow(true)}>
        Create Organization
      </Button>

      <Dialog
        open={show}
        onClose={() => setShow(false)}>
        <DialogTitle>
          Modify user
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="name"
            label="Organization Name"
            fullWidth
            variant="standard"
            sx={{ my: 1 }}
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Box
            mx={"auto"} my={0}
            sx={{ color: '#999999', fontSize: 13, display: 'inline' }}>
            <span> The content will keep if temparary close the pop-up. </span>
          </Box>
          <Button
            onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            onClick={add}
            variant="contained"
            color="success">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}