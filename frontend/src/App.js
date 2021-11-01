
import { useState } from "react";
import Dashboard from "./containers/Dashboard.js";
import Login from "./containers/Login.js";

function App() {
  const [user, setUser] = useState();
  const [previousUser, setPreviousUser] = useState();

  const login = (username) => {
    setUser(username);
    setPreviousUser(username);
  };

  return (
    <div>
      {
        user ?
          (<Dashboard {...{ user, setUser }} />) :
          (<Login {...{ user, previousUser, login }} />)
      }
    </div>
  );
}

export default App;
