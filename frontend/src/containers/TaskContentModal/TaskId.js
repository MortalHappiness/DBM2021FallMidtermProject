import Typography from "@mui/material/Typography";

export default function TaskId({ taskId }) {
  return (
    <Typography
      variant="subtitle2"
      component="div"
      gutterBottom
      sx={{ color: "primary.main" }}
    >
      {`TASK-${taskId}`}
    </Typography>
  );
}
