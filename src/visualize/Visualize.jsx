import React, { Component } from 'react';
import './Visualize.css';
import Node from './node/Node';

const randomNumbers = [];
var totalData;
var nodeWidth;

//one we compare against
var currentNode;
var animation_speed;
// Returns a Promise that resolves after "ms" Milliseconds used for animation
const timer = ms => new Promise(res => setTimeout(res, ms))

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
    async bubbleSort(){
      const inputArr= this.state.dataArray
        let len = inputArr.length;
        let swapped;
        
        do {
            swapped = false;
            for (let i = 0; i < len-1; i++) {
                currentNode = inputArr[i].value;
            document.getElementById(`node-${inputArr[i].value}`).classList.add('chosen');
            document.getElementById(`node-${inputArr[i+1].value}`).classList.add('chosen');
            await timer(200);
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
    
          //color
          // this.compare(arr[j-1].value,arr[j].value)
         
       
          
  }

    //Animate
    //Compare 
    compare(first,second){
    var firstNode   =  document.getElementById(`node-${first}`);
    var secondNode  =  document.getElementById(`node-${second}`);
    
    firstNode.classList.add('chosen'); 
    secondNode.classList.add('chosen'); 

    setTimeout(function(){
        firstNode.classList.remove('chosen') 
        secondNode.classList.remove('chosen') 
        }, 1000);
    
    }

    //ersätter vi med algoritmerna
    changeValue(){
        var tempArray = this.state.dataArray;
        //animation
        setChoosen(tempArray[0].value);
        //set value
        tempArray[0].value = 1000;
        //update global state

        //update global state
        this.setState({dataArray: tempArray})  
    }
    //ersätter vi med algoritmerna
    changeValueBack(){
        var tempArray = this.state.dataArray;
        //animation
        setChoosen(tempArray[0].value);
        //set value
        tempArray[0].value = 500;

       //update global state
        this.setState({dataArray: tempArray})  
           
    }

    render() {
        const {dataArray} = this.state;
        return (
            <>
            <button  onClick={() => this.bubbleSort()}>Bubble Sort Test</button>  
            <button  onClick={() => this.addMore()}>Add more</button>     
            <button  onClick={() => this.changeValue() }>change value test</button>     
            <button  onClick={() => this.changeValueBack() }>change value test back</button>     

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

const setChoosen = (value) =>{
    var element =  document.getElementById(`node-${value}`);
  
    element.classList.add('chosen') 
    element.classList.remove('chosen') 

   
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
