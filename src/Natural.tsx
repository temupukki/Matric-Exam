import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Atom, 
  Leaf,
  Globe,
  Brain,
  Heart,
  Star,
  Clock,
  Users
} from "lucide-react";
import type { JSX } from "react";

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
  questions: number;
  duration: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
}

export default function Natural() {
  const navigate = useNavigate();

  const naturalScienceSubjects: Subject[] = [
    {
      id: "physics",
      name: "Physics",
      description: "Explore the fundamental laws of the universe, from motion and energy to electricity and magnetism.",
      icon: <Atom className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-600",
      questions: 25,
      duration: 45,
      difficulty: "Intermediate",
      topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      description: "Study matter, its properties, composition, and the changes it undergoes during chemical reactions.",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      questions: 30,
      duration: 50,
      difficulty: "Intermediate",
      topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"]
    },
    {
      id: "biology",
      name: "Biology",
      description: "Discover the science of life, from cellular processes to ecosystems and biodiversity.",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      questions: 35,
      duration: 55,
      difficulty: "Beginner",
      topics: ["Cell Biology", "Genetics", "Evolution", "Ecology", "Human Anatomy"]
    },
    {
      id: "earth-science",
      name: "Earth Science",
      description: "Understand our planet's systems, including geology, meteorology, oceanography, and astronomy.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
      questions: 20,
      duration: 40,
      difficulty: "Beginner",
      topics: ["Geology", "Meteorology", "Oceanography", "Astronomy", "Environmental Science"]
    },
    {
      id: "anatomy",
      name: "Human Anatomy",
      description: "Learn about the structure and organization of the human body and its systems.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-rose-600",
      questions: 28,
      duration: 45,
      difficulty: "Advanced",
      topics: ["Skeletal System", "Muscular System", "Nervous System", "Circulatory System", "Digestive System"]
    },
    {
      id: "environmental",
      name: "Environmental Science",
      description: "Examine the interactions between physical, chemical, and biological components of the environment.",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      questions: 22,
      duration: 35,
      difficulty: "Intermediate",
      topics: ["Ecology", "Conservation", "Climate Change", "Sustainability", "Pollution"]
    }
  ];

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/exam/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FlaskConical className="w-12 h-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900">Natural Sciences</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the wonders of the natural world through our comprehensive science curriculum. 
              From microscopic organisms to cosmic phenomena, discover how our universe works.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{naturalScienceSubjects.length}</div>
            <div className="text-gray-600">Subjects</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-gray-600">Students</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-gray-600">Hours Content</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">4.8/5</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {naturalScienceSubjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden cursor-pointer group"
              onClick={() => handleSubjectSelect(subject.id)}
            >
              {/* Subject Header */}
              <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {subject.icon}
                    <h3 className="text-2xl font-bold">{subject.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    subject.difficulty === 'Beginner' ? 'bg-green-400/20 text-green-100' :
                    subject.difficulty === 'Intermediate' ? 'bg-yellow-400/20 text-yellow-100' :
                    'bg-red-400/20 text-red-100'
                  }`}>
                    {subject.difficulty}
                  </span>
                </div>
                <p className="text-white/90 text-sm">{subject.description}</p>
              </div>

              {/* Subject Details */}
              <div className="p-6">
                {/* Stats */}
                <div className="flex justify-between mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{subject.questions}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{subject.duration}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                    {subject.topics.length > 3 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        +{subject.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Start Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r ${subject.color} text-white py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-xl transition-all`}
                >
                  Start Learning
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Natural Sciences?</h2>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of students who are discovering the fascinating world of science through our interactive learning platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}