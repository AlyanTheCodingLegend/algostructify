// Directed Graph:
// Methods present in it:-
/*

addVertex
addEdge
deleteVertex
deleteEdge
numOfNode
numOfEdge
clear
shortestPath
displayGraph

 */
class UndirectedGraph {
    public matrix: number[][];  // adjacency matrix to store the graph
    public vertexNames: string[];  // list of vertex names for easy reference
    public vertexCount: number;  // track of the number of vertices currently in the graph
    public maxVertices: number;  // Max number of vertices allowed
  
    constructor(maxVertices: number = 4) {
        this.vertexCount = 0;
        this.maxVertices = maxVertices;
        this.matrix = [];
        this.vertexNames = [];
    }
  
    // Add a vertex to the graph
    addVertex(vertexName: string): void {
        if (this.vertexCount >= this.maxVertices) {
            console.log(`Cannot add more vertices. Maximum limit of ${this.maxVertices} reached.`);
            return;
        }
  
        // Add the vertex name
        this.vertexNames.push(vertexName);
  
        // Increase the size of the matrix by adding new row and column
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].push(0);  // Add new column
        }
  
        const newRow: number[] = [];
        for (let i = 0; i < this.vertexCount + 1; i++) {
            newRow.push(0);  // New row with all 0s
        }
        this.matrix.push(newRow);
  
        this.vertexCount++;
        console.log(`Vertex ${vertexName} added successfully.`);
    }
  
    // Add an edge between two vertices (undirected)
    addEdge(startVertex: string, endVertex: string): void {
        const startIndex = this.vertexNames.indexOf(startVertex);
        const endIndex = this.vertexNames.indexOf(endVertex);
  
        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return;
        }
  
        // Set the matrix entries to 1 to represent the undirected edge
        this.matrix[startIndex][endIndex] = 1;
        this.matrix[endIndex][startIndex] = 1;
        console.log(`Edge added between ${startVertex} and ${endVertex}.`);
    }
  
    // Display the graph as an adjacency matrix
    displayGraph(): void {
        console.log("Adjacency Matrix:");
        console.log("    " + this.vertexNames.join("  "));
        
        for (let i = 0; i < this.vertexCount; i++) {
            let row = `${this.vertexNames[i]}: `;
            for (let j = 0; j < this.vertexCount; j++) {
                row += `${this.matrix[i][j]} `;
            }
            console.log(row);
        }
    }
  
    // Get the number of vertices in the graph
    numOfNodes(): number {
        return this.vertexCount;
    }
  
    // Get the number of edges in the graph (undirected, count each edge once)
    numOfEdges(): number {
        let edgeCount = 0;
        for (let i = 0; i < this.vertexCount; i++) {
            for (let j = i + 1; j < this.vertexCount; j++) {
                if (this.matrix[i][j] === 1) {
                    edgeCount++;
                }
            }
        }
        return edgeCount;
    }
  
    // Clear the graph (remove all vertices and edges)
    clear(): void {
        this.matrix = [];
        this.vertexNames = [];
        this.vertexCount = 0;
        console.log('Graph cleared.');
    }
  
    // Delete an edge from the graph (undirected)
    deleteEdge(startVertex: string, endVertex: string): void {
        const startIndex = this.vertexNames.indexOf(startVertex);
        const endIndex = this.vertexNames.indexOf(endVertex);
  
        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return;
        }
  
        // Remove the undirected edge by setting both matrix entries to 0
        this.matrix[startIndex][endIndex] = 0;
        this.matrix[endIndex][startIndex] = 0;
        console.log(`Edge removed between ${startVertex} and ${endVertex}. If it was present.`);
    }
  
    // Delete a vertex from the graph along with its associated edges
    deleteVertex(vertex: string): void {
        const index = this.vertexNames.indexOf(vertex);
        if (index === -1) {
            console.log("Vertex not found.");
            return;
        }
  
        // Remove the vertex's row and column from the matrix
        this.matrix.splice(index, 1);  // Remove the row
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].splice(index, 1);  // Remove the column
        }
  
        // Remove the vertex from the list of vertex names
        this.vertexNames.splice(index, 1);
        this.vertexCount--;
        console.log(`Vertex ${vertex} removed successfully.`);
    }
  
    // BFS algorithm to find the shortest path
    shortestPath(source: string, destination: string): string[] | null {
        const startIndex = this.vertexNames.indexOf(source);
        const endIndex = this.vertexNames.indexOf(destination);
    
        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return null;
        }
    
        const dist: number[] = [];
        const prev: number[] = [];
        const visited: boolean[] = [];
        const queue: number[] = []; // Queue for BFS
    
        // Initialize arrays
        for (let i = 0; i < this.vertexCount; i++) {
            dist[i] = Infinity;  // Distance of all vertices from source
            prev[i] = -1;        // Previous vertex for each vertex
            visited[i] = false;  // Track visited vertices
        }
    
        dist[startIndex] = 0;  // Distance from source to source is 0
        queue.push(startIndex); // Enqueue source vertex
    
        while (queue.length > 0) {
            const u = queue.shift()!; // Dequeue vertex
    
            // Explore all neighbors of u
            for (let v = 0; v < this.vertexCount; v++) {
                if (this.matrix[u][v] === 1 && !visited[v]) { // Edge exists and v is unvisited
                    dist[v] = dist[u] + 1; // All edges have cost of 1
                    prev[v] = u;            // Track the previous vertex
                    visited[v] = true;      // Mark v as visited
                    queue.push(v);          // Enqueue v for further exploration
                }
            }
        }
    
        // Reconstruct the shortest path
        let path: string[] = [];
        let current = endIndex;
        while (current !== -1) {
            path.unshift(this.vertexNames[current]);
            current = prev[current];
        }
    
        if (dist[endIndex] === Infinity) {
            console.log("No path found.");
            return null;
        }
    
        return path;
    }
    
  }
  
  
  export default UndirectedGraph;
  
  
  
  // ---------------------- Rough work: Not for you-------------------------------------
  // Example usage
//   const graph = new UndirectedGraph(5);  // Maximum of 5 vertices allowed
  
//   graph.displayGraph();   // Display the graph
  
//   // Add some edges
  
//   graph.addVertex("A");
//   graph.addVertex("B");
//   graph.addVertex("C");
//   graph.addVertex("D");
//   graph.addVertex("E");
  
//   graph.addEdge("A", "B");
//   graph.addEdge("B", "C");
//   graph.addEdge("A", "C");
//   graph.addEdge("C", "D");
//   graph.addEdge("D", "E");
  
//     const sortestPath = graph.shortestPath("A", "C");
// console.log("Shortest Path from A to C:", sortestPath);

//   // Delete an edge
//   graph.deleteEdge("D", "E");
  
//   // Display the graph after deletion
//   graph.displayGraph();
  
//   // Find the shortest path
//   const shortestPath = graph.shortestPath("A", "C");
//   console.log("Shortest Path from A to C:", shortestPath);
  
//   // Delete a vertex
//   graph.deleteVertex("C");
//   graph.displayGraph();  
  