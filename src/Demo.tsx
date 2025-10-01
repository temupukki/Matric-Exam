import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  Star, 
  PlayCircle,
  Bookmark,
  Share2,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Calendar,
  FileText
} from "lucide-react";

export default function Demo() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedExam, setSelectedExam] = useState(null);

  const examCategories = [
    { id: "all", label: "All Exams", icon: <BookOpen className="w-4 h-4" />, count: 12 },
    { id: "social", label: "Social Sciences", icon: <Users className="w-4 h-4" />, count: 6 },
    { id: "natural", label: "Natural Sciences", icon: <Zap className="w-4 h-4" />, count: 6 },
    { id: "popular", label: "Most Popular", icon: <Star className="w-4 h-4" />, count: 4 }
  ];

  const demoExams = [
    {
      id: 1,
      title: "Mathematics - Grade 10 Final",
      subject: "Mathematics",
      category: "natural",
      duration: 180,
      questions: 50,
      difficulty: "Advanced",
      popularity: 95,
      description: "Comprehensive mathematics exam covering algebra, geometry, and calculus topics for grade 10 students.",
      topics: ["Algebra", "Geometry", "Calculus", "Statistics"],
      attempts: 1250,
      averageScore: 72,
      premium: false,
      color: "from-blue-500 to-cyan-500",
      icon: "🧮"
    },
    {
      id: 2,
      title: "History - World Wars & Modern Era",
      subject: "History",
      category: "social",
      duration: 120,
      questions: 40,
      difficulty: "Intermediate",
      popularity: 88,
      description: "Explore the major events of World Wars and their impact on modern global politics and society.",
      topics: ["World War I", "World War II", "Cold War", "Modern History"],
      attempts: 980,
      averageScore: 68,
      premium: false,
      color: "from-orange-500 to-red-500",
      icon: "📜"
    },
    {
      id: 3,
      title: "Physics - Mechanics & Thermodynamics",
      subject: "Physics",
      category: "natural",
      duration: 150,
      questions: 45,
      difficulty: "Advanced",
      popularity: 92,
      description: "Test your understanding of mechanical systems, motion, and thermodynamic principles.",
      topics: ["Kinematics", "Dynamics", "Thermodynamics", "Energy"],
      attempts: 1100,
      averageScore: 65,
      premium: true,
      color: "from-purple-500 to-pink-500",
      icon: "⚛️"
    },
    {
      id: 4,
      title: "Economics - Micro & Macro Economics",
      subject: "Economics",
      category: "social",
      duration: 135,
      questions: 38,
      difficulty: "Intermediate",
      popularity: 85,
      description: "Comprehensive economics exam covering both micro and macroeconomic principles.",
      topics: ["Supply & Demand", "Market Structures", "GDP", "Inflation"],
      attempts: 850,
      averageScore: 70,
      premium: false,
      color: "from-green-500 to-emerald-500",
      icon: "📈"
    },
    {
      id: 5,
      title: "Chemistry - Organic Chemistry",
      subject: "Chemistry",
      category: "natural",
      duration: 165,
      questions: 48,
      difficulty: "Advanced",
      popularity: 89,
      description: "Focus on organic chemistry including hydrocarbons, functional groups, and reactions.",
      topics: ["Hydrocarbons", "Functional Groups", "Reactions", "Synthesis"],
      attempts: 920,
      averageScore: 63,
      premium: true,
      color: "from-yellow-500 to-amber-500",
      icon: "🧪"
    },
    {
      id: 6,
      title: "Geography - Physical & Human Geography",
      subject: "Geography",
      category: "social",
      duration: 110,
      questions: 35,
      difficulty: "Beginner",
      popularity: 82,
      description: "Covering physical landscapes, climate patterns, and human geographical interactions.",
      topics: ["Physical Features", "Climate", "Population", "Urbanization"],
      attempts: 760,
      averageScore: 75,
      premium: false,
      color: "from-teal-500 to-blue-500",
      icon: "🌍"
    },
    {
      id: 7,
      title: "Biology - Cell Biology & Genetics",
      subject: "Biology",
      category: "natural",
      duration: 140,
      questions: 42,
      difficulty: "Intermediate",
      popularity: 87,
      description: "Comprehensive biology exam focusing on cellular structures and genetic principles.",
      topics: ["Cell Structure", "DNA & RNA", "Genetics", "Evolution"],
      attempts: 890,
      averageScore: 69,
      premium: false,
      color: "from-lime-500 to-green-500",
      icon: "🧬"
    },
    {
      id: 8,
      title: "Business Studies - Management & Marketing",
      subject: "Business Studies",
      category: "social",
      duration: 125,
      questions: 36,
      difficulty: "Intermediate",
      popularity: 84,
      description: "Test your knowledge of business management principles and marketing strategies.",
      topics: ["Management", "Marketing", "Finance", "Entrepreneurship"],
      attempts: 720,
      averageScore: 71,
      premium: false,
      color: "from-indigo-500 to-purple-500",
      icon: "💼"
    }
  ];

  const stats = [
    { number: "5000+", label: "Students Practiced", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <Award className="w-6 h-6" /> },
    { number: "50+", label: "Expert Designed", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Available", icon: <Clock className="w-6 h-6" /> }
  ];

  const filteredExams = activeCategory === "all" 
    ? demoExams 
    : activeCategory === "popular"
    ? demoExams.filter(exam => exam.popularity > 90)
    : demoExams.filter(exam => exam.category === activeCategory);

  const startDemoExam = (examId: number) => {
    // Navigate to exam taking page or show exam instructions
    navigate(`/dashboard/demo/math`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
            >
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Practice Exams</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Master Your Subjects with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Demo Exams
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Practice with real exam-style questions, get instant feedback, and track your progress 
              across all subjects and difficulty levels.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {examCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exams Grid */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredExams.map((exam, index) => (
              <motion.div
                key={exam.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Exam Header */}
                <div className={`p-6 bg-gradient-to-r ${exam.color} text-white relative overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{exam.icon}</div>
                      <div>
                        <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                          {exam.subject}
                        </span>
                        {exam.premium && (
                          <span className="ml-2 text-sm bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{exam.popularity}%</span>
                      </div>
                      <div className="text-xs text-white/80">Popular</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 relative z-10">{exam.title}</h3>
                  <p className="text-white/90 text-sm relative z-10">{exam.description}</p>
                </div>

                {/* Exam Content */}
                <div className="p-6">
                  {/* Exam Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-gray-900">{exam.duration} min</div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                    <div className="text-center">
                      <FileText className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-gray-900">{exam.questions}</div>
                      <div className="text-xs text-gray-600">Questions</div>
                    </div>
                  </div>

                  {/* Difficulty & Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      exam.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                      exam.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {exam.difficulty}
                    </span>
                    <div className="text-sm text-gray-600">
                      <Users className="w-4 h-4 inline mr-1" />
                      {exam.attempts.toLocaleString()} attempts
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Topics Covered</h4>
                    <div className="flex flex-wrap gap-1">
                      {exam.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startDemoExam(exam.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Start Demo
                    </motion.button>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        <Bookmark className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full"
                />
              </div>

              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Ready to Test Your Knowledge?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                >
                  Join thousands of students who have improved their scores with our practice exams
                </motion.p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/sign-in")}
                    className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/feature")}
                    className="border-2 border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
                  >
                    View All Features
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Instant feedback & explanations</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Detailed performance analytics</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Progress tracking</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}