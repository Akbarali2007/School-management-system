'use client'; // <-- Next.js ke liye ye line add karein

import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  ClipboardCheck,
  Award,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  UserCheck,
  Upload,
  Send,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Sparkles,
  BookMarked,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon
} from 'lucide-react';

// Mock Data for Teacher Dashboard
const TEACHER_INFO = {
  name: "Prof. Sarah Jenkins",
  role: "Senior Science Teacher",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  school: "Bright Future School",
  campus: "Main Campus",
  id: "TCH-2025-089"
};

const STATS_DATA = [
  { id: 1, title: "Total Students", value: "348", change: "+8%", isPositive: true, subtext: "across 6 classes", icon: Users, color: "bg-blue-500/10 text-blue-600" },
  { id: 2, title: "Today's Attendance", value: "94.2%", change: "+2.1%", isPositive: true, subtext: "328 present today", icon: UserCheck, color: "bg-emerald-500/10 text-emerald-600" },
  { id: 3, title: "Pending Homework", value: "42", change: "-12", isPositive: true, subtext: "to grade by Friday", icon: ClipboardCheck, color: "bg-amber-500/10 text-amber-600" },
  { id: 4, title: "Avg Class Marks", value: "82.5%", change: "+3.4%", isPositive: true, subtext: "vs previous term", icon: Award, color: "bg-purple-500/10 text-purple-600" },
  { id: 5, title: "Classes Today", value: "5 Sessions", change: "2 done", isPositive: true, subtext: "Next: Class 8-A Physics", icon: Calendar, color: "bg-indigo-500/10 text-indigo-600" }
];

const INITIAL_STUDENTS = [
  { id: 1, name: "Ayaan Ahmed", rollNo: "12", class: "Class 8", section: "A", father: "Imran Ahmed", attendance: "Present", marks: "88%", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 2, name: "Fatima Noor", rollNo: "15", class: "Class 7", section: "B", father: "Sajid Noor", attendance: "Present", marks: "94%", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 3, name: "Muhammad Ali", rollNo: "08", class: "Class 8", section: "A", father: "Naseer Ali", attendance: "Absent", marks: "72%", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 4, name: "Sarah Khan", rollNo: "21", class: "Class 5", section: "C", father: "Faisal Khan", attendance: "Present", marks: "91%", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 5, name: "Abdullah Raza", rollNo: "11", class: "Class 9", section: "A", father: "Raza Ahmed", attendance: "Late", marks: "65%", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 6, name: "Hira Fatima", rollNo: "17", class: "Class 6", section: "B", father: "Shahid Ali", attendance: "Present", marks: "85%", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 7, name: "Usman Tariq", rollNo: "09", class: "Class 7", section: "A", father: "Tariq Mehmood", attendance: "Present", marks: "78%", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100", status: "Pending" },
  { id: 8, name: "Zainab Iqbal", rollNo: "14", class: "Class 4", section: "B", father: "Iqbal Hussain", attendance: "Absent", marks: "89%", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 9, name: "Hamza Raza", rollNo: "06", class: "Class 8", section: "C", father: "Rashid Raza", attendance: "Present", marks: "96%", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100", status: "Active" },
  { id: 10, name: "Ayesha Malik", rollNo: "19", class: "Class 5", section: "A", father: "Nadeem Malik", attendance: "Late", marks: "60%", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100", status: "Inactive" }
];

const RECENT_ACTIVITIES = [
  { id: 1, title: "Marks Uploaded", desc: "Physics Mid-Term Exam marks for Class 8-A uploaded.", time: "10 mins ago", type: "academic", color: "bg-emerald-500" },
  { id: 2, title: "New Homework Assigned", desc: "Chapter 4 Thermodynamics assigned to Class 9-B.", time: "1 hour ago", type: "homework", color: "bg-blue-500" },
  { id: 3, title: "Attendance Submitted", desc: "Class 7-B daily attendance marked (28/30 present).", time: "3 hours ago", type: "attendance", color: "bg-purple-500" },
  { id: 4, title: "Parent Message", desc: "Mr. Imran Ahmed requested a meeting regarding Ayaan.", time: "5 hours ago", type: "message", color: "bg-amber-500" }
];


export default function Page() {
  // Component Logic
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [actionModal, setActionModal] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(INITIAL_STUDENTS[0]);

  // Sidebar Menu Items for Teacher
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: BookOpen, badge: '6' },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'homework', label: 'Homework & Assignments', icon: ClipboardCheck, badge: '5 Pending' },
    { id: 'exams', label: 'Exams & Marks', icon: Award },
    { id: 'schedule', label: 'Timetable', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
    { id: 'analytics', label: 'Class Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Quick Action Buttons
  const quickActions = [
    { title: "Mark Attendance", icon: UserCheck, action: "attendance", bg: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
    { title: "Assign Homework", icon: ClipboardCheck, action: "homework", bg: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
    { title: "Upload Marks", icon: Upload, action: "marks", bg: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
    { title: "Send Notice", icon: Send, action: "notice", bg: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
    { title: "Schedule Quiz", icon: Award, action: "quiz", bg: "bg-rose-50 text-rose-600 hover:bg-rose-100" },
    { title: "Parent Note", icon: MessageSquare, action: "message", bg: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
  ];

  // Filter students
  const filteredStudents = useMemo(() => {
    return INITIAL_STUDENTS.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.rollNo.includes(searchQuery) ||
                            student.father.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = selectedClass === 'All' || student.class === selectedClass;
      const matchesSection = selectedSection === 'All' || student.section === selectedSection;
      const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
      return matchesSearch && matchesClass && matchesSection && matchesStatus;
    });
  }, [searchQuery, selectedClass, selectedSection, selectedStatus]);

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans antialiased text-slate-800 overflow-hidden">
      
      {}
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col justify-between flex-shrink-0 z-20">
        <div>
          {/* Logo & Brand */}
          <div className="px-6 py-5 flex items-center gap-3 border-b border-slate-800">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg tracking-tight leading-tight">DevNixEdu</h1>
              <span className="text-xs text-blue-400 font-medium">Teacher Workspace</span>
            </div>
          </div>

          {/* School Campus Selector */}
          <div className="p-4">
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition">
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{TEACHER_INFO.school}</p>
                <p className="text-[11px] text-slate-400">{TEACHER_INFO.campus}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'hover:bg-slate-800/60 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-blue-600' : 'bg-slate-800 text-blue-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 bg-slate-800/40 rounded-xl">
            <img src={TEACHER_INFO.avatar} alt="Teacher Avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30" />
            <div className="flex-1 truncate">
              <p className="text-xs font-semibold text-white truncate">{TEACHER_INFO.name}</p>
              <p className="text-[10px] text-slate-400">{TEACHER_INFO.role}</p>
            </div>
            <button title="Logout" className="text-slate-400 hover:text-rose-400 p-1">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {}
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs z-10">
          {/* Global Search Bar */}
          <div className="relative w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students, classes, homework, or schedule..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            {/* Quick Action Button */}
            <button 
              onClick={() => setActionModal('quick_new')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Create Task</span>
            </button>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notification Popover */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-800">Notifications</h3>
                    <span className="text-[11px] text-blue-600 font-medium cursor-pointer">Mark all as read</span>
                  </div>
                  <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">Class 8-A Physics Assignment</p>
                      <p className="text-[11px] text-slate-500">12 new submissions received.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">Staff Meeting Today</p>
                      <p className="text-[11px] text-slate-500">Scheduled for 02:30 PM in Main Hall.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Info */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <img
                src={TEACHER_INFO.avatar}
                alt="Teacher"
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">{TEACHER_INFO.name}</p>
                <p className="text-[10px] text-slate-500 font-medium">Physics Lead</p>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT BODY */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {}
          {/* Breadcrumb & Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>Teacher Portal</span>
                <span>/</span>
                <span className="text-blue-600 font-semibold capitalize">{activeTab}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Teacher Command Center
              </h2>
              <p className="text-xs text-slate-500">Manage class performance, daily attendance, grading, and schedules seamlessly.</p>
            </div>
            
            {/* Quick Action Bar Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                Term 2 - Academic Year 2025-2026
              </span>
            </div>
          </div>

          {}
          {/* TOP METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS_DATA.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {stat.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.title}</p>
                  <p className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-50 truncate">{stat.subtext}</p>
                </div>
              );
            })}
          </div>

          {}
          {/* MIDDLE ANALYTICS & QUICK ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Attendance & Performance Charts Summary */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Attendance Donut Widget */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Attendance Overview</h3>
                    <p className="text-[11px] text-slate-400">Daily summary across all classes</p>
                  </div>
                  <select className="text-xs border border-slate-200 bg-slate-50 rounded-lg px-2 py-1 text-slate-600 outline-none">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>

                <div className="flex items-center justify-center gap-6 py-2">
                  {/* CSS Visual Donut Representation */}
                  <div className="relative w-32 h-32 rounded-full border-[12px] border-emerald-500 border-t-amber-400 border-r-rose-500 flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <span className="text-2xl font-black text-slate-800">94%</span>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Present</p>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span className="text-xs text-slate-600 font-medium">Present: <strong className="text-slate-800">328</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                      <span className="text-xs text-slate-600 font-medium">Late: <strong className="text-slate-800">12</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                      <span className="text-xs text-slate-600 font-medium">Absent: <strong className="text-slate-800">8</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <span>Total Students Expected: <strong>348</strong></span>
                  <button className="text-blue-600 font-semibold hover:underline">View Log</button>
                </div>
              </div>

              {/* Class Performance Bar Chart Visual */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Average Grade Trend</h3>
                    <p className="text-[11px] text-slate-400">Subject performance distribution</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+4.2% overall</span>
                </div>

                {/* Simulated Chart Bars */}
                <div className="h-36 flex items-end justify-between gap-2 pt-6 pb-2 px-2">
                  {[
                    { label: 'Class 5-A', val: '78%', height: 'h-3/4', color: 'bg-blue-400' },
                    { label: 'Class 6-B', val: '85%', height: 'h-4/5', color: 'bg-blue-500' },
                    { label: 'Class 7-A', val: '92%', height: 'h-full', color: 'bg-blue-600' },
                    { label: 'Class 8-A', val: '88%', height: 'h-5/6', color: 'bg-indigo-600' },
                    { label: 'Class 9-C', val: '74%', height: 'h-2/3', color: 'bg-purple-500' },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition">{bar.val}</span>
                      <div className={`w-full ${bar.height} ${bar.color} rounded-t-lg transition-all duration-300 group-hover:brightness-110`}></div>
                      <span className="text-[10px] font-medium text-slate-500 truncate w-full text-center">{bar.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <span>Highest Class: <strong className="text-slate-800">Class 7-A (92%)</strong></span>
                  <button className="text-blue-600 font-semibold hover:underline">Full Analytics</button>
                </div>
              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-slate-800">Quick Actions</h3>
                  <span className="text-[11px] text-slate-400">Teacher Shortcuts</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((qa, index) => {
                    const Icon = qa.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setActionModal(qa.action)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100/80 ${qa.bg} transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 text-center`}
                      >
                        <Icon className="h-5 w-5 mb-1.5" />
                        <span className="text-xs font-semibold">{qa.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Upcoming Class Card */}
              <div className="mt-4 p-3.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl text-white shadow-md">
                <div className="flex items-center justify-between text-xs opacity-80 mb-1">
                  <span>Next Upcoming Session</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-md font-mono text-[10px]">In 25 Mins</span>
                </div>
                <p className="font-bold text-base">Physics - Grade 8 Section A</p>
                <p className="text-xs opacity-90">Lab Room 302 • Chapter 5: Electromagnetism</p>
              </div>
            </div>

          </div>

          {}
          {/* STUDENT DATA TABLE SECTION */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            
            {/* Table Header & Controls */}
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Enrolled Students Overview</h3>
                <p className="text-xs text-slate-500">Filter, check status, or record individual student evaluation.</p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name, father, or roll no..."
                    className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none w-52 sm:w-64"
                  />
                </div>

                {/* Class Filter */}
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="text-xs border border-slate-200 bg-slate-50 rounded-xl px-2.5 py-1.5 text-slate-700 outline-none font-medium"
                >
                  <option value="All">All Classes</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                </select>

                {/* Section Filter */}
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="text-xs border border-slate-200 bg-slate-50 rounded-xl px-2.5 py-1.5 text-slate-700 outline-none font-medium"
                >
                  <option value="All">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs border border-slate-200 bg-slate-50 rounded-xl px-2.5 py-1.5 text-slate-700 outline-none font-medium"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4 w-10">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </th>
                    <th className="p-4">Student</th>
                    <th className="p-4">Roll No</th>
                    <th className="p-4">Class & Sec</th>
                    <th className="p-4">Father Name</th>
                    <th className="p-4">Today's Status</th>
                    <th className="p-4">Marks %</th>
                    <th className="p-4">System Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={student.photo} alt={student.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
                            <div>
                              <p className="font-bold text-slate-900">{student.name}</p>
                              <span className="text-[10px] text-slate-400">ID: ADM-2025-0{student.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono font-semibold text-slate-700">{student.rollNo}</td>
                        <td className="p-4 font-medium text-slate-800">
                          {student.class} - <span className="text-blue-600 font-bold">{student.section}</span>
                        </td>
                        <td className="p-4 text-slate-600">{student.father}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            student.attendance === 'Present' ? 'bg-emerald-50 text-emerald-700' :
                            student.attendance === 'Late' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {student.attendance === 'Present' && <CheckCircle2 className="h-3 w-3" />}
                            {student.attendance === 'Late' && <Clock className="h-3 w-3" />}
                            {student.attendance === 'Absent' && <XCircle className="h-3 w-3" />}
                            {student.attendance}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-slate-800">{student.marks}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                            student.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setSelectedStudent(student)}
                              title="View Profile"
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setActionModal(`grade_${student.id}`)}
                              title="Grade Marks"
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setActionModal(`msg_${student.id}`)}
                              title="Message Parent"
                              className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-8 text-slate-400 text-xs">
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing 1 to {filteredStudents.length} of {INITIAL_STUDENTS.length} students</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"><ChevronLeft className="h-4 w-4" /></button>
                <button className="px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold">1</button>
                <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">2</button>
                <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {}
          {/* BOTTOM SECTION: ACTIVITIES & PROMO BANNER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Activity Stream */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-800">Recent Class Activities</h3>
                <span className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">View All</span>
              </div>

              <div className="space-y-3">
                {RECENT_ACTIVITIES.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 ${act.color} flex-shrink-0`}></span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800">{act.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{act.desc}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Student Feature Highlight Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-3">
                  <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">Quick Student Profile</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img src={selectedStudent.photo} alt={selectedStudent.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500" />
                  <div>
                    <h4 className="font-bold text-sm">{selectedStudent.name}</h4>
                    <p className="text-xs text-slate-400">{selectedStudent.class} ({selectedStudent.section}) • Roll #{selectedStudent.rollNo}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
                  <div className="flex justify-between text-slate-300">
                    <span>Father:</span>
                    <span className="font-semibold text-white">{selectedStudent.father}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Attendance Rate:</span>
                    <span className="font-semibold text-emerald-400">96%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Term Marks Avg:</span>
                    <span className="font-semibold text-blue-400">{selectedStudent.marks}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert(`Opening complete profile for ${selectedStudent.name}`)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md transition"
              >
                View Full Detailed Profile
              </button>
            </div>

          </div>

        </main>
      </div>

      {}
      {/* INTERACTIVE MODAL FOR ACTIONS */}
      {actionModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {actionModal === 'attendance' && 'Mark Attendance'}
                {actionModal === 'homework' && 'Assign New Homework'}
                {actionModal === 'marks' && 'Upload Term Marks'}
                {actionModal === 'notice' && 'Send Announcement'}
                {actionModal === 'quick_new' && 'Create New Task / Event'}
                {actionModal.startsWith('msg_') && 'Send Message to Parent'}
                {actionModal.startsWith('grade_') && 'Update Marks'}
              </h3>
              <button onClick={() => setActionModal(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Select Target Class</label>
                <select className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option>Class 8 - Section A (Physics)</option>
                  <option>Class 7 - Section B (General Science)</option>
                  <option>Class 9 - Section C (Physics)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Title / Details</label>
                <input type="text" placeholder="Enter title..." className="w-full p-2 border border-slate-200 rounded-xl" />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Additional Notes</label>
                <textarea rows="3" placeholder="Add additional details or guidelines..." className="w-full p-2 border border-slate-200 rounded-xl"></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setActionModal(null)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
              <button 
                onClick={() => {
                  alert('Action completed successfully!');
                  setActionModal(null);
                }} 
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
              >
                Submit Action
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
