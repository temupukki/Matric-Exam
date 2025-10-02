import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Star, 
 
  BookOpen,

  Shield,
  BarChart3,
  Video,
 
  HelpCircle,

  TrendingUp,
  ArrowRight
} from "lucide-react";

export default function Price() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const pricingPlans = [
    
    {
      name: "Natural Science",
      description: "Practice Natural Science for university entry anytime, anywhere.",
      price: "99 Birr one time",
      savings: "Save 25%",
      popular: false,
      color: "from-purple-500 to-pink-500",
      features: [
        { text: "Access to all demo exams", included: true },
        { text: "All subject materials", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced progress tracking", included: true },
        { text: "Unlimited exam attempts", included: true },
        { text: "Detailed analytics", included: true },

       
      ],
      buttonText: "Proceed To Payment",
      buttonVariant: "primary"
    },
     {
      name: "Social Science",
      description: "Practice Social Science for university entry anytime, anywhere.",
      price: "99 Birr one time",
      savings: "Save 25%",
      popular: false,
      color: "from-purple-500 to-pink-500",
      features: [
        { text: "Access to all demo exams", included: true },
        { text: "All subject materials", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced progress tracking", included: true },
        { text: "Unlimited exam attempts", included: true },
        { text: "Detailed analytics", included: true },

       
      ],
      buttonText: "Proceed To Payment",
      buttonVariant: "primary"
    },
    
    {
      name: "Family Package",
      description: "Practice Social Science and Natural Science for university entry anytime, anywhere.",
      price: "170 ETB",
      savings: "Save 30%",
      popular: true,
      color: "from-orange-500 to-amber-500",
      features: [
        { text: "Access to all demo exams", included: true },
        { text: "All subject materials", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced progress tracking", included: true },
        { text: "Unlimited exam attempts", included: true },
        { text: "Detailed analytics", included: true },
        { text: "Access Both Streams ", included: true }
      ],
      buttonText: "Proceed To Payment",
      buttonVariant: "primary"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Materials",
      description: "Access to all subject materials and practice exams"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Detailed performance tracking and insights"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Explanations",
      description: "Step-by-step video solutions for all questions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Your data and progress are always protected"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans come with a 7-day free trial. No credit card required for the Starter plan."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major Ethiopian payment methods including CBE Birr, Tele Birr, and bank transfers."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! You can cancel your subscription anytime without any cancellation fees."
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
      <section className="relative py-16 px-4">
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
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Affordable Excellence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Choose the perfect plan for your learning journey. All prices in Ethiopian Birr (ETB). 
              Start free, upgrade anytime.
            </motion.p>

           
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: plan.popular ? 1.02 : 1 }}
                className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'ring-4 ring-purple-500/20 transform scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg"
                    >
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </motion.div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-900">
                       
                        </span>
                        <span className="text-gray-600">
                          /{billingPeriod === "monthly" ? "month" : "year"}
                        </span>
                      </div>
                      {billingPeriod === "yearly" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-green-600 font-semibold text-sm mt-2"
                        >
                          {plan.savings}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        {feature.included ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/sign-in")}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.buttonVariant === "primary"
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl'
                        : 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {plan.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools and resources you need to excel in your matric exams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to the most common questions about our pricing and plans
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full"
              />
            </div>

            <div className="relative z-10">
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
                Join thousands of Ethiopian students achieving academic excellence
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/sign-in")}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/contact")}
                  className="border-2 border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Contact Sales
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-blue-200 text-sm"
              >
                <p>✓ 7-day free trial on all paid plans</p>
                <p>✓ No credit card required for Starter plan</p>
                <p>✓ Cancel anytime</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}