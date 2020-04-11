import React, { Component } from "react";
import "./algobutton.css";

class AlgoButton extends Component {
  //state = {  }
  constructor(props) {
    super(props);
    this.state = {
      buttonName: "test",
    };
    console.log("Button Constructor");
  }
  resetArray() {
    console.log("TEST - Reset Array");
  }
  render() {
    return (
      <div>
        <button className="algo-button" onClick={() => this.resetArray()}>
          {this.state.buttonName}
        </button>
      </div>
    );
  }
}

export default AlgoButton;
