import React, { useState, useEffect } from "react";
import { util } from "../util";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node
};

const styles = makeStyles(theme => ({
  expenseText: {
    color: "red",
    fontSize: "35px"
  },
  incomeText: {
    color: "green",
    fontSize: "35px"
  },
  netIncomeText: {
    color: "black",
    fontWeight: "bold",
    fontSize: "35px"
  },
  mainFrame: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  paperClass: {
    width: "100%",
    height: "100%"
  },
  sumCol: {
    height: "100%"
  },
  graphCol: {
    flex: 2
  }
}));

export default function ExpenseDash(props) {
  const { user, expanded } = props;
  const [expenseSum, setExpenseSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);
  const [month, setMonth] = React.useState("");
  const [categoryLabel, setCategoryLabel] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState([]);
  const [categoryText, setCategoryText] = React.useState([]);
  const classes = styles();

  useEffect(() => {
    // TODO: axios to fetch this data and setData
    setExpenseSum(1283.3);
    setIncomeSum(1490.78);
    setMonth(util.getCurrentMonth());
    setCategoryLabel([
      "Home",
      "Food",
      "Entertainment",
      "Travel",
      "Miscellaneous"
    ]);
    setCategoryValue([72.1, 54.3, 0, 91.3, 14]);
    setCategoryText([72.1, 54.3, 0, 91.3, 14].map(util.formatToDollars));
  }, []);

  return (
    <div className={classes.paperClass}>
      <div className={classes.mainFrame}>
        <div className={classes.sumCol}>
          <Title>Expenses: {month}</Title>

          <Tooltip title="Expenses" placement="left">
            <div className={classes.expenseText}>
              {util.formatToDollars(expenseSum)}
            </div>
          </Tooltip>
          <Tooltip title="Income" placement="left">
            <div className={classes.incomeText}>
              {util.formatToDollars(incomeSum)}
            </div>
          </Tooltip>
          <Tooltip title="Net Margin" placement="left">
            <div className={classes.netIncomeText}>
              {incomeSum >= expenseSum ? "+" : "-"}
              {util.formatToDollars(Math.abs(incomeSum - expenseSum))}
            </div>
          </Tooltip>
        </div>
        {expanded ? (
          <div className={classes.graphCol}>
            <Plot
              data={[
                {
                  type: "pie",
                  values: categoryValue,
                  labels: categoryLabel,
                  text: categoryText,
                  textinfo: "label",
                  hoverinfo: "none",
                  hovertemplate: "<extra></extra>%{label} <br>Amount: %{text}"
                }
              ]}
              style={{ width: "100%", height: "100%" }}
            ></Plot>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
