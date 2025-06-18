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
    text: "Which Indian woman started as a brewer and later became a famous biotech entrepreneur?",
    options: ["Indra Nooyi", "Falguni Nayar", "Kiran Mazumdar-Shaw", "Naina Lal Kidwai"],
    correctAnswer: "Kiran Mazumdar-Shaw",
  },
  {
    id: 4,
    text: "Who is the only person to win Nobel Prizes in both Physics and Chemistry?",
    options: ["Linus Pauling", "Marie Curie", "Albert Einstein", "Dorothy Hodgkin"],
    correctAnswer: "Marie Curie",
  },
  {
    id: 5,
    text: "What insect was found inside an early computer, leading to the word \"debugging\"?",
    options: ["Beetle", "Moth", "Ant", "Spider"],
    correctAnswer: "Moth",
  },
  {
    id: 6,
    text: "Who created the COBOL programming language and worked for the U.S. Navy?",
    options: ["Ada Lovelace", "Grace Hopper", "Katherine Johnson", "Barbara Liskov"],
    correctAnswer: "Grace Hopper",
  },
  {
    id: 7,
    text: "She was the first Indian-born woman to go to space and became a symbol of courage and dreams in STEM. Who is she?",
    options: ["Sunita Williams", "Kalpana Chawla", "Tessy Thomas", "Ritu Karidhal"],
    correctAnswer: "Kalpana Chawla",
  },
  {
    id: 8,
    text: "What machine did Rosalind Franklin use to take the famous Photo 51 of DNA?",
    options: ["Electron microscope", "MRI scanner", "X-ray crystallography", "DNA sequencer"],
    correctAnswer: "X-ray crystallography",
  },
];

export default quizQuestions;
