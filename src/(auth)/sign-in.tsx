import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  BookOpen,
  Award,
  Star,
  User,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

import { authClient } from "../../lib/auth-client";
import { toast } from "sonner";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const features = [
    { icon: <BookOpen className="w-6 h-6" />, text: "Access to all subjects" },
    { icon: <Award className="w-6 h-6" />, text: "Personalized learning path" },
    { icon: <Star className="w-6 h-6" />, text: "Expert-crafted content" },
    { icon: <GraduationCap className="w-6 h-6" />, text: "Progress tracking" },
  ];

  // Email/Password SignIn & SignUp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // SIGN IN
        const result = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          toast.error(`Sign in failed: ${result.error.message}`);
        } else {
          toast.success("Welcome back! Sign in successful.");
          navigate("/dashboard");
        }
      } else {
        // SIGN UP
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords don't match");
          setLoading(false);
          return;
        }

        const result = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
        });

        if (result.error) {
          toast.error(`Sign up failed: ${result.error.message}`);
        } else {
          toast.success("Account created successfully!");

          // Auto login after signup
          const loginResult = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
          });

          if (loginResult.data) {
            navigate("/dashboard");
          }
        }
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
          callbackURL: "/dashboard",
     
      });

      console.log("Google auth result:", result);

      if (result.error) {
        toast.error(` ${result.error.message}`);
        return;
      }
      toast.success("Google sign in successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Google sign in failed");
      console.error("Google auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
          >
            <div className="h-8 w-8 bg-yellow-400 rounded-full border-2 border-yellow-400 flex items-center justify-center">
              <span className="text-sm font-bold text-white">EM</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ExamMaster
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            {isLogin ? "Welcome Back!" : "Join ExamMaster"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 max-w-md"
          >
            {isLogin
              ? "Sign in to continue your journey to academic excellence and track your progress."
              : "Create your account and start your path to matric exam success today."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-2 bg-blue-100 rounded-full text-blue-600"
                >
                  {feature.icon}
                </motion.div>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-4 max-w-xs"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Tests</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {/* Toggle between Login/Signup */}
          <motion.div
            layout
            className="flex bg-blue-100 rounded-2xl p-1 mb-8 relative"
          >
            <motion.button
              layout
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 relative z-10 ${
                isLogin ? "text-white" : "text-blue-600"
              }`}
            >
              Sign In
            </motion.button>
            <motion.button
              layout
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 relative z-10 ${
                !isLogin ? "text-white" : "text-blue-600"
              }`}
            >
              Sign Up
            </motion.button>
            <motion.div
              layout
              animate={{
                x: isLogin ? 0 : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-1 w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg"
            />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your password"
                    required={!isLogin}
                    minLength={6}
                  />
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Toggle between login/signup */}
            {isLogin ? (
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            )}

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google SignIn Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full p-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
