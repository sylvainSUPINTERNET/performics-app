import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

import {ClipLoader} from 'react-spinners';

class App extends Component {
    state = {
        users: [],
        loading: true,
    };

    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/users`)
            .then(res => {
                const users = res.data.data;
                this.setState({users: users});
                setTimeout(() => this.setState({loading: false})
                    , 600);

            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        const show_route =  '/users/';
        return (
            <div>
                <div className="container">
                    <h1>Users list</h1>
                    <ul className="list-group m-3">
                        {this.state.users.map(function (user) {
                            return <div>
                                <li key={user.id} className="list-group-item m-1 active">{user.username}</li>
                                <ul>
                                    <li>{user.email}</li>
                                    <li>{user.statut}</li>
                                    <li>{user.annee}</li>
                                    <li>{user.created_at}</li>
                                    <li><a href={show_route + user.id}>see {user.username} 's profile</a></li>
                                </ul>
                            </div>
                        })}
                    </ul>
                    <div className="text-center mt-5">
                        <ClipLoader
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={this.state.loading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
