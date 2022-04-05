import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from 'react'

import { AuthContext } from '../contexts/AuthProvider';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify';

const Login = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                authContext.setUser(res.user);
                console.log(res, 'res')
                toast.success('Login successful');
                navigate("/");
            })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message);
            });
    }

    return (
        <div className="container">
            <div className='d-flex justify-content-center'>
                <div className="col-4">
                    <h4 className="mt-4">Login</h4>
                    <form className="my-4" onSubmit={login}>
                        <div className="form-group mt-4">
                            <label>Email</label>
                            <input type="email" className="form-control shadow" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="form-group mt-4">
                            <label>Password</label>
                            <input type="password" className="form-control shadow" id="inputPassword" placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        <button type="submit" className="btn btn-primary shadow mt-4">Login</button>
                        <p className="mt-3">Create an account <Link to={{ pathname: '/signup', }}>Signup</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
