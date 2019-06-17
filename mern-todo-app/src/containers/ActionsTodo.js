import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addTodo, updateTodo, deleteTodo } from '../actions/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class ActionsTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: '',
            responsible: 'none',
            priority: 'Medium',
            status: '',
            preStatus: '',
            endDate: new Date(),
            completed: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.editTodo) {
            const { editTodo } = nextProps
            this.setState({
                _id: editTodo._id,
                description: editTodo.description,
                responsible: editTodo.responsible,
                priority: editTodo.priority,
                status: editTodo.status,
                preStatus: editTodo.preStatus,
                startDate: editTodo.startDate,
                endDate: editTodo.endDate,
                completed: editTodo.completed
            });
        }
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { status, description, responsible, priority, _id, preStatus, endDate, completed, startDate } = this.state;

        const newTodo = {
            _id,
            description,
            responsible,
            priority,
            status,
            preStatus,
            startDate,
            endDate,
            completed
        }
        // console.log(newTodo);
        if (_id)
            this.props.updateTodo(newTodo);
        else {
            this.props.addTodo(newTodo);
        }
        this.props.history.goBack();
    }

    deleteListHandle = () => {
        this.props.deleteTodo(this.state._id);
        this.props.history.goBack()
    }

    handleClick = (e) => {
        let target = e.target;
        let value = target.value;
        console.log(value);
        this.setState({
            preStatus: value
        });
    }

    handleChange2 = (date) => {
        if (Date.parse(new Date(date)) < Date.now()) {
            alert("date > date.now()")
            this.setState({
                endDate: new Date()
            });
        }
        this.setState({
            endDate: date
        });
    }

    handleCheckBox = () => {
        if(this.state.completed === true){
            this.setState({
                completed: !this.state.completed,
                status: '#1e7e34'
            });
        }
        else{
            this.setState({
                completed: !this.state.completed,
            });
        }
    }

    render() {
        const { description, responsible, priority, _id, endDate, completed } = this.state;
        // console.log(this.state);

        return (
            <Container fluid={true}>
                <Row className="justify-content-md-center">
                    <h2>{_id ? 'UPDATE' : 'ADD'}</h2>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="description"
                                    value={description}
                                    name="description"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Responsible</Form.Label>
                                <Form.Control type="text" placeholder="responsible"
                                    value={responsible}
                                    name="responsible"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control defaultValue={priority} as="select" name="priority" onChange={this.handleChange}>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </Form.Control>
                            </Form.Group>

                            <ButtonGroup className="mb-4" aria-label="Basic example" style={{ display: 'block' }} onClick={this.handleClick}>
                                <Button variant="secondary" value="#5a6268">Normal</Button>
                                <Button variant="warning" value="#ffc107">Warning</Button>
                                <Button variant="danger" value="#bd2130">Danger</Button>
                                {_id ? <Button variant="dark" onClick={this.deleteListHandle}>Delete</Button> : ''}
                            </ButtonGroup>

                            <Form.Group controlId="formBasicChecbox">
                                <Form.Check type="checkbox" checked={completed} onChange={this.handleCheckBox} label="completed" />
                            </Form.Group>

                            <Button style={{ display: 'inline-block' }} variant="primary" type="submit">Submit</Button>
                            <Button variant="dark" className="ml-4" onClick={() => this.props.history.goBack()}>Cancel</Button>
                        </Form>
                    </Col>
                    <Col className="mt-0 col-5 ml-auto">
                        <Form.Label style={{ display: 'block' }}>Date Time</Form.Label>
                        <DatePicker
                            selected={new Date(endDate)}
                            onChange={this.handleChange2}
                            showTimeSelect
                            timeFormat="kk:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy kk:mm"
                            timeCaption="time"
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editTodo: state.editTodo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTodo: (data) => {
            dispatch(addTodo(data));
        },
        updateTodo: (data) => {
            dispatch(updateTodo(data));
        },
        deleteTodo: (id) => {
            dispatch(deleteTodo(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsTodo)