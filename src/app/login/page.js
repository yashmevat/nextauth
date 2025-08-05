'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function LoginPage() {
  const router =  useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
const [btnDisabled, setBtnDisabled] = useState(false)
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var response;
     try {
      setLoading(true)
       response = await axios.post("/api/users/login", user, { withCredentials: true });
      console.log(response.data)
      if(response.data.success){
        setLoading(false)
        toast.success(response.data.message)
        router.push("/profile")
      }
      else{
        setLoading(false);
        toast.error(response.data.message)
        router.push("/verifyemail")
      }
    } catch (error) {
      setLoading(false)
      console.log("Login failed")
      toast.error(response.data.message)
    }
    
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length >0) {
      setBtnDisabled(false)
    }
    else {
      setBtnDisabled(true)
    }
  }, [user])

  return (
    <>
    {

    }
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={btnDisabled}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
