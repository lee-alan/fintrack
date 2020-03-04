import React from "react";

import MainTitle from "../components/pageTitle";
import ExpensesTable from "../components/expenses/expensesTable";

export default function ExpensePage(props) {
  return (
    <main>
      <MainTitle>Expenses</MainTitle>
      <ExpensesTable />
    </main>
  );
}
