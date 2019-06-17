import {combineReducers} from 'redux';
import todoLists from './todoLists';
import editTodo from './editTodo';

const appReducers = combineReducers({
    todoLists,
    editTodo
});

export default appReducers;