import fs from "fs";

const LEADERBOARD_FILE = "./app/_backend/_quizModule/_src/_data/leaderboard.json";

export type ScoreNode = {
  studentId: string;
  score: number;
  topic: string;
  left: ScoreNode | null;
  right: ScoreNode | null;
};

class BST {
  root: ScoreNode | null = null;

  insert(studentId: string, score: number, topic: string) {
    const newNode: ScoreNode = { studentId, score, topic, left: null, right: null };
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: ScoreNode, newNode: ScoreNode) {
    if (newNode.score > node.score) {
      if (!node.left) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  toSortedArray(): ScoreNode[] {
    const result: ScoreNode[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  private inOrderTraversal(node: ScoreNode | null, result: ScoreNode[]) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node);
      this.inOrderTraversal(node.right, result);
    }
  }
}

// Load and save leaderboard data
function loadLeaderboard(): ScoreNode[] {
  if (!fs.existsSync(LEADERBOARD_FILE)) return [];
  return JSON.parse(fs.readFileSync(LEADERBOARD_FILE, "utf-8"));
}

function saveLeaderboard(data: ScoreNode[]) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(data, null, 2));
}

// Update leaderboard
export function updateLeaderboard(studentId: string, score: number, topic: string) {
  const existingScores = loadLeaderboard();

  // Create new score node and add it to the leaderboard
  const newScore: ScoreNode = { studentId, score, topic, left: null, right: null };
  existingScores.push(newScore);

  // Save updated leaderboard to file
  saveLeaderboard(existingScores);
}


// Get leaderboard
export function getLeaderboard(topic: string): ScoreNode[] {
  const allScores = loadLeaderboard();
  return allScores.filter((score) => score.topic === topic);
}
