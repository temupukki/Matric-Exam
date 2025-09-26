import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { authClient } from "../../lib/auth-client";

// Zod schema
const SigninSchema = z.object({
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof SigninSchema>;

export default function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      lastName: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninFormData) {
    const { lastName, password } = values;

    try {
      // For React version, we'll handle the sign-in differently
      const { data, error } = await authClient.signIn.email({
        email: `${lastName}@dashenbank.com`,
        password,
      });

      if (error) {
        toast.error("Sign in failed", {
          description:
            error.message || "Please check your credentials and try again",
        });
        return;
      }

      if (data) {
        toast.success("Welcome!", {
          description: "You've been signed in successfully",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later",
      });
      console.error("Sign-in error →", err);
    }
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-blue-700 font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4 sm:p-6">
      <title>Sign In | CBS</title>

      <Card className="w-full max-w-md p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex justify-center">
            <img
              src="/dashen logo.png"
              alt="Dashen Bank Logo"
              className="h-16 w-auto"
            />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-blue-800">
              Dashen Bank CBS
            </CardTitle>
            <CardDescription className="text-blue-600 text-base font-medium">
              Welcome to Temporary Core Banking System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-3">
              <Label
                htmlFor="lastName"
                className="font-semibold text-blue-800 text-sm sm:text-base"
              >
                Username
              </Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Enter your last name"
                className="h-12 text-blue-900 placeholder-blue-400 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 font-medium mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="font-semibold text-blue-800 text-sm sm:text-base"
                >
                  Password
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 h-auto"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="ml-1 text-xs">
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </Button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className="h-12 text-blue-900 placeholder-blue-400 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              {errors.password && (
                <p className="text-sm text-red-600 font-medium mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In to CBS"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-blue-100">
          <div className="text-center">
            <p className="text-sm text-blue-600">
              Need help?{" "}
              <Link
                to="/support"
                className="font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-2"
              >
                Contact Support
              </Link>
            </p>
          </div>
          <div className="text-xs text-blue-500 text-center">
            <p>Secure Core Banking System • v1.0</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
