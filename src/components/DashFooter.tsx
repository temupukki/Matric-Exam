import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Heart,
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  Globe,
  Atom,
} from "lucide-react";
import { useState, useEffect } from "react";

const MotionLink = motion(Link);

// Type definitions
interface User {
  id: string;
  name?: string;
  email: string;
  role: "ADMIN" | "NATURAL" | "SOCIAL" | "BOTH" | string;
}

interface Session {
  user: User;
}

interface NavItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  name?: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  name: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  text: string;
}
const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
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

export default function DashFooter() {
  const { session, loading } = useSession();

  const baseUserNavItems: NavItem[] = [
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

  // Role-specific navigation items
  const naturalNavItems: NavItem[] = [
    {
      path: "/dashboard/natural",
      label: "Natural Exams",
      icon: <Atom className="w-4 h-4" />,
    },
  ];

  const socialNavItems: NavItem[] = [
    {
      path: "/dashboard/social",
      label: "Social Exams",
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  // Get navigation items based on user role
  const getUserNavItems = (): NavItem[] => {
    if (!session) return [];

    const userRole = session.user?.role;

    // Start with base items
    let navItems: NavItem[] = [...baseUserNavItems];

    // Remove Pricing and Demo Exams for NATURAL, SOCIAL, and BOTH roles
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

    // Add role-specific items
    if (userRole === "ADMIN") {
      // Admin gets both Natural and Social
      navItems = [...navItems, ...naturalNavItems, ...socialNavItems];
    } else if (userRole === "NATURAL") {
      // Natural role gets only Natural exams
      navItems = [...navItems, ...naturalNavItems];
    } else if (userRole === "SOCIAL") {
      // Social role gets only Social exams
      navItems = [...navItems, ...socialNavItems];
    }
    // Add more roles here if needed

    return navItems;
  };

  const userNavItems = getUserNavItems();

  // Navigation items for non-signed in users
  const guestNavItems: NavItem[] = [
    { path: "/", label: "Home", name: "Home" },
    { path: "/stream", label: "Stream", name: "Stream" },
    { path: "/feature", label: "Features", name: "Features" },
    { path: "/contact", label: "Contact", name: "Contact" },
    { path: "/sign-in", label: "Get Started", name: "Get Started" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
  ];

  const contactInfo: ContactInfo[] = [
    { icon: <Mail className="w-5 h-5" />, text: "support@exammaster.com" },
    { icon: <Phone className="w-5 h-5" />, text: "+251 9123456789" },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Somewhere in Addis Ababa",
    },
  ];

  const quickLinks: NavItem[] = session ? userNavItems : guestNavItems;

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            transition: { duration: 20, repeat: Infinity, ease: "linear" },
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
              Empowering students to excel in their matric exams through
              innovative learning tools, expert guidance, and personalized study
              experiences.
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
                    color: "#facc15",
                  }}
                  className="p-2 bg-blue-700/50 rounded-lg  hover:text-blue-900 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - Dynamic based on session */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold mb-6 flex items-center gap-2"
            >
              <ArrowRight className="w-5 h-5 text-yellow-400" />
              {session ? "Dashboard Links" : "Quick Links"}
            </motion.h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
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
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
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
            © {new Date().getFullYear()} ExamMaster. Made with{" "}
            <Heart className="inline w-4 h-4 text-red-400" /> for students by
            @temupukki
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-6 text-sm text-blue-300"
          >
            <MotionLink
              whileHover={{ color: "#facc15", scale: 1.05 }}
              to="/dashboard/privacy"
              className="hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </MotionLink>
            <MotionLink
              whileHover={{ color: "#facc15", scale: 1.05 }}
              to="/dashboard/terms"
              className="hover:text-yellow-400 transition-colors"
            >
              Terms of Service
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
