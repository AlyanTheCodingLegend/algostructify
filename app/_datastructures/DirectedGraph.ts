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
bfs 
dfs

 */
class DirectedGraph {
    private matrix: number[][];  // adjacency matrix to store the graph
    private vertexNames: string[];  // list of vertex names for easy reference
    private vertexCount: number;  // track of the number of vertices currently in the graph
    private maxVertices: number;  // Max number of vertices allowed

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

    // Add an edge between two vertices
    addEdge(startVertex: string, endVertex: string): void {
        const startIndex = this.vertexNames.indexOf(startVertex);
        const endIndex = this.vertexNames.indexOf(endVertex);

        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return;
        }

        // Set the matrix entry to 1 to represent the edge
        this.matrix[startIndex][endIndex] = 1;
        console.log(`Edge added from ${startVertex} to ${endVertex}.`);
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

    // Get the number of edges in the graph
    numOfEdges(): number {
        let edgeCount = 0;
        for (let i = 0; i < this.vertexCount; i++) {
            for (let j = 0; j < this.vertexCount; j++) {
                if (this.matrix[i][j] === 1) edgeCount++;
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

    // Delete an edge from the graph
    deleteEdge(startVertex: string, endVertex: string): void {
        const startIndex = this.vertexNames.indexOf(startVertex);
        const endIndex = this.vertexNames.indexOf(endVertex);

        if (startIndex === -1 || endIndex === -1) {
            console.log("One or both vertices not found.");
            return;
        }

        // Remove the edge (set the matrix entry to 0)
        this.matrix[startIndex][endIndex] = 0;
        console.log(`Edge removed from ${startVertex} to ${endVertex}. If it was present.`);
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

    // BFS to find the shortest path (unweighted graph)
shortestPath(source: string, destination: string): string[] | null {
    const startIndex = this.vertexNames.indexOf(source);
    const endIndex = this.vertexNames.indexOf(destination);

    if (startIndex === -1 || endIndex === -1) {
        console.log("One or both vertices not found.");
        return null;
    }

    const queue: number[] = [];  // Queue for BFS
    const visited: boolean[] = [];  // Visited vertices
    const prev: number[] = [];  // To store the previous vertex on the path
    
    // Initialize visited and previous arrays
    for (let i = 0; i < this.vertexCount; i++) {
        visited[i] = false;
        prev[i] = -1;
    }

    // Start BFS from the source
    visited[startIndex] = true;
    queue.push(startIndex);

    while (queue.length > 0) {
        const u = queue.shift()!;  // Get the front of the queue

        // If we've reached the destination, break out of the loop
        if (u === endIndex) {
            break;
        }

        // Explore the neighbors of the current vertex
        for (let v = 0; v < this.vertexCount; v++) {
            if (!visited[v] && this.matrix[u][v] === 1) {  // Edge exists
                visited[v] = true;
                prev[v] = u;
                queue.push(v);
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

    // If the destination is still not reached, no path exists
    if (visited[endIndex] === false) {
        console.log("No path found.");
        return null;
    }

    return path;
}

bfs(startVertex: string): string[] {
    const startIndex = this.vertexNames.indexOf(startVertex);

    if (startIndex === -1) {
        console.log("Vertex not found.");
        return [];
    }

    const visited: boolean[] = []; // Initialize empty visited array
    for (let i = 0; i < this.vertexCount; i++) {
        visited[i] = false; // Set each index to false explicitly
    }

    const result: string[] = []; // To store traversal order
    const queue: number[] = []; // BFS queue

    // Start BFS from the given vertex
    visited[startIndex] = true;
    queue.push(startIndex);

    while (queue.length > 0) {
        const currentIndex = queue.shift()!;
        result.push(this.vertexNames[currentIndex]);

        // Explore neighbors of the current vertex
        for (let i = 0; i < this.vertexCount; i++) {
            if (this.matrix[currentIndex][i] !== 0 && !visited[i]) {
                visited[i] = true;
                queue.push(i);
            }
        }
    }

    return result;
}


// dfs code
dfs(startVertex: string): string[] {
    const startIndex = this.vertexNames.indexOf(startVertex);

    if (startIndex === -1) {
        console.log("Vertex not found.");
        return [];
    }

    const visited: boolean[] = []; // Initialize empty visited array
    for (let i = 0; i < this.vertexCount; i++) {
        visited[i] = false; // Set each index to false explicitly
    }
    
    const result: string[] = []; // Stores the traversal order
    const stack: number[] = []; // Stack for DFS

    // Push the start vertex to the stack
    stack.push(startIndex);

    while (stack.length > 0) {
        const currentIndex = stack.pop()!; // Pop the top of the stack
        if (!visited[currentIndex]) {
            visited[currentIndex] = true;
            result.push(this.vertexNames[currentIndex]);

            // Visit all neighbors of the current vertex (push to stack)
            for (let i = 0; i < this.vertexCount; i++) {
                if (this.matrix[currentIndex][i] !== 0 && !visited[i]) {
                    stack.push(i); // Push unvisited neighbors to stack
                }
            }
        }
    }

    return result;
}



}


export default DirectedGraph;


// ---------------------- Rough work: Not for you-------------------------------------
// // Example usage
// const graph = new DirectedGraph(5);  // Maximum of 5 vertices allowed
// // graph.takeUserInput();  // Ask the user to input vertices
// // graph.displayGraph();   // Display the graph

// // Add some edges
// console.log(graph.dfs("A"));
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");

// graph.addEdge("A", "B");
// graph.addEdge("B", "C");
// graph.addEdge("A", "C");
// graph.addEdge("C", "D");
// graph.addEdge("D", "E");
// console.log(graph.dfs("A"));
// console.log(graph.dfs("C"));
// // Delete an edge
// graph.deleteEdge("D", "E");

// // Display the graph after deletion
// graph.displayGraph();

// // Find the shortest path
// const shortestPath = graph.shortestPath("A", "C");
// console.log("Shortest Path from A to C:", shortestPath);

// // Delete a vertex
// graph.deleteVertex("C");
// graph.displayGraph();  // Display the graph after deletion of vertex B
