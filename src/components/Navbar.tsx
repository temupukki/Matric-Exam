import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/stream", label: "Stream" },
    { path: "/feature", label: "Features" },
    { path: "/contact", label: "Contact us" },
    { path: "/sign-in", label: "Get Started" ,highlight: true},
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 text-white shadow-2xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-yellow-400"
          >
            <img src="exam-logo.png" alt=""  className="h-16 w-16 rounded-full"/>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center relative">
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 shadow-lg"
          >
            <div className="px-4 py-2 flex flex-col gap-2">
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
        )}
      </AnimatePresence>
    </>
  );
}

interface NavLinkProps {
  item: { path: string; label: string; highlight?: boolean };
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
        className={`relative z-10 px-4 py-2 rounded-full font-semibold transition-all duration-300 block ${
          isActive
            ? "text-yellow-400 font-bold scale-110"
            : item.highlight
            ? "bg-black text-white hover:bg-gray-700 hover:scale-105"
            : "text-white hover:text-yellow-300 hover:scale-105"
        }`}
      >
        {item.label}

        {/* Hover effect */}
        {!isActive && !item.highlight && (
          <motion.div
            className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0"
            whileHover={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        )}
      </Link>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 bg-white/20 rounded-full shadow-lg"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

function MobileNavLink({ item, index, isActive, onClick }: NavLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={item.path}
        onClick={onClick}
        className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
          isActive
            ? "underline text-yellow-400 "
            : item.highlight
            ? "bg-black text-white rounded-3xl " 
            : "text-white hover:bg-blue-400"
        }`}
      >
        {item.label}
      </Link>
    </motion.div>
  );
}