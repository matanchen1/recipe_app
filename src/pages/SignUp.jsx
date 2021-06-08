import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

export default function SignUp({ setShowSignUp }) {
    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    const emailRef = useRef();
    const passRef = useRef();
    const passwordConfRef = useRef();
    const familyNameRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passRef.current.value !== passwordConfRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passRef.current.value, familyNameRef.current.value);
            // history.push("/");
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    //   here we'll add fancy things that send the info to the database
    //   Or, for the first milestome, send us to the next page
    return (
        <div id="signup">
            <h2>
                Start collecting <br /> family memories
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="family-name">
                    <Form.Control
                        type="text"
                        placeholder="Family Name"
                        ref={familyNameRef}
                        required
                    />
                </Form.Group>
                <Form.Group id="email">
                    {/*<Form.Label>Email</Form.Label> */}
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        required
                    />
                </Form.Group>
                <Form.Group id="password">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={passRef}
                        required
                    />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Control
                        type="password"
                        placeholder="Password Confirmation"
                        ref={passwordConfRef}
                        required
                    />
                </Form.Group>
                <Button disabled={loading} variant="success" type="submit">
                    Sign Up
                </Button>
            </Form>

            <Form.Text className="text-muted">
                Already have an account?
                <Button variant="link" size="sm" onClick={() => setShowSignUp(false)}>
                    Sign in
                </Button>
            </Form.Text>
            {/* We can see if the email is already signed up and let users
      know we signed them in/it's the wrong password. In this case the
      button should have a different kind of text*/}
        </div>
    );
}
