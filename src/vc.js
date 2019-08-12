import React, { Component } from "react";
import NumericInput from "react-numeric-input";
import Select from "react-select";

const taxRates = [
  { label: "UK", value: 0.2, currency: "£" },
  { label: "France", value: 0.2, currency: "€" },
  { label: "Switzerland", value: 0.08, currency: "CHF" },
  { label: "Germany", value: 0.19, currency: "€" },
  { label: "Greece", value: 0.24, currency: "€" },
  { label: "Ireland", value: 0.23, currency: "€" },
  { label: "Italy", value: 0.22, currency: "€" },
  { label: "Norway", value: 0.25, currency: "kr" },
  { label: "Turkey", value: 0.18, currency: "₺" }
];

class VatCalculator extends Component {
  constructor() {
    super();
    this.state = {
      entry1: 0.0,
      entry2: 0.0,
      netTotal: 0.0,
      vatTotal: 0.0,
      grandTotal: 0.0,
      currency: "£",
      taxRate: 0.2
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  calcTotal() {
    return parseFloat(this.state.entry1) + parseFloat(this.state.entry2);
  }

  calcVat() {
    return this.calcTotal() * this.state.taxRate;
  }

  calcGrand() {
    return this.calcTotal() + this.calcVat();
  }

  handleReset(event) {
    this.setState({
      entry1: 0.0,
      entry2: 0.0,
      netTotal: 0.0,
      vatTotal: 0.0,
      grandTotal: 0.0
    });
  }

  handleSubmit(event) {
    this.setState({
      netTotal: this.calcTotal(),
      vatTotal: this.calcVat(),
      grandTotal: this.calcGrand()
    });
    event.preventDefault();
  }

  selectChange(event) {
    this.setState({
      taxRate: event["value"],
      currency: event["currency"],
      netTotal: this.calcTotal() + (event["value"] - event["value"]),
      vatTotal: this.calcTotal() * event["value"],
      grandTotal: this.calcTotal() * (1 + event["value"])
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>
          Total: {this.state.currency + " "}
          {this.state.netTotal.toFixed(2)}
        </h2>
        <h2>
          Tax @ {this.state.taxRate * 100}%: {this.state.currency + " "}
          {this.state.vatTotal.toFixed(2)}
        </h2>
        <h2>
          Grand Total: {this.state.currency + " "}
          {this.state.grandTotal.toFixed(2)}
        </h2>
        Enter your values: {}
        <NumericInput
          min={0.0}
          step={0.01}
          precision={2}
          value={this.state.entry1}
          onChange={i => this.setState({ entry1: i })}
        />
        <NumericInput
          min={0.0}
          step={0.01}
          precision={2}
          value={this.state.entry2}
          onChange={i => this.setState({ entry2: i })}
        />
        <input type="submit" value="Submit" className="button" />
        <input
          type="button"
          value="Reset"
          className="button"
          onClick={this.handleReset}
        />
        <div className="select" style={{ width: "500px" }}>
          <Select
            options={taxRates}
            placeholder="UK"
            onChange={this.selectChange}
          />
        </div>
      </form>
    );
  }
}

export default VatCalculator;
