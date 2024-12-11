import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Layout from "../components/Layout";
import NotFoundPage from "../components/NotFoundPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
