import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard.js";
import Login from "./containers/Login.js";

function App() {
  const [user, setUser] = useState();
  const [previousUser, setPreviousUser] = useState();

  const login = (username) => {
    // TODO: check user exist
    setUser(username);
    setPreviousUser(username);
    window.location.replace("/dashboard");
  };

  const register = (username) => {
    // TODO: add user
    setUser(username);
    setPreviousUser(username);
    window.location.replace("/dashboard");
  };

  return (
    <Router>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route exact path="/login" element={<Login {...{ user, previousUser, login, register }} />} />
        <Route exact path="/dashboard" element={<Dashboard {...{ user }} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function IndexPage() {
  return window.location.replace("/login");
}

function NotFound() {
  return "Not Found";
}

export default App;
