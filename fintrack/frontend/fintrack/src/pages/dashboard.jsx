import React, { Component } from "react";
import "../style/main.css";
import "../style/dashboard.css";
import ExpenseDash from "../components/dashboard/expenseOverview";
import InvestmentsDash from "../components/dashboard/investmentsOverview";

class DashBoard extends Component {
  state = {};
  render() {
    return (
      <div id="dashboard">
        <div className="section_title">DashBoard</div>
        <div className="dash_section">
          <ExpenseDash user={this.props.user} />
          <InvestmentsDash user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default DashBoard;
