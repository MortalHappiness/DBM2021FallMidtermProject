import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard.js";
import Login from "./containers/Login.js";

function App() {
  const [user, setUser] = useState();
  const [previousUser, setPreviousUser] = useState();

  const login = (username) => {
    setUser(username);
    setPreviousUser(username);
  };

  const register = (username) => {
    // TODO: add user
    setUser(username);
    setPreviousUser(username);
  };

  return (
    <Router>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function IndexPage() {
  return <h1>hi</h1>;
}

function NotFound() {
  return "Not Found";
}

export default App;
