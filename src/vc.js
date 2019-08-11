import React, { Component } from "react";
import NumericInput from "react-numeric-input";
import Select from "react-select";

const currencies = {
  UK: "£ ",
  France: "€ ",
  Switzerland: "CHF ",
  Germany: "€ ",
  Greece: "€ ",
  Ireland: "€ ",
  Italy: "€ ",
  Norway: "kr ",
  Turkey: "₺ "
};

const taxRates = [
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

  // selectChange function seems a bit hacky - having to make a point of referring to the event to prompt an update when the dropdown changes???
  // this was to avoid weird sync/timing issues with updates state properties being used immediately after updated in the same function ....
  // I'm sure there's a nicer way to do it!
  selectChange(event) {
    this.setState({
      taxRate: event["value"],
      currency: currencies[event["label"]],
      vatTotal: this.calcTotal() * event["value"],
      grandTotal: this.calcTotal() * (1 + event["value"])
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>
          Total: {this.state.currency}
          {this.state.netTotal.toFixed(2)}
        </h2>
        <h2>
          Tax @ {this.state.taxRate * 100}%: {this.state.currency}
          {this.state.vatTotal.toFixed(2)}
        </h2>
        <h2>
          Grand Total: {this.state.currency}
          {this.state.grandTotal.toFixed(2)}
        </h2>
        <label>
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
        </label>
        <input type="submit" value="Submit" className="button" />
        <input
          type="button"
          value="Reset"
          className="button"
          onClick={this.handleReset}
        />
        <div style={{ width: "500px" }}>
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
