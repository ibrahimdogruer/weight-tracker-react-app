import React, { useContext, useState } from 'react'
import { Timestamp, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

import { AuthContext } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import firebaseAuth from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import validator from 'validator'

const Register = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
        var email = e.target.value
        setEmail(email)

        if (validator.isEmail(email)) {
            setEmailError('');
        } else {
            setEmailError('Email Invalid!')
        }
    }

    const isFormInvalid = (): boolean => {
        return email === '' || !validator.isEmail(email) || username === '' || password === '';
    }

    const register = async (e) => {
        e.preventDefault();

        if (!isFormInvalid()) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: firebaseAuth.UserCredential) => {
                    authContext.setUser(userCredential.user);
                    console.log('userCredential', userCredential);

                    setDoc(doc(db, "Users", userCredential.user!.uid), {
                        email: email,
                        username: username,
                    }).then(() => {
                        console.log('User created');
                        toast.success('You successfully register');
                        navigate("/");
                    }).catch(error => {
                        console.log(error.message);
                        toast.error(error.message);
                    });
                }).catch(error => {
                    console.log(error.message);
                    toast.error(error.message);
                });
        }
    }

    return (
        <div className="container">
            <div className='d-flex justify-content-center'>
                <div className="col-4">
                    <h4 className="mt-4">Register</h4>
                    <form className="my-4" onSubmit={register}>
                        <div className="form-group mt-4">
                            <label>Email</label>
                            <input type="email" className="form-control shadow" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter Email"
                                onChange={(e) => validateEmail(e)} value={email} required />
                            {emailError !== '' &&
                                <span className="text-danger small ms-2">
                                    {emailError}
                                </span>
                            }
                        </div>
                        <div className="form-group mt-4">
                            <label>Username</label>
                            <input type="text" className="form-control shadow" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)} value={username} required />
                        </div>
                        <div className="form-group mt-4">
                            <label >Password</label>
                            <input type="password" className="form-control shadow" id="inputPassword" placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </div>
                        <button type="submit" className="btn btn-primary shadow mt-4" disabled={isFormInvalid()}>Signup</button>
                        <p className="mt-3">Already have an account <Link to={{ pathname: '/login', }}>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register

