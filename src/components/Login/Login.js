
import React, { useContext } from 'react';
import { Form,Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
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
        firebase.app(); // if already initialized, use that one
     }

    return (
        <div className="container text-center d-flex justify-content-center mt-5 bg-light">
            <div className="mt-5 mb-5 rounded">
                <h3>Login</h3>
                <Form className="mb-3">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" block type="submit">
                        Submit
                    </Button>
                    <p>Don't have an account? <a href="">Create an account</a></p>
                </Form>
                <Button variant="outline-info" className="mb-1 pl-4 pr-4" onClick={handleGoogleSignIn}>Continue with Google</Button>
                <br/>
                <Button variant="outline-info" className="pl-3 pr-3">Continue with Facebook</Button>
            </div>
        </div>
    );
};

export default Login;