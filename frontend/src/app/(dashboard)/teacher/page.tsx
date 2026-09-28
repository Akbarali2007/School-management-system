"use client";
import React from 'react';
import Link from 'next/link';
import { UserCheck, Award, BookOpen, Users, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

const TEACHER_STATS = [
  { label: "Assigned Classes", value: "4", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
  { label: "Total Students", value: "142", icon: Users, color: "bg-purple-50 text-purple-600" },
  { label: "Today's Attendance", value: "88%", icon: UserCheck, color: "bg-emerald-50 text-emerald-600" },
  { label: "Pending Tests", value: "2", icon: Award, color: "bg-amber-50 text-amber-600" },
];

const RECENT_ACTIVITIES = [
  { id: 1, text: "Grade 10 - Section A ki attendance mark kar di gayi hai.", time: "10 mins ago" },
  { id: 2, text: "Mid-Term Physics Results publish ho chuke hain.", time: "2 hours ago" },
  { id: 3, text: "Grade 9 Mathematics Quiz #2 draft update hua.", time: "Yesterday" },
];

export default function TeacherDashboard() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30">
            Teacher Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight">Welcome back, Sir! 👋</h1>
          <p className="text-slate-300 text-xs md:text-sm mt-1">
            Direct access attendance registers and examination marks from today classes.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs font-semibold">
          <Calendar className="w-4 h-4 text-indigo-300" />
          <span>Sunday, 27 September 2026</span>
        </div>
      </div>

      {/* Primary Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Attendance Action Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
            Mark Class Attendance
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Apni assigned classes ke daily attendance registers record aur update karein.
          </p>
          <Link
            href="/teacher/mark-attendance"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all"
          >
            Open Attendance Register <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Enter Marks Action Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            Marks & Grading Entry
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Mid-term, final tests, aur quizzes ke obtained marks input karke automatic grades generate karein.
          </p>
          <Link
            href="/teacher/enter-marks"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
          >
            Enter Student Marks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TEACHER_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-extrabold text-slate-800 mt-0.5">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Recent Updates</h3>
        <div className="space-y-3">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">{act.text}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{act.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}