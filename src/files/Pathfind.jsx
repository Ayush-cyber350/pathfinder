import React from "react";
import './Pathfind.css';
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithm/dijkstra.jsx";

const START_ROW =7 ;
const START_COL= 10;
const END_ROW = 6;
const END_COL =27;

export default class Pathfind extends React.Component{
    constructor(){
        super();
        this.state = {
            grid : []
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }
    animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder){
        for(let i=0; i<=visitedNodesInOrder.length;i++){
            if(i===visitedNodesInOrder.length){
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10*i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className=
                'node node-visited';
            }, 10*i);
        }
    }
    animateShortestPath(nodesInShortestPathOrder){
        for(let i=0;i < nodesInShortestPathOrder.length;i++){
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDijkstra(){
        const {grid}= this.state;
        const startNode = grid[START_ROW][START_COL];
        const endNode = grid[END_ROW][END_COL];
        const visitedNodesInOrder = dijkstra(grid,startNode,endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        this.animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder);
    }
    render(){
        const {grid}= this.state;
        return(
            <div>
                <button onClick={()=>this.visualizeDijkstra()}>
                    Visualize Shortest path using Dijkstra
                    </button>
                <div className ='grid'>
                    {grid.map((row,rowIdx)=>{
                        return (
                            <div key={rowIdx}>
                                {row.map((node,nodeIdx)=>{
                                    const {row,col,isStart,isFinish,} = node;
                                    return(
                                        <Node 
                                        key={nodeIdx} 
                                        col={col} 
                                        row={row}
                                        isFinish= {isFinish}
                                        isStart={isStart}

                                        />
                                    );
                                })}
                            </div>
                        );
                    
    })}
                </div>
            </div>
        );
    }
        
}
const getInitialGrid= ()=>{
    const grid = [];
    for(let row =0;row <15 ;row++){
        const currentRow=[];
        for(let col =0; col<40;col++){
            currentRow.push(createNode(col,row));
        }
        grid.push(currentRow);
    }
    return grid;
}

const createNode= (col,row) => {
    return{
        col,
        row,
        isStart: col=== START_COL && row===START_ROW,
        isFinish: col===END_COL && row === END_ROW,
        isVisited: false,
        distance: Infinity,
        previousNode: null
    };
}

