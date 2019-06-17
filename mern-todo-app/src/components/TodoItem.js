import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/check-double-solid.svg';
import ban from '../components/ban-solid.svg';
import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateTodo } from '../actions/index';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: '',
            prepare: '',
            status: ''
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            let t = Date.parse(new Date(this.props.Items.endDate)) - Date.now();
            let seconds = Math.floor((t / 1000) % 60);
            let minutes = Math.floor((t / 1000 / 60) % 60);
            let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            let obj = `${days > 0 ? (days + ' days, ') : ''}
                        ${hours > 0 ? (('0' + hours).slice(-2) + 'h, ') : ''}
                        ${minutes > 0 ? (('0' + minutes).slice(-2) + 'm, ') : ''}
                        ${seconds > 0 ? (('0' + seconds).slice(-2) + 's') : ''}`;
            this.setState({
                count: obj
            });

            if (t <= 0) {
                this.setState({
                    count: '',
                    prepare: ''
                });
                clearInterval(this.myInterval);
            }
            else if (t <= 90590443) {
                this.setState({
                    prepare: '( you should do it quickly )'
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    handleStatus = (e) => {
        let target = e.target;
        let value = target.value;
        let temp = value === "#1e7e34" ?
            { ...this.props.Items, status: '#1e7e34', startDate: new Date(), completed: true }
            :
            { ...this.props.Items, status: '#bd2130', startDate: new Date(), completed: true }
        console.log(temp);
        this.props.updateStatus(temp);
    }


    render() {
        const { Items, index } = this.props;
        const { count, prepare } = this.state;

        const blue = {
            backgroundColor: `${Items.completed === true ? (Items.status === '#bd2130' ? '#bd2130' : '#1e7e34') : Items.preStatus}`
        }

        const beta = {
            width: 30,
            height: 30,
            float: 'right'
        }
        // console.log(Items);
        return (
            <tr style={blue}>
                <td>
                    {index + 1}
                    {
                        Items.completed === true ?
                            (Items.status === '#bd2130' ? <img src={ban} style={beta} alt="" /> : <img src={logo} style={beta} alt="" />)
                            :
                            ''
                    }
                </td>
                <td>{Items.description}</td>
                <td>{Items.responsible}</td>
                <td>
                    {Items.priority}
                    <div style={{ display: 'block' }}>
                        <div style={{ display: 'inline-block' }}>
                            {Items.completed === true ? (Items.status === '#bd2130'? `${new Date(Items.startDate).toLocaleString()},  deadline : ${new Date(Items.endDate).toLocaleDateString()}`:`${new Date(Items.startDate).toLocaleString()},  deadline : ${new Date(Items.endDate).toLocaleDateString()}`): `${count} ${prepare}`}
                        </div>
                        {
                            Items.completed === false
                                ? <ButtonGroup className="mt-2" style={{ display: 'block' }} onClick={this.handleStatus}>
                                    <Button variant="outline-success" value="#1e7e34">Finish</Button>
                                    <Button className="ml-2" variant="outline-danger" value="#bd2130">Failure</Button>
                                </ButtonGroup> : ''
                        }
                    </div>
                </td>
                <td>
                    <Link to={`/edit/${Items._id}`} onClick={() => this.props.takeItem(Items._id)}>
                        Edit
                    </Link>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateStatus: (id) => {
            dispatch(updateTodo(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)