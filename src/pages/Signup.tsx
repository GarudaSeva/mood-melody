import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Music, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlassCard from "@/components/ui/GlassCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/api";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Signup: React.FC = () => {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateSignupFields = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      toast({
        title: "Missing details",
        description: "Please fill in your name, email, and password.",
        variant: "destructive",
      });
      return null;
    }

    if (!passwordRegex.test(password)) {
      toast({
        title: "Weak Password",
        description:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        variant: "destructive",
      });
      return null;
    }

    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return null;
    }

    return {
      trimmedName,
      trimmedEmail,
    };
  };

  const requestSignupOtp = async () => {
    const validatedFields = validateSignupFields();
    if (!validatedFields) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/signup/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: validatedFields.trimmedName,
          email: validatedFields.trimmedEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Could not send OTP. Please try again.");
      }

      setName(validatedFields.trimmedName);
      setEmail(validatedFields.trimmedEmail);
      setOtp("");
      setStep("otp");

      toast({
        title: "OTP sent!",
        description: data.message || "Check your email for the verification code.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Could not send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestSignupOtp();
  };

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedFields = validateSignupFields();
    if (!validatedFields) {
      return;
    }

    if (otp.length !== 6) {
      toast({
        title: "OTP required",
        description: "Please enter the 6-digit OTP sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup(validatedFields.trimmedName, validatedFields.trimmedEmail, password, otp);
      toast({
        title: "Account created!",
        description: "Your email is verified and your account is ready.",
      });
      navigate("/home");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Could not create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const headerTitle = step === "details" ? "Create Account" : "Verify Your Email";
  const headerDescription =
    step === "details"
      ? "Start your emotional music journey"
      : `Enter the 6-digit code sent to ${email}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mx-auto mb-4"
            >
              <Music className="w-8 h-8 text-background" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold">{headerTitle}</h1>
            <p className="text-muted-foreground mt-2">{headerDescription}</p>
          </div>

          {step === "details" && (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 bg-muted/50 border-border"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send OTP
                  </>
                )}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleCompleteSignup} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="signup-otp">Email Verification OTP</Label>
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <InputOTP
                    id="signup-otp"
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    containerClassName="justify-center"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="h-12 w-12 bg-background/30 text-base" />
                      <InputOTPSlot index={1} className="h-12 w-12 bg-background/30 text-base" />
                      <InputOTPSlot index={2} className="h-12 w-12 bg-background/30 text-base" />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-muted-foreground" />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="h-12 w-12 bg-background/30 text-base" />
                      <InputOTPSlot index={4} className="h-12 w-12 bg-background/30 text-base" />
                      <InputOTPSlot index={5} className="h-12 w-12 bg-background/30 text-base" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Enter the code we sent to <span className="text-foreground">{email}</span>.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Verify OTP & Create Account
                  </>
                )}
              </Button>

              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="w-full gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Edit Details
                </Button>
                <Button type="button" variant="ghost" onClick={requestSignupOtp} className="w-full">
                  Resend OTP
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Signup;
