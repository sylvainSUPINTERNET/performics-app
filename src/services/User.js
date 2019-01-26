import React, {Component} from 'react';
import axios from 'axios';
import {ClipLoader} from "react-spinners";

// Add user
export class FormNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }; // inputs values

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.success = this.success.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    success(user_id) {
        this.setState({loading: false});
        return this.props.history.push(`/users/${user_id}`)
    }

    handleSubmit(event) {
        this.setState({
            loading: true
        });
        event.preventDefault();

        let username = this.state.form_username;
        let email = this.state.form_email;
        let statut = this.state.form_statut;
        let annee = this.state.form_annee;

        const headers = {
            "Content-Type": "application/json",
        };

        axios
            .post(`http://localhost:5000/api/v1/users`, {
                username: username,
                email: email,
                statut: statut,
                annee: annee

            }, headers)
            .then(res => {
                setTimeout(() => this.success(res.data.data.id)
                    , 600);

            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="text-center mt-5">
                    <ClipLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
            );
        } else {
            return (
                <div className="container jumbotron">
                    <div className="display-4">Add new user</div>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="form_username">Username</label>
                            <input type="text" className="form-control" id="form_username"
                                   placeholder="username"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="form_email">Email</label>
                            <input type="email" className="form-control" id="form_email"
                                   placeholder="email" onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="form_email">Annee</label>
                            <input type="text" className="form-control" id="form_annee"
                                   placeholder="annee" onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="form_email">Statut (0 or 1)</label>
                            <input className="form-control" type="number" min="0" max="1" id="form_statut"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success btn-lg">Confirmed</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

// Show user for :id
export class ShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {}
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/users/${this.props.match.params.id}`)
            .then(res => {
                const user = res.data.data;
                this.setState({user: user});
                setTimeout(() => this.setState({loading: false})
                    , 600);

            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="card">
                    <img className="card-img-top" src="http://lorempixel.com/400/200/cats/" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.user.username}</h5>
                        <div className="card-text">
                            <ul>
                                <li>{this.state.user.email}</li>
                                <li>{this.state.user.statut}</li>
                                <li>{this.state.user.annee}</li>
                                <li>{this.state.user.created_at}</li>
                            </ul>
                        </div>
                        <a href="/" className="btn btn-primary">Go back</a>
                    </div>
                </div>
            </div>
        )
    }


}

