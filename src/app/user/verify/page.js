'use client';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const VerifyUser = () => {
  const router = useRouter();
  const { loading, loggedUser } = useUser();
  
  const [otp, setOtp] = useState(''); 
  const [userOtp, setUserOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log(loggedUser);
    
    if (!loading && loggedUser?.isVerified) {
      router.replace('/dashboard');
    }
  }, [loading, loggedUser, router]);

  const sendEmail = async () => {
    if (timer > 0) return;
    
    setOtpSent(true);
    setTimer(60);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: loggedUser.email }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      setOtp(result.otp); 
      toast.success('OTP sent successfully!');
    } catch (err) {
      toast.error('Failed to send OTP. Please try again.');
      setOtpSent(false);
    }
  };

  const verifyOtp = async () => {
    if (!userOtp) return toast.error('Please enter the OTP.');

    if (userOtp !== otp) {
      return toast.error('Incorrect OTP. Please try again.');
    }

    try {
      const res = await fetch(`/api/user/verify/${loggedUser?.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedUser.email }), 
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast.success('Verification successful! Redirecting...');
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      toast.error('Verification failed. Please try again.');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center">Verify Your Account</h1>
      {!otpSent ? (
        <button
          onClick={sendEmail}
          disabled={timer > 0}
          className={`mt-4 px-4 py-2 rounded-md text-white font-medium transition-colors ${
            timer > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
          }`}
        >
          {timer > 0 ? `Wait ${timer}s` : 'Send OTP'}
        </button>
      ) : (
        <div className="mt-4">
          <input
            type="text"
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 rounded-md w-40 text-center"
          />
          <button
            onClick={verifyOtp}
            className="ml-2 bg-teal-600 text-white px-4 py-2 rounded-md"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
