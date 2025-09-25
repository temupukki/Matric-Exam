import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, type JSX } from "react";
import { Menu, X, BookOpen, Star, GraduationCap } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on sign-in page
  if (location.pathname === "/sign-in") {
    return null;
  }

  const navItems = [
    { path: "/", label: "Home", icon: <Star className="w-4 h-4" /> },
    { path: "/stream", label: "Stream", icon: <BookOpen className="w-4 h-4" /> },
    { path: "/feature", label: "Features", icon: <GraduationCap className="w-4 h-4" /> },
    { path: "/contact", label: "Contact us" },
    { path: "/sign-in", label: "Get Started", highlight: true },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`p-4 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md ${
          scrolled ? "bg-blue-800/95 shadow-2xl" : ""
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              transition: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              transition: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-400/10 rounded-full blur-xl"
          />
        </div>

        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          {/* Logo with enhanced animation */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center gap-3"
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
              transition={{ delay: 0.3 }}
              className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
            >
              ExamMaster
            </motion.span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-2 items-center relative">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                item={item}
                index={index}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            {/* Mobile Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-20 left-4 right-4 bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl rounded-2xl border border-white/20 z-50 overflow-hidden"
            >
              {/* Mobile menu background animation */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-32 -right-32 w-64 h-64 bg-yellow-400/10 rounded-full"
                />
              </div>
              
              <div className="relative z-10 p-4 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <MobileNavLink
                    key={item.path}
                    item={item}
                    index={index}
                    isActive={location.pathname === item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavLinkProps {
  item: { path: string; label: string; highlight?: boolean; icon?: JSX.Element };
  index: number;
  isActive: boolean;
  onClick?: () => void;
}

function NavLink({ item, index, isActive, onClick }: NavLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      <Link
        to={item.path}
        onClick={onClick}
        className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 group ${
          isActive
            ? "text-yellow-400 font-bold shadow-lg"
            : item.highlight
            ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 hover:from-yellow-300 hover:to-amber-400 hover:scale-105 hover:shadow-xl"
            : "text-white hover:text-yellow-300 hover:bg-white/10"
        }`}
      >
        {item.icon && (
          <motion.span
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {item.icon}
          </motion.span>
        )}
        {item.label}
        
        {/* Hover effect for non-highlighted items */}
        {!isActive && !item.highlight && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full scale-0"
            whileHover={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        )}
      </Link>

      {/* Active indicator with advanced animation */}
      {isActive && (
        <>
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 rounded-full shadow-lg backdrop-blur-sm"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute -inset-1 bg-yellow-400/20 rounded-full blur-sm"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </>
      )}

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full scale-0"
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

function MobileNavLink({ item, index, isActive, onClick }: NavLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={item.path}
        onClick={onClick}
        className={`relative overflow-hidden group p-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
          isActive
            ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 shadow-lg"
            : item.highlight
            ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 hover:shadow-xl"
            : "text-white hover:bg-white/10 hover:shadow-lg"
        }`}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {item.icon && (
          <motion.span
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative z-10"
          >
            {item.icon}
          </motion.span>
        )}
        
        <span className="relative z-10">{item.label}</span>
        
        {/* Active pulse effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 border-2 border-yellow-400 rounded-xl"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Hover arrow */}
        <motion.div
          className="absolute right-4 opacity-0 group-hover:opacity-100"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          →
        </motion.div>
      </Link>
    </motion.div>
  );
}