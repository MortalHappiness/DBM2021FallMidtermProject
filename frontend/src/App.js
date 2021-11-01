
import { useState } from "react";
import Dashboard from "./containers/Dashboard.js";
import Login from "./containers/Login.js";

function App() {
  const [user, setUser] = useState({ current: undefined, previous: undefined });
  console.log('user', user);

  return (
    <div>
      {
        user.current ?
        (<Dashboard user={user.current} setUser={setUser} />) :
        (<Login user={user} setUser={setUser} />)
      }
    </div>
  );
}

export default App;
