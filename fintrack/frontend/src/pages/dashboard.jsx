import React, { Component } from "react";
import "../style/main.css";
import "../style/dashboard.css";
import ExpenseDash from "../components/dashboard/expenseOverview";
import InvestDash from "../components/dashboard/investmentsOverview";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import MainTitle from "../components/pageTitle";

/*
<div className="dash_section">
          <ExpenseDash user={this.props.user} />
          <InvestmentsDash user={this.props.user} />
        </div>
*/
class DashBoard extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(
      classes.paper,
      classes.fixedHeight,
      classes.hover_paper
    );

    return (
      <main className={classes.content}>
        <MainTitle>DashBoard</MainTitle>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={6} className={classes.dash_item}>
                <Paper className={fixedHeightPaper}>
                  <ExpenseDash />
                </Paper>
              </Grid>
              <Grid item xs={6} className={classes.dash_item}>
                <Paper className={fixedHeightPaper}>
                  <InvestDash />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  dash_item: {
    minWidth: "max(400px, 50%)"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 350
  },
  hover_paper: {
    cursor: "pointer !important",
    border: "1px solid black",

    "&:hover": {
      border: "1px solid black",
      boxShadow: "10px 5px 5px grey"
    }
  }
});

export default withStyles(styles, { withTheme: true })(DashBoard);