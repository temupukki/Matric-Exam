import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const MotionLink = motion(Link);

export default function Footer() {
  const dashboardLinks = [
    { name: "Home", path: "/" },
    { name: "Demo Exams", path: "/demostart" },
    { name: "Stream", path: "/stream" },
    { name: "Features", path: "/feature" },
    { name: "Pricing", path: "/sign-in" },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: "support@exammaster.com",
      href: "mailto:support@exammaster.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: "+251 9123456789",
      href: "tel:+2519123456789",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Somewhere in Addis Ababa",
      href: "#",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    <img
                      src="exam-logo.png"
                      alt="Exam-master-logo"
                      className="rounded-full"
                    />
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    ExamMaster
                  </h1>
                  <p className="text-lg text-gray-300 font-medium">
                    Excel in Your Exams
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                Empowering Ethiopian students to excel in their matric exams
                through innovative learning tools, expert guidance, and
                personalized study experiences tailored for success.
              </p>
            </motion.div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
                Dashboard
              </h3>
              <ul className="space-y-3">
                {dashboardLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-lg"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
                Get In Touch
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.li
                    key={contact.text}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <a
                      href={contact.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-3 group text-lg"
                    >
                      <div className="p-2 rounded-lg group-hover:bg-gray-700 transition-colors">
                        {contact.icon}
                      </div>
                      {contact.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-lg">
                © {new Date().getFullYear()} ExamMaster. Made with{" "}
                <Heart className="inline w-5 h-5 text-red-400 fill-current" />{" "}
                for Ethiopian students by @temupukki
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <MotionLink
                whileHover={{ color: "#60a5fa", scale: 1.05 }}
                to="/privacy"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </MotionLink>
              <MotionLink
                whileHover={{ color: "#60a5fa", scale: 1.05 }}
                to="/terms"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </MotionLink>
              <MotionLink
                whileHover={{ color: "#60a5fa", scale: 1.05 }}
                to="/sign-in"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Support
              </MotionLink>
            </div>
          </div>
        </motion.div>

        {/* Ethiopian Flag Colors Accent */}
        <div className="mt-8 flex justify-center">
          <div className="flex h-2 rounded-full overflow-hidden max-w-md w-full">
            <div className="flex-1 bg-green-600"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-red-600"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
