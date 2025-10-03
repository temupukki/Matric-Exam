import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Mail,
  Package,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Payment {
  id: string;
  email: string;
  pack: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface FilterState {
  timeRange: "all" | "today" | "week" | "month" | "hour" | "24h";
  email: string;
  pack: string;
  status: string;
}

export default function Paid() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    timeRange: "all",
    email: "",
    pack: "",
    status: "all",
  });
  const [sortField, setSortField] = useState<keyof Payment>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch payments data
  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching payments data...");
      
      const response = await fetch("http://localhost:3000/api/paid", {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch payments: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Payments data received:", data);
      setPayments(data);
      setFilteredPayments(data);
    } catch (err: any) {
      console.error("❌ Error fetching payments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...payments];

    // Apply time range filter
    const now = new Date();
    switch (filters.timeRange) {
      case "today":
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        result = result.filter(p => new Date(p.createdAt) >= today);
        break;
      case "hour":
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        result = result.filter(p => new Date(p.createdAt) >= oneHourAgo);
        break;
      case "24h":
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        result = result.filter(p => new Date(p.createdAt) >= oneDayAgo);
        break;
      case "week":
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        result = result.filter(p => new Date(p.createdAt) >= oneWeekAgo);
        break;
      case "month":
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        result = result.filter(p => new Date(p.createdAt) >= oneMonthAgo);
        break;
      case "all":
      default:
        break;
    }

    // Apply email filter
    if (filters.email) {
      result = result.filter(p => 
        p.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    // Apply package filter
    if (filters.pack) {
      result = result.filter(p => p.pack === filters.pack);
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter(p => p.status === filters.status);
    }

    // Apply search term
    if (searchTerm) {
      result = result.filter(p =>
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.pack.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredPayments(result);
  }, [payments, filters, searchTerm, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field: keyof Payment) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Get unique packages for filter
  const uniquePackages = [...new Set(payments.map(p => p.pack))];
  const uniqueStatuses = [...new Set(payments.map(p => p.status))];

  // Statistics
  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalCustomers = filteredPayments.length;
  const averageRevenue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Email', 'Package', 'Amount', 'Status', 'Date'];
    const csvData = filteredPayments.map(p => [
      p.id,
      p.email,
      p.pack,
      p.amount,
      p.status,
      new Date(p.createdAt).toLocaleString()
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Get time range display
  const getTimeRangeDisplay = () => {
    switch (filters.timeRange) {
      case 'hour': return 'Last Hour';
      case '24h': return 'Last 24 Hours';
      case 'today': return 'Today';
      case 'week': return 'Last Week';
      case 'month': return 'Last Month';
      default: return 'All Time';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading payments data...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Paid Customers
              </h1>
              <p className="text-gray-600">
                Manage and monitor customer payments and subscriptions
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchPayments}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </motion.button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-2 text-red-800">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Error:</span>
                <span>{error}</span>
              </div>
            </motion.div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRevenue} ETB</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average per Customer</p>
                  <p className="text-2xl font-bold text-gray-900">{averageRevenue.toFixed(2)} ETB</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Time Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Time Range
              </label>
              <select
                value={filters.timeRange}
                onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="hour">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>

            {/* Package Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 inline mr-1" />
                Package
              </label>
              <select
                value={filters.pack}
                onChange={(e) => setFilters(prev => ({ ...prev, pack: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Packages</option>
                {uniquePackages.map(pack => (
                  <option key={pack} value={pack}>{pack}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Email Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Filter
              </label>
              <input
                type="text"
                value={filters.email}
                onChange={(e) => setFilters(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Filter by email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Global Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Global Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search across all fields..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">
              Showing {filteredPayments.length} of {payments.length} payments
              {filters.timeRange !== 'all' && ` • ${getTimeRangeDisplay()}`}
            </span>
          </div>
        </motion.div>

        {/* Payments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center gap-1">
                      ID
                      {sortField === 'id' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center gap-1">
                      Email
                      {sortField === 'email' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('pack')}
                  >
                    <div className="flex items-center gap-1">
                      Package
                      {sortField === 'pack' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center gap-1">
                      Amount
                      {sortField === 'amount' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-1">
                      Date & Time
                      {sortField === 'createdAt' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg">No payments found</p>
                      <p className="text-sm">Try adjusting your filters or search terms</p>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {payment.id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {payment.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.pack.includes('Family') 
                            ? 'bg-purple-100 text-purple-800'
                            : payment.pack.includes('Natural')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          <Package className="w-3 h-3 mr-1" />
                          {payment.pack}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {payment.amount} ETB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === 'COMPLETED' || payment.status === 'SUCCESS'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.status === 'COMPLETED' || payment.status === 'SUCCESS' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(payment.createdAt)}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}