import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlassCard from "@/components/ui/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/api";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const sendOtp = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast({
        title: "Email required",
        description: "Please enter the email address linked to your account.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        setEmail(trimmedEmail);
        setOtp("");
        setStep("otp");
        toast({ title: "OTP sent!", description: data.message });
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendOtp();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast({
        title: "OTP required",
        description: "Please enter the 6-digit OTP sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        toast({ title: "OTP verified!", description: data.message });
        setStep("reset");
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordRegex.test(newPassword)) {
      toast({
        title: "Weak Password",
        description:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        toast({ title: "Password updated!", description: data.message });
        navigate("/login");
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const headerContent = {
    email: {
      title: "Forgot Password",
      description: "Enter your email and we’ll send you a 6-digit OTP.",
    },
    otp: {
      title: "Verify OTP",
      description: `Enter the verification code sent to ${email}.`,
    },
    reset: {
      title: "Create New Password",
      description: "Set a strong password and sign back in securely.",
    },
  }[step];

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
              <KeyRound className="w-8 h-8 text-background" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold">{headerContent.title}</h1>
            <p className="text-muted-foreground mt-2">{headerContent.description}</p>
          </div>

          {step === "email" && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 bg-muted/50 border-border"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {loading ? (
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
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="otp">Enter OTP</Label>
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <InputOTP
                    id="otp"
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
              </div>

              <Button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Verify OTP
                  </>
                )}
              </Button>

              <div className="flex flex-col gap-3">
                <Button type="button" variant="ghost" onClick={sendOtp} className="w-full">
                  Resend OTP
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("email")}
                  className="w-full gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Email
                </Button>
              </div>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-12 bg-muted/50 border-border"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use at least 8 characters with uppercase, lowercase, number, and special character.
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Update Password
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-center text-muted-foreground mt-6">
            Remembered your password?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
