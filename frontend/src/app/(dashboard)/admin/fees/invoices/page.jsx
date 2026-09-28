"use client";
import { useEffect, useState, useCallback } from "react";
import InvoiceTable from "@/src/components/admin/InvoiceTable";
import FeePaymentModal from "@/src/components/common/FeePaymentModal";
import { feeService } from "@/src/services/feeService";

export default function InvoicesPage() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    feeService
      .list({ status, limit: 100 })
      .then((res) => setFees(res.data || []))
      .catch(() => setFees([]))
      .finally(() => setLoading(false));
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  const handlePay = async (payload) => {
    try {
      await feeService.markPaid(selected._id, payload);
      setSelected(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const handleReceipt = (fee) =>
    window.open(feeService.receiptUrl(fee._id), "_blank");

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
    
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-blue-50 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Fee Management
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            All Invoices
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Every fee record and invoice for your school.
          </p>
        </div>

     
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 cursor-pointer shadow-sm hover:border-blue-300"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </header>

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