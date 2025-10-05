import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Mail,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageCircle,
  Eye,
  RefreshCw,
  Calendar,
  Phone,
  HelpCircle,
  ArrowUpDown,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  Edit3,
  Save,
} from "lucide-react";

interface SupportTicket {
  id: string;
  name: string;
  email: string;
  category: string;
  issueType: string;
  subject: string;
  description: string;
  urgency: string;
  status: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export default function SupportDashboard() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [editingTicket, setEditingTicket] = useState<SupportTicket | null>(null);
  const [sortField, setSortField] = useState<keyof SupportTicket>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Check mobile view on resize and initial load
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/questions');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tickets: ${response.status}`);
      }
      
      const data = await response.json();
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load support tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = tickets;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(ticket =>
        ticket.subject.toLowerCase().includes(term) ||
        ticket.name.toLowerCase().includes(term) ||
        ticket.email.toLowerCase().includes(term) ||
        ticket.description.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(ticket => ticket.status === statusFilter);
    }

    // Urgency filter
    if (urgencyFilter !== "all") {
      result = result.filter(ticket => ticket.urgency === urgencyFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter(ticket => ticket.category === categoryFilter);
    }

    // Sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredTickets(result);
  }, [tickets, searchTerm, statusFilter, urgencyFilter, categoryFilter, sortField, sortDirection]);

  // Update ticket status
  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      setIsUpdating(true);
      setUpdateError(null);

      const response = await fetch(`http://localhost:3000/api/question/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update ticket');
      }

      const updatedTicket = await response.json();

      // Update local state
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId ? updatedTicket : ticket
      ));

      // Update selected ticket if it's the one being edited
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(updatedTicket);
      }

      // Close editing mode
      setEditingTicket(null);

      // Show success message
      console.log(`Ticket status updated to ${newStatus}`);
      
    } catch (err) {
      console.error('Error updating ticket:', err);
      setUpdateError(err instanceof Error ? err.message : 'Failed to update ticket status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSort = (field: keyof SupportTicket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "closed":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateMobile = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUniqueValues = (field: keyof SupportTicket) => {
    return Array.from(new Set(tickets.map(ticket => ticket[field])));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setUrgencyFilter("all");
    setCategoryFilter("all");
    setMobileFiltersOpen(false);
  };

  const statusOptions = [
    { value: "open", label: "Open", color: "red" },
    { value: "in-progress", label: "In Progress", color: "yellow" },
    { value: "resolved", label: "Resolved", color: "green" },
    { value: "closed", label: "Closed", color: "gray" },
  ];

  if (isLoading && tickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg p-6">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading support tickets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Support Tickets
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage customer support requests
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchTickets}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
              
              <div className="text-sm text-gray-500 hidden sm:block">
                {filteredTickets.length} of {tickets.length} tickets
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Ticket Count */}
        <div className="sm:hidden mb-4 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm text-gray-600">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-medium text-sm sm:text-base">{error}</p>
                <button
                  onClick={fetchTickets}
                  className="text-red-600 hover:text-red-800 text-sm underline mt-1"
                >
                  Try again
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="sm:hidden mb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-300 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filters</span>
              {(searchTerm || statusFilter !== "all" || urgencyFilter !== "all" || categoryFilter !== "all") && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 ${
            mobileFiltersOpen ? 'block' : 'hidden sm:block'
          }`}
        >
          {/* Mobile Filters Header */}
          {isMobileView && mobileFiltersOpen && (
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Tickets
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Urgency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency
              </label>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Urgency</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Categories</option>
                {getUniqueValues("category").map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Clear Filters */}
          {(searchTerm || statusFilter !== "all" || urgencyFilter !== "all" || categoryFilter !== "all") && (
            <div className="mt-4 flex justify-center sm:justify-start">
              <button
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Update Error Message */}
        {updateError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-medium text-sm sm:text-base">{updateError}</p>
                <button
                  onClick={() => setUpdateError(null)}
                  className="text-red-600 hover:text-red-800 text-sm underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tickets List/Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tickets found
              </h3>
              <p className="text-gray-500 mb-4 px-4 text-sm sm:text-base">
                {tickets.length === 0 
                  ? "No support tickets have been submitted yet."
                  : "No tickets match your current filters."
                }
              </p>
              {(searchTerm || statusFilter !== "all" || urgencyFilter !== "all" || categoryFilter !== "all") && (
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : isMobileView ? (
            /* Mobile Card View */
            <div className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                        {ticket.subject}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-2">
                        {ticket.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ticket.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {ticket.email}
                      </p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {ticket.category}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(ticket.urgency)}`}>
                      {ticket.urgency}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {formatDateMobile(ticket.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("subject")}
                    >
                      <div className="flex items-center gap-1">
                        Subject and descrption 
                        {sortField === "subject" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        Customer
                        {sortField === "name" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center gap-1">
                        Category
                        {sortField === "category" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("urgency")}
                    >
                      <div className="flex items-center gap-1">
                        Urgency
                        {sortField === "urgency" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {sortField === "status" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center gap-1">
                        Created
                        {sortField === "createdAt" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900 text-sm line-clamp-1">
                            {ticket.subject}
                          </div>
                          <div className="text-gray-500 text-xs mt-1 line-clamp-2">
                            {ticket.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {ticket.name}
                            </div>
                            <div className="text-gray-500 text-xs flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {ticket.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(ticket.urgency)}`}>
                          {ticket.urgency}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {editingTicket?.id === ticket.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={editingTicket.status}
                              onChange={(e) => setEditingTicket({
                                ...editingTicket,
                                status: e.target.value
                              })}
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              disabled={isUpdating}
                            >
                              {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateTicketStatus(ticket.id, editingTicket.status)}
                              disabled={isUpdating}
                              className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                              title="Save"
                            >
                              {isUpdating ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : (
                                <Save className="w-3 h-3" />
                              )}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setEditingTicket(null)}
                              disabled={isUpdating}
                              className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
                              title="Cancel"
                            >
                              <X className="w-3 h-3" />
                            </motion.button>
                          </div>
                        ) : (
                          <span 
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(ticket.status)}`}
                            onClick={() => setEditingTicket(ticket)}
                            title="Click to edit status"
                          >
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatDate(ticket.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTicket(ticket)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          
                        

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditingTicket(ticket)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Edit Status"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">
                    Subject : {selectedTicket.subject}
                  </h2>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {/* Status with Edit Option */}
                  {editingTicket?.id === selectedTicket.id ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={editingTicket.status}
                        onChange={(e) => setEditingTicket({
                          ...editingTicket,
                          status: e.target.value
                        })}
                        className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isUpdating}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateTicketStatus(selectedTicket.id, editingTicket.status)}
                        disabled={isUpdating}
                        className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                        title="Save"
                      >
                        {isUpdating ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingTicket(null)}
                        disabled={isUpdating}
                        className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <span 
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(selectedTicket.status)}`}
                        onClick={() => setEditingTicket(selectedTicket)}
                        title="Click to edit status"
                      >
                        {getStatusIcon(selectedTicket.status)}
                        {selectedTicket.status}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingTicket(selectedTicket)}
                        className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                        title="Edit Status"
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                  
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(selectedTicket.urgency)}`}>
                    {selectedTicket.urgency} urgency
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {selectedTicket.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium text-gray-900 truncate">{selectedTicket.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900 truncate">{selectedTicket.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Issue Type</p>
                      <p className="font-medium text-gray-900">{selectedTicket.issueType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Description</p>
                      <p className="text-gray-900 whitespace-pre-wrap text-sm sm:text-base">{selectedTicket.description}</p>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                        >
                          {attachment}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timestamps</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Created</p>
                        <p className="font-medium text-gray-900 text-sm">{formatDate(selectedTicket.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Last Updated</p>
                        <p className="font-medium text-gray-900 text-sm">{formatDate(selectedTicket.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedTicket(null);
                    setEditingTicket(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors order-2 sm:order-1"
                >
                  Close
                </button>
                
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}