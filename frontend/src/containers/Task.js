
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Task({ exit, taskId }) {
  // TODO fetch task
  const task = {
    id: taskId,
    title: `fake task title ${taskId}`,
    content: `fake task content ${taskId}`,
    comments: [
      { content: "comment 1" },
      { content: "comment 2" },
      { content: "comment 3" },
      { content: "comment 4" },
    ]
  };

  const removeTask = () => {
    // TODO
    exit();
  };

  const deleteComment = (comment) => {
    // TODO
  };

  return (
    <Box>
      <Box>
        <Box mx={2} sx={{ display: 'inline' }}>
          <Button size="small" onClick={exit}>
            Return to task list
          </Button>
        </Box>
        <Box mx={2} sx={{ display: 'inline' }}>
          <Button size="small" onClick={removeTask}>
            Remove Task
          </Button>
        </Box>
      </Box>
      <Box>
        id: {task.id}
      </Box>
      <Box>
        <h2> {task.title} </h2>
      </Box>
      <Box>
        {task.content}
      </Box>
      <Box>
        <MuiCard variant="outlined" sx={{ minWidth: 275, m: 2 }}>
          {
            task.comments.map(comment => (
              <Grid
                sx={{ justifyContent: "space-between", alignItems: "center" }}
                container 
                spacing={24}
              >
                <Grid item>
                  <CardContent>
                    <Typography variant="body2">
                      {comment.content}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item>
                  <Button onClick={() => deleteComment(comment)}>
                    Delete comment
                  </Button>
                </Grid>
              </Grid>
            ))
          }
          <Box>
            <TextField
              placeholder="comment!"
              multiline
              rows={3}
              rowsMax={100}
              sx={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
            />
            <br />
            <Button>
              Add Comment
            </Button>
          </Box>
        </MuiCard>
      </Box>
    </Box>
  );
}

export default Task;