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
  CheckCircle,
  ArrowRight,
  Zap,
  FileText
} from "lucide-react";

export default function Demo() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const examCategories = [
    { id: "all", label: "All Exams", icon: <BookOpen className="w-4 h-4" />, count: 12 },
    { id: "social", label: "Social Sciences", icon: <Users className="w-4 h-4" />, count: 6 },
    { id: "natural", label: "Natural Sciences", icon: <Zap className="w-4 h-4" />, count: 6 },
  ];

  const demoExams = [
    {
      id: 1,
      title: "Mathematics Natural",
      subject: "Mathematics",
      category: "natural",
      duration: 180,
      questions: 65,
      color: "from-blue-500 to-cyan-500",
      icon: "🧮",
      premium: false,
    },
    {
      id: 2,
      title: "History",
      subject: "History",
      category: "social",
      duration: 120,
      questions: 100,
      color: "from-orange-500 to-red-500",
      icon: "📜",
      premium: false,
    },
    {
      id: 3,
      title: "Physics",
      subject: "Physics",
      category: "natural",
      duration: 150,
      questions: 50,
      color: "from-purple-500 to-pink-500",
      icon: "⚛️",
      premium: true,
    },
    {
      id: 4,
      title: "Economics",
      subject: "Economics",
      category: "social",
      duration: 135,
      questions: 80,
      color: "from-green-500 to-emerald-500",
      icon: "📈",
      premium: false,
    },
    {
      id: 5,
      title: "Chemistry",
      subject: "Chemistry",
      category: "natural",
      duration: 165,
      questions: 80,
      color: "from-yellow-500 to-amber-500",
      icon: "🧪",
      premium: true,
    },
    {
      id: 6,
      title: "Geography",
      subject: "Geography",
      category: "social",
      duration: 120,
      questions: 80,
      color: "from-teal-500 to-blue-500",
      icon: "🌍",
      premium: false,
    },
    {
      id: 7,
      title: "Biology",
      subject: "Biology",
      category: "natural",
      duration: 150,
      questions: 100,
      color: "from-lime-500 to-green-500",
      icon: "🧬",
      premium: false,
    },
    {
      id: 8,
      title: "Scholastic Aptitude Social",
      subject: "Scholastic Aptitude",
      category: "social",
      duration: 150,
      questions: 65,
      color: "from-indigo-500 to-purple-500",
      icon: "💼",
      premium: true,
    },
    {
      id: 9,
      title: "Scholastic Aptitude Natural",
      subject: "Scholastic Aptitude",
      category: "natural",
      duration: 150,
      questions: 65,
      color: "from-indigo-500 to-purple-500",
      icon: "💼",
      premium: true,
    },
    {
      id: 10,
      title: "Mathematics Social",
      subject: "Mathematics",
      category: "social",
      duration: 180,
      questions: 65,
      color: "from-blue-500 to-cyan-500",
      icon: "🧮",
      premium: false,
    },
    {
      id: 11,
      title: "English Social",
      subject: "English",
      category: "social",
      duration: 120,
      questions: 120,
      color: "from-red-500 to-pink-500",
      icon: "📝",
      premium: false,
    },
    {
      id: 12,
      title: "English Natural",
      subject: "English",
      category: "natural",
      duration: 120,
      questions: 120,
      color: "from-red-500 to-pink-500",
      icon: "📝",
      premium: false,
    },
  ];

  const stats = [
    { number: "10K+", label: "Students Practiced", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <Award className="w-6 h-6" /> },
    { number: "12", label: "Demo Exams", icon: <FileText className="w-6 h-6" /> },
    { number: "24/7", label: "Available", icon: <Clock className="w-6 h-6" /> }
  ];

  const filteredExams = activeCategory === "all" 
    ? demoExams 
    : demoExams.filter(exam => exam.category === activeCategory);

  const startDemoExam = (examId: number) => {
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
                  </div>

                  <h3 className="text-xl font-bold mb-2 relative z-10">{exam.title}</h3>
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