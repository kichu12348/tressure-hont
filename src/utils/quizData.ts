export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const numbers = [
  {
    num: 15,
    binary: "1111",
  },
  {
    num: 11,
    binary: "1011",
  },
  {
    num: 13,
    binary: "1101",
  },
  {
    num: 9,
    binary: "1001",
  },
];
const sqNumbers = [
  { num: 144, sqrt: 12 },
  { num: 196, sqrt: 14 },
  { num: 256, sqrt: 16 },
  { num: 100, sqrt: 10 },
];

const elements = [
  { symbol: "Au", name: "Gold" },
  { symbol: "Ag", name: "Silver" },
  { symbol: "Gd", name: "Gadolinium" },
];

const chemicalMolecules = [
  { formula: "H2O", name: "Water" },
  { formula: "CO2", name: "Carbon Dioxide" },
  { formula: "O2", name: "Oxygen" },
  { formula: "H2O2", name: "Hydrogen Peroxide" },
];

const getRandomizedOptions = (): {
  randomNumberQ: { num: number; binary: string };
  randomSquareQ: { num: number; sqrt: number };
  randomElementQ: { symbol: string; name: string };
  randomMoleculeQ: { formula: string; name: string };
} => {
  const randomNumberQ = numbers[Math.floor(Math.random() * numbers.length)];
  const randomSquareQ = sqNumbers[Math.floor(Math.random() * sqNumbers.length)];
  const randomElementQ = elements[Math.floor(Math.random() * elements.length)];
  const randomMoleculeQ = chemicalMolecules[Math.floor(Math.random() * chemicalMolecules.length)];

  return {
    randomNumberQ,
    randomSquareQ,
    randomElementQ,
    randomMoleculeQ,
  };
};


const generateQuizQuestion = getRandomizedOptions();

const quizQuestions: Question[] = [
  {
    id: 1,
    text: `What is the chemical symbol for ${generateQuizQuestion.randomElementQ.name}?`,
    options: ["Go", "Au", "Ag", "Gd"],
    correctAnswer: generateQuizQuestion.randomElementQ.symbol,
  },
  {
    id: 2,
    text: `In binary, what is the decimal number ${generateQuizQuestion.randomNumberQ.num} represented as?`,
    options: ["1111", "1011", "1101", "1001"],
    correctAnswer: generateQuizQuestion.randomNumberQ.binary,
  },
  {
    id: 3,
    text: `What is the square root of ${generateQuizQuestion.randomSquareQ.num}?`,
    options: ["12", "14", "16", "10"],
    correctAnswer: `${generateQuizQuestion.randomSquareQ.sqrt}`,
  },
  {
    id: 4,
    text: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn",
  },
  {
    id: 5,
    text: "What is the value of π (pi) to two decimal places?",
    options: ["3.14", "3.16", "3.12", "3.18"],
    correctAnswer: "3.14",
  },
  {
    id: 6,
    text: `What is the molecular formula for ${generateQuizQuestion.randomMoleculeQ.name}?`,
    options: ["H2O", "CO2", "O2", "H2O2"],
    correctAnswer: generateQuizQuestion.randomMoleculeQ.formula,
  },
  {
    id: 7,
    text: "What is the speed of light in a vacuum (in meters per second)?",
    options: ["299,792,458", "300,000,000", "310,000,000", "290,000,000"],
    correctAnswer: "299,792,458",
  },
  {
    id: 8,
    text: "What is the process called where plants convert light into energy?",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"],
    correctAnswer: "Photosynthesis",
  },
];

export default quizQuestions;
