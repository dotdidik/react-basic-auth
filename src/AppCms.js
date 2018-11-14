import React from 'react';
import store from 'store';
import isLoggedIn from './helpers/is_logged_in';
import { Redirect } from 'react-router-dom';


export default class AppCms extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = (e) => {
        store.remove('loggedIn');
        this.props.history.push('/login')
    }

    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />
        }
        return (
            <div>
                you are logged in

                <button onClick={e=>this.handleLogout(e)}>Logout</button>
            </div>
        )
    }
}
