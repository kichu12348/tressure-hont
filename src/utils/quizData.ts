export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Au", "Ag", "Gd"],
    correctAnswer: "Au"
  },
  {
    id: 2,
    text: "In binary, what is the decimal number 15 represented as?",
    options: ["1111", "1011", "1101", "1001"],
    correctAnswer: "1111"
  },
  {
    id: 3,
    text: "What is the square root of 144?",
    options: ["12", "14", "16", "10"],
    correctAnswer: "12"
  },
  {
    id: 4,
    text: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn"
  },
  {
    id: 5,
    text: "What is the value of π (pi) to two decimal places?",
    options: ["3.14", "3.16", "3.12", "3.18"],
    correctAnswer: "3.14"
  },
  {
    id: 6,
    text: "What is the molecular formula for water?",
    options: ["H2O", "CO2", "O2", "H2O2"],
    correctAnswer: "H2O"
  },
  {
    id: 7,
    text: "What is the speed of light in a vacuum (in meters per second)?",
    options: ["299,792,458", "300,000,000", "310,000,000", "290,000,000"],
    correctAnswer: "299,792,458"
  },
  {
    id: 8,
    text: "What is the process called where plants convert light into energy?",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"],
    correctAnswer: "Photosynthesis"
  }
];

export default quizQuestions;
