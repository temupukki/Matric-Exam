import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  CheckCircle,
  Star,
  BookOpen,
  Shield,
  BarChart3,
  HelpCircle,
  TrendingUp,
  Upload,
  AlertCircle,
  CreditCard,
  Smartphone,
  Receipt,
  ArrowRight,
  X,
  Camera,
  FileText,
  Loader2,
  User,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  amount: number;
  period: string;
  savings: string;
  popular: boolean;
  color: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  buttonVariant: string;
}

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  steps: string[];
  accountInfo: string;
}

interface UserSession {
  user?: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
}

export default function CombinedPricingPayment() {
  const [selectedPackage, setSelectedPackage] = useState<PricingPlan | null>(
    null
  );
  const [selectedMethod, setSelectedMethod] = useState<string>("tele-birr");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState<"pricing" | "payment">(
    "pricing"
  );
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user session on component mount
  useEffect(() => {
    fetchUserSession();
  }, []);

  const fetchUserSession = async () => {
    try {
      console.log("🔄 Fetching user session...");
      setIsLoadingSession(true);
      setError(null);

      const res = await fetch("http://localhost:3000/api/me", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch session: ${res.status}`);
      }

      const sessionData = await res.json();
      console.log("✅ Session data received:", sessionData);

      setUserSession(sessionData);

      if (sessionData?.user?.email) {
        setUserEmail(sessionData.user.email);
      }
    } catch (error: any) {
      console.error("❌ Failed to fetch user session:", error);
      setError(`Session error: ${error.message}`);
      setUserSession(null);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const pricingPlans: PricingPlan[] = [
    {
      name: "Natural Science",
      description:
        "Practice Natural Science for university entry anytime, anywhere.",
      price: "89 ETB",
      amount: 89,
      period: "one time payment",
      savings: "Save 25%",
      popular: false,
      color: "from-purple-500 to-pink-500",
      features: [
        
        { text: "All subject  Exams", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced progress tracking", included: true },
        { text: "Unlimited exam attempts", included: true },
        { text: "Detailed analytics", included: true },
      ],
      buttonText: "Choose Plan",
      buttonVariant: "primary",
    },
    {
      name: "Social Science",
      description:
        "Practice Social Science for university entry anytime, anywhere.",
      price: "89 ETB",
      amount: 89,
      period: "one time payment",
      savings: "Save 25%",
      popular: false,
      color: "from-purple-500 to-pink-500",
      features: [
      
        { text: "All subject Exams", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced progress tracking", included: true },
        { text: "Unlimited exam attempts", included: true },
        { text: "Detailed analytics", included: true },
      ],
      buttonText: "Choose Plan",
      buttonVariant: "primary",
    },
    {
      name: "Family Package",
      description:
        "Practice Both Social Science and Natural Science for university entry anytime, anywhere.",
      price: "169 ETB",
      amount: 169,
      period: "one time payment",
      savings: "Save 30%",
      popular: true,
      color: "from-orange-500 to-amber-500",
      features: [
    
        { text: "All subject Exams", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced progress tracking", included: true },
        { text: "Unlimited exam attempts", included: true },
        { text: "Detailed analytics", included: true },
        { text: "Access Both Streams", included: true },
      ],
      buttonText: "Choose Plan",
      buttonVariant: "primary",
    },
  ];

  const paymentMethods: PaymentOption[] = [
    {
      id: "tele-birr",
      name: "Tele Birr",
      description: "Fast and secure mobile payment",
      icon: <Smartphone className="w-8 h-8" />,
      steps: [
        "Open your Tele Birr app",
        "Go to 'Send Money' section",
        "Choose 'To individual'",
        `Enter our account number: 251912345678`,
        `Enter amount: ${selectedPackage?.amount || 99} ETB`,
        "Enter your password",
        "Complete the transaction",
      ],
      accountInfo: "Account: 251912345678\nName: TEMESGEN GASHAW",
    },
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Materials",
      description: "Access to all subject materials and practice exams",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Detailed performance tracking and insights",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Your data and progress are always protected",
    },
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade  your plan at any time. Changes take effect immediately.",
    },
 
    {
      question: "What payment methods do you accept?",
      answer:
        "Unfortunately, we currently accept only TeleBirr as a payment method.",
    },
  
  ];

  const selectedPayment = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  const handlePackageSelect = (plan: PricingPlan) => {
    console.log("📦 Package selected:", plan.name);

    if (!userSession?.user) {
      console.warn("⚠️ User not logged in, preventing package selection");
      alert("Please log in to proceed with payment.");
      return;
    }

    setSelectedPackage(plan);
    setCurrentStep("payment");
    paymentMethods[0].steps[4] = `Enter amount: ${plan.amount} ETB`;
    console.log("➡️ Moving to payment step");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("📁 File selected:", file);

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        console.warn("⚠️ File too large:", file.size);
        alert("File size too large. Please select an image under 5MB.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        console.warn("⚠️ Invalid file type:", file.type);
        alert("Please select an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("✅ File loaded successfully");
        setUploadedImage(e.target?.result as string);
        setUploadedFile(file);
      };

      reader.onerror = (error) => {
        console.error("❌ File reading error:", error);
        alert("Failed to read the file. Please try again.");
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    console.log("🗑️ Removing uploaded image");
    setUploadedImage(null);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFileToSupabase = async (file: File): Promise<string> => {
    try {
      console.log("📤 Starting Supabase file upload...");

      if (!file) {
        throw new Error("No file provided for upload");
      }

      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
        throw new Error(
          "Supabase is not configured. Please check your environment variables."
        );
      }

      const bucketName = "Matric";
      const filePath = `${Date.now()}-${file.name}`;

      console.log("📁 Uploading file:", {
        bucketName,
        filePath,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      // Upload file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("❌ Supabase upload error:", uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log("✅ File uploaded successfully:", uploadData);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      console.log("🔗 Public URL generated:", publicUrlData.publicUrl);

      return publicUrlData.publicUrl;
    } catch (error: any) {
      console.error("❌ Supabase upload failed:", error);
      throw new Error(`File upload failed: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Starting payment submission...");

    if (!uploadedImage || !uploadedFile) {
      console.warn("⚠️ Validation failed: No image uploaded");
      alert("Please upload your payment receipt screenshot.");
      return;
    }

    if (!selectedPackage) {
      console.warn("⚠️ Validation failed: No package selected");
      alert("Please select a package.");
      return;
    }

    if (!userEmail || !/\S+@\S+\.\S+/.test(userEmail)) {
      console.warn("⚠️ Validation failed: Invalid email", userEmail);
      alert("Please enter a valid email address.");
      return;
    }

    if (!userSession?.user) {
      console.warn("⚠️ Validation failed: No user session");
      alert("Your session has expired. Please log in again.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setUploadMessage("Uploading receipt to secure storage...");

    try {
      // First upload the file to Supabase
      let fileUrl = "";
      try {
        fileUrl = await uploadFileToSupabase(uploadedFile);
        setUploadMessage("Receipt uploaded! Finalizing payment...");
      } catch (uploadError: any) {
        console.error("❌ File upload failed:", uploadError);
        throw new Error(`Failed to upload receipt: ${uploadError.message}`);
      }

      const paymentData = {
        email: userEmail,
        pack: selectedPackage.name,

        evidence: fileUrl,
      };

      console.log("📦 Payment data to send:", paymentData);
      console.log("📡 Sending request to /api/pay...");

      const response = await fetch("http://localhost:3000/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (jsonError) {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("✅ Payment successful! Response:", data);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setUploadMessage("");
    } catch (error: any) {
      console.error("❌ Payment submission error:", error);
      setIsSubmitting(false);
      setError(error.message);
      setUploadMessage("");
      alert(`Payment failed: ${error.message}`);
    }
  };

  const goBackToPricing = () => {
    console.log("↩️ Going back to pricing");
    setCurrentStep("pricing");
    setSelectedPackage(null);
    setUploadedImage(null);
    setUploadedFile(null);
    setError(null);
    setUploadMessage("");
  };

  const UserInfo = () => {
    if (isLoadingSession) {
      return (
        <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-blue-600 text-sm">Loading...</span>
        </div>
      );
    }

    if (userSession?.user) {
      return (
        <div className="flex items-center gap-3 bg-green-50 rounded-full px-4 py-2">
          <User className="w-4 h-4 text-green-600" />
          <span className="text-green-700 text-sm font-medium">
            {userSession.user.email}
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 bg-yellow-50 rounded-full px-4 py-2">
        <AlertCircle className="w-4 h-4 text-yellow-600" />
        <span className="text-yellow-700 text-sm">Not logged in</span>
      </div>
    );
  };

  const ErrorDisplay = () => {
    if (!error) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl"
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h4 className="font-semibold text-red-800">Error</h4>
        </div>
        <p className="text-red-700 text-sm mt-1">{error}</p>
        <button
          onClick={() => setError(null)}
          className="text-red-600 text-xs mt-2 hover:text-red-800"
        >
          Dismiss
        </button>
      </motion.div>
    );
  };

  const UploadMessageDisplay = () => {
    if (!uploadMessage) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <h4 className="font-semibold text-blue-800">Uploading</h4>
        </div>
        <p className="text-blue-700 text-sm mt-1">{uploadMessage}</p>
      </motion.div>
    );
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
            Payment Received!
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for your {selectedPackage?.name} package payment. We've
            received your receipt and will activate your account within 24
            hours.
          </p>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700">
              <strong>What's next?</strong>
              <br />
              Check your account in 24 hours! If not activated yet, go to the
              Support page in the footer!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (currentStep === "payment" && selectedPackage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <motion.button
              onClick={goBackToPricing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Plans
            </motion.button>
            <UserInfo />
          </div>

          <ErrorDisplay />
          <UploadMessageDisplay />

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
              <Shield className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-600">
                Secure Payment
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {selectedPackage.name}
              </span>{" "}
              Payment
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete your payment for the {selectedPackage.name} package and
              upload the receipt to activate your account.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  Your Selection
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">
                      {selectedPackage.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {selectedPackage.description}
                    </p>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-center">
                      <div className="text-2xl font-bold">
                        {selectedPackage.price}
                      </div>
                      <div className="text-blue-100 text-sm">
                        {selectedPackage.period}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Package Includes:
                  </h4>
                  <div className="space-y-2">
                    {selectedPackage.features.map(
                      (feature, index) =>
                        feature.included && (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{feature.text}</span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Receipt className="w-6 h-6 text-green-600" />
                    How to Pay with Tele Birr
                  </h3>

                  <div className="space-y-4">
                    {selectedPayment?.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-800">
                        Important
                      </h4>
                    </div>
                    <pre className="text-yellow-700 text-sm whitespace-pre-wrap font-sans">
                      {selectedPayment?.accountInfo}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Upload className="w-6 h-6 text-purple-600" />
                    Payment Confirmation
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6"
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter your email for payment confirmation"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        We'll send payment confirmation to this email
                      </p>
                    </motion.div>

                    {!uploadedImage ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />

                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Camera className="w-8 h-8 text-blue-600" />
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              Confirm Payment Receipt
                            </h4>
                            <p className="text-gray-600 mb-4">
                              Upload a screenshot of your payment confirmation
                              for your records
                            </p>
                          </div>

                          <div className="bg-blue-50 rounded-lg px-4 py-2">
                            <p className="text-blue-700 text-sm font-medium">
                              This is for your reference only
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <img
                          src={uploadedImage}
                          alt="Uploaded receipt"
                          className="w-full h-64 object-contain rounded-2xl border-2 border-green-200 bg-gray-50"
                        />

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>

                        <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-700 font-medium">
                            Receipt confirmed! Ready to upload to secure
                            storage.
                          </span>
                        </div>
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={
                        !uploadedImage || isSubmitting || !userSession?.user
                      }
                      whileHover={{
                        scale: uploadedImage && userSession?.user ? 1.02 : 1,
                      }}
                      whileTap={{
                        scale: uploadedImage && userSession?.user ? 0.98 : 1,
                      }}
                      className={`w-full mt-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                        uploadedImage && userSession?.user && !isSubmitting
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing Payment...
                        </>
                      ) : !userSession?.user ? (
                        "Please Log In to Submit"
                      ) : (
                        <>
                          Submit Payment Verification
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 mb-8">
        <div className="flex justify-end">
          <UserInfo />
        </div>
      </div>

      <ErrorDisplay />

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
              <span className="font-semibold text-blue-600">
                Affordable Excellence
              </span>
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
              Choose the perfect plan for your learning journey. All prices in
              Ethiopian Birr (ETB). Start free, upgrade anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

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
                  plan.popular
                    ? "ring-4 ring-purple-500/20 transform scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg"
                    >
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </motion.div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>

                    <div className="mb-4">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                      >
                        <div className="text-3xl font-bold">{plan.price}</div>
                        <div className="text-blue-100 text-sm">
                          {plan.period}
                        </div>
                      </motion.div>
                    </div>

                    {plan.savings && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {plan.savings}
                      </motion.div>
                    )}
                  </div>

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
                        <span
                          className={`text-sm ${
                            feature.included ? "text-gray-700" : "text-gray-400"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePackageSelect(plan)}
                    disabled={!userSession?.user}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      userSession?.user
                        ? plan.buttonVariant === "primary"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl"
                          : "border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {!userSession?.user ? "Please Log In" : plan.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              Our platform provides all the tools and resources you need to
              excel in your matric exams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Get answers to the most common questions about our pricing and
              plans
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
