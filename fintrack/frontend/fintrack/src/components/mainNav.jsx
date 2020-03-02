import React, { Component } from "react";
import "../style/mainNav.css";
import { Link } from "react-router-dom";
import axios from "axios";

class NavigationBar extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      redirect: false,
      redirectTo: ""
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signOut() {
    axios
      .get("/signout")
      .then(response => {
        if (response.status === 200) {
          document.location.href = "/";
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  signIn(event) {
    axios
      .post("/signin", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 200) {
          document.location.href = "/dashboard";
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
    //let logo = <div className="signin_button"></div>;
    //let status = this.props.isauth ? "Logged in" : "Not logged in";
    let element = null;
    let home_url = "/";
    if (this.props.isauth) {
      element = (
        <div className="user_access">
          <div className="signout_button" onClick={this.signOut}>
            Sign out
          </div>
        </div>
      );
      home_url = "/dashboard";
    } else {
      element = (
        <div className="login_signup">
          <form className="login_form">
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <div className="login_button" onClick={this.signIn}>
              Login
            </div>
          </form>
          <Link className="signup_button" to="/signup">
            Sign up
          </Link>
        </div>
      );
    }
    return (
      <div id="nav">
        <Link to={home_url}>
          <div className="fintrack_logo"></div>
        </Link>
        {element}
      </div>
    );
  }
}

export default NavigationBar;
