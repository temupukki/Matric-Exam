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
  Leaf
} from "lucide-react";

// Define types for our data structure
interface Subject {
  name: string;
  icon: JSX.Element;
  description: string;
  chapters: number;
  videos: number;
  tests: number;
  color: string;
  topics: string[];
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

  const streams: StreamsData = {
    social: {
      title: "Social Sciences Stream",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      description: "Explore human society, relationships, and cultural development through comprehensive social studies.",
      image: "🌍",
      subjects: [
        {
          name: "History",
          icon: <History className="w-6 h-6" />,
          description: "Study of past events, civilizations, and historical developments",
          chapters: 15,
          videos: 120,
          tests: 45,
          color: "from-orange-500 to-red-500",
          topics: ["Ancient Civilizations", "World Wars", "Modern History", "Cultural Studies"]
        },
        {
          name: "Geography",
          icon: <Globe className="w-6 h-6" />,
          description: "Understanding Earth's landscapes, environments, and human interactions",
          chapters: 12,
          videos: 95,
          tests: 38,
          color: "from-green-500 to-teal-500",
          topics: ["Physical Geography", "Human Geography", "Environmental Studies", "Map Reading"]
        },
        {
          name: "Economics",
          icon: <BookText className="w-6 h-6" />,
          description: "Study of production, distribution, and consumption of goods and services",
          chapters: 10,
          videos: 80,
          tests: 32,
          color: "from-blue-500 to-cyan-500",
          topics: ["Microeconomics", "Macroeconomics", "Economic Systems", "Development Economics"]
        },
        {
          name: "Business Studies",
          icon: <BarChart3 className="w-6 h-6" />,
          description: "Principles of business operations, management, and entrepreneurship",
          chapters: 14,
          videos: 110,
          tests: 42,
          color: "from-indigo-500 to-purple-500",
          topics: ["Business Management", "Marketing", "Finance", "Entrepreneurship"]
        }
      ]
    },
    natural: {
      title: "Natural Sciences Stream",
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      description: "Dive into the wonders of the natural world through experimental and theoretical sciences.",
      image: "🔬",
      subjects: [
        {
          name: "Physics",
          icon: <Zap className="w-6 h-6" />,
          description: "Study of matter, energy, and the fundamental laws of the universe",
          chapters: 18,
          videos: 150,
          tests: 55,
          color: "from-purple-500 to-pink-500",
          topics: ["Mechanics", "Electricity", "Thermodynamics", "Modern Physics"]
        },
        {
          name: "Chemistry",
          icon: <Globe className="w-6 h-6" />,
          description: "Science of substances, their properties, and transformations",
          chapters: 16,
          videos: 130,
          tests: 48,
          color: "from-green-500 to-emerald-500",
          topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"]
        },
        {
          name: "Biology",
          icon: <Leaf className="w-6 h-6" />,
          description: "Study of living organisms and their vital processes",
          chapters: 20,
          videos: 160,
          tests: 60,
          color: "from-green-500 to-teal-500",
          topics: ["Cell Biology", "Genetics", "Ecology", "Human Physiology"]
        },
        {
          name: "Mathematics",
          icon: <Calculator className="w-6 h-6" />,
          description: "Advanced mathematical concepts and problem-solving techniques",
          chapters: 22,
          videos: 180,
          tests: 65,
          color: "from-orange-500 to-amber-500",
          topics: ["Calculus", "Algebra", "Statistics", "Geometry"]
        }
      ]
    }
  };

  const stats = [
    { number: "500+", label: "Video Lessons", icon: <Video className="w-6 h-6" /> },
    { number: "2000+", label: "Practice Questions", icon: <FileText className="w-6 h-6" /> },
    { number: "100+", label: "Expert Tutors", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <Award className="w-6 h-6" /> }
  ];

  const currentStream = streams[activeStream];

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
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Academic Streams</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Academic Path
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Select your stream and discover specialized subjects tailored to your academic interests 
              and career aspirations.
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

      {/* Stream Selection */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {(Object.entries(streams) as [keyof StreamsData, Stream][]).map(([key, stream]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStream(key)}
                className={`relative cursor-pointer rounded-3xl p-8 shadow-lg transition-all duration-300 ${
                  activeStream === key
                    ? 'ring-4 ring-blue-500 ring-opacity-50 transform scale-105'
                    : 'hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stream.color} rounded-3xl`} />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl" />
                
                <div className="relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      className="p-3 bg-white/20 rounded-2xl"
                    >
                      {stream.icon}
                    </motion.div>
                    <div className="text-4xl">{stream.image}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{stream.title}</h3>
                  <p className="text-white/90 mb-4">{stream.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {stream.subjects.length} Subjects
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      Comprehensive
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentStream.title} Subjects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the comprehensive curriculum designed for {currentStream.title.toLowerCase()} students
            </p>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {currentStream.subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Subject Header */}
                <div className={`p-6 bg-gradient-to-r ${subject.color} text-white relative overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      className="p-3 bg-white/20 rounded-2xl"
                    >
                      {subject.icon}
                    </motion.div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{subject.name}</div>
                      <div className="text-white/80 text-sm">Subject</div>
                    </div>
                  </div>

                  <p className="text-white/90 relative z-10">{subject.description}</p>
                </div>

                {/* Subject Content */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{subject.chapters}</div>
                      <div className="text-sm text-gray-600">Chapters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{subject.videos}</div>
                      <div className="text-sm text-gray-600">Videos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{subject.tests}</div>
                      <div className="text-sm text-gray-600">Tests</div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
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
                      onClick={() => navigate("/sign-in")}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Start Learning
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
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
                Ready to Start Your Journey?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-blue-100 mb-8"
              >
                Join thousands of students excelling in their chosen academic streams
              </motion.p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/sign-in")}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Choose Your Stream <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}