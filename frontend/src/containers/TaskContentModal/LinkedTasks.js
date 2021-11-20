import { useMutation } from "@apollo/client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { UPDATE_TASK_MUTATION } from "../../graphql";
import TaskId from "./TaskId";

const styles = {
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkedTaskBox: {
    display: "flex",
  },
  linkedTaskBoxTitle: {
    marginLeft: "10px",
  },
};

export default function Comments({ taskId, tasks, blockedBy, blocks }) {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  console.log(tasks);
  console.log(blockedBy);
  console.log(blocks);

  return (
    <Box>
      <Box sx={styles.titleBox}>
        <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
          Linked Tasks
        </Typography>
        <div>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
      </Box>
      <Box>
        {blockedBy.length !== 0 && (
          <>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              Blocked By
            </Typography>
            <List dense>
              {blockedBy.map((task) => (
                <ListItem key={task.id} disablePadding>
                  <ListItemButton dense alignItems={"flex-start"}>
                    <ListItemText
                      primary={
                        <Box sx={styles.linkedTaskBox}>
                          <TaskId taskId={task.id} />
                          <Typography
                            sx={styles.linkedTaskBoxTitle}
                            variant="body2"
                            component="div"
                          >
                            {task.title}
                          </Typography>
                        </Box>
                      }
                      disableTypography
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
        {blocks.length !== 0 && (
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary", mt: 1 }}
          >
            Blocks
          </Typography>
        )}
      </Box>
    </Box>
  );
}
