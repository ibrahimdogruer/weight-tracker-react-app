import { Navigate, Route } from "react-router-dom";
import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { authenticated, loadingAuthState } = useContext(AuthContext);

    if (loadingAuthState) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (authenticated) {
        return children
    }

    return <Navigate to="/login" />
}

export default PrivateRoute
