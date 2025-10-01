import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Atom,
  Leaf,
  Brain,
  Star,
  Clock,
  Users,
} from "lucide-react";
import type { JSX } from "react";

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
  questions: number;
  duration: string;
}

export default function Natural() {
  const navigate = useNavigate();

  const naturalScienceSubjects: Subject[] = [
    {
      id: "physics",
      name: "Physics",
      description:
        "Explore the fundamental laws of the universe, from motion and energy to electricity and magnetism.",
      icon: <Atom className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-600",
      questions: 50,
      duration: "2 Hour and 30 minute",
    },
    {
      id: "chemistry",
      name: "Chemistry",
      description:
        "Study matter, its properties, composition, and the changes it undergoes during chemical reactions.",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      questions: 80,
      duration: "2 Hours",
    },
    {
      id: "biology",
      name: "Biology",
      description:
        "Discover the science of life, from cellular processes to ecosystems and biodiversity.",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      questions: 100,
      duration: "2 Hours",
    },
    {
      id: "mathmatics",
      name: "Mathmatics",
      description:
        "Understand our planet's systems, including geology, meteorology, oceanography, and astronomy.",
      icon: <Calculator className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
      questions: 65,
      duration: "3 Hours",
    },
    {
      id: "scholaticApptitude",
      name: "Scholastic Apptitude",
      description:
        "Learn about the structure and organization of the human body and its systems.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-pink-500 to-rose-600",
      questions: 65,
      duration: "2 Hours",
    },
    {
      id: "english",
      name: "English",
      description:
        "Examine the interactions between physical, chemical, and biological components of the environment.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      questions: 120,
      duration: "2 Hours",
    },
  ];

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/dashboard/natural/${subjectId}`);
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
              <h1 className="text-5xl font-bold text-gray-900">
                Natural Sciences
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the wonders of the natural world through our comprehensive
              science curriculum. From microscopic organisms to cosmic
              phenomena, discover how our universe works.
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
            <div className="text-2xl font-bold text-gray-900">
              {naturalScienceSubjects.length}
            </div>
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
              <div
                className={`bg-gradient-to-r ${subject.color} p-6 text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {subject.icon}
                    <h3 className="text-2xl font-bold">{subject.name}</h3>
                  </div>
                </div>
              </div>

              {/* Subject Details */}
              <div className="p-6">
                {/* Stats */}
                <div className="flex justify-between mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {subject.questions}
                    </div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {subject.duration}
                    </div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Just press the button to practice exams and to level up man
                  </h4>
                </div>

                {/* Start Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r ${subject.color} text-white py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-xl transition-all`}
                >
                  Start Exam
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
