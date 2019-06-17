import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import TodoItem from '../components/TodoItem';
import { fetchItemsRequest, editTodo } from '../actions/index';

class Todo extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const { todoLists } = this.props
        return (
            <TodoList>
                {this.todoList(todoLists)}
            </TodoList>
        );
    }

    todoList = (Items) => {
        return Items.map((value, index) => {
            return (
                <TodoItem key={index}
                    index={index}
                    Items={value}
                    takeItem={this.props.editTodo}
                />
            )
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        todoLists: state.todoLists
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => {
            dispatch(fetchItemsRequest());
        },
        editTodo: (id) => {
            dispatch(editTodo(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);