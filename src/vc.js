import React, { Component } from "react";
import NumericInput from "react-numeric-input";
import Select from "react-select";

const taxRates = {
  Uk: 0.2,
  France: 0.2,
  Switzerland: 0.08,
  Germany: 0.19,
  Greece: 0.24,
  Ireland: 0.23,
  Italy: 0.22,
  Norway: 0.25,
  Turkey: 0.18
};

const currencies = {
  Uk: "£ ",
  France: "€ ",
  Switzerland: "CHF ",
  Germany: "€ ",
  Greece: "€ ",
  Ireland: "€ ",
  Italy: "€ ",
  Norway: "kr ",
  Turkey: "₺ "
};

const taxRates1 = [
  { label: "UK", value: 0.2 },
  { label: "France", value: 0.2 },
  { label: "Switzerland", value: 0.08 },
  { label: "Germany", value: 0.19 },
  { label: "Greece", value: 0.24 },
  { label: "Ireland", value: 0.23 },
  { label: "Italy", value: 0.22 },
  { label: "Norway", value: 0.25 },
  { label: "Turkey", value: 0.18 }
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
      currency: "£ ",
      taxRate: 0.2
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
      netTotal: this.calcTotal(),
      vatTotal: this.calcVat(),
      grandTotal: this.calcGrand()
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Total: £{this.state.netTotal.toFixed(2)}</h1>
        <h1>Tax: £{this.state.vatTotal.toFixed(2)}</h1>
        <h1>Grand Total: £{this.state.grandTotal.toFixed(2)}</h1>
        <label>
          Name:
          <NumericInput
            step={0.1}
            precision={2}
            value={this.state.entry1}
            onChange={i => this.setState({ entry1: i })}
          />
          <NumericInput
            step={0.1}
            precision={2}
            value={this.state.entry2}
            onChange={i => this.setState({ entry2: i })}
          />
        </label>
        <input type="submit" value="Submit" />
        <Select
          options={taxRates1}
          placeholder="UK"
          onChange={i => this.setState({ taxRate: i["value"] })}
        />
      </form>
    );
  }
}

export default VatCalculator;
