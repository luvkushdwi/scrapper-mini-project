import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComplexNavbar } from "./components/ComplexNavbar";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import News from "./components/News";
import MyNews from "./components/MyNews";

function App() {

  return (
    <>
      <BrowserRouter>
        <ComplexNavbar/>
        <Routes>
          <Route path="/" element={<News/>} />
          <Route path="/my-news" element={<MyNews/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
