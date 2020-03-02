import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
});

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
    /*
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
    }*/
    const { classes } = this.props;

    return (
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavigationBar);
