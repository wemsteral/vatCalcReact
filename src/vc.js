import React, { Component } from "react";
import NumericInput from "react-numeric-input";

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

class VatCalculator extends Component {
  constructor() {
    super();
    this.state = {
      entry1: 0.0,
      entry2: 0.0,
      netTotal: 0.0,
      vatTotal: 0.0,
      grandTotal: 0.0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calcTotal() {
    return parseFloat(this.state.entry1) + parseFloat(this.state.entry2);
  }

  calcVat() {
    return this.calcTotal() * taxRates["Uk"];
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Total: <text>{currencies["Turkey"]}</text>
          {this.state.netTotal.toFixed(2)}
        </h1>
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
      </form>
    );
  }
}

export default VatCalculator;
