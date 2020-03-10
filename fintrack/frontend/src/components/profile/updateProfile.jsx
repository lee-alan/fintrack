import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const NewDialog = withStyles({ paper: { padding: "10px" } })(Dialog);

const styles = makeStyles(() => ({
  prev: {
    fontSize: "22px",
    padding: "3px",
    display: "flex"
  },
  prev_val: {
    fontWeight: "600",
    marginLeft: "10px"
  },
  prev_non: {
    color: "red",
    marginLeft: "10px"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  rootItem: {
    padding: "5px",
    margin: "5px"
  }
}));

export default function UpdateProfileForm(props) {
  /**
   * Requires:
   * props.user: current user
   * props.field: field to update
   */
  const { onClose, open } = props;
  const [newField, setNewField] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorField, setErrorField] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = styles();

  const handleChange = event => {
    setErrorField(false);
    setNewField(event.target.value);
  };

  const handleSubmit = () => {
    // Make either an axios update email or salary call
    if (newField === "") {
      setErrorField(true);
      return null;
    }
    setLoading(true);
    onClose();
  };

  const form = loading ? (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  ) : (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={clsx(classes.prev, classes.rootItem)}>
        Current {props.field}:{" "}
        {props.prevVal ? (
          <div className={classes.prev_val}>{props.prevVal}</div>
        ) : (
          <div className={classes.prev_non}>No Value</div>
        )}
      </div>
      <TextField
        error={errorField}
        id="newVal"
        label={"New ".concat(props.field)}
        variant="outlined"
        value={newField}
        onChange={handleChange}
        className={classes.rootItem}
      />
      {errorField ? <FormHelperText>Field is Required</FormHelperText> : ""}
      <Grid
        container
        className={classes.rootItem}
        style={{ width: "99%" }}
        direction="row"
        justify="center"
        alignContent="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveAltIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ClearIcon />}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <NewDialog
      disableBackdropClick
      onClose={onClose}
      maxWidth="sm"
      aria-labelledby="simple-dialog-title"
      fullWidth={true}
      open={open}
    >
      <Typography component="h1" variant="h4" color="primary" gutterBottom>
        Update {props.field}
      </Typography>
      {form}

      <Box mt={1}>{error}</Box>
    </NewDialog>
  );
}
