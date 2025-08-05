'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      toast.success("verification success")
      setVerified(true);
    } catch (err) {
      console.error(err?.response?.data || err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
        {loading && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid mx-auto mb-4"></div>
            <p className="text-purple-400 text-lg font-medium">Verifying your email...</p>
          </>
        )}

        {!loading && verified && (
          <>
            <h2 className="text-2xl font-bold text-green-400 mb-2">Email Verified!</h2>
            <p className="text-gray-300">Your email has been successfully verified.</p>
          </>
        )}

        {!loading && error && (
          <>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Verification Failed</h2>
            <p className="text-gray-300">The verification link is invalid or expired.</p>
          </>
        )}
      </div>
    </div>
  );
}