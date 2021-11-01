
import { Button, Input } from "@mui/material";
import { useState } from "react";

function Login({ user, setUser }) {
  const previousUser = user.previous ? user.previous : "";
  const [ username, setUsername ] = useState(previousUser);

  const UpdateUser = () => {
    setUser({ current: username, previous: username });
  };

  return (
    <div>
      <Input placeholder="username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
      <Button variant="contained" onClick={UpdateUser}>Login</Button>
    </div>
  );
}

export default Login;