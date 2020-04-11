import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort.js";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort.js";
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSort.js";
import AlgoButton from "../components/algobutton.js";

// Change this value for the speed of the animations.
var ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
var NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
var PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
var SECONDARY_COLOR = "red";

//Array for the sliders of color options
var colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "lightskyblue",
  "dodgerblue",
  "purple",
  "turquoise",
];

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isRunning: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  /* Handles generating a new array and is called when size is changed */
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 310));
    }
    this.setState({ array });
  }
  /* Merge Sort */
  mergeSort() {
    this.setState({ isRunning: true });
    const arrayCopy = this.state.array.slice();
    const animations = getMergeSortAnimations(arrayCopy);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          this.mergeSortHelper1(
            i,
            animations.length,
            barOneStyle,
            barTwoStyle,
            color
          );
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          this.mergeSortHelper2(i, animations.length, animations, arrayBars);
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  mergeSortHelper1(i, l, barOneStyle, barTwoStyle, color) {
    if (i === l - 1) {
      //animation is done

      this.setState({ isRunning: false });
    }
    barOneStyle.backgroundColor = color;
    barTwoStyle.backgroundColor = color;
  }
  mergeSortHelper2(i, l, animations, arrayBars) {
    if (i === l - 1) {
      //animation is done

      this.setState({ isRunning: false });
    }
    const [barOneIdx, newHeight] = animations[i];
    const barOneStyle = arrayBars[barOneIdx].style;
    barOneStyle.height = `${newHeight}px`;
  }
  /* End Merge Sort */
  /* Quick Sort */
  async quickSort() {
    this.setState({ isRunning: true });
    const arrayCopy = this.state.array.slice();
    const animations = await getQuickSortAnimations(arrayCopy);
    this.colorSwap(animations);
  }
  /* End Quick Sort */
  /* Heap Sort */
  heapSort() {
    this.setState({ isRunning: true });
    const arrayCopy = this.state.array.slice();
    const animations = getHeapSortAnimations(arrayCopy);
    this.colorSwap(animations);
  }
  /* End Heap Sort */
  /* Bubble Sort */
  bubbleSort() {
    this.setState({ isRunning: true });
    const arrayCopy = this.state.array.slice();
    const animations = getBubbleSortAnimations(arrayCopy);
    this.colorSwap(animations);
  }
  /* End Bubble Sort */
  /* Handles color swap animations for other algorithms */
  colorSwap(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      let swapValues = false;
      const [
        barOneIdx,
        idxOneHeight,
        barTwoIdx,
        idxTwoHeight,
        state,
      ] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (state === 0) swapValues = false;
      else if (state === 1) swapValues = true;

      setTimeout(() => {
        if (i === animations.length - 1) {
          this.setState({ isRunning: false });
        }
        if (barOneStyle.backgroundColor === PRIMARY_COLOR) {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }

        if (swapValues) {
          barOneStyle.height = `${idxTwoHeight}px`;
          barTwoStyle.height = `${idxOneHeight}px`;
        }
        setTimeout(() => {
          if (i === animations.length) {
            this.setState({ isRunning: false });
          }
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i + 1 * ANIMATION_SPEED_MS);
      }, i * ANIMATION_SPEED_MS);
    } //end for loop
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 10; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 10);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-100, 100));
      }

      //console.log("Starting Array");
      //printArray(array);

      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      /*
            console.log("Java Sorted");
            printArray(javaScriptSortedArray);
            */
      //const mergeSortedArray = getMergeSortAnimations(array.slice());
      /*
      const quickSortedArray = await Promise.all([
        getQuickSortAnimations(array.slice())
      ]);
      */
      const heapSortedArray = getHeapSortAnimations(array.slice());
      //console.log("Bubble Sorted");
      //printArray(bubbleSortedArray);

      console.log(arraysAreEqual(javaScriptSortedArray, heapSortedArray));
    }
  }
  handleSizeChange = (evt) => {
    NUMBER_OF_ARRAY_BARS = evt.target.value;
    this.resetArray();
  };
  handleSpeedChange = (evt) => {
    ANIMATION_SPEED_MS = evt.target.value;
    this.setState({ ANIMATION_SPEED_MS });
  };
  handlePrimaryColorChange = (evt) => {
    var value = evt.target.value;
    PRIMARY_COLOR = colors[value];
    this.setState({ PRIMARY_COLOR });
    var x = document.getElementById("color1");
    x.style.color = PRIMARY_COLOR;
    var y = document.getElementById("barColor1");
    y.style.background = PRIMARY_COLOR;
  };
  handleSecondaryColorChange = (evt) => {
    var value = evt.target.value;
    SECONDARY_COLOR = colors[value];
    this.setState({ SECONDARY_COLOR });
    var x = document.getElementById("color2");
    x.style.color = SECONDARY_COLOR;
    var y = document.getElementById("barColor2");
    y.style.background = SECONDARY_COLOR;
  };

  render() {
    const { array } = this.state;

    return (
      <React.Fragment>
        <section className="animated-grid">
          <div className="card">
            <button
              className="algo-button"
              onClick={() => this.mergeSort()}
              disabled={this.state.isRunning}
            >
              Merge Sort
            </button>
          </div>
          <div className="card">
            <button
              className="algo-button"
              onClick={() => this.quickSort()}
              disabled={this.state.isRunning}
            >
              Quick Sort
            </button>
          </div>
          <div className="card">
            <button
              className="algo-button"
              onClick={() => this.heapSort()}
              disabled={this.state.isRunning}
            >
              Heap Sort
            </button>
          </div>
          <div className="card">
            <button
              className="algo-button"
              onClick={() => this.bubbleSort()}
              disabled={this.state.isRunning}
            >
              Bubble Sort
            </button>
          </div>
          <div className="card2"></div>
          <div className="card2"></div>
          <div className="card">
            Adjust Sorting Speed
            <p></p>
            <div className="slidecontainer">
              <input
                className="slider"
                defaultValue="5"
                id="changeSpeed"
                type="range"
                min="1"
                max="5"
                disabled={this.state.isRunning}
                onChange={this.handleSpeedChange}
              />
            </div>
            <p>
              Speed (ms): <span id="numSpeed"> {ANIMATION_SPEED_MS}</span>
            </p>
          </div>
          <div className="card">
            <span>Primary Color:</span>
            <span id="color1">{PRIMARY_COLOR}</span>
            <div className="slidecontainer">
              <input
                className="slider"
                defaultValue="7"
                id="barColor1"
                type="range"
                min="0"
                max="7"
                disabled={this.state.isRunning}
                onChange={this.handlePrimaryColorChange}
              />
            </div>

            <span>Secondary Color: </span>
            <span id="color2">{SECONDARY_COLOR}</span>
            <div className="slidecontainer">
              <input
                className="slider"
                defaultValue="0"
                id="barColor2"
                type="range"
                min="0"
                max="7"
                disabled={this.state.isRunning}
                onChange={this.handleSecondaryColorChange}
              />
            </div>
          </div>
          <div className="card">
            Adjust Number of Array Bars
            <p></p>
            <div className="slidecontainer">
              <input
                className="slider"
                defaultValue="100"
                id="changeSize"
                type="range"
                min="5"
                max="100"
                disabled={this.state.isRunning}
                onChange={this.handleSizeChange}
              />
            </div>
            <p>
              Number: <span id="numSize"> {NUMBER_OF_ARRAY_BARS}</span>
            </p>
          </div>
          <div className="card">
            <button
              className="algo-button"
              onClick={() => this.resetArray()}
              disabled={this.state.isRunning}
            >
              Generate New Array
            </button>
          </div>
          <div className="card2"></div>
          <div className="card2"></div>
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}
              ></div>
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/* Helps validate algorithms are correct comparing algorithm sorted array and JS sorted array */
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
