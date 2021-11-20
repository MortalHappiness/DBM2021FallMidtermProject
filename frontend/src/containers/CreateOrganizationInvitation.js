import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CreateOrganizationInvitation({ organizationId }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  const text = `${window.location.origin}/oi/${organizationId}  `; //TODO

  return (
    <Box>
      <Tooltip title="Invite To Organization">
        <IconButton onClick={() => setShow(true)}>
          <GroupAddIcon color="action" />
        </IconButton>
      </Tooltip>
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>Send the link to you friends!</DialogTitle>
        <DialogContent>
          <CopyToClipboard
            text={text}
            onCopy={() => copy()}
          >
            <Tooltip
              title={
                copied
                  ? "Text Copied!"
                  : "Copy To Clipboard"
              }
              placement="top"
            >
              <Box
                component="button"
                fontFamily="inherit"
                fontSize="16px"
                fontWeight="400"
                lineHeight="1.25"
                display="inline-block"
                width="100%"
                padding="12px"
                textAlign="left"
                border="0"
                borderRadius="4px"
                data-clipboard-text="album-2"
                type="button"
              >
                {text}
                <ContentCopyIcon fontSize="small" />
              </Box>
            </Tooltip>
          </CopyToClipboard>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShow(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
