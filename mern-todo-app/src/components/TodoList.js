import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class TodoList extends Component {
    render() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </Table>
        );
    }
}

export default TodoList;