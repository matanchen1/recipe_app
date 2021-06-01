import React, { useState } from "react";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Alert
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function NavBar() {
    const { currentUser, logout, fetchData, recipes} = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    async function handleLogout() {
        setError("");

        try {
            await logout();
            history.push("/");
        } catch (err) {
            setError("Failed to Logout, " + err.message);
        }
    }

    async function testGettingRecipes() {
        setError("");
        try {
            await fetchData();
            // while(!recipes) {}
            console.log(recipes);
        } catch (err) {
            setError(err.message);
        }
    }

    function handleLogoClick() {
        if (currentUser) {
            history.push("/main");
        }
        else {
            history.push("/");
        }
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="sticky-top">
                <Navbar.Brand onClick={handleLogoClick}>Grandma Cooked Oatmeal</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/*             <Nav.Link href="#home">Add Recipe</Nav.Link>
            <Nav.Link href="#link">Invite Family User</Nav.Link> */}
                    </Nav>
                    {currentUser && <strong>User: </strong>}
                    {currentUser && currentUser.email}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser && <Button className="ml-sm-2" onClick={handleLogout}>Logout</Button>}
                    {currentUser && <Button className="ml-sm-2" onClick={testGettingRecipes}>Log Recipes To Console</Button>}
                    {/*<Form inline>*/}
                    {/*    <FormControl*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Search For Recipe"*/}
                    {/*        className="m-sm-2"*/}
                    {/*    />*/}
                    {/*    <Button variant="outline-success">Search</Button>*/}
                    {/*</Form>*/}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
