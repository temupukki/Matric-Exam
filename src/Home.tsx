import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Award,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  GraduationCap,
  Target,
  BarChart3,
} from "lucide-react";
const MotionLink = motion(Link);
export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Syllabus",
      description: "Cover all subjects with detailed answer and explanation",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timed Practice Tests",
      description: "Simulate real exam conditions with timed practice sessions",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Track your progress with detailed analytics and insights",
    },
  ];

  const subjects = [
    { name: "Mathematics", color: "from-cyan-500 to-blue-500", progress: 75 },
    { name: "Science", color: "from-blue-500 to-indigo-500", progress: 60 },
    { name: "English", color: "from-indigo-500 to-purple-500", progress: 85 },
    {
      name: "Social Studies",
      color: "from-purple-500 to-blue-600",
      progress: 70,
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Students Enrolled",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "10+",
      label: "Subjects",
      icon: <BookOpen className="w-6 h-6" />,
    },
  
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 text-white py-20 lg:py-28">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              transition: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              transition: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              transition: { duration: 15, repeat: Infinity, ease: "linear" },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">#1 Matric Exam Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Master Your
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
            >
              Matric Exams
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed"
          >
            Ace your exams with personalized learning, AI-powered practice
            tests, and expert guidance tailored for matric success
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MotionLink
              to="/sign-in"
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(to right, #facc15, #f59e0b)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              Start Learning Now <ArrowRight className="w-5 h-5" />
            </MotionLink>

            <MotionLink
              to="/feature"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/feature")}
              className="border-2 border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Explore Features
            </MotionLink>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-yellow-400/20 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {stat.number}
                </div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-2 rounded-full mb-4"
            >
              <Award className="w-5 h-5" />
              <span className="font-semibold">Why Choose Us</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources designed specifically for matric
              exam success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-full w-fit"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Track Your{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Progress
              </span>
            </h2>
            <p className="text-xl text-blue-100">
              Monitor your performance across all subjects with detailed
              analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-r p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 ${subject.color}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{subject.name}</h3>
                  <span className="text-lg font-semibold bg-white/20 px-3 py-1 rounded-full">
                    {subject.progress}%
                  </span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${subject.progress}%` }}
                    transition={{
                      delay: index * 0.3 + 0.5,
                      duration: 1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    className="h-3 rounded-full bg-white shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -top-32 -left-32 w-64 h-64 bg-yellow-400/10 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              transition: { duration: 40, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-400/10 rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-4 relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Ace Your Exams?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl mb-8 text-blue-100"
          >
            Join thousands of students who have improved their grades with our
            platform
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(to right, #facc15, #f59e0b)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/sign-in")}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
          >
            Get Started Today <ArrowRight className="inline ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
