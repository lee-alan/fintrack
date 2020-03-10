import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainTitle from "../components/pageTitle";
import ExpensesTable from "../components/expenses/expensesTable";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddExpenseDialog from "../components/expenses/addExpense";
import ExpenseFilter from "../components/expenses/expenseFilter";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: "10px"
  },
  loading: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function createData(data) {
  return {
    id: data._id,
    date: new Date(data.date),
    description: data.description,
    category: data.category,
    payment_type: data.payment_type,
    amount: data.amount
  };
}

export default function ExpensePage(props) {
  const { user } = props;
  const [open, setOpen] = React.useState(false);
  const [loadRows, setLoadRows] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const loadMax = 101;
  let currentPage = 1;

  React.useEffect(() => {
    if (loadRows) {
      // Query database and load new
      axios
        .get(
          "/api/expense/multiple/".concat(
            user,
            "?page_number=",
            currentPage,
            "&page_limit=",
            loadMax,
            "&payment_type=.*&category=.*"
          )
        )
        .then(response => {
          setRows(response.data.map(createData));
          setLoadRows(false);
          //console.log(rows);
        })
        .catch(error => {
          console.log("Error: ", error.response);
        });
    }
  }, [loadRows, user, currentPage]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSearchQuery = query => {
    // Call backend and fill rows with relevant data
  };

  const addNewExpense = () => {
    setLoadRows(true);
  };

  const loadNextPage = () => {
    currentPage += 1;
    setLoadRows(true);
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
      <ExpenseFilter onSubmit={handleSearchQuery} user={props.user} />
      <AddExpenseDialog
        user={props.user}
        open={open}
        onClose={handleClose}
        onAdd={addNewExpense}
      />
      {loadRows ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <ExpensesTable
          rows={rows}
          user={props.user}
          loadMore={loadNextPage}
          onAdd={addNewExpense}
        />
      )}
    </main>
  );
}
