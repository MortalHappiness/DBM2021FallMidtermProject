import { useState } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { UPDATE_TASK_MUTATION, CREATE_COMMENT_MUTATION } from "../../graphql";
import UsernameAvatar from "../../components/UsernameAvatar";

function Comment({ comment }) {
  return (
    <Stack direction="row" spacing={2}>
      <UsernameAvatar username={comment.author.displayName} />
      <Stack>
        <Stack direction="row" spacing={2} sx={{ color: "text.secondary" }}>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {comment.author.displayName}
          </Typography>
          <Typography variant="subtitle1" component="div" gutterBottom>
            {moment(comment.commentedAt).fromNow()}
          </Typography>
        </Stack>
        {comment.content}
      </Stack>
    </Stack>
  );
}

function CreateCommentForm({ taskId }) {
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: ["GetTaskQuery"],
  });
  const [content, setContent] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    await createComment({ variables: { data: { taskId, content } } });
    setContent("");
    setShowSubmit(false);
  };
  const handleCancel = () => {
    setContent("");
    setShowSubmit(false);
  };

  return (
    <>
      <TextField
        label="Add a comment"
        value={content}
        onChange={handleChange}
        onFocus={() => setShowSubmit(true)}
        fullWidth
        multiline
      />
      {showSubmit && (
        <Box
          sx={{
            marginTop: "5px",
            color: "text.secondary",
            display: "flex",
            gap: "5px",
          }}
          edge="end"
        >
          <Button
            size="small"
            type="submit"
            variant="contained"
            disabled={false}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            size="small"
            type="cancel"
            color="inherit"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      )}
    </>
  );
}

export default function Comments({ taskId, comments }) {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
        Comments
      </Typography>
      <CreateCommentForm taskId={taskId} />
      <Stack spacing={2} sx={{ mt: 3 }}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Stack>
    </>
  );
}
