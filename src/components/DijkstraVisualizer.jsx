import React, {Component} from 'react';
import Node from './Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithm-logic/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class DijkstraVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWalls(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    // Create a new grid that includes the walls just created
    const newGrid = getNewGridWithWalls(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        
        if (node.isStart) {
          nodeElement.className = 'node node-start node-visited';
        } else if (node.isFinish) {
          nodeElement.className = 'node node-finish node-visited';
        } else {
          nodeElement.className = 'node node-visited';
        }
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        
        if (node.isStart) {
          nodeElement.className = 'node node-start node-shortest-path';
        } else if (node.isFinish) {
          nodeElement.className = 'node node-finish node-shortest-path';
        } else {
          nodeElement.className = 'node node-shortest-path';
        }
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetBoard() {
    const grid = getInitialGrid();
    grid.forEach(row => {
      row.forEach(node =>  {
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start';
        } else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node';
        }
      })
    })
    this.setState({grid});
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="app-header">
          <h1 className="app-title">Dijkstra's Algorithm Visualizer</h1>
          <p className="app-subtitle">
            Add obstacles by dragging across the grid between  
            <span style={{color: "green", fontWeight: "bold"}}> start </span> 
            and 
            <span style={{color: "red", fontWeight: "bold"}}> finish </span> 
            nodes,then let the algorithm compute the most efficient route!
          </p>
        </div>

        <div className="controls-container">
          <button 
            className="visualize-button" 
            onClick={() => this.visualizeDijkstra()}
          >
            Visualize Dijkstra's Algorithm
          </button>
          <button 
            className="reset-button" 
            onClick={() => this.resetBoard()}
          >
            Reset Grid
          </button>
        </div>

        <div className="grid-container">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp()}>
                      </Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="legend-container">
          <div className="legend-item">
            <div className="legend-node" style={{backgroundColor: 'green'}}></div>
            <span className="legend-text">Start Node</span>
          </div>
          <div className="legend-item">
            <div className="legend-node" style={{backgroundColor: 'red'}}></div>
            <span className="legend-text">Finish Node</span>
          </div>
          <div className="legend-item">
            <div className="legend-node" style={{backgroundColor: '#1f2937'}}></div>
            <span className="legend-text">Wall</span>
          </div>
          <div className="legend-item">
            <div className="legend-node" style={{backgroundColor: '#06b6d4'}}></div>
            <span className="legend-text">Visited</span>
          </div>
          <div className="legend-item">
            <div className="legend-node" style={{backgroundColor: '#fbbf24'}}></div>
            <span className="legend-text">Shortest Path</span>
          </div>
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWalls = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};