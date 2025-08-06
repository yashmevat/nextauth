'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/users/resetpassword', { token, password });
      toast.success("Password reset successful");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.error || "Failed");
      router.push("/login");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
          <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Export page with Suspense wrapper
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
