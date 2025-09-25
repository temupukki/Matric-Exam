import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FileText, 
  Scale, 
  UserCheck, 
  Shield, 
  AlertCircle,
  BookOpen,
  CreditCard,
  MessageCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  ArrowRight,
  Mail,
  Clock
} from "lucide-react";

export default function TermsOfService() {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [accepted, setAccepted] = useState(false);

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="w-5 h-5" />,
      content: `By accessing or using ExamMaster's educational platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not access or use our services.

• You must be at least 13 years old to use our platform
• Parents or guardians must agree to these terms for users under 18
• Educational institutions are responsible for obtaining necessary consents
• Continued use constitutes acceptance of any modifications`
    },
    {
      title: "Account Registration",
      icon: <UserCheck className="w-5 h-5" />,
      content: `To access certain features, you must register for an account:

• Provide accurate, current, and complete information
• Maintain the security of your password and account
• Notify us immediately of any unauthorized use
• You are responsible for all activities under your account
• We reserve the right to refuse service to anyone

Accounts may be terminated if we suspect fraudulent or abusive activity.`
    },
    {
      title: "Educational Services",
      icon: <BookOpen className="w-5 h-5" />,
      content: `Our platform provides educational resources including:

• Study materials and practice tests
• Progress tracking and analytics
• Tutoring services (where available)
• Educational content and resources

We strive to provide accurate information but cannot guarantee:
• Specific academic outcomes or results
• Compatibility with all educational curricula
• Unlimited availability of all resources

Educational content is for personal, non-commercial use only.`
    },
    {
      title: "Payment Terms",
      icon: <CreditCard className="w-5 h-5" />,
      content: `Certain features may require payment:

• Fees are clearly displayed before purchase
• Payments are processed through secure third-party providers
• Subscription fees are billed in advance
• You may cancel at any time, but no refunds for partial periods
• We may change fees with 30 days' notice

Free trial periods:
• Automatically convert to paid subscriptions unless canceled
• Limited to one trial per user
• We may revoke trials for abuse`
    },
    {
      title: "User Conduct",
      icon: <Shield className="w-5 h-5" />,
      content: `You agree not to:

• Share your account with others
• Use the platform for any illegal purpose
• Attempt to hack or disrupt our services
• Upload malicious code or viruses
• Harass other users or staff
• Plagiarize or misuse educational content
• Reverse engineer our platform

Violations may result in immediate account termination.`
    },
    {
      title: "Intellectual Property",
      icon: <FileText className="w-5 h-5" />,
      content: `All content on our platform is protected:

• We own or license all educational materials, software, and content
• You receive a limited license to use materials for educational purposes
• You may not reproduce, distribute, or create derivative works
• User-generated content remains your property, but you grant us usage rights
• Copyright infringement notices should be sent to legal@exammaster.com

Respect intellectual property rights of all content.`
    },
    {
      title: "Privacy and Data",
      icon: <Shield className="w-5 h-5" />,
      content: `Your privacy is important to us:

• We collect and use data as described in our Privacy Policy
• We implement security measures to protect your information
• We may use aggregated, anonymized data for research
• You can request deletion of your personal data
• We comply with applicable data protection laws

By using our services, you consent to our data practices.`
    },
    {
      title: "Termination",
      icon: <XCircle className="w-5 h-5" />,
      content: `We may terminate or suspend access immediately:

• For violations of these terms
• If required by law
• For unexpected technical or security issues
• For non-payment of fees

Upon termination:
• Your right to use the platform ceases immediately
• We may delete your account and data
• Any outstanding payments remain due

You may terminate your account at any time through account settings.`
    },
    {
      title: "Disclaimer of Warranties",
      icon: <AlertCircle className="w-5 h-5" />,
      content: `The service is provided "as is" without warranties:

• We do not guarantee uninterrupted or error-free service
• Educational outcomes are not guaranteed
• Content accuracy is not warranted
• We are not liable for technical issues beyond our control
• You use the service at your own risk

We make reasonable efforts to maintain service quality but provide no specific warranties.`
    },
    {
      title: "Limitation of Liability",
      icon: <Scale className="w-5 h-5" />,
      content: `To the extent permitted by law:

• We are not liable for indirect, incidental, or consequential damages
• Total liability is limited to fees paid in the last 6 months
• We are not liable for third-party content or services
• No liability for educational outcomes or results
• Some jurisdictions do not allow these limitations

This limitation applies to all claims and theories of liability.`
    },
    {
      title: "Governing Law",
      icon: <Scale className="w-5 h-5" />,
      content: `These terms are governed by:

• Laws of the State of Delaware, USA
• Any disputes will be resolved in Delaware courts
• We comply with applicable international laws
• International users submit to jurisdiction in Delaware

We make no claims that content is appropriate outside your jurisdiction.`
    },
    {
      title: "Changes to Terms",
      icon: <Calendar className="w-5 h-5" />,
      content: `We may modify these terms:

• Changes will be posted on this page with updated date
• Material changes will be notified via email or platform notice
• Continued use after changes constitutes acceptance
• Previous versions are available upon request

Check this page regularly for updates. Significant changes will be prominently notified.`
    }
  ];

  const keyPoints = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Age Requirement",
      description: "Must be 13+ to use our platform",
      type: "requirement"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Transparent Pricing",
      description: "No hidden fees, cancel anytime",
      type: "benefit"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Protection",
      description: "Enterprise-grade security",
      type: "benefit"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Use",
      description: "Personal, non-commercial only",
      type: "requirement"
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
            transition: { duration: 35, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 40, repeat: Infinity, ease: "linear" }
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
              <Scale className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Legal Agreement</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Terms of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Service
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto mb-8"
            >
              Last updated: December 1, 2024. Please read these terms carefully before using 
              ExamMaster. These terms govern your access to and use of our educational platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full"
            >
              <Clock className="w-4 h-4" />
              Effective date: December 1, 2024 • Version 3.2
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {keyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                  point.type === 'benefit' ? 'border-green-500' : 'border-blue-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    point.type === 'benefit' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {point.icon}
                  </div>
                  <span className={`text-sm font-semibold ${
                    point.type === 'benefit' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {point.type === 'benefit' ? 'Benefit' : 'Requirement'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{point.title}</h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8"
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
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to ExamMaster. These Terms of Service ("Terms") govern your access to and use of 
                ExamMaster's website, services, and applications (collectively, the "Service"). 
                Our Service provides educational resources, practice tests, and learning tools to help 
                students excel in their academic pursuits.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. 
                If you are using our Service on behalf of an educational institution, you agree to these Terms 
                on behalf of that institution.
              </p>
            </motion.div>

            {/* Accordion Sections */}
            <div className="divide-y divide-gray-200">
              {termsSections.map((section, index) => (
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
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">Section {index + 1} of {termsSections.length}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Email: legal@exammaster.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Response time: Within 72 hours</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Acceptance Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Acceptance Acknowledgement</h3>
                <p className="text-gray-600 mb-4">
                  By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="terms-acceptance"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms-acceptance" className="text-gray-700">
                    I have read and agree to the Terms of Service
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: accepted ? 1.02 : 1 }}
                  whileTap={{ scale: accepted ? 0.98 : 1 }}
                  disabled={!accepted}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    accepted 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue to Platform <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
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
                  <h3 className="font-semibold text-gray-900">Download Terms</h3>
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
                  <h3 className="font-semibold text-gray-900">Contact Legal Team</h3>
                  <p className="text-sm text-gray-600">Questions about these terms?</p>
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