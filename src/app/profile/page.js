'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
  });

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("/api/users/me");
        console.log("user data from profile page", res.data);
        setUser({
          name: res.data.username,
          email: res.data.email,
        });
      } catch (error) {
        console.log("error getting user", error);
        toast.error("Session expired. Please log in again.");
        router.push("/login");
      }
    }

    getUser();
  }, []); // ✅ Empty array to run only once on mount


  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res?.data?.success) {

        toast.success("Loggedout success");
        router.push("/login")
      }
    } catch (error) {
      toast.error("Loggedout unsuccess");
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-600"
        />

        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
        <p className="text-gray-400 mb-4">{user.email}</p>

        <button
          onClick={handleLogout}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
