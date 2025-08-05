"use client"
import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import Link from 'next/link'
const Signup = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [loading, setloading] = useState(false)

  const [btnDisabled, setBtnDisabled] = useState(false)
  const onSignup = async () => {
    try {
      setloading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("signup success", response.data)
      toast.success("signup success")
      router.push("/login")
    } catch (error) {
      console.log("signup failed")
      toast.error("sign up failed or internal server error")
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setBtnDisabled(false)
    }
    else {
      setBtnDisabled(true)
    }
  }, [user])

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };




  return (
    <>
      {
        loading ? <Loader /> : <div>
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
              <form onSubmit={onSignup} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={user.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
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
                  className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${btnDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  Sign Up
                </button>

              </form>
              <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-400 hover:underline">
                  Go to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default Signup
