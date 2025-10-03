import React, { useState, useEffect } from 'react';

interface Payment {
  id: string;
  email: string;
  pack: string;
  createdAt: string;
}

const Paid: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [emailFilter, setEmailFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [packFilter, setPackFilter] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [payments, emailFilter, dateFilter, timeFilter, packFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/paid');
      
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      
      const data: Payment[] = await response.json();
      setPayments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load payments');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...payments];

    // Email filter
    if (emailFilter) {
      filtered = filtered.filter(payment =>
        payment.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.createdAt).toLocaleDateString();
        const filterDate = new Date(dateFilter).toLocaleDateString();
        return paymentDate === filterDate;
      });
    }

    // Time filter (last 12 hours)
    if (timeFilter === '12hours') {
      const twelveHoursAgo = new Date();
      twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);
      
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= twelveHoursAgo;
      });
    }

    // Time filter (today)
    if (timeFilter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= today && paymentDate < tomorrow;
      });
    }

    // Pack filter
    if (packFilter) {
      filtered = filtered.filter(payment =>
        payment.pack.toLowerCase().includes(packFilter.toLowerCase())
      );
    }

    setFilteredPayments(filtered);
  };

  const clearFilters = () => {
    setEmailFilter('');
    setDateFilter('');
    setTimeFilter('');
    setPackFilter('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Payments Management</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <span className="text-red-800">{error}</span>
            <button 
              onClick={fetchPayments}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
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
              <label htmlFor="email-filter" className="block text-sm font-medium text-gray-700 mb-1">
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

            {/* Date Filter */}
            <div>
              <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Date
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
              <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">
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
              </select>
            </div>

            {/* Pack Filter */}
            <div>
              <label htmlFor="pack-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Pack
              </label>
              <input
                id="pack-filter"
                type="text"
                placeholder="Filter by pack..."
                value={packFilter}
                onChange={(e) => setPackFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-gray-700 font-medium">
            Showing {filteredPayments.length} of {payments.length} payments
          </p>
        </div>

        {/* Payments Table */}
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
                    Pack
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No payments found matching your filters
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {payment.id}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                        {payment.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payment.pack}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.createdAt)}
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
            onClick={fetchPayments}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paid;