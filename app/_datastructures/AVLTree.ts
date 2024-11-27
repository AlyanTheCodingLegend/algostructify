// AVLTree using DLL
// Methods present in it:-
/*
getHeight: to get height of a node
getBalance: to get balance factor that node
insert
inorder trversal
preOrder
postOrder
search: to search with value returns boolean value
delete(delete smallest from right side)

 */
class AvlNode {
    value: number;
    height: number;
    left: AvlNode | null;
    right: AvlNode | null;
  
    constructor(value: number) {
        this.value = value;
        this.height = 1; // Initial height
        this.left = null;
        this.right = null;
    }
  }
  
  class AVLTree {
    root: AvlNode | null;
  
    constructor() {
        this.root = null;
    }
  
    // Utility to get the height of a node
    private getHeight(node: AvlNode | null): number {
        return node ? node.height : 0;
    }
  
    // Utility to get the balance factor of a node
    private getBalance(node: AvlNode | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
  
    // Right rotation
    private rotateRight(y: AvlNode): AvlNode {
        const x = y.left as AvlNode;
        const T2 = x.right;
  
        // Perform rotation
        x.right = y;
        y.left = T2;
  
        // Update heights
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
  
        return x;
    }
  
    // Left rotation
    private rotateLeft(x: AvlNode): AvlNode {
        const y = x.right as AvlNode;
        const T2 = y.left;
  
        // Perform rotation
        y.left = x;
        x.right = T2;
  
        // Update heights
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
  
        return y;
    }
  
    // Insert a value into the AVL tree
    insert(value: number): void {
        this.root = this.insertNode(this.root, value);
    }
  
    private insertNode(node: AvlNode | null, value: number): AvlNode {
        // Perform the normal BST insertion
        if (node === null) {
            return new AvlNode(value);
        }
  
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }
  
        // Update height of this ancestor node
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  
        // Get the balance factor to check whether this node became unbalanced
        const balance = this.getBalance(node);
  
        // If the node becomes unbalanced, perform rotations
        // Left Left Case
        if (balance > 1 && value < (node.left as AvlNode).value) {
            return this.rotateRight(node);
        }
  
        // Right Right Case
        if (balance < -1 && value > (node.right as AvlNode).value) {
            return this.rotateLeft(node);
        }
  
        // Left Right Case
        if (balance > 1 && value > (node.left as AvlNode).value) {
            node.left = this.rotateLeft(node.left as AvlNode);
            return this.rotateRight(node);
        }
  
        // Right Left Case
        if (balance < -1 && value < (node.right as AvlNode).value) {
            node.right = this.rotateRight(node.right as AvlNode);
            return this.rotateLeft(node);
        }
  
        return node;
    }
  
    // In-order traversal for printing the tree
    inOrderTraversal(): void {
        this.inOrder(this.root);
    }
  
    private inOrder(node: AvlNode | null): void {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }
  
    postOrderTraversal(): void {
      this.postOrder(this.root);
  }
  
  private postOrder(node: AvlNode | null): void {
      if (node !== null) {
          this.postOrder(node.left); // Traverse left subtree
          this.postOrder(node.right); // Traverse right subtree
          console.log(node.value); // Visit node
      }
  }
  
  preOrderTraversal(): void {
    this.preOrder(this.root);
  }
  
  private preOrder(node: AvlNode | null): void {
    if (node !== null) {
        console.log(node.value); // Visit node
        this.preOrder(node.left); // Traverse left subtree
        this.preOrder(node.right); // Traverse right subtree
    }
  }
  
  search(value: number): boolean {
    return this.searchNode(this.root, value);
  }
  
  private searchNode(node: AvlNode | null, value: number): boolean {
    if (node === null) {
        return false;
    }
  
    if (value < node.value) {
        return this.searchNode(node.left, value);
    } else if (value > node.value) {
        return this.searchNode(node.right, value);
    } else {
        return true; // value found
    }
  }
  
  delete(value: number): void {
    this.root = this.deleteNode(this.root, value);
  }
  
  private deleteNode(node: AvlNode | null, value: number): AvlNode | null {
    if (node === null) {
        return node;
    }
  
    if (value < node.value) {
        node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
        node.right = this.deleteNode(node.right, value);
    } else {
        // Node to be deleted
        if (node.left === null || node.right === null) {
            let temp = node.left ? node.left : node.right;
            if (temp === null) {
                node = null;
            } else {
                node = temp;
            }
        } else {
            // Node has two children: Get the inorder successor (smallest in the right subtree)
            let temp = this.minValueNode(node.right as AvlNode);
            node.value = temp.value;
            node.right = this.deleteNode(node.right, temp.value);
        }
    }
  
    // If the tree had only one node, return
    if (node === null) {
        return node;
    }
  
    // Update height of the current node
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  
    // Get the balance factor of this node to check whether it became unbalanced
    const balance = this.getBalance(node);
  
    // Left Left Case
    if (balance > 1 && this.getBalance(node.left) >= 0) {
        return this.rotateRight(node);
    }
  
    // Right Right Case
    if (balance < -1 && this.getBalance(node.right) <= 0) {
        return this.rotateLeft(node);
    }
  
    // Left Right Case
    if (balance > 1 && this.getBalance(node.left) < 0) {
        node.left = this.rotateLeft(node.left as AvlNode);
        return this.rotateRight(node);
    }
  
    // Right Left Case
    if (balance < -1 && this.getBalance(node.right) > 0) {
        node.right = this.rotateRight(node.right as AvlNode);
        return this.rotateLeft(node);
    }
  
    return node;
  }
  
  private minValueNode(node: AvlNode): AvlNode {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
  }
  
  
  }


// Exporting
export default AVLTree;



// ---------------------- Rough work: Not for you-------------------------------------

//   // Example usage
//   const avl = new AVLTree();
//   avl.insert(10);
//   avl.insert(20);
//   avl.insert(30);
//   avl.insert(40);
//   avl.insert(50);
//   avl.insert(25);
  
//   console.log("Pre-order traversal:");
//   avl.preOrderTraversal();
  
//   console.log("Post-order traversal:");
//   avl.postOrderTraversal();
  
//   console.log("In-order traversal:");
//   avl.inOrderTraversal();
  
//   console.log("Search 25:", avl.search(25)); // Should return true
//   console.log("Search 15:", avl.search(15)); // Should return false
  
//   avl.delete(25);
//   console.log("In-order traversal after deletion of 25:");
//   avl.inOrderTraversal(); // Should show tree after deletion
  