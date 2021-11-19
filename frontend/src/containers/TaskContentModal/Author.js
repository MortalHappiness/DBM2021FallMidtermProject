import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UsernameAvatar from "../../components/UsernameAvatar";

const styles = {
  box: {
    color: "text.primary",
  },
  username: {
    display: "inline-flex",
    gap: "5px",
    alignItems: "center",
    marginTop: "0 10px 0 0",
    padding: "8px",
    borderRadius: "4px",
    background: "rgb(235, 236, 240)",
  },
};

export default function Author({ author }) {
  return (
    <Box sx={styles.box}>
      <Typography variant="subtitle1" gutterBottom component="div">
        AUTHOR
      </Typography>
      <Box sx={styles.username}>
        <UsernameAvatar size={28} username={author} />
        <div>{author}</div>
      </Box>
    </Box>
  );
}
