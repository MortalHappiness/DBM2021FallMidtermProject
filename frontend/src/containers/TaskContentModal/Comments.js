import moment from "moment";
import { useMutation } from "@apollo/client";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { UPDATE_TASK_MUTATION } from "../../graphql";
import UsernameAvatar from "../../components/UsernameAvatar";

function Comment({ comment }) {
  console.log(comment);
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

export default function Comments({ taskId, comments }) {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
        Comments
      </Typography>
      <Stack spacing={2}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Stack>
    </>
  );
}
