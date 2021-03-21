
import React, { useContext, useState } from 'react';
import { Form,Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext, UserInfoContext } from '../../App';
import './Login.css';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const credential = result.credential;
            const token = credential.accessToken;
            const {displayName,email,photoURL} = result.user;
            const loggedInUserInfo = {
                name : displayName,
                email : email,
                image : photoURL
            }
            setLoggedInUser(loggedInUserInfo);
            history.replace(from)
        })
        .catch((error) => {    
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential; 
        });
    }

    if (!firebase.apps.length) {
        firebase.initializeApp({});
     }else {
        firebase.app(); 
     }
     const [newUser, setNewUser] = useState(false);


     const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'name'){
            isFieldValid =  /^[a-zA-Z ]{2,30}$/.test(e.target.value);
        }
        if (e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password'){
            const isPasswordValid = e.target.value.length>6;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = {...loggedInUser};
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

     const handleSubmit = (e) => {
        if(newUser && loggedInUser.email && loggedInUser.password){
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then((userCredential) => {
                const newUserInfo = {...loggedInUser};
                newUserInfo.success = true;
                newUserInfo.error = '';
                setLoggedInUser(newUserInfo);
            })
            .catch((error) => {
                const errorMessage = error.message;
                const newUserInfo = {...loggedInUser};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo);
             });
        }
        if(!newUser && loggedInUser.email && loggedInUser.password){
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then((userCredential) => {
                const newUserInfo = {...loggedInUser};
                newUserInfo.success = true;
                newUserInfo.error = '';
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                const errorMessage = error.message;
                const newUserInfo = {...loggedInUser};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo);
            });
        }
        e.preventDefault();
     }

    return (
        <div className="container text-center d-flex justify-content-center mt-5 bg-light">
            <div className="mt-5 mb-5 rounded">
                <h3>{newUser ? 'Sign Up' : 'Login'}</h3>
                <Form className="mb-3" onSubmit={handleSubmit}>
                    <p className="error-text">{loggedInUser.error}</p>
                    {loggedInUser.success && <p className="success-text">User {newUser ? 'created' : 'Logged In'} successfully</p>}
                    <Form.Group controlId="formBasicName">
                        {newUser && <Form.Control type="text" name="name" onBlur={handleBlur} placeholder="Enter your name" />}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" name="email" onBlur={handleBlur} placeholder="Enter your email" required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
                    </Form.Group>
                    <Button variant="primary" block type="submit">
                        {newUser ? 'Sign Up' : 'Login'}
                    </Button>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Create an account" onChange={() => setNewUser(!newUser)}/>
                    </Form.Group>
                </Form>
                <Button variant="outline-info" className="mb-1 pl-4 pr-4" onClick={handleGoogleSignIn}>Continue with Google</Button>
            </div>
        </div>
    );
};

export default Login;