import { motion } from "framer-motion";
import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Globe,
  Calculator,
  History,
  BookText,
  ArrowRight,
  Award,
  Clock,
  BarChart3,
  Video,
  FileText,
  PlayCircle,
  Bookmark,
  Zap,
  Leaf,
  Star,
  Target,
  ChevronRight,
} from "lucide-react";

// Define types for our data structure
interface Subject {
  name: string;
  icon: JSX.Element;
  color: string;
}

interface Stream {
  title: string;
  icon: JSX.Element;
  color: string;
  description: string;
  image: string;
  subjects: Subject[];
}

interface StreamsData {
  social: Stream;
  natural: Stream;
}

export default function Streams() {
  const navigate = useNavigate();
  const [activeStream, setActiveStream] = useState<keyof StreamsData>("social");
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  const streams: StreamsData = {
    social: {
      title: "Social Sciences Stream",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 via-purple-600 to-pink-500",
      description:
        "Explore human society, relationships, and cultural development through comprehensive social studies.",
      image: "🌍",
      subjects: [
        {
          name: "History",
          icon: <History className="w-6 h-6" />,
          color: "from-orange-500 to-red-500",
        },
        {
          name: "Geography",
          icon: <Globe className="w-6 h-6" />,
          color: "from-green-500 to-teal-500",
        },
        {
          name: "Economics",
          icon: <BookText className="w-6 h-6" />,
          color: "from-blue-500 to-cyan-500",
        },
        {
          name: "Mathematics",
          icon: <Calculator className="w-6 h-6" />,
          color: "from-yellow-500 to-amber-500",
        },
        {
          name: "English",
          icon: <BookOpen className="w-6 h-6" />,
          color: "from-red-400 to-pink-500",
        },
        {
          name: "Scholastic Aptitude",
          icon: <BarChart3 className="w-6 h-6" />,
          color: "from-indigo-500 to-purple-600",
        },
      ],
    },
    natural: {
      title: "Natural Sciences Stream",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 via-cyan-500 to-emerald-500",
      description:
        "Dive into the wonders of the natural world through experimental and theoretical sciences.",
      image: "🔬",
      subjects: [
        {
          name: "Physics",
          icon: <Zap className="w-6 h-6" />,
          color: "from-purple-500 to-pink-500",
        },
        {
          name: "Chemistry",
          icon: <Globe className="w-6 h-6" />,
          color: "from-green-500 to-emerald-500",
        },
        {
          name: "Biology",
          icon: <Leaf className="w-6 h-6" />,
          color: "from-lime-500 to-green-500",
        },
        {
          name: "Mathematics",
          icon: <Calculator className="w-6 h-6" />,
          color: "from-orange-500 to-amber-500",
        },
        {
          name: "English",
          icon: <BookOpen className="w-6 h-6" />,
          color: "from-red-400 to-pink-500",
        },
        {
          name: "Scholastic Aptitude",
          icon: <BarChart3 className="w-6 h-6" />,
          color: "from-indigo-500 to-purple-600",
        },
      ],
    },
  };

  const stats = [
    {
      number: "10+",
      label: "Core Subjects",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      number: "2000+",
      label: "Practice Questions",
      icon: <FileText className="w-6 h-6" />,
    },

    {
      number: "95%",
      label: "Success Rate",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const features = [
    { icon: <FileText className="w-5 h-5" />, text: "Practice Exams" },
    { icon: <Clock className="w-5 h-5" />, text: "Progress Tracking" },
    { icon: <Award className="w-5 h-5" />, text: "Expert Guidance" },
  ];

  const currentStream = streams[activeStream];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl"
        />
      </div>

      {/* Enhanced Hero Section */}
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
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg mb-8 border border-blue-100"
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-700 text-lg">
                Academic Streams
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Academic Path
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Select your stream and discover specialized subjects tailored to
              your academic interests and career aspirations. Your future starts
              here.
            </motion.p>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stream Selection */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {(Object.entries(streams) as [keyof StreamsData, Stream][]).map(
              ([key, stream]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStream(key)}
                  className={`relative cursor-pointer rounded-3xl p-8 shadow-2xl transition-all duration-500 border-2 ${
                    activeStream === key
                      ? "border-blue-500 transform scale-105 shadow-2xl"
                      : "border-transparent hover:border-blue-300"
                  }`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stream.color} rounded-3xl opacity-90`}
                  />

                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl" />

                  <div className="relative z-10 text-white">
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        className="p-4 bg-white/20 rounded-3xl shadow-lg"
                      >
                        {stream.icon}
                      </motion.div>
                      <motion.div
                        className="text-5xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {stream.image}
                      </motion.div>
                    </div>

                    <h3 className="text-3xl font-bold mb-3 leading-tight">
                      {stream.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">
                      {stream.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                        {stream.subjects.length} Core Subjects
                      </span>
                      <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                        Comprehensive Curriculum
                      </span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {activeStream === key && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 bg-green-500 text-white p-2 rounded-full shadow-lg"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                  )}
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Subjects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {currentStream.title} Subjects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore the comprehensive curriculum designed for{" "}
              {currentStream.title.toLowerCase()} students. Each subject is
              crafted to provide deep understanding and practical knowledge.
            </p>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentStream.subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredSubject(subject.name)}
                onHoverEnd={() => setHoveredSubject(null)}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100"
              >
                {/* Subject Header */}
                <div
                  className={`p-8 bg-gradient-to-br ${subject.color} text-white relative overflow-hidden`}
                >
                  {/* Animated Background Elements */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-white/5 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        className="p-4 bg-white/20 rounded-2xl shadow-lg"
                      >
                        {subject.icon}
                      </motion.div>
                      <motion.div
                        animate={{
                          rotate: hoveredSubject === subject.name ? 180 : 0,
                        }}
                        className="text-white/60"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                    <div className="text-white/80 text-sm font-medium">
                      Core Subject
                    </div>
                  </div>
                </div>

                {/* Subject Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/sign-in")}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Start Practicing
                      <motion.span
                        animate={{ x: hoveredSubject === subject.name ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -left-32 w-64 h-64 bg-yellow-400/10 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 rounded-full"
              />
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Ready to Start Your <br />
                <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  Academic Journey?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Join thousands of Ethiopian students who are already excelling
                in their chosen academic streams. Your path to success starts
                here.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/sign-in")}
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto group"
              >
                <Target className="w-6 h-6" />
                Choose Your Stream Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
