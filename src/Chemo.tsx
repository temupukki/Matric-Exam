import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Calculator, 
  Flag, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Beaker
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface Answers {
  [key: number]: number;
}

interface Score {
  correct: number;
  total: number;
  percentage: number;
}

export default function Chemistry() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes in seconds
  const [answers, setAnswers] = useState<Answers>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState<boolean>(false);

  // Real Chemistry Exam Questions
  const examQuestions: Question[] = [
    {
      id: 1,
      question: "What is the atomic number of Carbon?",
      options: [
        "6",
        "12",
        "14", 
        "8"
      ],
      correctAnswer: 0,
      explanation: "Carbon has 6 protons in its nucleus, giving it an atomic number of 6.",
      topic: "Atomic Structure",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Which of the following is a noble gas?",
      options: [
        "Helium",
        "Chlorine",
        "Oxygen", 
        "Nitrogen"
      ],
      correctAnswer: 0,
      explanation: "Helium is a noble gas located in Group 18 of the periodic table.",
      topic: "Periodic Table",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is the pH of a neutral solution at 25°C?",
      options: [
        "7",
        "0",
        "14",
        "1"
      ],
      correctAnswer: 0,
      explanation: "A neutral solution has equal concentrations of H⁺ and OH⁻ ions, giving it a pH of 7.",
      topic: "Acids and Bases",
      difficulty: "Easy"
    },
    {
      id: 4,
      question: "Balance the chemical equation: CH₄ + O₂ → CO₂ + H₂O",
      options: [
        "CH₄ + 2O₂ → CO₂ + 2H₂O",
        "2CH₄ + O₂ → 2CO₂ + 2H₂O",
        "CH₄ + O₂ → CO₂ + H₂O",
        "CH₄ + 3O₂ → CO₂ + 2H₂O"
      ],
      correctAnswer: 0,
      explanation: "The balanced equation is CH₄ + 2O₂ → CO₂ + 2H₂O, with equal atoms on both sides.",
      topic: "Chemical Equations",
      difficulty: "Medium"
    },
    {
      id: 5,
      question: "What type of bond is formed between sodium and chlorine in NaCl?",
      options: [
        "Ionic bond",
        "Covalent bond",
        "Metallic bond",
        "Hydrogen bond"
      ],
      correctAnswer: 0,
      explanation: "NaCl forms an ionic bond through the transfer of electrons from sodium to chlorine.",
      topic: "Chemical Bonding",
      difficulty: "Medium"
    },
    {
      id: 6,
      question: "How many moles are in 36 grams of water (H₂O)?",
      options: [
        "2 moles",
        "1 mole",
        "3 moles",
        "0.5 moles"
      ],
      correctAnswer: 0,
      explanation: "Molar mass of H₂O = 18 g/mol. Moles = mass/molar mass = 36/18 = 2 moles.",
      topic: "Stoichiometry",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "Which element has the electron configuration 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹?",
      options: [
        "Potassium",
        "Calcium",
        "Argon",
        "Sodium"
      ],
      correctAnswer: 0,
      explanation: "This electron configuration corresponds to potassium (K) with atomic number 19.",
      topic: "Electron Configuration",
      difficulty: "Hard"
    },
    {
      id: 8,
      question: "What is the oxidation state of sulfur in H₂SO₄?",
      options: [
        "+6",
        "+4",
        "-2",
        "+2"
      ],
      correctAnswer: 0,
      explanation: "In H₂SO₄, H=+1, O=-2. Let S=x. Then 2(+1) + x + 4(-2) = 0 ⇒ 2 + x - 8 = 0 ⇒ x = +6.",
      topic: "Redox Reactions",
      difficulty: "Hard"
    },
    {
      id: 9,
      question: "Which of the following is a strong acid?",
      options: [
        "HCl",
        "CH₃COOH",
        "H₂CO₃",
        "H₃PO₄"
      ],
      correctAnswer: 0,
      explanation: "HCl (hydrochloric acid) is a strong acid that completely dissociates in water.",
      topic: "Acids and Bases",
      difficulty: "Medium"
    },
    {
      id: 10,
      question: "What is the IUPAC name for CH₃CH₂CH₂CH₃?",
      options: [
        "Butane",
        "Propane",
        "Pentane",
        "Hexane"
      ],
      correctAnswer: 0,
      explanation: "CH₃CH₂CH₂CH₃ has 4 carbon atoms in a continuous chain, so it's called butane.",
      topic: "Organic Chemistry",
      difficulty: "Medium"
    },
    {
      id: 11,
      question: "In which type of reaction do two compounds exchange ions?",
      options: [
        "Double displacement",
        "Single displacement",
        "Combination",
        "Decomposition"
      ],
      correctAnswer: 0,
      explanation: "Double displacement reactions involve the exchange of ions between two compounds.",
      topic: "Reaction Types",
      difficulty: "Easy"
    },
    {
      id: 12,
      question: "What is the volume of 1 mole of any gas at STP?",
      options: [
        "22.4 L",
        "44.8 L",
        "11.2 L",
        "33.6 L"
      ],
      correctAnswer: 0,
      explanation: "At Standard Temperature and Pressure (STP), 1 mole of any gas occupies 22.4 liters.",
      topic: "Gas Laws",
      difficulty: "Medium"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      setShowResults(true);
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number): void => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const toggleFlag = (questionId: number): void => {
    setFlagged(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return newFlagged;
    });
  };

  const calculateScore = (): Score => {
    let correct = 0;
    examQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / examQuestions.length) * 100);
    return {
      correct,
      total: examQuestions.length,
      percentage
    };
  };

  const handleSubmit = (): void => {
    setShowResults(true);
  };

  const score: Score = calculateScore();

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Chemistry Exam Results</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {score.percentage}%
              </div>
              <p className="text-xl text-gray-600">
                You scored {score.correct} out of {score.total} questions correctly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {examQuestions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">
                          Q{index + 1}: {question.question}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Your answer: {userAnswer !== undefined 
                            ? question.options[userAnswer]
                            : 'Not answered'
                          }
                        </p>
                        <p className="text-sm text-gray-600">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                        <p className="text-sm text-blue-600 mt-2">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/demo')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Back to Exams
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ: Question = examQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chemistry Demo Exam</h1>
              <p className="text-gray-600">Grade 10 - Final Examination</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-mono text-red-600 font-bold">{formatTime(timeLeft)}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {examQuestions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Questions Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-4 gap-2">
                {examQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                      currentQuestion === index
                        ? 'bg-blue-500 text-white'
                        : answers[index]
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : flagged.has(index)
                        ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                    {flagged.has(index) && (
                      <Flag className="w-3 h-3 absolute -top-1 -right-1 fill-current text-yellow-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                  <span className="text-gray-600">Flagged</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
              </div>
            </motion.div>

            {/* Periodic Table Reference */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Beaker className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Chemistry Reference</h3>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">Periodic Table Available</p>
                <p className="text-xs text-gray-500 mt-1">Common elements and atomic numbers</p>
              </div>
            </motion.div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {currentQ.topic}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleFlag(currentQuestion)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    flagged.has(currentQuestion)
                      ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Flag className={`w-4 h-4 ${flagged.has(currentQuestion) ? 'fill-current' : ''}`} />
                  {flagged.has(currentQuestion) ? 'Flagged' : 'Flag Question'}
                </button>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-relaxed">
                  {currentQ.question}
                </h2>
                
                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswerSelect(currentQ.id, index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[currentQ.id] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQ.id] === index
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </motion.button>

                {currentQuestion === examQuestions.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Submit Exam
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentQuestion(prev => Math.min(examQuestions.length - 1, prev + 1))}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Chemistry Exam Instructions</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• You have 30 minutes to complete this exam</li>
                    <li>• Answer all questions before time expires</li>
                    <li>• Use the flag feature to mark questions for review</li>
                    <li>• You can navigate between questions using the number grid</li>
                    <li>• Periodic table reference is available</li>
                    <li>• Show all chemical equations clearly</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}