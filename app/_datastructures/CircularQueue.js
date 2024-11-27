"use strict";
// circular queue using Double linked List:
// Methods present in it:-
// Enque
// deque
// isFull
// isEmpty
// peek
// display
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
class ListNode {
    constructor(value) {
        this.next = null;
        this.value = value;
    }
}
exports.ListNode = ListNode;
class CircularQueue {
    constructor(maxSize) {
        this.front = null;
        this.rear = null;
        this.size = 0;
        this.MAX_QUEUE = maxSize;
    }
    isFull() {
        return this.size === this.MAX_QUEUE;
    }
    isEmpty() {
        return this.size === 0;
    }
    enqueue(value) {
        if (this.isFull()) {
            console.log("Queue is full");
            // return false;
        }
        const newNode = new ListNode(value);
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
            newNode.next = newNode; // Point to itself since it's circular
        }
        else {
            newNode.next = this.rear.next;
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
        // return true;
    }
    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }
        const frontValue = this.front.value;
        if (this.front === this.rear) {
            this.front = this.rear = null;
        }
        else {
            this.front = this.front.next;
            this.rear.next = this.front;
        }
        this.size--;
        return frontValue;
    }
    peek() {
        return this.isEmpty() ? null : this.front.value;
    }
    display() {
        if (this.isEmpty()) {
            console.log("Queue is empty.");
            return;
        }
        let result = "Queue: ";
        let current = this.front;
        do {
            result += current.value + " ";
            current = current.next;
        } while (current !== this.front);
        console.log(result.trim());
    }
}
// Exporting
exports.default = CircularQueue;
// ---------------------- Rough work: Not for you-------------------------------------
// Example usage:
// const queue = new CircularQueue<number>(3);
// console.log(queue.enqueue(1)); // true
// console.log(queue.enqueue(2)); // true
// console.log(queue.enqueue(3)); // false, queue is full
// console.log(queue.dequeue());  // 1
// console.log(queue.enqueue(3)); // true
// console.log(queue.peek());     // 2
// console.log(queue.dequeue());  // 2
// console.log(queue.dequeue());  // 3
// console.log(queue.isEmpty());  // true
