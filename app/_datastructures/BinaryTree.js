"use strict";
// Binary treee using Double linked List:
// Methods present in it:-
/*
deleteNodeLeft: This replaces delted node with largest value on left subtree
findMax
deleteNodeRight: This replaces delted node with smallest value on right subtree
findMin
insertNode
inOrderTraversal
preOrderTraversal
postOrderTraversal
*/
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class BinaryTree {
    constructor() {
        this.root = null;
    }
    // method to delete any node with a given value if you want to replace with left side of subtree
    deleteNodeLeft(data) {
        this.root = this.deleteNodeHelperLeft(this.root, data);
    }
    // helper method to delete a node from the tree
    deleteNodeHelperLeft(node, data) {
        if (node === null) {
            return null;
        }
        if (data < node.data) {
            node.left = this.deleteNodeHelperLeft(node.left, data); // search left subtree
        }
        else if (data > node.data) {
            node.right = this.deleteNodeHelperLeft(node.right, data); // search right subtree
        }
        else {
            // node with matching value found
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null) {
                return node.right; // if the node has only right child, promote the right child
            }
            if (node.right === null) {
                return node.left; // if the node has only left child, promote the left child
            }
            // node has two children, find the in-order predecessor (largest node in left subtree)
            const predecessor = this.findMax(node.left);
            if (predecessor) {
                node.data = predecessor.data; // replace node's value with predecessor's value
                node.left = this.deleteNodeHelperLeft(node.left, predecessor.data); // delete the predecessor node
            }
        }
        return node;
    }
    // helper method to find the largest node in a subtree
    findMax(node) {
        while (node.right !== null) {
            node = node.right; // keep going to the rightmost node
        }
        return node;
    }
    // method to delete any node with a given value if you want to replace with right side of subtree
    deleteNodeRight(data) {
        this.root = this.deleteNodeHelperRight(this.root, data);
    }
    // helper method to delete a node from the tree
    deleteNodeHelperRight(node, data) {
        if (node === null) {
            return null;
        }
        if (data < node.data) {
            node.left = this.deleteNodeHelperRight(node.left, data); // search left subtree
        }
        else if (data > node.data) {
            node.right = this.deleteNodeHelperRight(node.right, data); // search right subtree
        }
        else {
            // node with matching value found
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null) {
                return node.right; // if the node has only right child, promote the right child
            }
            if (node.right === null) {
                return node.left; // if the node has only left child, promote the left child
            }
            // node has two children, find the in-order successor (smallest node in right subtree)
            const successor = this.findMin(node.right);
            if (successor) {
                node.data = successor.data; // replace node's value with successor's value
                node.right = this.deleteNodeHelperRight(node.right, successor.data); // delete the successor node
            }
        }
        return node;
    }
    // helper method to find the smallest node in a subtree
    findMin(node) {
        while (node.left !== null) {
            node = node.left; // keep going to the leftmost node
        }
        return node;
    }
    // method to insert a value into the tree
    insert(data) {
        const newNode = new TreeNode(data); // create a new node
        if (this.root === null) {
            this.root = newNode; // set the new node as root if tree is empty
        }
        else {
            this.insertNode(this.root, newNode); // otherwise, insert recursively
        }
    }
    // helper method to insert a node into the tree
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode; // insert as left child if position is empty
            }
            else {
                this.insertNode(node.left, newNode); // otherwise, continue in left subtree
            }
        }
        else {
            if (node.right === null) {
                node.right = newNode; // insert as right child if position is empty
            }
            else {
                this.insertNode(node.right, newNode); // otherwise, continue in right subtree
            }
        }
    }
    // method to perform in-order traversal: left -> root -> right
    inOrderTraversal(node = this.root) {
        if (node !== null) {
            this.inOrderTraversal(node.left); // traverse left subtree
            console.log(node.data); // visit the root
            this.inOrderTraversal(node.right); // traverse right subtree
        }
    }
    // method to perform pre-order traversal: root -> left -> right
    preOrderTraversal(node = this.root) {
        if (node !== null) {
            console.log(node.data); // visit the root
            this.preOrderTraversal(node.left); // traverse left subtree
            this.preOrderTraversal(node.right); // traverse right subtree
        }
    }
    // method to perform post-order traversal: left -> right -> root
    postOrderTraversal(node = this.root) {
        if (node !== null) {
            this.postOrderTraversal(node.left); // traverse left subtree
            this.postOrderTraversal(node.right); // traverse right subtree
            console.log(node.data); // visit the root
        }
    }
}
// Exporting
exports.default = BinaryTree;
// ---------------------- Rough work: Not for you-------------------------------------
// // example usage:
// const binaryTree = new BinaryTree<number>();
// binaryTree.deleteNodeRight(2);
// binaryTree.insert(2);
// binaryTree.insert(7);
// binaryTree.insert(9);
// binaryTree.insert(6);
// binaryTree.insert(5);
// binaryTree.insert(8);
// binaryTree.insert(1);
// console.log("in-order traversal:");
// binaryTree.inOrderTraversal();
// console.log("\npre-order traversal:");
// binaryTree.preOrderTraversal();
// console.log("\npost-order traversal:");
// binaryTree.postOrderTraversal();
// binaryTree.deleteNodeLeft(2);
// console.log("\npre-order traversal:");
// binaryTree.preOrderTraversal();
// binaryTree.deleteNodeRight(2);
// console.log("\npre-order traversal:");
// binaryTree.preOrderTraversal();
