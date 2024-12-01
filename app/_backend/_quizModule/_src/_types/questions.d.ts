export interface Question {
  id: number;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation?: string;
}

export interface Quiz {
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: Question[];
}
  