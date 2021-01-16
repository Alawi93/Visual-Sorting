import React, { Component } from 'react';
import './Visualize.css';
import Node from './node/Node';

const randomNumbers = [];
var totalData;
var nodeWidth; // maybe remove

// TO BE WORKED ON //
//one we compare against
var currentNode;
var animation_speed = 200;
var stop = false;
export default class Visualize extends Component {
    constructor(){
        super();
        this.state={
            dataArray: [],
        }
    }
    componentDidMount(){
        //starts with 10 values (for now)
        totalData = 50
        //sets width to state value
        nodeWidth = 35;
        this.setState({dataArray: getDataArray()}); 
    }

   //kan ha senare
    addMore(){
        totalData = totalData + 1;
        //sets width to state value
        nodeWidth = this.state.nodeWidth;  
        this.setState({dataArray: getDataArray()});
    }

    // ALGORITHMS

    //BUBBLE SORT
    // second bubblesort 
    //https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2
    async bubbleSortEfficient(){
      const inputArr= this.state.dataArray
        let len = inputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len-1; i++) {
                currentNode = inputArr[i].value;
            document.getElementById(`node-${inputArr[i].value}`).classList.add('chosen');
            document.getElementById(`node-${inputArr[i+1].value}`).classList.add('chosen');
            //Stoping and starting animation
            await this.waitUntil()
                if (inputArr[i].value > inputArr[i + 1].value) { 
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[i + 1];
                    inputArr[i + 1] = tmp;
                    swapped = true;
                this.setState({dataArray: inputArr})  
                }
            document.getElementById(`node-${inputArr[i].value}`).classList.remove('chosen');
            document.getElementById(`node-${inputArr[i+1].value}`).classList.remove('chosen');
        }
      } while (swapped);
       //Animate sorted
  this.animateSorted(inputArr)    
  }

  async bubbleSort(){
    const inputArr= this.state.dataArray;
    let len = inputArr.length -1;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            currentNode = inputArr[j].value;
            document.getElementById(`node-${inputArr[j].value}`).classList.add('chosen');
            document.getElementById(`node-${inputArr[j+1].value}`).classList.add('chosen');
            //used for speed of animation and for stop and start              
            await this.waitUntil()
            if (inputArr[j].value > inputArr[j + 1].value) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
                this.setState({dataArray: inputArr})  
            }
            document.getElementById(`node-${inputArr[j].value}`).classList.remove('chosen');
            document.getElementById(`node-${inputArr[j+1].value}`).classList.remove('chosen');
        }
    }
     //Animate sorted
  this.animateSorted(inputArr);
};

//what version of selection sort is this?????????
async selectionSort(){
    var arr = this.state.dataArray
    var minIdx, temp, 
        len = arr.length;
    for(var i = 0; i < len; i++){
      //used for speed of animation and for stop and start              
      minIdx = i;
      currentNode = arr[minIdx].value;
      await this.waitUntil()
      for(var  j = i+1; j<len; j++){
        currentNode = arr[minIdx].value;
        document.getElementById(`node-${arr[minIdx].value}`).classList.add('chosen');
        document.getElementById(`node-${arr[j].value}`).classList.add('chosen');
        await this.waitUntil()
        //current
         if(arr[j].value<arr[minIdx].value){
            document.getElementById(`node-${arr[minIdx].value}`).classList.remove('chosen');
            minIdx = j;
            currentNode = arr[minIdx].value;
            document.getElementById(`node-${arr[minIdx].value}`).classList.add('chosen');
         }
         document.getElementById(`node-${arr[j].value}`).classList.remove('chosen');
      }
      temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      this.setState({dataArray: arr})  
      document.getElementById(`node-${arr[minIdx].value}`).classList.remove('chosen');
      document.getElementById(`node-${arr[i].value}`).classList.remove('chosen');
    }
  //Animate sorted
  this.animateSorted(arr)
  }
  //working on atm----------------------------
 async insertionSort(){
     var inputArr = this.state.dataArray;
      let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        await this.waitUntil()
        let key = inputArr[i].value;
        document.getElementById(`node-${key}`).classList.add('chosen');
        let j = i - 1;
        while (j >= 0 && inputArr[j].value > key) {
            await this.waitUntil()
            document.getElementById(`node-${inputArr[j + 1].value}`).classList.remove('chosen1');
            inputArr[j + 1].value = inputArr[j].value;
            j = j - 1;
            document.getElementById(`node-${inputArr[j + 1].value}`).classList.add('chosen1');
        }
        document.getElementById(`node-${key}`).classList.remove('chosen');
        inputArr[j + 1].value = key;
        this.setState({dataArray: inputArr})  
    }
    //Animate sorted
  this.animateSorted(inputArr)
  }

  async animateSorted(array){
    for (let i = 0; i < array.length; i++) {
        if(document.getElementById(`node-${array[i].value}`).classList == 'node chosen1'){
            document.getElementById(`node-${array[i].value}`).classList.remove('chosen1')
        }
     await this.waitUntil()
     document.getElementById(`node-${array[i].value}`).classList.add('sorted');
    }
  }

   waitUntil(){
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (stop) {
                return
            }
            clearInterval(interval)
            resolve()
        }, animation_speed)
    })
} 

async reset(){
    this.setState({dataArray: getDataArray()}); 
    var array = this.state.dataArray;
    for (let i = 0; i< array.length; i++) {
        await this.waitUntil()
        document.getElementById(`node-${array[i].value}`).classList.remove('sorted');
       }

}
//change to one button
stop(){
stop = true;
}
start(){
stop = false;
}
    render() {
        const {dataArray} = this.state;
        return (
            <>
            <button  onClick={() => this.insertionSort()}>Insertion Sort test</button>  

            <button  onClick={() => this.selectionSort()}>Selection Sort</button>  
            <button  onClick={() => this.bubbleSort()}>Bubble Sort </button>  
            <button  onClick={() => this.bubbleSortEfficient()}>Bubble Sort - efficient </button>  
            <button  onClick={() => this.stop()}>Stop</button>  
            <button  onClick={() => this.start()}>Start</button>  
            <button  onClick={() => this.reset()}>Reset</button>  
             {/*Shows current node beeing compared against*/}
            {currentNode}

            <div className="layout">
            {dataArray.map((node,index)=>{
            const {value,width,isSorted} = node
            return(
            <Node 
            key={index}
            value={value} 
            width={width} 
            isSorted={isSorted}>
            </Node> 
            )
              })}
            </div>
           </>
        )
    }
}

//-----------------------------------
const getDataArray = () =>{
    //Fills an array with unique numbers
    getUniquNumber();
    //Sets global array with data
   return setDataArray();
}
//generates unique numbers (no duplicates)
const getUniquNumber = () =>{
    while(randomNumbers.length < totalData){
        var r = Math.floor(Math.random() * 1000) + 1;
        if(randomNumbers.indexOf(r)=== -1){
            randomNumbers.push(r);
        }
    }
}
//sets global state data
const setDataArray = () =>{
    const array = [];
    for (let i = 0; i < totalData; i++) {  
       array.push(createData(i)) 
    }
    //sets global value to generated array
    return array;
}
//creates objects of data
const createData = (i) =>{
    return {
        value:randomNumbers[i], 
        width: nodeWidth,
        isSorted: false,
    }
}
//-----------------------------------
