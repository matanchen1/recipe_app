import React, {useRef, useState} from 'react'
import "../styles/styles_GroupCode.css"

import {Button, Form, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";

export default function GroupCode({ setShowSignUp }) {
    const groupcodeRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(groupcodeRef.current.value);
            // history.push("/");
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div id="group-code">
            <h2>
                Get cooking
                <br />
                and connecting
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Group code"
                        ref={groupcodeRef}
                    />
                    <Form.Text className="text-muted">
                        Don't have a group code?
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => setShowSignUp(true)}
                        >
                            Sign up
                        </Button>{" "}
                        to create a family recipe book
                    </Form.Text>
                </Form.Group>
                <Button disabled={loading} variant="success" type="submit">
                    Enter to see and create
                </Button>
            </Form>

        </div>
    );
}
//
