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
  BookOpen,
  AlertCircle
} from "lucide-react";

export default function MathematicsExam() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [showResults, setShowResults] = useState(false);

  // Real Mathematics Exam Questions
  const examQuestions = [
    {
      id: 1,
      question: "Solve the quadratic equation: x² - 5x + 6 = 0",
      options: [
        "x = 2, x = 3",
        "x = 1, x = 6", 
        "x = -2, x = -3",
        "x = 2, x = -3"
      ],
      correctAnswer: 0,
      explanation: "Factor the equation: (x-2)(x-3)=0, so x=2 or x=3",
      topic: "Algebra",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "What is the value of sin(30°) + cos(60°)?",
      options: [
        "0.5",
        "1.0",
        "1.5", 
        "2.0"
      ],
      correctAnswer: 1,
      explanation: "sin(30°) = 0.5 and cos(60°) = 0.5, so 0.5 + 0.5 = 1.0",
      topic: "Trigonometry",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "Find the derivative of f(x) = 3x⁴ - 2x² + 5x - 1",
      options: [
        "12x³ - 4x + 5",
        "12x³ - 4x² + 5",
        "12x³ - 2x + 5",
        "12x³ - 4x + 5x"
      ],
      correctAnswer: 0,
      explanation: "Using power rule: d/dx(3x⁴)=12x³, d/dx(-2x²)=-4x, d/dx(5x)=5, d/dx(-1)=0",
      topic: "Calculus",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "A right triangle has sides of length 3 cm, 4 cm, and 5 cm. What is the area of the triangle?",
      options: [
        "6 cm²",
        "12 cm²",
        "10 cm²",
        "7.5 cm²"
      ],
      correctAnswer: 0,
      explanation: "Area = (1/2) × base × height = (1/2) × 3 × 4 = 6 cm²",
      topic: "Geometry",
      difficulty: "Easy"
    },
    {
      id: 5,
      question: "Solve for x: 2ˣ = 16",
      options: [
        "2",
        "3",
        "4",
        "5"
      ],
      correctAnswer: 2,
      explanation: "16 = 2⁴, so 2ˣ = 2⁴, therefore x = 4",
      topic: "Exponents",
      difficulty: "Easy"
    },
    {
      id: 6,
      question: "What is the probability of rolling a prime number on a fair six-sided die?",
      options: [
        "1/2",
        "1/3",
        "2/3",
        "1/6"
      ],
      correctAnswer: 0,
      explanation: "Prime numbers on a die: 2, 3, 5 → 3 favorable outcomes out of 6 total = 3/6 = 1/2",
      topic: "Probability",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "Find the limit: lim(x→2) (x² - 4)/(x - 2)",
      options: [
        "0",
        "2",
        "4",
        "Undefined"
      ],
      correctAnswer: 2,
      explanation: "Factor numerator: (x-2)(x+2)/(x-2) = x+2, then substitute x=2: 2+2=4",
      topic: "Calculus",
      difficulty: "Medium"
    },
    {
      id: 8,
      question: "If log₁₀2 ≈ 0.3010, what is log₁₀20?",
      options: [
        "1.3010",
        "2.3010",
        "0.6020",
        "1.6990"
      ],
      correctAnswer: 0,
      explanation: "log₁₀20 = log₁₀(2×10) = log₁₀2 + log₁₀10 = 0.3010 + 1 = 1.3010",
      topic: "Logarithms",
      difficulty: "Medium"
    },
    {
      id: 9,
      question: "What is the solution set for |2x - 3| < 5?",
      options: [
        "-1 < x < 4",
        "x < -1 or x > 4",
        "-4 < x < 1",
        "x < 4"
      ],
      correctAnswer: 0,
      explanation: "|2x-3|<5 ⇒ -5<2x-3<5 ⇒ -2<2x<8 ⇒ -1<x<4",
      topic: "Algebra",
      difficulty: "Medium"
    },
    {
      id: 10,
      question: "A circle has equation x² + y² - 6x + 4y - 12 = 0. What is its radius?",
      options: [
        "5",
        "4",
        "6",
        "3"
      ],
      correctAnswer: 0,
      explanation: "Complete the square: (x²-6x+9)+(y²+4y+4)=12+9+4 ⇒ (x-3)²+(y+2)²=25, so radius=√25=5",
      topic: "Coordinate Geometry",
      difficulty: "Hard"
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const toggleFlag = (questionId: unknown) => {
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

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: examQuestions.length,
      percentage: Math.round((correct / examQuestions.length) * 100)
    };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const score = calculateScore();

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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Exam Results</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {score.percentage}%
              </div>
              <p className="text-xl text-gray-600">
                You scored {score.correct} out of {score.total} questions correctly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {examQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${
                    answers[question.id] === question.correctAnswer
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {answers[question.id] === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">
                        Q{index + 1}: {question.question}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Your answer: {answers[question.id] !== undefined 
                          ? question.options[answers[question.id]]
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
              ))}
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/exams')}
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

  const currentQ = examQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mathematics Demo Exam</h1>
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
              <div className="grid grid-cols-5 gap-2">
                {examQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
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

            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Calculator</h3>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">Scientific Calculator</p>
                <p className="text-xs text-gray-500 mt-1">Available for use</p>
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
                  <h4 className="font-semibold text-yellow-800 mb-2">Exam Instructions</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• You have 30 minutes to complete this exam</li>
                    <li>• Answer all questions before time expires</li>
                    <li>• Use the flag feature to mark questions for review</li>
                    <li>• You can navigate between questions using the number grid</li>
                    <li>• Calculator use is permitted</li>
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