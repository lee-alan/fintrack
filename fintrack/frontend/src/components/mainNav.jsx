import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../style/mainNav.css";
import "../style/main.css";

const drawerWidth = 240;

// Style from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard/Dashboard.js
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

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    axios
      .post("/api/user/signout")
      .then(response => {
        if (response.status === 200) {
          document.location.href = "/";
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    //let logo = <div className="signin_button"></div>;
    //let status = this.props.isauth ? "Logged in" : "Not logged in";
    let login_el = "";
    let signup_el = "";
    let signout_el = "";
    const SignUpButton = withStyles({
      root: {
        fontSize: 16,
        padding: "6px 12px",
        lineHeight: 1.5,
        backgroundColor: "#007bff",
        borderColor: "#007bff",
        marginLeft: "5px",
        "&:hover": {
          backgroundColor: "#0069d9",
          borderColor: "#0062cc",
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none",
          backgroundColor: "#0062cc",
          borderColor: "#005cbf"
        },
        "&:focus": {
          boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
        }
      }
    })(Button);

    if (!this.props.isauth) {
      login_el = (
        <Link className="no_text_decor" to="/login">
          <Button color="inherit">Login</Button>
        </Link>
      );
      signup_el = (
        <Link to="/signup" className="no_text_decor">
          <SignUpButton variant="contained" color="primary">
            Sign up
          </SignUpButton>
        </Link>
      );
    } else {
      signout_el = (
        <SignUpButton
          className="no_text_decor"
          onClick={this.signOut}
          variant="contained"
          color="primary"
        >
          Sign out
        </SignUpButton>
      );
    }
    const { classes } = this.props;

    return (
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link to="/" className="no_text_decor link">
              FinTrack
            </Link>
          </Typography>
          {login_el}
          {signup_el}
          {signout_el}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavigationBar);
