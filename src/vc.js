import React, { Component } from "react";
import NumericInput from "react-numeric-input";

const TaxRates = {
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

const Currencies = {
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
      entry1: 0,
      entry2: 0,
      netTotal: 0
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calcTotal() {
    return parseInt(this.state.entry1) + parseInt(this.state.entry2);
  }

  handleChange1(event) {
    this.setState({ entry1: event.target.value });
  }

  handleChange2(event) {
    this.setState({ entry2: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ netTotal: this.calcTotal() });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{this.state.netTotal}</h1>
        <label>
          Name:
          <NumericInput
            step={0.1}
            precision={2}
            value={this.state.entry1}
            onChange={e => this.handleChange1(e)}
          />
          <NumericInput
            step={0.1}
            precision={2}
            value={this.state.entry2}
            onChange={e => this.handleChange2(e)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default VatCalculator;
