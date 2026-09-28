"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  Calendar, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  AlertCircle,
  Loader2 
} from 'lucide-react';
import Link from 'next/link';
import api from "@/src/services/api";

interface DashboardData {
  attendancePercentage: number;
  totalClasses: number;
  presentClasses: number;
  pendingHomeworksCount: number;
  recentMarks: {
    subject: string;
    marksObtained: number;
    totalMarks: number;
    grade: string;
  }[];
  upcomingAssignments: {
    _id: string;
    title: string;
    subject: string;
    dueDate: string;
  }[];
}

export default function StudentDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Student Dashboard Summary Data
  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const response = await api.get('/student/dashboard-summary');
        setData(response.data?.data || response.data);
      } catch (err: any) {
        // Fallback mock structure for initial frontend preview
        setData({
          attendancePercentage: 88,
          totalClasses: 120,
          presentClasses: 105,
          pendingHomeworksCount: 3,
          recentMarks: [
            { subject: "Mathematics", marksObtained: 85, totalMarks: 100, grade: "A" },
            { subject: "Physics", marksObtained: 78, totalMarks: 100, grade: "B+" },
            { subject: "Computer Science", marksObtained: 92, totalMarks: 100, grade: "A+" },
          ],
          upcomingAssignments: [
            { _id: "1", title: "Algebra Chapter 4 Sheet", subject: "Mathematics", dueDate: "2026-09-30" },
            { _id: "2", title: "Newton Laws Lab Report", subject: "Physics", dueDate: "2026-10-02" },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-xs font-semibold">Student Dashboard load ho raha hai...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-wider bg-indigo-500/30 px-3 py-1 rounded-lg text-indigo-200 border border-indigo-400/20">
            Student Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome, Dear Student!</h1>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Attendance Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Attendance Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">{data?.attendancePercentage}%</span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> Good
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{data?.presentClasses} of {data?.totalClasses} classes attended</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
            <CheckCircle2 className="w-7 h-7" />
          </div>
        </div>

        {/* Pending Homework Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Pending Homework</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">{data?.pendingHomeworksCount}</span>
              <span className="text-[11px] text-amber-600 font-bold">Tasks Due</span>
            </div>
            <p className="text-[11px] text-slate-500">The assignments are still pending submission.</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>

        {/* Academic Performance Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Overall Grade</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-600">A</span>
              <span className="text-[11px] text-slate-500 font-semibold">Excellent</span>
            </div>
            <p className="text-[11px] text-slate-500">Based on recent evaluation</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
            <Award className="w-7 h-7" />
          </div>
        </div>

      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pending Assignments List (2-Columns Wide) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Pending Homework & Assignments</h2>
              <p className="text-xs text-slate-500">Submit assignments after due date</p>
            </div>
            <Link 
              href="/student/homework" 
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {data?.upcomingAssignments.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs font-medium">
              Home is not pending
            </div>
          ) : (
            <div className="space-y-3">
              {data?.upcomingAssignments.map((assignment) => (
                <div 
                  key={assignment._id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">
                      {assignment.subject}
                    </span>
                    <h3 className="text-xs font-bold text-slate-800">{assignment.title}</h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Marks Summary (1-Column Wide) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-800">Recent Marks</h2>
            <Link 
              href="/student/marks" 
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Details
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentMarks.map((mark, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{mark.subject}</h4>
                  <p className="text-[11px] text-slate-500">{mark.marksObtained} / {mark.totalMarks} Marks</p>
                </div>
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  {mark.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}