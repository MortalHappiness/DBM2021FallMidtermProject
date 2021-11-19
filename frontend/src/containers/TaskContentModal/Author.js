import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

import SectionTitle from "./SectionTitle";

const styles = {
  box: {
    color: "text.primary",
  },
};

export default function Author({ author }) {
  return (
    <Box sx={styles.box}>
      <SectionTitle title="author" />
      <Chip avatar={<Avatar>{author[0]}</Avatar>} label={author} />
    </Box>
  );
}
