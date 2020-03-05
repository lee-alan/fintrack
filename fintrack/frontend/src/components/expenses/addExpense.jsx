import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MomentUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { validator } from "../validator";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

//import axios from "axios";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  gridWidth: {
    width: "80%"
  },
  desbox: {
    width: "100%"
  },
  save_cancel: {
    marginTop: "10px"
  },
  loading: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const NewDialog = withStyles({
  paperWidthSm: {
    maxWidth: "60%"
  },
  paper: {
    height: "650px"
  }
})(Dialog);

const IsExpenseSwitch = withStyles({
  switchBase: { color: "green" },
  checked: { color: "red" }
})(Switch);

export default function AddExpenseDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [category, setCategory] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isExpense, setIsExpense] = React.useState(true);
  const [amount, setAmount] = React.useState("");
  const [amtError, setAmtError] = React.useState(false);
  const [catError, setCatError] = React.useState(false);
  const [payError, setPayError] = React.useState(false);
  const [desError, setDesError] = React.useState(false);
  const [error, setError] = React.useState("");
  const [getData, setGetData] = React.useState(false);

  React.useEffect(() => {
    console.log("Get data is", open);
    // If open and getData is false then get the data for this expense
    //if (open && !getData){
    //await new Promise(r => setTimeout(r, 2000));
    //setGetData(true);
    //}
  }, [open]);

  const reset_form = () => {
    setCategory("");
    setPaymentType("");
    setDescription("");
    setAmount("");
    setError("");
    setAmtError(false);
    setCatError(false);
    setPayError(false);
    setDesError(false);
    setGetData(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleChangeAmt = event => {
    if (validator.isValidDollar(event.target.value))
      setAmount(event.target.value);
    setAmtError(false);
  };

  const handleClose = () => {
    reset_form();
    onClose("");
  };

  const handleChangeCat = event => {
    setCategory(event.target.value);
    setCatError(false);
  };

  const handleChangePay = event => {
    setPaymentType(event.target.value);
    setPayError(false);
  };

  const handleChangeDes = event => {
    setDescription(event.target.value);
    setDesError(false);
  };

  const handleChangeEx = event => {
    setIsExpense(event.target.checked);
  };

  const sumbitForm = () => {
    console.log("FORM SUBMIT");
    setError("");
    let err = false;
    if (!category) {
      setCatError(true);
      err = true;
    }
    if (!paymentType) {
      setPayError(true);
      err = true;
    }
    if (!description) {
      setDesError(true);
      err = true;
    }
    if (!amount) {
      setAmtError(true);
      err = true;
    }
    if (err) return null;
    /*
    axios
    .post("/api/expenses", {
      username: props.user

    })
    .then(response => {
      console.log("response.");
      if (response.status === 200) {
        document.location.href = "/";
      }
    })
    .catch(error => {
      console.log("error");
      console.log(error);
      this.setState({
        error: error.response.data.error
      });
    });
  event.preventDefault();
}*/
  };
  const formObject =
    props.id && !getData ? (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    ) : (
      <form className={classes.form}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid xs={12} className={classes.gridWidth} item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/DD/YYYY"
                  margin="normal"
                  id="expense_date"
                  label="Date of expense"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid xs={12} className={classes.gridWidth} item>
              <FormControl required={true} className={classes.formControl}>
                <InputLabel id="category_in">Category</InputLabel>
                <Select
                  error={catError}
                  labelId="category_label"
                  id="category"
                  value={category}
                  onChange={handleChangeCat}
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                </Select>
                {catError ? (
                  <FormHelperText>Field is Required</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl required={true} className={classes.formControl}>
                <InputLabel id="payment_in">Payment Type</InputLabel>
                <Select
                  error={payError}
                  labelId="payment_label"
                  id="payment"
                  value={paymentType}
                  onChange={handleChangePay}
                >
                  <MenuItem value="Credit">Credit</MenuItem>
                  <MenuItem value="Debit">Debit</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </Select>
                {payError ? (
                  <FormHelperText>Field is Required</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
            <Grid xs={12} className={classes.gridWidth} item>
              <FormControl required={true} className={classes.desbox}>
                <TextField
                  error={desError}
                  id="description"
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={handleChangeDes}
                />
                {desError ? (
                  <FormHelperText>Field is Required</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
            <Grid className={classes.gridWidth} item>
              <FormControlLabel
                control={
                  <IsExpenseSwitch
                    checked={isExpense}
                    onChange={handleChangeEx}
                  />
                }
                label={isExpense ? "Expense" : "Income"}
              />
            </Grid>
            <Grid xs={12} className={classes.gridWidth} item>
              <FormControl required={true} className={classes.desbox}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  error={amtError}
                  id="amount"
                  value={amount}
                  onChange={handleChangeAmt}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={60}
                />
                {amtError ? (
                  <FormHelperText>Field is Required</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
            <Grid
              className={classes.save_cancel}
              container
              spacing={3}
              justify="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveAltIcon />}
                  onClick={sumbitForm}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<ClearIcon />}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </form>
    );

  return (
    <NewDialog
      disableBackdropClick
      onClose={handleClose}
      maxWidth="sm"
      aria-labelledby="simple-dialog-title"
      fullWidth={true}
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add an Expense</DialogTitle>
      {formObject}
      <Box mt={1}>{error}</Box>
    </NewDialog>
  );
}
