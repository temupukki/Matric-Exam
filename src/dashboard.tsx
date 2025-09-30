import { useState, useEffect } from "react";
import { authClient } from "../lib/auth-client";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user session
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/me", {
        credentials: "include", // Important for cookies
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


 

  // Sign out function
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="p-4 border rounded-lg">
        <div className="animate-pulse">Loading user info...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
        <p>Not signed in</p>
      </div>
    );
  }

  return (
    <div className="p-6 border border-green-300 bg-green-50 rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      
      <div className="space-y-3">
        <div>
          <label className="font-semibold">Name:</label>
          <p className="text-gray-700">{user.name}</p>
        </div>
        
        <div>
          <label className="font-semibold">Email:</label>
          <p className="text-gray-700">{user.email}</p>
        </div>
        
        <div>
          <label className="font-semibold">User ID:</label>
          <p className="text-gray-700 text-sm">{user.id}</p>
        </div>
        
        <div>
          <label className="font-semibold">Email Verified:</label>
          <p className="text-gray-700">{user.emailVerified ? "Yes" : "No"}</p>
        </div>
        
        <div>
          <label className="font-semibold">Created:</label>
          <p className="text-gray-700 text-sm">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}