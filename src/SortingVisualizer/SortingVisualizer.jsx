import './SortingVisualizer.css';
import React from 'react';
import {Component} from 'react';
import {mergeSortAnimation} from "../SortingAlgorithm/mergeSort";

const MIN_VAL = 5;
const MAX_VAL = 500;
const ACTION_COLOR = 'red';
const DEFAULT_COLOR = 'slateblue';

export class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            arraySize: 65,
        };

    }

    componentDidMount() {
        this.setArray();
    }

    setArray = () => {
        console.log('setArray');
        let array = [];
        const {arraySize} = this.state;
        console.log('arraySize', arraySize);

        for (let i = 0; i < arraySize; i++) {
            array.push(randomIntFromInterval(MIN_VAL, MAX_VAL));
        }
        this.setState({array: array});
    };

    mergeSort() {
        const {array} = this.state;
        const animation = mergeSortAnimation(array);
        console.log('animation.length', animation.length);
        const obj = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animation.length; i = i + 3) {
            // console.log('animation[i]:',animation[i]);
            const [firstIdx, secondIdx] = animation[i];
            const firstObjStyle = obj[firstIdx].style;
            const secondObjStyle = obj[secondIdx].style;
            setTimeout(() => {
                firstObjStyle.backgroundColor = ACTION_COLOR;
                secondObjStyle.backgroundColor = ACTION_COLOR;
            }, i * 10);
            setTimeout(() => {
                firstObjStyle.backgroundColor = DEFAULT_COLOR;
                secondObjStyle.backgroundColor = DEFAULT_COLOR;
            }, (i + 1) * 10);
            setTimeout(() => {
                const [barIdx, newHeight] = animation[i + 2];
                const barIdxStyle = obj[barIdx].style;
                barIdxStyle.height = `${newHeight}px`;
            }, (i + 2) * 10);
        }
    }

    handleChange = e => {
        // this.setState({arraySize: e.target.value * 5},()=>{
        //         console.log('arraySize', this.state.arraySize);
        // });
        this.state.arraySize = e.target.value * 5;
        this.setArray();
    };


    render() {
        const {array} = this.state;

        return (
            <div className="main-container">
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar"
                             key={idx}
                             style={{
                                 height: `${value}px`,
                                 width: this.state.arraySize < 30 ? '35px' :
                                     this.state.arraySize < 50 ? '20px' :
                                         this.state.arraySize < 75 ? '15px' :
                                             this.state.arraySize < 100 ? '10px' : '7px',
                                 backgroundColor: DEFAULT_COLOR
                             }}/>
                    ))}
                </div>
                <div className="controls-container">
                    <input
                        id="size-bar"
                        type="range"
                        min="1"
                        max="25"
                        defaultValue={this.state.arraySize/5}
                        style={{background: 'blue'}}
                        onChange={this.handleChange}
                    />
                    <button onClick={() => this.setArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.setArray()}>Quick Sort</button>
                    <button onClick={() => this.setArray()}>Heap Sort</button>
                    <button onClick={() => this.setArray()}>Bubble Sort</button>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(MIN_VAL, MAX_VAL) {
    return Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1) + MIN_VAL);
}

function sortedArrCheck(JSsortedArr, mySortedArr) {
    if (JSsortedArr.length !== mySortedArr.length) return false;
    return JSsortedArr.toString() === mySortedArr.toString();

}

export default SortingVisualizer;
