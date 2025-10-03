import { motion } from "framer-motion";
import { useState, useRef } from "react";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Smartphone,
  Receipt,
  Shield,
  ArrowRight,
  X,
  Camera,
  FileText,
  Loader2,
} from "lucide-react";

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  steps: string[];
  accountInfo: string;
}

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState<string>("tele-birr");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const paymentMethods: PaymentOption[] = [
    {
      id: "tele-birr",
      name: "Tele Birr",
      description: "Fast and secure mobile payment",
      icon: <Smartphone className="w-8 h-8" />,
      steps: [
        "Open your Tele Birr app",
        "Go to 'Send Money' section",
        "Enter our account number: 251912345678",
        "Enter amount: 99 ETB",
        "Add note: 'ExamMaster Payment'",
        "Complete the transaction",
      ],
      accountInfo: "Account: 251912345678\nName: TEMESGEN GASHAW",
    },
  ];

  const selectedPayment = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size too large. Please select an image under 5MB.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert("Please upload your payment receipt screenshot.");
      return;
    }

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
            Payment Received!
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for your payment. We've received your receipt and will
            activate your account within 24 hours.
          </p>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700">
              <strong>What's next?</strong>
              <br />
              You'll receive a confirmation email once your payment is verified
              and your account is activated.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
            <Shield className="w-6 h-6 text-green-600" />
            <span className="font-semibold text-green-600">Secure Payment</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Complete Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Payment
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your preferred payment method and upload the receipt
            screenshot to activate your account.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                Payment Methods
              </h3>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedMethod === method.id
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {method.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Price Display */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">99 ETB</div>
                  <div className="text-blue-100 text-sm">One-time payment</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Payment Steps & Upload */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Payment Steps */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Receipt className="w-6 h-6 text-green-600" />
                  How to Pay with {selectedPayment?.name}
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

                {/* Account Information */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">Important</h4>
                  </div>
                  <pre className="text-yellow-700 text-sm whitespace-pre-wrap font-sans">
                    {selectedPayment?.accountInfo}
                  </pre>
                </div>
              </div>

              {/* Receipt Upload */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Upload className="w-6 h-6 text-purple-600" />
                  Upload Payment Receipt
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* Upload Area */}
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
                            Upload Screenshot
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Take a screenshot of your payment confirmation and
                            upload it here
                          </p>
                        </div>

                        <div className="bg-blue-50 rounded-lg px-4 py-2">
                          <p className="text-blue-700 text-sm font-medium">
                            Supports: JPG, PNG, WEBP (Max 5MB)
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
                          Receipt uploaded successfully!
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Tips */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Upload Tips:
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Ensure the screenshot is clear and readable</li>
                      <li>• Double-check that you've paid exactly 99 ETB</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!uploadedImage || isSubmitting}
                    whileHover={{ scale: uploadedImage ? 1.02 : 1 }}
                    whileTap={{ scale: uploadedImage ? 0.98 : 1 }}
                    className={`w-full mt-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                      uploadedImage && !isSubmitting
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Payment...
                      </>
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
