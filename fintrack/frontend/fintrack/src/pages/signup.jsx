import React, { Component } from "react";
import axios from "axios";
import "../style/signup_form.css";

class SignupPage extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: ""
    };
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signup(event) {
    axios
      .post("/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 200) {
          document.location.href = "/";
        }
      })
      .catch(error => {
        console.log("error", error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="signup_body">
        <form className="signup_form">
          <div className="create_act_header">Create an account</div>
          <input
            type="text"
            name="email"
            placeholder="Enter a valid email"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Enter a username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter a password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button
            className="create_acc_button"
            id="signup"
            name="action"
            onSubmit={this.signup}
          >
            Create Account
          </button>
        </form>
      </div>
    );
  }
}

export default SignupPage;
