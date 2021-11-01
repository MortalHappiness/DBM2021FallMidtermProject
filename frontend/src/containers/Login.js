
import { Button, Input } from "@mui/material";
import { useState } from "react";

function Login({ user, previousUser, login }) {
  const [ username, setUsername ] = useState(previousUser);

  return (
    <div>
      <Input placeholder="username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
      <Button variant="contained" onClick={e => login(username)}>Login</Button>
    </div>
  );
}

export default Login;