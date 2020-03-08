import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

// Filter starter code is from:
// https://material-ui.com/components/expansion-panels/

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "20px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  date: {
    margin: "0px 10px"
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  flexRow: {
    margin: "5px",
    padding: "5px"
  },
  dateClass: {
    display: "flex",
    flexDirection: "row"
  }
}));

export default function ExpenseFilter(props) {
  const { onSubmit, user } = props;
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date(0));
  const [endDate, setEndDate] = React.useState(new Date());
  const classes = useStyles();

  const toggleForm = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={open}>
        <ExpansionPanelSummary
          expandIcon={<FilterListIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          onClick={toggleForm}
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Search</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Filter Expenses
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.mainContainer}>
            <div className={classes.dateClass}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/DD/YYYY"
                  margin="normal"
                  id="expense_date"
                  label="Start Date"
                  value={startDate}
                  onChange={date => setStartDate(date)}
                  className={classes.date}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/DD/YYYY"
                  margin="normal"
                  id="expense_date"
                  label="End Date"
                  value={endDate}
                  onChange={date => setEndDate(date)}
                  className={classes.date}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.flexRow}></div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Clear</Button>
          <Button size="small" color="primary">
            Filter
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
