"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import InvoiceTable from "@/src/components/admin/InvoiceTable";
import FeePaymentModal from "@/src/components/common/FeePaymentModal";
import { feeService } from "@/src/services/feeService";
import { formatCurrency } from "@/src/utils/formatCurrency";

export default function AdminFeesPage() {
  const [fees, setFees] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ status: "", month: "" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [feesRes, statsRes] = await Promise.all([
        feeService.list({ ...filters, limit: 50 }),
        feeService.analytics(),
      ]);
      setFees(feesRes.data || []);
      setAnalytics(statsRes.data || null);
    } catch {
      setFees([]);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.month]);

  useEffect(() => {
    load();
  }, [load]);

  const handlePay = async (payload) => {
    try {
      await feeService.markPaid(selected._id, payload);
      setSelected(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  const handleDelete = async (fee) => {
    if (!confirm(`Delete invoice ${fee.invoiceNo}?`)) return;
    try {
      await feeService.remove(fee._id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleReceipt = (fee) =>
    window.open(feeService.receiptUrl(fee._id), "_blank");

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 max-w-7xl mx-auto space-y-8">

      <header className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Fee Management
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            Fee Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track invoices, payments, and receipts across your school.
          </p>
        </div>

        <Link
          href="/admin/fees/structure"
          className="inline-flex items-center justify-center font-semibold text-sm rounded-xl px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200"
        >
          + Generate Invoices
        </Link>
      </header>


      {analytics && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Paid */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                Paid
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-4">
              {formatCurrency(analytics.paid.total)}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              {analytics.paid.count} invoices
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                Pending
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-4">
              {formatCurrency(analytics.pending.total)}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              {analytics.pending.count} invoices
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-2xl border border-rose-100 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                Overdue
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-4">
              {formatCurrency(analytics.overdue.total)}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              {analytics.overdue.count} invoices
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Collection Rate
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-4">
              {analytics.collectionRate}%
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              All-time performance
            </div>
          </div>
        </section>
      )}
      <div className="bg-white rounded-2xl border border-blue-50 p-4 shadow-sm flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Filter by month (e.g. October-2026)"
          value={filters.month}
          onChange={(e) =>
            setFilters((f) => ({ ...f, month: e.target.value }))
          }
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 flex-1 min-w-[220px]"
        />
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
        <button
          onClick={() => setFilters({ status: "", month: "" })}
          className="text-sm font-semibold text-slate-500 hover:text-blue-600 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors duration-150"
        >
          Reset
        </button>
      </div>
      {loading ? (
        <div className="bg-white rounded-2xl border border-blue-50 shadow-sm py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-500">
            Loading invoices...
          </span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden">
          <InvoiceTable
            fees={fees}
            onPay={setSelected}
            onDelete={handleDelete}
            onViewReceipt={handleReceipt}
          />
        </div>
      )}
      <FeePaymentModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        fee={selected}
        onConfirm={handlePay}
      />
    </main>
  );
}