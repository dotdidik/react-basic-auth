import React from 'react';
import store from 'store';
import { Redirect } from 'react-router-dom';
import isLoggedIn from './helpers/is_logged_in';
import { Alert } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        const { history } = this.props;

        this.setState({ error: false });

        if (!(username === 'didik' && password === '12345')) {
            return this.setState({ error: true });
        }

        store.set('loggedIn', true);
        history.push('/cms');
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    render() {

        const { error } = this.state;

        if (isLoggedIn()) {
            return <Redirect to="/cms" />;
        }

        return (
            <div>
                <div>CMS | Login</div>
                <form error={error} onSubmit={this.onSubmit}>
                <div>Login</div>
                    {error && <Alert color="danger">
                        Salah password
                    </Alert>
                    }
                    <input
                        label="Username"
                        name="username"
                        onChange={this.handleChange}
                    />
                    <input
                        label="Password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Go!</button>
                </form>
            </div>
        );
    }

}

export default Login;
