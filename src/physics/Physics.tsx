import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";

export default function PhysicsExamsPage() {
  const navigate = useNavigate();

  // Physics exams from 2010 to 2024
  const physicsExams = [
    { year: 2010, color: "from-green-500 to-emerald-600" },
    { year: 2011, color: "from-blue-500 to-cyan-600" },
    { year: 2012, color: "from-purple-500 to-indigo-600" },
    { year: 2013, color: "from-green-500 to-emerald-600" },
    { year: 2014, color: "from-blue-500 to-cyan-600" },
    { year: 2015, color: "from-purple-500 to-indigo-600" },
    { year: 2016, color: "from-green-500 to-emerald-600" },
    { year: 2017, color: "from-blue-500 to-cyan-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-purple-600" />
            <h1 className="text-5xl font-bold text-gray-900">Physics Exams</h1>
          </div>
          <p className="text-xl text-gray-600">
            ESSLCE Physics Examinations 2010-2024
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-gray-600">Exams</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">2010-2024</div>
            <div className="text-gray-600">Years</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">900</div>
            <div className="text-gray-600">Questions</div>
          </div>
        </motion.div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicsExams.map((exam, index) => (
            <motion.div
              key={exam.year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/dashboard/natural/phy${exam.year}`)}
            >
              {/* Exam Header */}
              <div className={`bg-gradient-to-r ${exam.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Physics {exam.year}</h3>
                </div>
                <p className="text-white/90">ESSLCE Examination</p>
                <p className="text-white/80 text-sm mt-2">
                  {exam.year} E.C / {exam.year + 8} E.C
                </p>
              </div>

              {/* Exam Details */}
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">60</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">2:30</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Start Exam
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600">
            Select any year to start the Physics examination
          </p>
        </motion.div>
      </div>
    </div>
  );
}
