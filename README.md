# Pathfinding Visualizer

This is a simple web application built to help visualize how Dijkstra's pathfinding algorithm works. It allows users to interactively place walls and see the algorithm find the shortest path between a start and end node.

Deployed Link: [https://pathfinding-visualizer-karan.vercel.app](https://pathfinding-visualizer-karan.vercel.app)

---

## About Dijkstra's Algorithm

Dijkstra's algorithm is used to find the shortest path between two points in a graph. It works by exploring all possible paths and always choosing the shortest available option at each step. This visualizer shows the step-by-step process of how the algorithm works on a grid.

---

## Features

- Visualizes Dijkstra’s pathfinding algorithm step by step
- Interactive grid where users can:
  - Set start and end points
  - Place walls to act as obstacles
  - Reset the grid and run the algorithm again
- Clean and responsive layout

---

## How to Run Locally

To run the app on your local machine:

```bash
git clone https://github.com/KaranSaini2219/pathfinding-visualizer-karan.git
cd pathfinding-visualizer-karan
npm install
npm start
