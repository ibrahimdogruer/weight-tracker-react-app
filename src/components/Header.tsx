import React, { useContext } from 'react'

import { AuthContext } from '../contexts/AuthProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { authenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (event: any) => {
        event.preventDefault();

        await signOut(auth)
            .then(res => {
                navigate("/login");
            })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">Weight Tracker App</a>
                {authenticated &&
                    <div className="d-flex align-items-center">
                        <p className="text-white me-3 mb-0">{user?.email}</p>
                        <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>Logout</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Header
