"use client";
import { useEffect, useState } from "react";
import InvoiceTable from "@/src/components/admin/InvoiceTable";
import { feeService } from "@/src/services/feeService";
import { formatCurrency } from "@/src/utils/formatCurrency";

export default function Page() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    feeService
      .list({ status: "paid", limit: 100 })
      .then((res) => setFees(res.data || []))
      .catch(() => setFees([]))
      .finally(() => setLoading(false));
  }, []);

  const handleReceipt = (fee) =>
    window.open(feeService.receiptUrl(fee._id), "_blank");

  const totalCollected = fees.reduce(
    (sum, f) => sum + Number(f.amount || 0),
    0
  );
  const avg = fees.length ? Math.round(totalCollected / fees.length) : 0;

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      
      <header className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Fee Management
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            Payment History
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            All completed payments and financial records.
          </p>
        </div>
      </header>

      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              Total Collected
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              Rs
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-4">
            {formatCurrency(totalCollected)}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1">
            All-time collected revenue
          </p>
        </div>

       
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Paid Invoices
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              #
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-4">
            {fees.length}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1">
            Total successful transaction records
          </p>
        </div>

      
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
              Average
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm">
              %
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-4">
            {formatCurrency(avg)}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1">
            Average collection per invoice
          </p>
        </div>
      </section>

     
      {loading ? (
        <div className="bg-white rounded-2xl border border-blue-50 shadow-sm py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-500">
            Loading payment records...
          </span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden">
          <InvoiceTable fees={fees} onViewReceipt={handleReceipt} />
        </div>
      )}
    </main>
  );
}