import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ActionsTodo from './containers/ActionsTodo';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Todo from './containers/Todo';

const title = {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10
}

class App extends Component {
    render() {
        return (
            <Router>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="col-10">
                            <Row className="text-center">
                                <Col style={title}>Mern-Stack Todo App</Col>
                            </Row>
                            <Row className="mb-4">
                                <Navbar bg="light" variant="light">
                                    <Nav className="mr-auto" style={{ fontWeight: 'bold' }}>
                                        <NavLink style={{ textDecoration: 'none' }} className="m-2" to="/">HOME</NavLink>
                                        <NavLink style={{ textDecoration: 'none' }} className="m-2" to="/add">ADD</NavLink>
                                    </Nav>
                                </Navbar>
                            </Row>

                            <Route path="/" exact component={Todo} />
                            <Route path="/edit/:id" component={ActionsTodo} />
                            <Route path="/add" component={ActionsTodo} />
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}


export default App;
