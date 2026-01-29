import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/lib/api';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'OTP sent!', description: data.message });
        setStep('otp');
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'OTP verified!', description: data.message });
        setStep('reset');
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Password updated!', description: data.message });
        navigate('/login');
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-white/80 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Sending...' : 'Send OTP'}</Button>
          </form>
        )}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input id="otp" type="text" value={otp} onChange={e => setOtp(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Verifying...' : 'Verify OTP'}</Button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Updating...' : 'Update Password'}</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
