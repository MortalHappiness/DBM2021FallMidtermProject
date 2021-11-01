
import { Button, Input } from "@mui/material";
import { useState } from "react";

function Login({ user, previousUser, login: _login }) {
  const [ username, setUsername ] = useState(previousUser);

  const login = () => {
    if (username === "") return;
    _login(username);
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') login();
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <Input placeholder="username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
      <Button variant="contained" onClick={login}>Login</Button>
    </div>
  );
}

export default Login;