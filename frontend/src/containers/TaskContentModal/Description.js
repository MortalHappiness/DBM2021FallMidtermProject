import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const Description = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      backgroundColor: "rgba(0, 0, 0, 0.09)",
    },
  },
}));
