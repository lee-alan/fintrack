import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainTitle from "../components/pageTitle";
import ExpensesTable from "../components/expenses/expensesTable";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddExpenseDialog from "../components/expenses/addExpense";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: "10px"
  }
}));

export default function ExpensePage(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <main>
      <MainTitle>Expenses</MainTitle>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add Expense
      </Button>
      <AddExpenseDialog user={props.user} open={open} onClose={handleClose} />
      <ExpensesTable user={props.user} />
    </main>
  );
}
