import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuth } from "../Auth";

function NavBar() {
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth);

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
              onClick={() => navigate("/profile")}
            >
              <AccountCircleIcon />
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
