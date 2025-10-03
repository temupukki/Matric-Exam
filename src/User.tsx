import React, { useState, useEffect } from "react";
import { toast } from "sonner";

type UserRole = "USER" | "ADMIN" | "NATURAL" | "SOCIAL" | "BOTH";

interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

const Userpage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [emailFilter, setEmailFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [dateFilter, setDateFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  // Role editing state
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [tempRole, setTempRole] = useState<UserRole | "">("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, emailFilter, roleFilter, dateFilter, timeFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/user");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to load users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    // Email filter
    if (emailFilter) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt).toLocaleDateString();
        const filterDate = new Date(dateFilter).toLocaleDateString();
        return userDate === filterDate;
      });
    }

    // Time filter (last 12 hours)
    if (timeFilter === "12hours") {
      const twelveHoursAgo = new Date();
      twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);

      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate >= twelveHoursAgo;
      });
    }

    // Time filter (today)
    if (timeFilter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate >= today && userDate < tomorrow;
      });
    }

    // Time filter (last 7 days)
    if (timeFilter === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate >= sevenDaysAgo;
      });
    }

    setFilteredUsers(filtered);
  };

  const clearFilters = () => {
    setEmailFilter("");
    setRoleFilter("");
    setDateFilter("");
    setTimeFilter("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "NATURAL":
        return "bg-purple-100 text-purple-800";
      case "SOCIAL":
        return "bg-yellow-100 text-yellow-800";
      case "BOTH":
        return "bg-orange-100 text-orange-800";
      case "USER":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const startEditing = (user: User) => {
    setEditingUserId(user.id);
    setTempRole(user.role);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setTempRole("");
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

     
      toast.success("User role updated successfully!");

      
      setEditingUserId(null);
      setTempRole("");
    } catch (err) {
      console.error("Error updating user role:", err);
      setError("Failed to update user role");
      
      toast.error("Failed to update user role");
    }
  };

  const submitRoleChange = () => {
    if (editingUserId && tempRole) {
      handleRoleChange(editingUserId, tempRole as UserRole);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove from local state
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            User Management
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Manage system users and their roles
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <span className="text-red-800">{error}</span>
            <button
              onClick={fetchUsers}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Email Filter */}
            <div>
              <label
                htmlFor="email-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email-filter"
                type="text"
                placeholder="Filter by email..."
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <div>
              <label
                htmlFor="role-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as UserRole | "")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All roles</option>
                <option value="USER">User</option>
                <option value="NATURAL">Natural</option>
                <option value="SOCIAL">Social</option>
                <option value="BOTH">Both</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label
                htmlFor="date-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registration Date
              </label>
              <input
                id="date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Time Filter */}
            <div>
              <label
                htmlFor="time-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time Range
              </label>
              <select
                id="time-filter"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All time</option>
                <option value="12hours">Last 12 hours</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 days</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Clear All Filters
          </button>
        </div>

        {/* Results Summary */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-between items-center">
          <p className="text-gray-700 font-medium">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-2 text-sm flex-wrap">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              User: {users.filter((u) => u.role === "USER").length}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
              Natural: {users.filter((u) => u.role === "NATURAL").length}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Social: {users.filter((u) => u.role === "SOCIAL").length}
            </span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
              Both: {users.filter((u) => u.role === "BOTH").length}
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
              Admin: {users.filter((u) => u.role === "ADMIN").length}
            </span>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found matching your filters
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {user.id.slice(0, 8)}...
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {user.email[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUserId === user.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={tempRole}
                              onChange={(e) =>
                                setTempRole(e.target.value as UserRole)
                              }
                              className="text-xs px-2.5 py-0.5 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="USER">USER</option>
                              <option value="NATURAL">NATURAL</option>
                              <option value="SOCIAL">SOCIAL</option>
                              <option value="BOTH">BOTH</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                            <button
                              onClick={submitRoleChange}
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                            >
                              ✓
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                            >
                              ✗
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getRoleBadgeColor(
                                user.role
                              )}`}
                            >
                              {user.role}
                            </span>
                            <button
                              onClick={() => startEditing(user)}
                              className="text-blue-600 hover:text-blue-800 text-xs transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchUsers}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userpage;
