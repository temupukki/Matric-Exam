import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Target, 
  BarChart3, 
  Clock, 
  Users, 
  Award, 
  Star, 
  CheckCircle,
  Play,
  Zap,
  Shield,
  Brain,
  Calendar,
  Video,
  FileText,
  ArrowRight,
  ChevronRight,
  Download,
  Eye,
  Bookmark
} from "lucide-react";

export default function Features() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const features = [
    {
      category: "learning",
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Study Materials",
      description: "Access detailed notes, summaries, and textbooks for all matric subjects curated by expert educators.",
      highlights: ["Subject-wise organization", "Expert-curated content", "Regular updates", "Downloadable PDFs"],
      color: "from-blue-500 to-cyan-500",
      image: "📚",
      premium: false
    },
    {
      category: "practice",
      icon: <Target className="w-8 h-8" />,
      title: "Smart Practice Tests",
      description: "AI-powered practice tests that adapt to your learning level and focus on your weak areas.",
      highlights: ["Adaptive difficulty", "Instant feedback", "Performance analytics", "Timed exercises"],
      color: "from-green-500 to-emerald-500",
      image: "🎯",
      premium: true
    },
    {
      category: "analytics",
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Progress Tracking",
      description: "Detailed analytics and insights into your performance with personalized recommendations.",
      highlights: ["Visual progress charts", "Weakness identification", "Study recommendations", "Goal tracking"],
      color: "from-purple-500 to-pink-500",
      image: "📊",
      premium: false
    },
    {
      category: "time",
      icon: <Clock className="w-8 h-8" />,
      title: "Intelligent Study Planner",
      description: "Automated study schedules that optimize your time based on exam dates and learning pace.",
      highlights: ["Customizable schedules", "Reminder system", "Progress integration", "Exam countdown"],
      color: "from-orange-500 to-amber-500",
      image: "⏰",
      premium: true
    },
    {
      category: "community",
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Learning",
      description: "Study groups, peer discussions, and expert Q&A sessions to enhance your learning experience.",
      highlights: ["Study groups", "Expert Q&A", "Peer discussions", "Resource sharing"],
      color: "from-red-500 to-pink-500",
      image: "👥",
      premium: false
    },
    {
      category: "preparation",
      icon: <Award className="w-8 h-8" />,
      title: "Exam Simulation",
      description: "Full-length mock exams that replicate real exam conditions with detailed performance reports.",
      highlights: ["Real exam conditions", "Detailed reports", "Time management", "Stress preparation"],
      color: "from-indigo-500 to-purple-500",
      image: "🏆",
      premium: true
    },
    {
      category: "performance",
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Feedback System",
      description: "Get immediate feedback on your answers with detailed explanations and alternative methods.",
      highlights: ["Instant corrections", "Step-by-step solutions", "Common mistakes", "Learning tips"],
      color: "from-yellow-500 to-orange-500",
      image: "⚡",
      premium: false
    },
    {
      category: "security",
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Learning Environment",
      description: "Enterprise-grade security ensuring your data and progress are always protected.",
      highlights: ["Data encryption", "Privacy controls", "Secure backups", "Compliance certified"],
      color: "from-gray-500 to-blue-500",
      image: "🛡️",
      premium: false
    }
  ];

  const categories = [
    { id: "all", label: "All Features", icon: <Star className="w-4 h-4" />, count: features.length },
    { id: "learning", label: "Learning", icon: <BookOpen className="w-4 h-4" />, count: features.filter(f => f.category === "learning").length },
    { id: "practice", label: "Practice", icon: <Target className="w-4 h-4" />, count: features.filter(f => f.category === "practice").length },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" />, count: features.filter(f => f.category === "analytics").length },
    { id: "premium", label: "Premium", icon: <Award className="w-4 h-4" />, count: features.filter(f => f.premium).length }
  ];

  const stats = [
    { number: "95%", label: "Success Rate", icon: <Award className="w-6 h-6" /> },
    { number: "10K+", label: "Practice Questions", icon: <FileText className="w-6 h-6" /> },
    { number: "500+", label: "Video Lessons", icon: <Video className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" /> }
  ];

  const filteredFeatures = activeCategory === "all" 
    ? features 
    : activeCategory === "premium"
    ? features.filter(f => f.premium)
    : features.filter(f => f.category === activeCategory);

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
      <section className="relative py-20 px-4">
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
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Powerful Features</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Excel
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Discover our comprehensive suite of tools designed to transform your learning experience 
              and maximize your academic potential.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
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
            {categories.map((category) => (
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

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Feature Header */}
                <div className={`p-6 bg-gradient-to-r ${feature.color} text-white relative overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-white/20 rounded-2xl"
                    >
                      {feature.icon}
                    </motion.div>
                    <div className="flex items-center gap-2">
                      {feature.premium && (
                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold">
                          Premium
                        </span>
                      )}
                      <div className="text-4xl">{feature.image}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 relative z-10">{feature.title}</h3>
                </div>

                {/* Feature Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {feature.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {highlight}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/sign-in")}
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-cyan-50 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg border border-gray-200"
                  >
                    Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full"
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
              >
                <Award className="w-5 h-5" />
                <span className="font-semibold">Unlock Premium Features</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to Transform Your Learning?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              >
                Get access to all premium features including smart practice tests, advanced analytics, 
                and personalized study plans.
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
                  onClick={() => navigate("/contact")}
                  className="border-2 border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  View Pricing
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
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>All features included</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}