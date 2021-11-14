import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";

import { useAuth } from "../Auth";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

function stringAvatar(name) {
  const nameSplit = name.split(" ");
  const first = nameSplit[0][0];
  const second = nameSplit.length >= 2 ? nameSplit[1][0] : "";
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: first + second,
  };
}

function NavBar() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meow
          </Typography>
          {Boolean(auth.user) ? (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/dashboard")}
            >
              <Avatar {...stringAvatar(auth.user.displayName)} />
              <Typography variant="h6" component="div">
                {auth.user.displayName}
              </Typography>
            </IconButton>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
