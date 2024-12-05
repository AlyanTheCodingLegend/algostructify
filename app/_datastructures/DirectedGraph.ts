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
longestPath
display

*/

class DirectedGraph {
    public graph: { [key: string]: string[] };
    public edgesCount: number;

    constructor() {
        this.graph = {};
        this.edgesCount = 0;
    }

    addVertex(vertex: string): void {
        if (!(vertex in this.graph)) {
            this.graph[vertex] = [];
        } else {
            console.log(`Vertex ${vertex} already exists.`);
        }
    }

    addEdge(startVertex: string, endVertex: string): void {
        if (startVertex in this.graph) {
            this.graph[startVertex].push(endVertex);
            this.edgesCount++;
        } else {
            console.log(`Start vertex ${startVertex} not found.`);
        }
    }

    deleteVertex(vertex: string): void {
        if (vertex in this.graph) {
            // Remove edges pointing to this vertex
            for (const key in this.graph) {
                this.graph[key] = this.graph[key].filter(v => v !== vertex);
            }
            // Remove the vertex and its edges
            this.edgesCount -= this.graph[vertex].length;
            delete this.graph[vertex];
        } else {
            console.log(`Vertex ${vertex} does not exist.`);
        }
    }

    deleteEdge(startVertex: string, endVertex: string): void {
        if (startVertex in this.graph) {
            const edges = this.graph[startVertex];
            const index = edges.indexOf(endVertex);
            if (index !== -1) {
                edges.splice(index, 1);
                this.edgesCount--;
            } else {
                console.log(`Edge from ${startVertex} to ${endVertex} does not exist.`);
            }
        } else {
            console.log(`Vertex ${startVertex} does not exist.`);
        }
    }

    numOfNodes(): number {
        return Object.keys(this.graph).length;
    }

    numOfEdges(): number {
        return this.edgesCount;
    }

    clear(): void {
        this.graph = {};
        this.edgesCount = 0;
    }

    shortestPath(source: string, destination: string): string[] | null {
        if (!(source in this.graph) || !(destination in this.graph)) {
            console.log(`One or both vertices do not exist.`);
            return null;
        }

        const queue: [string, string[]][] = [[source, [source]]];
        const visited: string[] = [];

        while (queue.length > 0) {
            const [current, path] = queue.shift()!;
            if (current === destination) {
                return path;
            }

            if (visited.indexOf(current) === -1) {
                visited.push(current);
                for (const neighbor of this.graph[current]) {
                    queue.push([neighbor, [...path, neighbor]]);
                }
            }
        }

        return null; // No path found
    }

    longestPath(source: string, destination: string): string[] | null {
        if (!(source in this.graph) || !(destination in this.graph)) {
            console.log(`One or both vertices do not exist.`);
            return null;
        }

        let longestPath: string[] | null = null;

        const dfs = (current: string, path: string[]) => {
            if (current === destination) {
                if (!longestPath || path.length > longestPath.length) {
                    longestPath = [...path];
                }
                return;
            }

            for (const neighbor of this.graph[current]) {
                if (path.indexOf(neighbor) === -1) {
                    dfs(neighbor, [...path, neighbor]);
                }
            }
        };

        dfs(source, [source]);
        return longestPath;
    }

    displayGraph(): void {
        for (const vertex in this.graph) {
            if (this.graph.hasOwnProperty(vertex)) {
                console.log(`${vertex} -> ${this.graph[vertex].join(", ")}`);
            }
        }
    }
}


export default DirectedGraph;


// ---------------------- Rough work: Not for you-------------------------------------


// // Example usage:
// const graph = new DirectedGraph();
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addEdge("A", "B");
// graph.addEdge("A", "C");
// graph.addEdge("B", "C");
// graph.addEdge("C", "D");

// console.log("Graph:");
// graph.displayGraph();

// console.log("\nNumber of nodes:", graph.numOfNodes());
// console.log("Number of edges:", graph.numOfEdges());

// console.log("\nShortest path from A to D:", graph.shortestPath("A", "D"));
// console.log("Longest path from A to D:", graph.longestPath("A", "D"));

// graph.deleteEdge("A", "C");
// console.log("\nAfter deleting edge A -> C:");
// graph.displayGraph();

// graph.deleteVertex("C");
// console.log("\nAfter deleting vertex C:");
// graph.displayGraph();

// console.log("\nShortest path from A to D:", graph.shortestPath("A", "D"));

// graph.clear();
// console.log("\nAfter clearing the graph:");
// graph.displayGraph();
