const InitialState = {}

const editTodo = (state = InitialState, action) => {
    switch (action.type) {
        case 'editTodo':
            return action.item;
        default:
            return state
    }
}

export default editTodo;