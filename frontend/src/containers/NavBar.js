import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

import { useAuth } from "../Auth";
import UsernameAvatar from "../components/UsernameAvatar";

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
              <UsernameAvatar username={auth.user.displayName} />
              <Typography
                sx={{ marginLeft: "5px" }}
                variant="h6"
                component="div"
              >
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
