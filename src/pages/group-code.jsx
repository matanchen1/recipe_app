import React, {useRef, useState} from 'react'
import App from "../App"
import "../styles/styles.css"

import { Button, Form, FormGroup, FormControl } from "react-bootstrap";

export default function GroupCode({ setShowSignUp }) {

    return (
        <div id="group-code">
            <h2>
                Get cooking
                <br />
                and connecting
            </h2>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Group code" />
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
            </Form>
            <Button variant="success">Enter to see and create</Button>
        </div>
    );
}
//
