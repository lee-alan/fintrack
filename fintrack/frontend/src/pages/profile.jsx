import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MainTitle from "../components/pageTitle";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import UpdateProfileForm from "../components/profile/updateProfile";
import UpdatePasswordForm from "../components/profile/updatePassword";
import "../style/main.css";

const profile_img = require("../media/profile_image.png");
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  profile: {
    maxWidth: "200px"
  },
  mainGrid: {
    height: "600px"
  },
  dataSection: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    padding: "8px",
    borderBottom: "1px solid grey"
  },
  flexHeader: {
    fontWeight: "500",
    fontSize: "25px",
    color: "#799fd1",
    margin: "5px"
  },
  flexValue: {
    margin: "6px 5px",
    fontSize: "23px",

    flex: "2"
  },
  flexEdit: {
    marginTop: "auto",
    marginBottom: "5px",
    marginLeft: "auto",
    cursor: "pointer",
    color: "blue"
  }
}));

export default function ProfilePage(props) {
  const [email, setEmail] = React.useState("");
  const [salary, setSalary] = React.useState(null);
  const [openEmailForm, setOpenEmailForm] = React.useState(false);
  const [openSalaryForm, setOpenSalaryForm] = React.useState(false);
  const [openPassForm, setOpenPassForm] = React.useState(false);

  React.useEffect(() => {
    console.log("Get email and salary from database here");
  }, []);

  const openEmail = () => {
    setOpenEmailForm(true);
  };
  const openSalary = () => {
    setOpenSalaryForm(true);
  };
  const openPasword = () => {
    setOpenPassForm(true);
  };

  const handleCloseAllDialogs = () => {
    setOpenEmailForm(false);
    setOpenSalaryForm(false);
    setOpenPassForm(false);
  };

  const classes = useStyles();
  console.log("HERE");
  return (
    <div className={classes.root}>
      <MainTitle>Profile</MainTitle>
      <Grid container className={classes.mainGrid} direction="row" spacing={6}>
        <Grid item>
          <Paper className={classes.profile} elevation={10}>
            <img
              className={classes.profile}
              src={profile_img}
              alt="Profile Page"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm container>
          <div className={classes.dataSection}>
            <Typography
              component="h1"
              variant="h4"
              color="primary"
              gutterBottom
            >
              My Data
            </Typography>
            <div className={classes.flexRow}>
              <Tooltip title="User ID">
                <div className={classes.flexHeader}>Username:</div>
              </Tooltip>
              <div className={classes.flexValue}>{props.user}</div>
              <div className={classes.flexEdit}></div>
            </div>
            <div className={classes.flexRow}>
              <Tooltip title="Email address">
                <div className={classes.flexHeader}>Email:</div>
              </Tooltip>
              <div className={classes.flexValue}>{email}</div>
              <div className={classes.flexEdit} onClick={openEmail}>
                Edit
              </div>
            </div>
            <div className={classes.flexRow}>
              <Tooltip title="Monthly">
                <div className={classes.flexHeader}>Salary:</div>
              </Tooltip>
              <div className={classes.flexValue}>
                {!salary
                  ? "Add you salary for better personalized tracking"
                  : salary}
              </div>
              <div className={classes.flexEdit} onClick={openSalary}>
                Edit
              </div>
            </div>
            <div
              className="link"
              style={{ color: "blue" }}
              onClick={openPasword}
            >
              Change Password
            </div>
          </div>
        </Grid>
      </Grid>
      <UpdateProfileForm
        onClose={handleCloseAllDialogs}
        open={openEmailForm}
        field="email"
        prevVal={email}
      />
      <UpdateProfileForm
        onClose={handleCloseAllDialogs}
        open={openSalaryForm}
        field="salary"
        prevVal={salary}
      />
      <UpdatePasswordForm onClose={handleCloseAllDialogs} open={openPassForm} />
    </div>
  );
}
