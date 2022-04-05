import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import PrivateRoute from './PrivateRoute'
import React from 'react'
import Register from "../pages/Register";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AppRoutes
