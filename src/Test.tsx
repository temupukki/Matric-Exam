import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home,
  Book,
  User,
  Settings,
  LogOut,
  BookOpen,
  Clock,
  Award,
  Calendar
} from "lucide-react";

// Navigation Component
function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/exams', icon: Book, label: 'Exams' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <BookOpen className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">EduExam</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-all">
              <User className="w-4 h-4" />
              <span>Student</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Home Page Component
function HomePage() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Physics",
      description: "ESSLCE Physics Examinations",
      exams: 12,
      color: "from-purple-500 to-indigo-600",
      icon: BookOpen
    },
    {
      name: "Mathematics", 
      description: "ESSLCE Mathematics Examinations",
      exams: 12,
      color: "from-blue-500 to-cyan-600",
      icon: BookOpen
    },
    {
      name: "Chemistry",
      description: "ESSLCE Chemistry Examinations",
      exams: 12,
      color: "from-green-500 to-emerald-600",
      icon: BookOpen
    },
    {
      name: "Biology",
      description: "ESSLCE Biology Examinations",
      exams: 12,
      color: "from-orange-500 to-red-600",
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to EduExam
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice with real ESSLCE examination questions from 2010-2024. Test your knowledge and improve your skills.
          </p>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            
            return (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden cursor-pointer group"
                onClick={() => navigate('/exams', { state: { subject: subject.name } })}
              >
                {/* Subject Header */}
                <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">{subject.name}</h3>
                  </div>
                  <p className="text-white/90">{subject.description}</p>
                </div>

                {/* Subject Details */}
                <div className="p-6">
                  <div className="flex justify-between mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{subject.exams}</div>
                      <div className="text-sm text-gray-600">Exams</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">2010-2024</div>
                      <div className="text-sm text-gray-600">Years</div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${subject.color} text-white py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-xl transition-all`}
                  >
                    View Exams
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-gray-600">Subjects</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">48</div>
            <div className="text-gray-600">Exams</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-gray-600">Years</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Free</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Exams Page Component

// Profile Page Component

// Settings Page Component

