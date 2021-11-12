import { useMutation } from "@apollo/client";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard.js";
import Login from "./containers/Login.js";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "./graphql/mutations.js";

function App() {
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [previousUsername, setPreviousUsername] = useState();

  const [ backendLogin ] = useMutation(LOGIN_MUTATION);
  const [ backendRegister ] = useMutation(REGISTER_MUTATION);

  const login = (username) => {
    backendLogin({ variables: { username, password: '123' } }).then(result => {
      // TODO: I need a ID
      // TODO: maybe store session
      setUsername(username);
      setUserId(2);
      setPreviousUsername(username);
      console.log('logined', username);
    }).catch(e => {
      console.error("login failed");
    });
  };

  const register = (username) => {
    backendRegister({ variables: { username, password: '123' } }).then(result => {
      return login(username);
    }).catch(e => {
      console.error("register failed", e);
    });
  };

  const logout = () => {
    setUsername(undefined);
    setUserId(undefined);
    document.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route exact path="/login" element={<Login {...{ username, previousUser: previousUsername, login, register }} />} />
        <Route exact path="/dashboard" element={<Dashboard {...{ logout, username, userId }} />} />
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
