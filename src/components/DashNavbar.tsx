import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, type JSX } from "react";
import {
  Menu,
  X,
  BookOpen,
  Star,
  GraduationCap,
  User,
  LayoutDashboard,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Globe,
  Atom,
  Shield,
} from "lucide-react";

const useSession = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("http://localhost:3000/api/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch /api/me");

        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error("Error fetching /api/me:", err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, []);

  return { session, loading };
};

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { session, loading } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (location.pathname === "/sign-in") {
    return null;
  }

  const guestNavItems = [
    { path: "/", label: "Home", icon: <Star className="w-4 h-4" /> },
    {
      path: "/stream",
      label: "Stream",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      path: "/feature",
      label: "Features",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    { path: "/contact", label: "Contact us" },
    { path: "/sign-in", label: "Get Started", highlight: true },
  ];

  const baseUserNavItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      path: "/dashboard/demo",
      label: "Demo Exams",
      icon: <ClipboardList className="w-4 h-4" />,
    },
    {
      path: "/dashboard/price",
      label: "Pricing",
      icon: <CreditCard className="w-4 h-4" />,
    },
  ];

  const naturalNavItems = [
    {
      path: "/dashboard/natural",
      label: "Natural Exams",
      icon: <Atom className="w-4 h-4" />,
    },
  ];

  const socialNavItems = [
    {
      path: "/dashboard/social",
      label: "Social Exams",
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  const getUserNavItems = () => {
    if (!session) return guestNavItems;

    const userRole = session.user?.role;

    let navItems = [...baseUserNavItems];

    if (
      userRole === "NATURAL" ||
      userRole === "SOCIAL" ||
      userRole === "BOTH"
    ) {
      navItems = navItems.filter(
        (item) =>
          item.path !== "/dashboard/price" && item.path !== "/dashboard/demo"
      );
    }

    if (userRole === "ADMIN") {
      navItems = [...navItems, ...naturalNavItems, ...socialNavItems];
    } else if (userRole === "BOTH") {
      navItems = [...navItems, ...naturalNavItems, ...socialNavItems];
    } else if (userRole === "NATURAL") {
      navItems = [...navItems, ...naturalNavItems];
    } else if (userRole === "SOCIAL") {
      navItems = [...navItems, ...socialNavItems];
    }

    return navItems;
  };

  const navItems = getUserNavItems();

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFirstName = (name: string) => {
    if (!name) return "User";
    return name.split(" ")[0];
  };

  const getUsername = (email: string) => {
    if (!email) return "user";
    return email.split("@")[0];
  };

  const getUserRoleDisplay = () => {
    if (!session?.user?.role) return "";

    const role = session.user.role;
    switch (role) {
      case "ADMIN":
        return "Admin";
      case "NATURAL":
        return "Natural Science";
      case "SOCIAL":
        return "Social Science";
      case "BOTH":
        return "Family Package"  
      default:
        return role;
    }
  };

  const isAdmin = session?.user?.role === "ADMIN";
  const isNatural = session?.user?.role === "NATURAL";
  const isSocial = session?.user?.role === "SOCIAL";
  const userRoleDisplay = getUserRoleDisplay();

  if (loading) {
    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 text-white shadow-2xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-yellow-400 bg-gray-300 animate-pulse" />
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="hidden md:flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-20 bg-gray-300 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </motion.nav>
    );
  }

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
              transition: { duration: 15, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              transition: { duration: 20, repeat: Infinity, ease: "linear" },
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

            {/* User profile section for signed in users */}
            {session ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {getUserInitials(
                        session.user?.name || session.user?.email
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm leading-tight">
                        {getFirstName(
                          session.user?.name || session.user?.email
                        )}
                        {isAdmin && (
                          <Shield className="w-3 h-3 text-yellow-400 inline ml-1" />
                        )}
                      </p>
                      <p className="text-xs text-white/70 leading-tight">
                        {getUsername(session.user?.email)}
                        {userRoleDisplay && ` • ${userRoleDisplay}`}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isUserDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                    >
                      {/* User info header */}
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold">
                            {getUserInitials(
                              session.user?.name || session.user?.email
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold flex items-center gap-2">
                              {session.user?.name || "User"}
                              {isAdmin && (
                                <Shield className="w-4 h-4 text-yellow-400" />
                              )}
                            </p>
                            <p className="text-sm text-white/80">
                              {session.user?.email}
                              {userRoleDisplay && (
                                <span
                                  className={`block text-xs ${
                                    isAdmin
                                      ? "text-yellow-300"
                                      : isNatural
                                      ? "text-green-300"
                                      : isSocial
                                      ? "text-blue-300"
                                      : "text-white/80"
                                  }`}
                                >
                                  {userRoleDisplay}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="p-2">
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors group"
                        >
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">My Profile</p>
                            <p className="text-xs text-gray-500">
                              View and edit your profile
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors group"
                        >
                          <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                            <LayoutDashboard className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Dashboard</p>
                            <p className="text-xs text-gray-500">
                              Your learning dashboard
                            </p>
                          </div>
                        </Link>

                        {/* Role badge in dropdown */}
                        <div
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg border mt-2 ${
                            isAdmin
                              ? "bg-yellow-50 border-yellow-200"
                              : isNatural
                              ? "bg-green-50 border-green-200"
                              : isSocial
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              isAdmin
                                ? "bg-yellow-100"
                                : isNatural
                                ? "bg-green-100"
                                : isSocial
                                ? "bg-blue-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <Shield
                              className={`w-4 h-4 ${
                                isAdmin
                                  ? "text-yellow-600"
                                  : isNatural
                                  ? "text-green-600"
                                  : isSocial
                                  ? "text-blue-600"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <p
                              className={`font-medium ${
                                isAdmin
                                  ? "text-yellow-800"
                                  : isNatural
                                  ? "text-green-800"
                                  : isSocial
                                  ? "text-blue-800"
                                  : "text-gray-800"
                              }`}
                            >
                              {isAdmin
                                ? "Admin Access"
                                : isNatural
                                ? "Natural Science"
                                : isSocial
                                ? "Social Science"
                                : "User Access"}
                            </p>
                            <p
                              className={`text-xs ${
                                isAdmin
                                  ? "text-yellow-600"
                                  : isNatural
                                  ? "text-green-600"
                                  : isSocial
                                  ? "text-blue-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {isAdmin
                                ? "Full system permissions"
                                : isNatural
                                ? "Natural science exams access"
                                : isSocial
                                ? "Social science exams access"
                                : "Basic user permissions"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              // Get Started button for guests
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Link
                  to="/sign-in"
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:from-yellow-300 hover:to-amber-400 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Get Started
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
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
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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

                {/* User info and menu for mobile */}
                {session ? (
                  <>
                    <div className="border-t border-white/20 pt-4 mt-2">
                      {/* User info */}
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {getUserInitials(
                            session.user?.name || session.user?.email
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white flex items-center gap-2">
                            {session.user?.name || "User"}
                            {isAdmin && (
                              <Shield className="w-3 h-3 text-yellow-400" />
                            )}
                          </p>
                          <p className="text-sm text-white/70">
                            {session.user?.email}
                            {userRoleDisplay && (
                              <span
                                className={`block text-xs ${
                                  isAdmin
                                    ? "text-yellow-300"
                                    : isNatural
                                    ? "text-green-300"
                                    : isSocial
                                    ? "text-blue-300"
                                    : "text-white/80"
                                }`}
                              >
                                {userRoleDisplay}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* User menu items */}
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>

                      {/* Role badge in mobile menu */}
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border mt-2 ${
                          isAdmin
                            ? "bg-yellow-400/20 border-yellow-400/30"
                            : isNatural
                            ? "bg-green-400/20 border-green-400/30"
                            : isSocial
                            ? "bg-blue-400/20 border-blue-400/30"
                            : "bg-gray-400/20 border-gray-400/30"
                        }`}
                      >
                        <Shield
                          className={`w-4 h-4 ${
                            isAdmin
                              ? "text-yellow-400"
                              : isNatural
                              ? "text-green-400"
                              : isSocial
                              ? "text-blue-400"
                              : "text-gray-400"
                          }`}
                        />
                        <div>
                          <p
                            className={`font-semibold ${
                              isAdmin
                                ? "text-yellow-300"
                                : isNatural
                                ? "text-green-300"
                                : isSocial
                                ? "text-blue-300"
                                : "text-gray-300"
                            }`}
                          >
                            {isAdmin
                              ? "Admin Access"
                              : isNatural
                              ? "Natural Science"
                              : isSocial
                              ? "Social Science"
                              : "User Access"}
                          </p>
                          <p
                            className={`text-xs ${
                              isAdmin
                                ? "text-yellow-200"
                                : isNatural
                                ? "text-green-200"
                                : isSocial
                                ? "text-blue-200"
                                : "text-gray-200"
                            }`}
                          >
                            {isAdmin
                              ? "Full system permissions"
                              : isNatural
                              ? "Natural science exams access"
                              : isSocial
                              ? "Social science exams access"
                              : "Basic user permissions"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Get Started for mobile guests
                  <Link
                    to="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-4 py-3 rounded-xl font-semibold text-center hover:shadow-xl transition-all duration-300 mt-2"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavLinkProps {
  item: {
    path: string;
    label: string;
    highlight?: boolean;
    icon?: JSX.Element;
  };
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

        {/* Hover effect */}
        {!isActive && (
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
