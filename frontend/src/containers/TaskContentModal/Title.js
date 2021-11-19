import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const Title = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& input": {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
      backgroundColor: "rgba(0, 0, 0, 0.09)",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
