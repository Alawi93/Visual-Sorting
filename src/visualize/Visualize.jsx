import React, { Component } from 'react';
import './Visualize.css';
import Node from './node/Node';

/*===================
  === Algorithms ===
  ==================
*/

const randomNumbers = [];
var totalData;
var nodeWidth; // May remove later

//used for start - stop
var stop = false;

// TO BE WORKED ON //
var currentNode;
var animation_speed = 60;
// var mergeSortAnimateWinner = [];
// var mergeSortAnimateLoser = [];
// var saveArray = [];
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

   // To be used later
    addMore(){
        totalData = totalData + 1;
        //sets width to state value
        nodeWidth = this.state.nodeWidth;  
        this.setState({dataArray: getDataArray()});
    }

    // ========= Efficient Bubble Sort =========
    async bubbleSortEfficient(){
      const stateArray = this.state.dataArray
        let len = stateArray.length;
        let swapped;

        do {
            swapped = false;
            for (let i = 0; i < len-1; i++) {
                currentNode = stateArray[i].value;
            document.getElementById(`node-${stateArray[i].value}`).classList.add('chosen');
            document.getElementById(`node-${stateArray[i+1].value}`).classList.add('chosen');
            //Stoping and starting animation
            await this.waitUntil()
                if (stateArray[i].value > stateArray[i + 1].value) { 
                    let tmp = stateArray[i];
                    stateArray[i] = stateArray[i + 1];
                    stateArray[i + 1] = tmp;
                    swapped = true;
                this.setState({dataArray: stateArray})  
                }
            document.getElementById(`node-${stateArray[i].value}`).classList.remove('chosen');
            document.getElementById(`node-${stateArray[i+1].value}`).classList.remove('chosen');
        }
      } while (swapped);
       //Animate sorted
  this.animateSorted(stateArray)    
  }

 // ========= BubbleSort =========
  async bubbleSort(){
    const stateArray= this.state.dataArray;
    let len = stateArray.length -1;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            currentNode = stateArray[j].value;
            document.getElementById(`node-${stateArray[j].value}`).classList.add('chosen');
            document.getElementById(`node-${stateArray[j+1].value}`).classList.add('chosen');
            //used for speed of animation and for stop and start              
            await this.waitUntil()
            if (stateArray[j].value > stateArray[j + 1].value) {
                let tmp = stateArray[j];
                stateArray[j] = stateArray[j + 1];
                stateArray[j + 1] = tmp;
                this.setState({dataArray: stateArray})  
            }
            document.getElementById(`node-${stateArray[j].value}`).classList.remove('chosen');
            document.getElementById(`node-${stateArray[j+1].value}`).classList.remove('chosen');
        }
    }
     //Animate sorted
  this.animateSorted(stateArray);
};

// ========= Selection sort =========
async selectionSort(){
    var stateArray = this.state.dataArray
    var minIdx, temp, 
        len = stateArray.length;

    for(var i = 0; i < len; i++){
      //used for speed of animation and for stop and start              
      minIdx = i;
      currentNode = stateArray[minIdx].value;
      await this.waitUntil()
      for(var  j = i+1; j<len; j++){
        currentNode = stateArray[minIdx].value;
        document.getElementById(`node-${stateArray[minIdx].value}`).classList.add('chosen');
        document.getElementById(`node-${stateArray[j].value}`).classList.add('chosen');
        await this.waitUntil()
        //current
         if(stateArray[j].value<stateArray[minIdx].value){
            document.getElementById(`node-${stateArray[minIdx].value}`).classList.remove('chosen');
            minIdx = j;
            currentNode = stateArray[minIdx].value;
            document.getElementById(`node-${stateArray[minIdx].value}`).classList.add('chosen');
         }
         document.getElementById(`node-${stateArray[j].value}`).classList.remove('chosen');
      }
      temp = stateArray[i];
      stateArray[i] = stateArray[minIdx];
      stateArray[minIdx] = temp;
      this.setState({dataArray: stateArray})  
      document.getElementById(`node-${stateArray[minIdx].value}`).classList.remove('chosen');
      document.getElementById(`node-${stateArray[i].value}`).classList.remove('chosen');
    }
  //Animate sorted
  this.animateSorted(stateArray)
  }

 // ========= Insertion sort =========
 async insertionSort(){
     var stateArray = this.state.dataArray;
      let len = stateArray.length;

    for (let i = 1; i < len; i++) {
        await this.waitUntil()
        let key = stateArray[i].value;
        document.getElementById(`node-${key}`).classList.add('chosen');
        let j = i - 1;
        while (j >= 0 && stateArray[j].value > key) {
            await this.waitUntil()
            document.getElementById(`node-${stateArray[j + 1].value}`).classList.remove('chosen1');
            stateArray[j + 1].value = stateArray[j].value;
            j = j - 1;
            document.getElementById(`node-${stateArray[j + 1].value}`).classList.add('chosen1');
        }
        document.getElementById(`node-${key}`).classList.remove('chosen');
        stateArray[j + 1].value = key;
        this.setState({dataArray: stateArray})  
    }
    //Animate sorted
  this.animateSorted(stateArray)
  }

// ========= MERGESORT ========= 
async mergeSort(arr){
    //Create two arrays for sorting
    let sorted = Array.from(arr);
    let len = sorted.length;
    let buffer = new Array(len);

    for (let size = 1; size < len; size *= 2) {
      for (let leftStart = 0; leftStart < len; leftStart += 2*size) {
        //Get the two sub arrays
        let left = leftStart,
            right = Math.min(left + size, len),
            leftLimit = right,
            rightLimit = Math.min(right + size, len);

       //Merge the sub arrays
       await this.merge(left, right, leftLimit, rightLimit, sorted, buffer); 
      }

      //Swap the sorted sub array and merge them
      let temp = sorted;
      sorted = buffer;
      buffer = temp;
      this.setState({dataArray: sorted})

    }
    this.setState({dataArray: sorted})
  }

  async merge (left, right, leftLimit, rightLimit, sorted, buffer){
    let i = left;
    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
      await this.waitUntil()
    document.getElementById(`node-${sorted[i].value}`).classList.add('chosen1');
    //document.getElementById(`node-${sorted[right].value}`).classList.add('chosen1');

      if (sorted[left].value <= sorted[right].value) {
        buffer[i++] = sorted[left++];
      } else {
        buffer[i++] = sorted[right++];
      }
      this.setState({dataArray: sorted})

      
      document.getElementById(`node-${sorted[i].value}`).classList.remove('chosen1');
     //document.getElementById(`node-${sorted[right].value}`).classList.remove('chosen1');
    }
    document.getElementById(`node-${sorted[i].value}`).classList.remove('chosen1');

    //If there are elements in the left sub arrray then add it to the result
    while (left < leftLimit) {
      buffer[i++] = sorted[left++];
    }
  
    //If there are elements in the right sub array then add it to the result
    while (right < rightLimit) {
      buffer[i++] = sorted[right++];     
    }
  
  }
  
  // ========= Visual animation =========
  async animateSorted(array){
    for (let i = 0; i < array.length; i++) {
        if(document.getElementById(`node-${array[i].value}`).classList === 'node chosen1'){
            document.getElementById(`node-${array[i].value}`).classList.remove('chosen1')
        }
     await this.waitUntil()
     document.getElementById(`node-${array[i].value}`).classList.add('sorted');
    }
  }
   // used for animation speed and for stop/start function 
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

// ========= Resetting: to be worked on =========
async reset(){
  window.location.reload();
    /*
    this.setState({dataArray: getDataArray()}); 
    var stateArray = this.state.dataArray;
    //removes a class = removes animation color
    for (let i = 0; i< stateArray.length; i++) {
        await this.waitUntil()
        document.getElementById(`node-${stateArray[i].value}`).classList.remove('sorted');
       }
       */

}
//TODO: change to one button
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
            <button  onClick={() => this.mergeSort(this.state.dataArray)}>Merge Sort test</button>  

            <button  onClick={() => this.insertionSort()}>Insertion Sort</button>  
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

