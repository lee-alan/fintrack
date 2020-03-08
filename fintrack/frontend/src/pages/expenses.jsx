import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainTitle from "../components/pageTitle";
import ExpensesTable from "../components/expenses/expensesTable";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddExpenseDialog from "../components/expenses/addExpense";
import ExpenseFilter from "../components/expenses/expenseFilter";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: "10px"
  }
}));

function createData(id, date, description, category, paymentType, amount) {
  return { id, date, description, category, paymentType, amount };
}

export default function ExpensePage(props) {
  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const rows = [
    createData(1, "March 4", "Walmart", "Home", "credit", 67),
    createData(2, "March 4", "Pizza Pizza", "Food", "credit", 12),
    createData(3, "March 3", "Gift to Alan", "Gift", "credit", 35.7),
    createData(4, "March 2", "Rent", "Home", "debit", 930),
    createData(
      5,
      "March 2",
      "New computer",
      "Entertainment",
      "credit",
      1199.99
    ),
    createData(6, "March 1", "TTC", "Travel", "credit", 105.1)
  ];

  const handleSearchQuery = query => {
    // Call backend and fill rows with relevant data
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
      <ExpenseFilter
        onSubmit={handleSearchQuery}
        open={openFilter}
        user={props.user}
      />
      <AddExpenseDialog user={props.user} open={open} onClose={handleClose} />
      <ExpensesTable rows={rows} user={props.user} />
    </main>
  );
}
