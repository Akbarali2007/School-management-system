"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeeStructureForm from "@/src/components/admin/FeeStructureForm";
import api from "@/src/services/api";
import { feeService } from "@/src/services/feeService";

export default function FeeStructurePage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    api
      .get("/students?limit=200")
      .then((res) => setStudents(res.data?.data || []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (payload) => {
    try {
      const res = await feeService.bulkCreate(payload);
      setRecent(res.data || []);
      if (
        confirm(`${res.count} invoices created! View them now?`)
      )
        router.push("/admin/fees/invoices");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create invoices");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
  
      <header className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm flex flex-col justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Fee Management
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            Generate Fee Invoices
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Select students, set an amount and due date — invoices are created
            instantly.
          </p>
        </div>
      </header>

   
      <div className="bg-white rounded-2xl border border-blue-50 p-6 lg:p-8 shadow-sm">
        <FeeStructureForm
          students={students}
          onSubmit={submit}
          loading={loading}
        />
      </div>

   
      {recent.length > 0 && (
        <div className="bg-white rounded-2xl border border-blue-50 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">
              Just Created
            </h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {recent.length} Invoices
            </span>
          </div>

          <ul className="divide-y divide-slate-100 text-sm">
            {recent.slice(0, 5).map((fee) => (
              <li
                key={fee._id}
                className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-lg transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {fee.invoiceNo}
                  </span>
                </div>
                <span className="text-slate-900 font-bold">
                  PKR {Number(fee.amount).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}