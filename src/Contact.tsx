import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  MessageCircle,
  Star,
  Award,
  Users,
  ArrowRight
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      description: "Send us an email anytime",
      details: "support@exammaster.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      description: "Mon to Fri from 8am to 5pm",
      details: "+1 (555) 123-4567",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      details: "123 Education St, Learning City",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Response Time",
      description: "We typically reply within",
      details: "24 hours",
      color: "from-orange-500 to-red-500"
    }
  ];

  const faqs = [
    {
      question: "How can I get help with a specific subject?",
      answer: "Our expert tutors are available for one-on-one sessions in all matric subjects."
    },
    {
      question: "Do you offer free trial sessions?",
      answer: "Yes! We offer a 7-day free trial with full access to all study materials."
    },
    {
      question: "Can I track my child's progress?",
      answer: "Parents receive detailed progress reports and analytics weekly."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Academic Director",
      expertise: "Mathematics & Science",
      image: "👩‍🏫"
    },
    {
      name: "Mike Chen",
      role: "Head Tutor",
      expertise: "English & Languages",
      image: "👨‍🏫"
    },
    {
      name: "Emily Davis",
      role: "Student Success Manager",
      expertise: "Progress Tracking",
      image: "👩‍💼"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Show success message (you can add a toast notification here)
    alert("Thank you for your message! We'll get back to you within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
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
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Get In Touch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              We're Here to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Help You Succeed
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Have questions about our platform? Our support team is here to help you 
              achieve academic excellence. Reach out to us anytime!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${method.color} text-white mb-4`}
                >
                  {method.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                <p className="font-semibold text-gray-800">{method.details}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Team Members */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Your Support Team
                </h3>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="text-2xl">{member.image}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                        <div className="text-xs text-blue-600">{member.expertise}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Common Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-blue-50/50 border border-blue-100"
                    >
                      <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {faq.question}
                      </div>
                      <div className="text-sm text-gray-600">{faq.answer}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white text-center"
              >
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-lg font-semibold">Support Available</div>
                <div className="text-sm opacity-90 mt-2">We're here to help you succeed around the clock</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Start Your Success Journey?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-blue-100 mb-8"
            >
              Join thousands of students who have transformed their academic performance
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today <ArrowRight className="inline ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}