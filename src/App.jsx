import React from "react";
import Login from "./Login";
import Profile from "./Profile";
import Body from "./Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
