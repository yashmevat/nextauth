'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await axios.post('/api/users/forgotpassword', { email });
      toast.success("Reset link sent to your email!");
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
    {
      loading?(<Loader/>):(<div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>)
    }
    
    
</>
  );
}
