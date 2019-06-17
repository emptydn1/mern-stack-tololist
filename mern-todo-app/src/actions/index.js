import callApi from '../utils/apiCaller.js';

export const fetchItemsRequest = () => dispatch => callApi('/', 'GET', null)
    .then(res =>
        dispatch({
            type: 'fetchData',
            data: res.data
        })
    )
    .catch(err => {
        console.log(err);
    })

export const addTodo = (data) => dispatch => callApi('/add', 'POST', data)
    .then(res =>
        dispatch({
            type: 'addTodo',
            item: res.data
        })
    )
    .catch(err => {
        console.log(err);
    })

    //fetch data to fix
export const editTodo = (id) => dispatch => callApi(`/edit/${id}`, 'GET', null)
    .then(res =>
        dispatch({
            type: 'editTodo',
            item: res.data
        })
    )
    .catch(err => {
        console.log(err);
    })

export const updateTodo = (data) => dispatch => callApi(`/update/${data._id}`, 'POST', data)
    .then(res =>
        dispatch({
            type: 'update',
            data: res.data
        })
    )
    .catch(err => {
        console.log(err);
    })

export const deleteTodo = (id) => dispatch =>  callApi(`/delete${id}`, 'POST', id)
    .then(res =>
        dispatch({
            type: 'delete',
            id: id
        })
    )
    .catch(err => {
        console.log(err);
    })


