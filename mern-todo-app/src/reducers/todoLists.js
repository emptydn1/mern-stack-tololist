const initialState = [];

const todoLists = (state = initialState, action) => {
    switch (action.type) {
        case 'fetchData':
            return action.data;
        case 'addTodo':
            return [...state, action.item];
        case 'delete':
            let id = findId(action.id, state);
            let newState = state.filter((value, index) => index !== id)
            return newState;
        case 'update':
            let index = findId(action.data._id, state);
            // console.log(action.data);
            if(index !== -1)
                state[index] = action.data;
            return [...state];
        default:
            return state
    }
}

let findId = (id, product) => {
    for (let i = 0; i < product.length; i++) {
        if(product[i]._id === id){
            return i;
        }
    }
    return -1;
}

export default todoLists;