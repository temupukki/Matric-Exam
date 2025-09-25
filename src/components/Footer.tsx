import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Star,
  Heart
} from "lucide-react";
import { useState } from "react";
const MotionLink = motion(Link);

export default function Footer() {
  const [email, setEmail] = useState("");

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Stream", path: "/stream" },
    { name: "Features", path: "/feature" },
    { name: "Contact", path: "/contact" },
    { name: "Get Started", path: "/sign-in" }
  ];

  const resources = [
    { name: "Study Materials", path: "/materials" },
    { name: "Practice Tests", path: "/tests" },
    { name: "Video Lessons", path: "/videos" },
    { name: "Study Planner", path: "/planner" },
    { name: "Progress Reports", path: "/reports" }
  ];

  const subjects = [
    { name: "Mathematics", path: "/math" },
    { name: "Science", path: "/science" },
    { name: "English", path: "/english" },
    { name: "Social Studies", path: "/social-studies" },
    { name: "Languages", path: "/languages" }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" }
  ];

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, text: "support@exammaster.com" },
    { icon: <Phone className="w-5 h-5" />, text: "+1 (555) 123-4567" },
    { icon: <MapPin className="w-5 h-5" />, text: "123 Education St, Learning City" }
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 lg:py-16">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img 
                  src="exam-logo.png" 
                  alt="Exam Master" 
                  className="h-12 w-12 rounded-full border-2 border-yellow-400 shadow-lg"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border-2 border-yellow-400/30 rounded-full"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
              >
                ExamMaster
              </motion.span>
            </motion.div>
            
            <p className="text-blue-200 mb-6 leading-relaxed">
              Empowering students to excel in their matric exams through innovative learning tools, 
              expert guidance, and personalized study experiences.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    color: "#facc15"
                  }}
                  className="p-2 bg-blue-700/50 rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold mb-6 flex items-center gap-2"
            >
              <ArrowRight className="w-5 h-5 text-yellow-400" />
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className="text-blue-200 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-bold mb-6 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-yellow-400" />
              Resources
            </motion.h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <motion.li key={resource.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link 
                    to={resource.path}
                    className="text-blue-200 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      →
                    </motion.span>
                    {resource.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg font-bold mb-6 flex items-center gap-2"
            >
              <Mail className="w-5 h-5 text-yellow-400" />
              Newsletter
            </motion.h3>
            <p className="text-blue-200 mb-4">
              Subscribe to get updates on new features and study tips.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <motion.input
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-blue-800/50 border border-blue-600 focus:border-yellow-400 focus:outline-none transition-colors"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-8 border-t border-blue-700"
        >
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 p-4 bg-blue-800/30 rounded-xl backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                className="p-2 bg-yellow-400/20 rounded-full"
              >
                {contact.icon}
              </motion.div>
              <span className="text-blue-200">{contact.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="border-t border-blue-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-blue-300 text-center md:text-left"
          >
            © 2024 ExamMaster. Made with <Heart className="inline w-4 h-4 text-red-400" /> for students
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-6 text-sm text-blue-300"
          >
            <MotionLink 
              whileHover={{ color: "#facc15", scale: 1.05 }}
              to="/privacy"
              className="hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </MotionLink>
            <motion.a
              whileHover={{ color: "#facc15", scale: 1.05 }}
              href="/terms"
              className="hover:text-yellow-400 transition-colors"
            >
              Terms of Service
            </motion.a>
        
          </motion.div>
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            <Star className="w-5 h-5" />
            <span>Start Your Success Journey Today!</span>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}