import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Singup";
import Home from "./components/home/Home";
import { auth } from "./firebase/config";
import Login from "./components/auth/Login";

const App = () => {
  const [user, setUser] = useState(null);

  const unsubscribe = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Navigate  to="/login" />} />
        <Route path="/signup" element={ !user ? <Signup /> :  <Navigate  to="/" />} />
        <Route path="/login" element={ !user ? <Login /> :  <Navigate  to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
