import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const NewDialog = withStyles({
    paperWidthSm: {
        maxWidth: "60%",
    },
    paper: {
      height: "600px",
    },
    descrip: {
      minWidth: "70%",
    },
  })(Dialog);

export default function AddExpenseDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [category, setCategory] = React.useState('');

  const reset_form = () => {
    setCategory("");
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    reset_form();
    onClose("");
  };

  //const handleListItemClick = value => {
  //  onClose(value); 
  //};

  const handleChangeCat = event => {
    setCategory(event.target.value);
  };

  return (
    <NewDialog onClose={handleClose} maxWidth="sm" aria-labelledby="simple-dialog-title" fullWidth={true} open={open}>
      <DialogTitle id="simple-dialog-title">Add an Expense</DialogTitle> 
      <form className={classes.form}>
      <Container maxWidth="lg">
      <Grid container spacing={3} direction="column" justify="center"
  alignItems="center">
          <Grid item spacing={3}>
        < MuiPickersUtilsProvider utils={MomentUtils}>
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
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        <InputLabel id="category_in">Category</InputLabel>
        <Select
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
      </FormControl>
        </Grid>
        <Grid item>
        <TextField className={classes.descrip} id="description" label="Description" variant="outlined" />
        </Grid>
        </Grid>
        </Container>
      </form>
    </NewDialog>
  );
}
