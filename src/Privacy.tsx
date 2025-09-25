import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Mail, 
  Calendar,
  User,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function PrivacyPolicy() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const policySections = [
    {
      title: "Information We Collect",
      icon: <User className="w-5 h-5" />,
      content: `
        We collect information to provide better services to all our users. This includes:
        
        • Personal Information: Name, email address, phone number when you register
        • Academic Information: Grade level, subjects, performance data
        • Technical Information: IP address, browser type, device information
        • Usage Data: How you use our platform, features accessed, time spent
        
        We collect this information only when you voluntarily provide it or through automated means when you use our services.
      `
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-5 h-5" />,
      content: `
        Your information helps us provide, maintain, and improve our services:
        
        • Personalize your learning experience and recommend content
        • Provide customer support and respond to inquiries
        • Improve our platform's functionality and user experience
        • Send important updates about your account and our services
        • Analyze usage patterns to enhance educational content
        • Ensure platform security and prevent fraud
        
        We never sell your personal information to third parties.
      `
    },
    {
      title: "Data Protection & Security",
      icon: <Lock className="w-5 h-5" />,
      content: `
        We implement robust security measures to protect your data:
        
        • Encryption of sensitive data in transit and at rest
        • Regular security audits and vulnerability assessments
        • Access controls and authentication mechanisms
        • Secure data storage with regular backups
        • Employee training on data protection practices
        
        While we implement strong security measures, no method of transmission over the Internet is 100% secure.
      `
    },
    {
      title: "Data Sharing & Disclosure",
      icon: <Shield className="w-5 h-5" />,
      content: `
        We may share your information in these limited circumstances:
        
        • With your explicit consent for specific purposes
        • With educational institutions if you're using our platform through them
        • With service providers who help us operate our platform (under strict confidentiality)
        • When required by law or to protect our rights and safety
        • During business transfers like mergers or acquisitions
        
        We require all third parties to respect your privacy and handle data appropriately.
      `
    },
    {
      title: "Your Rights & Choices",
      icon: <CheckCircle className="w-5 h-5" />,
      content: `
        You have control over your personal information:
        
        • Access and download your data upon request
        • Correct inaccuracies in your personal information
        • Delete your account and associated data
        • Opt-out of marketing communications
        • Restrict processing of your data in certain circumstances
        • Data portability to transfer your information
        
        To exercise these rights, contact us at privacy@exammaster.com.
      `
    },
    {
      title: "Cookies & Tracking",
      icon: <FileText className="w-5 h-5" />,
      content: `
        We use cookies and similar technologies to enhance your experience:
        
        • Essential Cookies: Required for basic platform functionality
        • Performance Cookies: Help us understand how users interact with our platform
        • Functional Cookies: Remember your preferences and settings
        • Analytics Cookies: Help us improve our content and features
        
        You can control cookie settings through your browser preferences.
      `
    },
    {
      title: "Children's Privacy",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `
        We take children's privacy seriously:
        
        • Our services are designed for students including minors
        • We collect minimal information necessary for educational purposes
        • Parents/guardians can review, update, or delete their child's information
        • We obtain verifiable parental consent when required by law
        • We never knowingly collect information from children under 13 without consent
        
        Parents with concerns can contact us at privacy@exammaster.com.
      `
    },
    {
      title: "International Data Transfers",
      icon: <Mail className="w-5 h-5" />,
      content: `
        Your information may be transferred and processed in countries other than your own:
        
        • We use cloud services that may store data in multiple locations
        • All transfers comply with applicable data protection laws
        • We ensure adequate protection through standard contractual clauses
        • You consent to this transfer by using our services
        
        We maintain the same level of protection regardless of where your data is processed.
      `
    },
    {
      title: "Policy Updates",
      icon: <Calendar className="w-5 h-5" />,
      content: `
        We may update this policy to reflect changes in our practices:
        
        • We'll notify you of significant changes via email or platform notification
        • Continued use after changes constitutes acceptance of the new policy
        • We indicate the effective date at the top of this policy
        • Previous versions will be archived and available upon request
        
        We encourage you to review this policy periodically.
      `
    }
  ];

  const keyPrinciples = [
    {
      principle: "Transparency",
      description: "We're clear about how we collect and use your data",
      color: "from-blue-500 to-cyan-500"
    },
    {
      principle: "Security",
      description: "Your data is protected with enterprise-grade security",
      color: "from-green-500 to-emerald-500"
    },
    {
      principle: "Control",
      description: "You have full control over your personal information",
      color: "from-purple-500 to-pink-500"
    },
    {
      principle: "Minimal Collection",
      description: "We only collect what's necessary for your education",
      color: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 35, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
            >
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Your Privacy Matters</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Privacy{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto mb-8"
            >
              Last updated: December 1, 2024. We are committed to protecting your privacy 
              and ensuring transparency about how we handle your educational data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full"
            >
              <Calendar className="w-4 h-4" />
              Effective date: December 1, 2024 • Version 2.1
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {keyPrinciples.map((principle, index) => (
              <motion.div
                key={principle.principle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${principle.color} text-white mb-4`}
                >
                  <Shield className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{principle.principle}</h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 border-b border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                At ExamMaster, we are committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you use our educational platform. By accessing or 
                using ExamMaster, you agree to the terms of this Privacy Policy.
              </p>
            </motion.div>

            {/* Accordion Sections */}
            <div className="divide-y divide-gray-200">
              {policySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-gray-200"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-8 py-6 text-left hover:bg-gray-50/50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openSections.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openSections.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6">
                          <div className="pl-12">
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                              {section.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-r from-blue-50 to-cyan-50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact our Privacy Team:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Email: privacy@exammaster.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Response time: Within 48 hours</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl text-green-600 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Download Policy</h3>
                  <p className="text-sm text-gray-600">PDF version for your records</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Contact Privacy Team</h3>
                  <p className="text-sm text-gray-600">Get answers to your questions</p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// AnimatePresence component for exit animations
const AnimatePresence = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};