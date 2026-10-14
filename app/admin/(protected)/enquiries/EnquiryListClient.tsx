"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Building,
  Phone,
  Mail,
  User,
  Trash2,
  X,
  Check,
  Eye,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { type Enquiry, type EnquiryStatus } from "@/lib/db/enquiries";
import {
  updateEnquiryStatusAction,
  deleteEnquiryAction,
} from "./actions";

interface EnquiryListClientProps {
  initialEnquiries: Enquiry[];
}

export function EnquiryListClient({ initialEnquiries }: EnquiryListClientProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Filter logic
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.organization &&
        item.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.message &&
        item.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    startTransition(async () => {
      try {
        await updateEnquiryStatusAction(id, newStatus);
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      } catch (err) {
        alert("Failed to update status.");
      }
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteEnquiryAction(id);
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        setSelectedEnquiry(null);
        setIsDeleteConfirmOpen(false);
      } catch (err) {
        alert("Failed to delete enquiry.");
      }
    });
  };

  const exportToCSV = () => {
    const headers = ["Date", "Type", "Name", "Email", "Phone", "Organization", "Message", "Status"];
    const rows = filteredEnquiries.map((item) => [
      new Date(item.createdAt).toLocaleDateString(),
      item.type,
      item.name,
      item.email,
      item.phone || "",
      item.organization || "",
      (item.message || "").replace(/"/g, '""'),
      item.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cloudspital_enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    const configs = {
      unread:"bg amber 950/40 text amber 400 border amber 900/35",
      read:"bg blue 950/40 text blue 400 border blue 900/35",
      contacted:"bg purple 950/40 text purple 400 border purple 900/35",
      resolved:"bg emerald 950/40 text emerald 400 border emerald 900/35",
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${configs[status]}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${status === "unread" ? "bg-amber-500 animate-pulse" : status === "read" ? "bg-blue-500" : status === "contacted" ? "bg-purple-500":"bg emerald 500"}`} />
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Enquiries
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-950/50 border border-blue-900/40 text-blue-400">
              {filteredEnquiries.length} total
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your incoming contact form inquiries and demo bookings.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          disabled={filteredEnquiries.length === 0}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 shadow-sm transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          Export to CSV
        </button>
      </div>

      {/* Filters Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search bar */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search enquiries by name, email, organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 placeholder-slate-500 font-medium text-white"
            />
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium text-slate-300 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Type filter */}
          <div className="md:col-span-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium text-slate-300 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="contact">Contact Submission</option>
              <option value="demo">Demo Booking</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-slate-900">
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-slate-500 mb-3 border border-slate-900">
            <Filter className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">No enquiries found</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
            Try adjusting your search query or switching filters.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-slate-800 bg-slate-950 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Organization</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredEnquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-850/50 transition-colors cursor-pointer group text-slate-300"
                    onClick={() => {
                      setSelectedEnquiry(item);
                      if (item.status === "unread") {
                        handleStatusChange(item.id, "read");
                      }
                    }}
                  >
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day:"2-digit",
                        month:"short",
                        year:"numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${item.type === "demo" ? "bg-cyan-950/50 text-cyan-400 border border-cyan-900/30" : "bg-blue-950/50 text-blue-400 border border-blue-900/30"}`}>
                        {item.type === "demo" ? "Demo":"Contact"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs font-normal text-slate-500">{item.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {item.organization || <span className="text-slate-500 font-light italic text-xs">Individual</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(item);
                            if (item.status === "unread") {
                              handleStatusChange(item.id, "read");
                            }
                          }}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEnquiry(item);
                            setIsDeleteConfirmOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-red-950/40 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Side-Drawer / Modal */}
      <AnimatePresence>
        {selectedEnquiry && !isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-l border-slate-800"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Enquiry Details</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Received on {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-full p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Meta details */}
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedEnquiry.type === "demo" ? "bg-cyan-950/50 text-cyan-400 border border-cyan-900/30" : "bg-blue-950/50 text-blue-400 border border-blue-900/30"}`}>
                    {selectedEnquiry.type === "demo" ? <Sparkles className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
                    {selectedEnquiry.type === "demo" ? "Demo Request" : "Contact Inquiry"}
                  </span>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>

                {/* Submitter Details Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Person</h4>
                      <p className="text-sm font-bold text-slate-200 mt-1">{selectedEnquiry.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</h4>
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-sm font-semibold text-blue-400 hover:underline mt-1 inline-block">
                        {selectedEnquiry.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</h4>
                      {selectedEnquiry.phone ? (
                        <a href={`tel:${selectedEnquiry.phone}`} className="text-sm font-semibold text-slate-200 hover:underline mt-1 inline-block">
                          {selectedEnquiry.phone}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-500 italic mt-1">Not provided</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Organization</h4>
                      <p className="text-sm font-semibold text-slate-200 mt-1">
                        {selectedEnquiry.organization || <span className="text-slate-500 italic font-normal">Not provided</span>}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message body */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    Message Content
                  </h4>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap min-h-[120px]">
                    {selectedEnquiry.message || <span className="text-slate-500 italic">No message provided.</span>}
                  </div>
                </div>
              </div>

              {/* Footer Panel - Actions */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/30 space-y-4">
                {/* Status action buttons */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Update Status</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {(["unread", "read", "contacted", "resolved"] as EnquiryStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedEnquiry.id, status)}
                        disabled={isPending}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                          selectedEnquiry.status === status
                            ? status === "unread"
                              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                              : status === "read"
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : status === "contacted"
                              ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                              : "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                            : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-slate-100"
                        }`}
                      >
                        {status.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setIsDeleteConfirmOpen(true)}
                    className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-950/35 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="inline-flex cursor-pointer items-center justify-center px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-slate-900 text-sm font-semibold shadow-sm transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {isDeleteConfirmOpen && selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 rounded-3xl p-6 shadow-2xl z-10 border border-slate-800"
            >
              <h3 className="text-xl font-bold text-white">Delete Enquiry?</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Are you sure you want to delete the enquiry from <span className="font-semibold text-slate-250">{selectedEnquiry.name}</span>? This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800 text-sm font-semibold cursor-pointer border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-sm font-semibold cursor-pointer shadow-md shadow-red-500/10 active:scale-[0.98] disabled:opacity-50"
                >
                  {isPending ? "Deleting..." : "Delete Permanently"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
