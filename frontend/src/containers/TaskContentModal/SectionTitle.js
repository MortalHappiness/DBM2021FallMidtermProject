import Typography from "@mui/material/Typography";

export default function SectionTitle({ title }) {
  return (
    <Typography
      sx={{ marginTop: "10px" }}
      variant="subtitle1"
      gutterBottom
      component="div"
    >
      {title.toUpperCase()}
    </Typography>
  );
}
