import moment from "moment";
import Box from "@mui/material/Box";

const styles = {
  box: {
    color: "text.secondary",
  },
};

export default function Dates({ createdAt, updatedAt }) {
  return (
    <Box sx={styles.box}>
      <div>Created at {moment(createdAt).fromNow()}</div>
      <div>Updated at {moment(updatedAt).fromNow()}</div>
    </Box>
  );
}
