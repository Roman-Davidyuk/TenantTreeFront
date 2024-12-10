import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../components/auth/Register";
import Login from "../components/auth/Login";


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;