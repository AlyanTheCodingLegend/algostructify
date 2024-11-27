"use strict";
// This is queeue using circular increment in array:
// Methods present in it:-
// enqueue
// dequeue
// isFull
// isEmpty
// peek
// display
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor(capacity) {
        this.capacity = capacity;
        this.queue = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }
    // Check if the queue is empty
    isEmpty() {
        return this.size === 0;
    }
    // Check if the queue is full
    isFull() {
        return this.size === this.capacity;
    }
    // Add an element to the queue
    enqueue(item) {
        if (this.isFull()) {
            console.log("Queue is full, cannot add more elements.");
            return;
        }
        this.rear = (this.rear + 1) % this.capacity; // Circular increment
        this.queue[this.rear] = item;
        this.size++;
    }
    // Remove an element from the queue
    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty, nothing to dequeue.");
            return null;
        }
        const item = this.queue[this.front];
        this.queue[this.front] = null; // Clear the dequeued slot
        this.front = (this.front + 1) % this.capacity; // Circular increment
        this.size--;
        return item;
    }
    // Display the queue elements
    display() {
        if (this.isEmpty()) {
            console.log("Queue is empty.");
            return;
        }
        let result = "Queue: ";
        for (let i = 0; i < this.size; i++) {
            result += this.queue[(this.front + i) % this.capacity] + " ";
        }
        console.log(result.trim());
    }
    peek() {
        if (this.isEmpty()) {
            console.log("Queue is empty, nothing to peek.");
            return null;
        }
        return this.queue[this.front];
    }
}
// Exporting
exports.default = Queue;
// ---------------------- Rough work: Not for you-------------------------------------
// Example usage
// const queue = new Queue<number>(5);
// queue.dequeue();
// queue.enqueue(10);
// queue.enqueue(20);
// queue.enqueue(30);
// queue.enqueue(40);
// queue.enqueue(50);
// queue.display(); // Queue: 10 20 30 40 50
// queue.dequeue();
// queue.dequeue();
// queue.display(); // Queue: 30 40 50
// queue.enqueue(60);
// queue.enqueue(70);
// queue.display(); // Queue: 30 40 50 60 70
// queue.enqueue(80); // Queue is full
