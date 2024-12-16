import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import Layout from "../components/Layout";
import NotFoundPage from "../components/NotFoundPage";
import AccommodationTypePage from "../features/accommodationType/AccommodiationTypePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route path="/accommodationType" element={<AccommodationTypePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
