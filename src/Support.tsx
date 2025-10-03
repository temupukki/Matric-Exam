import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageCircle,
  Mail,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  HelpCircle,
  ArrowRight,
  Loader2,
  Shield,
  BookOpen,
  CreditCard,
  Bug,
  UserCheck,
  Globe,
  FileQuestion,
} from "lucide-react";

interface SupportForm {
  name: string;
  email: string;
  issueCategory: string;
  issueType: string;
  subject: string;
  description: string;
  attachments: File[];
  urgency: string;
}

export default function SupportPage() {
  const [formData, setFormData] = useState<SupportForm>({
    name: "",
    email: "",
    issueCategory: "",
    issueType: "",
    subject: "",
    description: "",
    attachments: [],
    urgency: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const issueCategories = [
    {
      id: "payment",
      name: "Payment Issues",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Problems with payments, receipts, or account activation",
    },
    {
      id: "technical",
      name: "Technical Issues",
      icon: <Bug className="w-5 h-5" />,
      description: "Website errors, bugs, or performance problems",
    },
    {
      id: "account",
      name: "Account Issues",
      icon: <UserCheck className="w-5 h-5" />,
      description: "Login problems, profile issues, or access denied",
    },
    {
      id: "content",
      name: "Content & Exams",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Questions about study materials or exam problems",
    },
    {
      id: "general",
      name: "General Support",
      icon: <HelpCircle className="w-5 h-5" />,
      description: "Other questions or feedback",
    },
  ];

  const issueTypes: { [key: string]: string[] } = {
    payment: [
      "Payment not verified",
      "Receipt upload failed",
      "Wrong amount paid",
      "Account not activated after payment",
      "Transaction failed",

      "Payment method not working",
      "Other payment issue",
    ],
    technical: [
      "Website not loading",
      "Page errors or crashes",
      "Slow performance",

      "Browser compatibility",

      "Other technical issue",
    ],
    account: [
      "Can't login to account",
      "Forgot password",
      "Account locked",
      "Profile update issues",
      "Wrong user information",
      "Account access denied",
      "Need to change email",
      "Other account issue",
    ],
    content: [
      "Wrong answers in exams",
      "Can't access certain subjects",

      "Practice tests not loading",
      "Content quality issue",
      "Request new subjects",
      "Other content issue",
    ],
    general: [
      "Feature request",
      "Partnership inquiry",
      "Feedback & suggestions",
      "Report a user",
      "Business inquiries",
      "Career opportunities",
      "Press & media",
      "Other general inquiry",
    ],
  };

  const urgencyLevels = [
    { value: "low", label: "Low", description: "General question, no urgency" },
    {
      value: "medium",
      label: "Medium",
      description: "Important but not critical",
    },
    { value: "high", label: "High", description: "Need help within few hours" },
    {
      value: "critical",
      label: "Critical",
      description: "System down or urgent issue",
    },
  ];

  const handleInputChange = (
    field: keyof SupportForm,
    value: string | File[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset issue type when category changes
      ...(field === "issueCategory" && { issueType: "" }),
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files.slice(0, 5)], // Limit to 5 files
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Support Request Sent!
          </h2>

          <p className="text-gray-600 mb-6">
            We've received your support request for{" "}
            <strong>"{formData.subject}"</strong> and will get back to you
            within 24 hours at <strong>{formData.email}</strong>.
          </p>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                Response Time: 24 hours
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                Check your email regularly
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                Ticket ID: #SM{Date.now().toString().slice(-6)}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Return to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
          >
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-blue-600">
              Customer Support
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Can We{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Help You?
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help with any issues you're facing. Describe your
            problem and we'll get back to you quickly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Support Information */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Contact Methods */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  Contact Support
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Email Support
                      </h4>
                      <p className="text-blue-600">support@exammaster.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Phone Support
                      </h4>
                      <p className="text-green-600">+251 912 345 678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Response Time
                      </h4>
                      <p className="text-purple-600">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Support Hours
                      </h4>
                      <p className="text-orange-600">Mon-Sun: 8AM - 8PM EAT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Tips */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  Quick Tips
                </h3>

                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Be specific about your issue for faster resolution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Include relevant screenshots or error messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Check our FAQ page for common solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Keep your account information ready</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Support Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                Submit Support Request
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Issue Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    What type of issue are you experiencing? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {issueCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleInputChange("issueCategory", category.id)
                        }
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          formData.issueCategory === category.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-lg ${
                              formData.issueCategory === category.id
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {category.icon}
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            {category.name}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Issue Type and Urgency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specific Issue *
                    </label>
                    <select
                      required
                      value={formData.issueType}
                      onChange={(e) =>
                        handleInputChange("issueType", e.target.value)
                      }
                      disabled={!formData.issueCategory}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select issue type</option>
                      {formData.issueCategory &&
                        issueTypes[formData.issueCategory]?.map((issue) => (
                          <option key={issue} value={issue}>
                            {issue}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) =>
                        handleInputChange("urgency", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    >
                      {urgencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    placeholder="Brief description of your issue"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                    placeholder="Please describe your issue in detail. Include steps to reproduce, error messages, and any other relevant information..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Attach Files (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer block"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileQuestion className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 mb-2">
                            Click to upload screenshots or documents
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports: Images, PDF, DOC (Max 10MB each, up to 5
                            files)
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Uploaded Files */}
                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-700 truncate">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB)
                          </span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700 transition-colors text-lg font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      Submit Support Request
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  We'll respond to your support request within 24 hours via
                  email. For urgent issues, call our support line.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
