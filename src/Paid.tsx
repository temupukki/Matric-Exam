import React, { useState, useEffect } from "react";
import { toast } from "sonner";

type PaymentPack = "Natural Science" | "Social Science" | "BOTH";
type PaymentStatus = "NO" | "YES";

interface Payment {
  id: number;
  email: string;
  pack: PaymentPack;
  evidence: string | null;
  status: PaymentStatus;
  paidAt: string;
  updatedAt: string;
}

const Paid: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [emailFilter, setEmailFilter] = useState("");
  const [packFilter, setPackFilter] = useState<PaymentPack | "">("");
  const [dateFilter, setDateFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "">("");

  // Mobile states
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Evidence upload state
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedPaymentForEvidence, setSelectedPaymentForEvidence] = useState<Payment | null>(null);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

  // Status edit state
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedPaymentForStatus, setSelectedPaymentForStatus] = useState<Payment | null>(null);
  const [newStatus, setNewStatus] = useState<PaymentStatus>("YES");

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [payments, emailFilter, packFilter, dateFilter, timeFilter, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/paid");

      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }

      const data: Payment[] = await response.json();
      setPayments(data);
      setError(null);
    } catch (err) {
      setError("Failed to load payments");
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...payments];

    // Email filter
    if (emailFilter) {
      filtered = filtered.filter((payment) =>
        payment.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    // Pack filter
    if (packFilter) {
      filtered = filtered.filter((payment) => payment.pack === packFilter);
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.paidAt).toLocaleDateString();
        const filterDate = new Date(dateFilter).toLocaleDateString();
        return paymentDate === filterDate;
      });
    }

    // Time filter (last 24 hours)
    if (timeFilter === "24hours") {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.paidAt);
        return paymentDate >= twentyFourHoursAgo;
      });
    }

    // Time filter (today)
    if (timeFilter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.paidAt);
        return paymentDate >= today && paymentDate < tomorrow;
      });
    }

    // Time filter (last 7 days)
    if (timeFilter === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.paidAt);
        return paymentDate >= sevenDaysAgo;
      });
    }

    setFilteredPayments(filtered);
  };

  const clearFilters = () => {
    setEmailFilter("");
    setPackFilter("");
    setStatusFilter("");
    setDateFilter("");
    setTimeFilter("");
    setShowFilters(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDateMobile = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPackBadgeColor = (pack: PaymentPack) => {
    switch (pack) {
      case "Natural Science":
        return "bg-green-100 text-green-800";
      case "Social Science":
        return "bg-blue-100 text-blue-800";
      case "BOTH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: PaymentStatus) => {
    switch (status) {
      case "YES":
        return "bg-green-100 text-green-800 border border-green-200";
      case "NO":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getPackPrice = (pack: PaymentPack): string => {
    switch (pack) {
      case "Natural Science":
        return "89 ETB";
      case "Social Science":
        return "89 ETB";
      case "BOTH":
        return "169 ETB";
      default:
        return "N/A";
    }
  };

  const deletePayment = async (paymentId: number) => {
    if (!confirm("Are you sure you want to delete this payment record?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/payment/${paymentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete payment");
      }

      // Remove from local state
      setPayments(payments.filter((payment) => payment.id !== paymentId));
      setSelectedPayment(null);
      toast.success("Payment record deleted successfully!");
    } catch (err) {
      console.error("Error deleting payment:", err);
      setError("Failed to delete payment");
      toast.error("Failed to delete payment record");
    }
  };

  const handleEvidenceUpload = async () => {
    if (!selectedPaymentForEvidence || !evidenceFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("evidence", evidenceFile);

      const response = await fetch(
        `http://localhost:3000/api/payment/${selectedPaymentForEvidence.id}/evidence`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload evidence");
      }

      const updatedPayment = await response.json();
      
      // Update local state
      setPayments(
        payments.map((payment) =>
          payment.id === selectedPaymentForEvidence.id ? updatedPayment : payment
        )
      );

      toast.success("Evidence uploaded successfully!");
      setShowEvidenceModal(false);
      setSelectedPaymentForEvidence(null);
      setEvidenceFile(null);
    } catch (err) {
      console.error("Error uploading evidence:", err);
      toast.error("Failed to upload evidence");
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedPaymentForStatus) {
      toast.error("No payment selected");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/payments/${selectedPaymentForStatus.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedPayment = await response.json();
      
      // Update local state
      setPayments(
        payments.map((payment) =>
          payment.id === selectedPaymentForStatus.id ? updatedPayment : payment
        )
      );

      toast.success(`Status updated to ${newStatus === "YES" ? "Approved" : "Rejected"}!`);
      setShowStatusModal(false);
      setSelectedPaymentForStatus(null);
      setNewStatus("YES");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  const openStatusModal = (payment: Payment) => {
    setSelectedPaymentForStatus(payment);
    setNewStatus(payment.status);
    setShowStatusModal(true);
  };

  const downloadEvidence = (evidenceUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = evidenceUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-xl text-gray-600">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            Payment Management
          </h1>
          <p className="text-gray-600 text-center mt-2 text-sm sm:text-base">
            Manage payment records and evidence
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Payments</p>
                <p className="text-2xl font-semibold text-gray-900">{payments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Natural Science Plans</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {payments.filter(p => p.pack === "Natural Science").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Social Science Plans</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {payments.filter(p => p.pack === "Social Science").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Family Plans</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {payments.filter(p => p.pack === "BOTH").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-red-800 text-sm sm:text-base">{error}</span>
            <button
              onClick={fetchPayments}
              className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm w-full sm:w-auto"
            >
              Retry
            </button>
          </div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-between shadow-sm"
          >
            <span className="font-medium text-gray-700">Filters</span>
            <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* Filters Section */}
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Filters</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Pack Filter */}
            <div>
              <label
                htmlFor="pack-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Plan
              </label>
              <select
                id="pack-filter"
                value={packFilter}
                onChange={(e) => setPackFilter(e.target.value as PaymentPack | "")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All plans</option>
                <option value="Natural Science">Natural Science</option>
                <option value="Social Science">Social Science</option>
                <option value="BOTH">Family Plans</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | "")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All status</option>
                <option value="YES">Approved</option>
                <option value="NO">Rejected</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label
                htmlFor="date-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment Date
              </label>
              <input
                id="date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All time</option>
                <option value="24hours">Last 24 hours</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 days</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={clearFilters}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm flex-1"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm flex-1"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              Showing {filteredPayments.length} of {payments.length} payments
            </p>
            <div className="flex gap-1 text-xs flex-wrap">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                Natural Science: {payments.filter((p) => p.pack === "Natural Science").length}
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Social Science: {payments.filter((p) => p.pack === "Social Science").length}
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
               Family: {payments.filter((p) => p.pack === "BOTH").length}
              </span>
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                Approved: {payments.filter((p) => p.status === "YES").length}
              </span>
              <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
                Rejected: {payments.filter((p) => p.status === "NO").length}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Payment Cards */}
        <div className="lg:hidden space-y-3 mb-6">
          {filteredPayments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500">No payments found matching your filters</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-xs">
                        {payment.email[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 break-all">
                        {payment.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {payment.id}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {getPackPrice(payment.pack)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <label className="text-gray-500 text-xs">Plan</label>
                    <div className="mt-1">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getPackBadgeColor(
                          payment.pack
                        )}`}
                      >
                        {payment.pack}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs">Status</label>
                    <div className="mt-1">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadgeColor(
                          payment.status
                        )}`}
                      >
                        {payment.status === "YES" ? "Approved" : "Rejected"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs">Paid At</label>
                    <p className="mt-1 text-gray-900 text-xs">
                      {formatDateMobile(payment.paidAt)}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="text-blue-600 hover:text-blue-800 text-xs transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => openStatusModal(payment)}
                    className="text-indigo-600 hover:text-indigo-800 text-xs transition-colors"
                  >
                    Edit Status
                  </button>
                  {payment.evidence ? (
                    <button
                      onClick={() => downloadEvidence(payment.evidence!, `evidence-${payment.id}.jpg`)}
                      className="text-green-600 hover:text-green-800 text-xs transition-colors"
                    >
                      Download Evidence
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedPaymentForEvidence(payment);
                        setShowEvidenceModal(true);
                      }}
                      className="text-orange-600 hover:text-orange-800 text-xs transition-colors"
                    >
                      Upload Evidence
                    </button>
                  )}
                  <button
                    onClick={() => deletePayment(payment.id)}
                    className="text-red-600 hover:text-red-800 text-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Payments Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evidence
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No payments found matching your filters
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {payment.id}
                        </code>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">
                              {payment.email[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {payment.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getPackBadgeColor(
                            payment.pack
                          )}`}
                        >
                          {payment.pack}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {getPackPrice(payment.pack)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.paidAt)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.evidence ? (
                          <button
                            onClick={() => downloadEvidence(payment.evidence!, `evidence-${payment.id}.jpg`)}
                            className="text-green-600 hover:text-green-800 transition-colors text-xs bg-green-50 px-2 py-1 rounded"
                          >
                            Download
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedPaymentForEvidence(payment);
                              setShowEvidenceModal(true);
                            }}
                            className="text-orange-600 hover:text-orange-800 transition-colors text-xs bg-orange-50 px-2 py-1 rounded"
                          >
                            Upload
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(
                              payment.status
                            )}`}
                          >
                            {payment.status === "YES" ? "Approved" : "Rejected"}
                          </span>
                          <button
                            onClick={() => openStatusModal(payment)}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors text-xs"
                            title="Edit Status"
                          >
                            ✏️
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deletePayment(payment.id)}
                          className="text-red-600 hover:text-red-900 transition-colors text-xs bg-red-50 px-2 py-1 rounded mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="text-blue-600 hover:text-blue-900 transition-colors text-xs bg-blue-50 px-2 py-1 rounded"
                        >
                          Details
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
            onClick={fetchPayments}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto"
          >
            Refresh Data
          </button>
        </div>

        {/* Mobile Payment Detail Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 lg:hidden">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Payment Details
                  </h3>
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Email</label>
                  <p className="text-sm font-medium text-gray-900 break-all">
                    {selectedPayment.email}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Payment ID</label>
                  <p className="text-sm text-gray-900">
                    {selectedPayment.id}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Plan</label>
                  <p className="text-sm">
                    <span
                      className={`font-medium px-2 py-1 rounded-full text-xs ${getPackBadgeColor(
                        selectedPayment.pack
                      )}`}
                    >
                      {selectedPayment.pack}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Amount</label>
                  <p className="text-sm font-semibold text-gray-900">
                    {getPackPrice(selectedPayment.pack)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Paid At</label>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedPayment.paidAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Status</label>
                    <p className="text-sm">
                      <span
                        className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(
                          selectedPayment.status
                        )}`}
                      >
                        {selectedPayment.status === "YES" ? "Approved" : "Rejected"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Updated</label>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedPayment.updatedAt)}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Evidence</label>
                  <p className="text-sm text-gray-900">
                    {selectedPayment.evidence ? "Available" : "Not uploaded"}
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end gap-2 flex-wrap">
                <button
                  onClick={() => openStatusModal(selectedPayment)}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                >
                  Edit Status
                </button>
                {selectedPayment.evidence ? (
                  <button
                    onClick={() => downloadEvidence(selectedPayment.evidence!, `evidence-${selectedPayment.id}.jpg`)}
                    className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                  >
                    Download Evidence
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPaymentForEvidence(selectedPayment);
                      setShowEvidenceModal(true);
                      setSelectedPayment(null);
                    }}
                    className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 transition-colors"
                  >
                    Upload Evidence
                  </button>
                )}
                <button
                  onClick={() => {
                    deletePayment(selectedPayment.id);
                    setSelectedPayment(null);
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                >
                  Delete Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Evidence Upload Modal */}
        {showEvidenceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload Payment Evidence
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  For: {selectedPaymentForEvidence?.email}
                </p>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Evidence File
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => setEvidenceFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: images, PDF, Word documents
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowEvidenceModal(false);
                    setSelectedPaymentForEvidence(null);
                    setEvidenceFile(null);
                  }}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEvidenceUpload}
                  disabled={!evidenceFile}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Upload Evidence
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Edit Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Update Payment Status
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  For: {selectedPaymentForStatus?.email}
                </p>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusBadgeColor(
                        selectedPaymentForStatus?.status || "NO"
                      )}`}
                    >
                      {selectedPaymentForStatus?.status === "YES" ? "Approved" : "Not Approved yet"}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as PaymentStatus)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="YES">Approved</option>
                    <option value="NO">Not Approved Yet</option>
                  </select>
                </div>
                
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedPaymentForStatus(null);
                    setNewStatus("YES");
                  }}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paid;