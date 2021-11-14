import { Paper } from "@mui/material";
import Draggable from "react-draggable";

export function getDraggablePaperComponent(label_id) {
  return function PaperComponent(props) {
    return (
      <Draggable
        handle={`#${label_id}`}
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }
}

