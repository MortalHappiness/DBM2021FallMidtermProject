import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CreateOrganizationInvitation() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  const text = `${window.location.origin}/oi/${1}`; //TODO

  return (
    <Box>
      <Button onClick={() => setShow(true)}>Get Invitation Link</Button>

      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>Invitation Link</DialogTitle>
        <DialogContent>
        <CopyToClipboard
          text={text}
          onCopy={() => copy()}
        >
          <Tooltip
            title={
              copied
                ? "This was Copied!"
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
              <div>
                <span>{text}</span>
              </div>
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
