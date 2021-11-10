
import { Button, Container, Input } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function Login({ user, previousUser, login: _login, register: _register }) {
  const [ username, setUsername ] = useState(previousUser);

  const login = () => {
    if (username === "") return;
    _login(username);
  };

  const register = () => {
    if (username === "") return;
    _register(username);
  };

  const handleKeyLogin = e => {
    if (e.key === 'Enter') login();
  };

  const handleKeyRegister = e => {
    if (e.key === 'Enter') register();
  };

  return (
    <Container>
      <Box m={2}>
        <div onKeyDown={handleKeyLogin}>
          <Input placeholder="username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
          <Button variant="contained" onClick={login}>Login</Button>
        </div>
      </Box>
      <Box m={2}>
        <div onKeyDown={handleKeyRegister}>
          <Input placeholder="username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
          <Button variant="contained" onClick={register}>Register</Button>
        </div>
      </Box>
    </Container>
  );
}

export default Login;