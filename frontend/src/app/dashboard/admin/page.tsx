'use client';

import React, { useState, useMemo } from 'react';
import {
  Search, Bell, MessageSquare, Menu, ChevronDown, Plus, Users, UserCheck, UserPlus,
  TrendingUp, Calendar, CheckCircle2, Clock, Eye, Edit, MoreHorizontal,
  Filter, FileText, Send, Upload, Award, GraduationCap, School, ChevronRight,
  ChevronLeft, LayoutDashboard, Sparkles, Code, Copy, Check, BookOpen,
  DollarSign, Bus, Package, Settings, HelpCircle, Layers, Folder, FileCode, Play, Monitor
} from 'lucide-react';

/* ==========================================================================
   TYPES & INTERFACES (TypeScript definitions)
   ========================================================================== */
export interface Student {
  id: number;
  photo: string;
  name: string;
  admissionNo: string;
  class: string;
  section: string;
  rollNo: string;
  fatherName: string;
  contact: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface Activity {
  id: number;
  title: string;
  desc: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

const INITIAL_STUDENTS: Student[] = [
  { id: 1, photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', name: 'Ayaan Ahmed', admissionNo: 'ADM-2025-001', class: 'Class 6', section: 'A', rollNo: '12', fatherName: 'Imran Ahmed', contact: '0300 1234567', status: 'Active' },
  { id: 2, photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', name: 'Fatima Noor', admissionNo: 'ADM-2025-002', class: 'Class 7', section: 'B', rollNo: '15', fatherName: 'Sajid Noor', contact: '0301 9876543', status: 'Active' },
  { id: 3, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', name: 'Muhammad Ali', admissionNo: 'ADM-2025-003', class: 'Class 8', section: 'A', rollNo: '08', fatherName: 'Naseer Ali', contact: '0302 4567890', status: 'Active' },
  { id: 4, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', name: 'Sarah Khan', admissionNo: 'ADM-2025-004', class: 'Class 5', section: 'C', rollNo: '21', fatherName: 'Faisal Khan', contact: '0303 1112233', status: 'Active' },
  { id: 5, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', name: 'Abdullah Raza', admissionNo: 'ADM-2025-005', class: 'Class 9', section: 'A', rollNo: '11', fatherName: 'Raza Ahmed', contact: '0304 4445566', status: 'Active' },
  { id: 6, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80', name: 'Hira Fatima', admissionNo: 'ADM-2025-006', class: 'Class 6', section: 'B', rollNo: '17', fatherName: 'Shahid Ali', contact: '0305 7778899', status: 'Active' },
  { id: 7, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80', name: 'Usman Tariq', admissionNo: 'ADM-2025-007', class: 'Class 7', section: 'A', rollNo: '09', fatherName: 'Tariq Mehmood', contact: '0306 2223344', status: 'Pending' },
  { id: 8, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', name: 'Zainab Iqbal', admissionNo: 'ADM-2025-008', class: 'Class 4', section: 'B', rollNo: '14', fatherName: 'Iqbal Hussain', contact: '0307 6667788', status: 'Active' },
  { id: 9, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', name: 'Hamza Raza', admissionNo: 'ADM-2025-009', class: 'Class 8', section: 'C', rollNo: '06', fatherName: 'Rashid Raza', contact: '0308 9900112', status: 'Active' },
  { id: 10, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', name: 'Ayesha Malik', admissionNo: 'ADM-2025-010', class: 'Class 5', section: 'A', rollNo: '19', fatherName: 'Nadeem Malik', contact: '0309 1122334', status: 'Inactive' },
];

const RECENT_ACTIVITIES: Activity[] = [
  { id: 1, title: 'New student admission', desc: 'Ayesha Khan admitted in Class 5', time: '2 hours ago', icon: UserPlus, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' },
  { id: 2, title: 'Fee payment received', desc: 'Rs. 12,000 from Muhammad Ali', time: '4 hours ago', icon: DollarSign, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' },
  { id: 3, title: 'Attendance marked', desc: 'Class 6 - A, 32 students present', time: '5 hours ago', icon: CheckCircle2, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' },
  { id: 4, title: 'Student promoted', desc: 'Usman Tariq promoted to Class 7', time: '1 day ago', icon: TrendingUp, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30' },
  { id: 5, title: 'New enquiry', desc: 'Ali Raza enquiry for Class 1', time: '1 day ago', icon: HelpCircle, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30' },
];

const CLASS_DISTRIBUTION = [
  { name: 'Class 1', count: 160, color: '#3b82f6' },
  { name: 'Class 2', count: 175, color: '#06b6d4' },
  { name: 'Class 3', count: 162, color: '#10b981' },
  { name: 'Class 4', count: 148, color: '#f59e0b' },
  { name: 'Class 5', count: 140, color: '#ef4444' },
  { name: 'Class 6', count: 128, color: '#8b5cf6' },
  { name: 'Class 7', count: 118, color: '#ec4899' },
  { name: 'Class 8', count: 117, color: '#64748b' },
];

// ============================================================================
// COMPONENT 1: components/Navbar.tsx
// Header bar with Logo, Menu Toggle right after logo, Search & Actions
// ============================================================================
interface NavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  viewMode: 'preview' | 'code';
  onToggleViewMode: (mode: 'preview' | 'code') => void;
}

const Navbar: React.FC<NavbarProps> = ({
  sidebarOpen,
  onToggleSidebar,
  viewMode,
  onToggleViewMode
}) => {
  return (
    <header className="bg-[#0b192c] text-white h-16 px-4 flex items-center justify-between shadow-md sticky top-0 z-40 border-b border-slate-800">
      
      {/* Brand Logo & Side-by-Side Menu Button */}
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl shadow-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-base tracking-tight text-white">DevNix</span>
              <span className="font-bold text-base text-blue-400">Edu</span>
            </div>
            <p className="text-[9px] text-slate-400 font-medium tracking-wide uppercase -mt-1 hidden sm:block">
              Smart School System
            </p>
          </div>
        </div>

        {/* Menu Toggle Button - Positioned immediately beside Logo */}
        <button 
          onClick={onToggleSidebar}
          className="p-1.5 ml-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/60 flex items-center justify-center"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search students, teachers, classes, or anything..."
            className="w-full bg-[#162a45] text-slate-200 text-xs pl-10 pr-4 py-2 rounded-lg border border-slate-700/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right Utility Buttons */}
      <div className="flex items-center space-x-2.5">
        
        {/* Toggle Live Preview / Code Explorer mode */}
        <div className="bg-[#162a45] p-1 rounded-xl border border-slate-700/60 flex items-center">
          <button 
            onClick={() => onToggleViewMode('preview')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'preview' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button 
            onClick={() => onToggleViewMode('code')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'code' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modular TS Code</span>
          </button>
        </div>

        {/* Notifications & Messages */}
        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 relative transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0b192c]" />
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition">
          <MessageSquare className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-700/60 mx-1 hidden sm:block" />

        {/* User Profile */}
        <div className="flex items-center space-x-2.5 cursor-pointer group p-1 rounded-lg hover:bg-slate-800/80 transition">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
            alt="Ahmed Khan" 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/50"
          />
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">Ahmed Khan</div>
            <div className="text-[10px] text-slate-400">Principal</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
        </div>

      </div>
    </header>
  );
};

// ============================================================================
// COMPONENT 2: components/Sidebar.tsx
// Navigation drawer with campus selector & collapsible submenus
// ============================================================================
interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const [studentsSectionExpanded, setStudentsSectionExpanded] = useState(true);

  return (
    <aside className={`${
      isOpen ? 'w-64' : 'w-0 -ml-64 lg:w-16 lg:ml-0'
    } bg-[#0f213d] text-slate-300 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800/80 z-30 shrink-0 select-none overflow-hidden`}>
      
      {/* School Campus Selector */}
      <div className="p-3 border-b border-slate-800/80">
        <div className="bg-[#162a45] rounded-xl p-2.5 flex items-center justify-between cursor-pointer hover:bg-[#1c3557] transition border border-slate-700/40">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="bg-blue-600/30 p-1.5 rounded-md text-blue-400">
              <School className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Bright Future School</div>
              <div className="text-[10px] text-slate-400 truncate">Main Campus</div>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1 text-xs font-medium custom-scrollbar">
        
        <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 hover:text-white transition">
          <LayoutDashboard className="w-4 h-4 text-slate-400" />
          <span className={!isOpen ? 'lg:hidden' : ''}>Dashboard</span>
        </a>

        {/* Collapsible Students Group */}
        <div>
          <button 
            onClick={() => setStudentsSectionExpanded(!studentsSectionExpanded)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-white bg-blue-600/20 font-semibold border-l-4 border-blue-500 transition"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-blue-400" />
              <span className={!isOpen ? 'lg:hidden' : ''}>Students</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${studentsSectionExpanded ? 'rotate-180' : ''}`} />
          </button>

          {studentsSectionExpanded && (
            <div className="ml-4 pl-3 border-l border-slate-700/60 my-1 space-y-0.5">
              {[
                'Dashboard', 'All Students', 'Add Student', 'Admissions',
                'Student Profiles', 'Families', 'Attendance', 'Fees',
                'Exams & Results', 'Homework', 'Documents', 'Transport',
                'Student ID Cards', 'Promotion', 'Transfer / Withdrawal',
                'Import Students', 'Bulk Actions', 'Student Reports'
              ].map((subItem) => (
                <button
                  key={subItem}
                  onClick={() => setActiveTab(subItem)}
                  className={`w-full text-left py-1.5 px-3 rounded-lg transition text-[11px] flex items-center space-x-2 ${
                    activeTab === subItem 
                      ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${activeTab === subItem ? 'bg-white' : 'bg-slate-500'}`} />
                  <span className={!isOpen ? 'lg:hidden' : ''}>{subItem}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Other Modules */}
        {[
          { name: 'Teachers & Staff', icon: GraduationCap },
          { name: 'HR & Payroll', icon: DollarSign },
          { name: 'Communication', icon: MessageSquare },
          { name: 'Library', icon: BookOpen },
          { name: 'Transport', icon: Bus },
          { name: 'Inventory & Assets', icon: Package },
          { name: 'Reports & Analytics', icon: FileText },
          { name: 'Settings', icon: Settings },
        ].map((nav) => (
          <a key={nav.name} href="#" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/60 hover:text-white transition">
            <div className="flex items-center space-x-3">
              <nav.icon className="w-4 h-4 text-slate-400" />
              <span className={!isOpen ? 'lg:hidden' : ''}>{nav.name}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
        <p className="font-bold text-slate-400">DevNixEdu <span className="font-normal text-slate-500">v1.0</span></p>
        <p className="text-[10px] text-slate-600 mt-0.5">© 2026 DevNix Pro. All rights reserved.</p>
      </div>
    </aside>
  );
};

// ============================================================================
// COMPONENT 3: components/StatsOverview.tsx
// Top 5 key summary metrics cards
// ============================================================================
const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      
      {/* Total Students */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Students</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">1,248</h3>
          <div className="flex items-center text-[11px] text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>12% <span className="text-slate-400 font-normal">vs last month</span></span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Active Students */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Students</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">1,186</h3>
          <div className="flex items-center text-[11px] text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>10% <span className="text-slate-400 font-normal">vs last month</span></span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      {/* New Admissions */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">New Admissions</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">42</h3>
          <div className="flex items-center text-[11px] text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>35% <span className="text-slate-400 font-normal">vs last month</span></span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <UserPlus className="w-5 h-5" />
        </div>
      </div>

      {/* Male Students */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Male Students</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">632</h3>
          <p className="text-[11px] text-slate-400 mt-1">51% of total</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Female Students */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Female Students</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">616</h3>
          <p className="text-[11px] text-slate-400 mt-1">49% of total</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
      </div>

    </div>
  );
};

// ============================================================================
// COMPONENT 4: components/ChartsSection.tsx
// Visual charts: Donut by Class, Line Growth Trend, Circular Attendance Gauge
// ============================================================================
interface ChartsSectionProps {
  onOpenAddStudent: () => void;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ onOpenAddStudent }) => {
  return (
    <div className="space-y-6">
      
      {/* 3 Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Donut Chart - Class distribution */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Students by Class</span>
            </h4>
          </div>
          
          <div className="relative w-32 h-32 mx-auto my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="30, 100" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-30" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-55" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-75" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-800">1,248</span>
              <span className="text-[9px] text-slate-400 uppercase font-medium">Total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-600 border-t pt-2 mt-1">
            {CLASS_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-700">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Growth SVG Trend Chart */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Student Growth</span>
            </h4>
            <select className="text-[10px] border border-slate-200 rounded-md px-1.5 py-0.5 bg-slate-50 text-slate-600 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="h-36 w-full flex flex-col justify-end relative my-2">
            <svg className="w-full h-28 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 70 Q 50 60, 100 50 T 200 35 T 300 15 L 300 100 L 0 100 Z" fill="url(#growthGrad)" />
              <path d="M 0 70 Q 50 60, 100 50 T 200 35 T 300 15" fill="none" stroke="#2563eb" strokeWidth="3" />
              {[[0,70],[60,60],[120,50],[180,45],[240,30],[300,15]].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="4" className="fill-blue-600 stroke-white stroke-2 hover:r-6 transition-all" />
              ))}
            </svg>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 bg-blue-50/60 p-2 rounded-lg text-center font-medium">
            +15.4% steady increase since Jan
          </div>
        </div>

        {/* 3. Circular Attendance Meter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Attendance Overview</span>
            </h4>
            <select className="text-[10px] border border-slate-200 rounded-md px-1.5 py-0.5 bg-slate-50 text-slate-600 focus:outline-none">
              <option>This Month</option>
              <option>Today</option>
            </select>
          </div>

          <div className="relative w-32 h-32 mx-auto my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="88, 100" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-slate-800">88%</span>
              <span className="text-[9px] text-emerald-600 font-semibold uppercase">Present</span>
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-slate-600 border-t pt-2">
            <div className="flex justify-between items-center">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />Present</span>
              <span className="font-bold text-slate-800">1,102</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-2" />Absent</span>
              <span className="font-bold text-slate-800">120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2" />Late</span>
              <span className="font-bold text-slate-800">26</span>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Action Grid */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Quick Actions</span>
          </h4>
          <button className="text-xs text-blue-600 hover:underline font-medium">View All</button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {[
            { label: 'Add Student', icon: UserPlus, color: 'text-blue-600 bg-blue-50', action: onOpenAddStudent },
            { label: 'Mark Attendance', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Collect Fee', icon: DollarSign, color: 'text-purple-600 bg-purple-50' },
            { label: 'Generate Challan', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Add Exam Marks', icon: Award, color: 'text-amber-600 bg-amber-50' },
            { label: 'Report Card', icon: GraduationCap, color: 'text-rose-600 bg-rose-50' },
            { label: 'Assign Homework', icon: BookOpen, color: 'text-sky-600 bg-sky-50' },
            { label: 'Send Message', icon: Send, color: 'text-teal-600 bg-teal-50' },
            { label: 'Upload Document', icon: Upload, color: 'text-slate-600 bg-slate-100' },
          ].map((act, idx) => (
            <button
              key={idx}
              onClick={act.action}
              className="p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition flex flex-col items-center text-center space-y-1.5 group bg-white"
            >
              <div className={`p-2 rounded-lg ${act.color} group-hover:scale-110 transition-transform`}>
                <act.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-600 leading-tight group-hover:text-blue-600">{act.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

// ============================================================================
// COMPONENT 5: components/StudentsTable.tsx
// Dynamic filterable data table with pagination and bulk selection
// ============================================================================
interface StudentsTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students, onSelectStudent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.fatherName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchClass = selectedClass === 'All Classes' || s.class === selectedClass;
      const matchSection = selectedSection === 'All Sections' || s.section === selectedSection;
      const matchStatus = selectedStatus === 'All Status' || s.status === selectedStatus;
      return matchSearch && matchClass && matchSection && matchStatus;
    });
  }, [students, searchQuery, selectedClass, selectedSection, selectedStatus]);

  const toggleAll = () => {
    if (selectedRows.length === filtered.length) setSelectedRows([]);
    else setSelectedRows(filtered.map(s => s.id));
  };

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) setSelectedRows(selectedRows.filter(r => r !== id));
    else setSelectedRows([...selectedRows, id]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      
      {/* Table Filters Bar */}
      <div className="p-4 border-b border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>All Students</span>
            <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">
              {filtered.length} Students
            </span>
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or father..."
                className="text-xs bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500 w-48 sm:w-60"
              />
            </div>

            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-600 focus:outline-none"
            >
              <option>All Classes</option>
              {['Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9'].map(c => <option key={c}>{c}</option>)}
            </select>

            <select 
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-600 focus:outline-none"
            >
              <option>All Sections</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-600 focus:outline-none"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>

            <button className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-medium transition">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="p-3 w-10 text-center">
                <input 
                  type="checkbox" 
                  onChange={toggleAll}
                  checked={selectedRows.length === filtered.length && filtered.length > 0}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                />
              </th>
              <th className="p-3">#</th>
              <th className="p-3">Photo</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Admission No.</th>
              <th className="p-3">Class</th>
              <th className="p-3">Section</th>
              <th className="p-3">Roll No.</th>
              <th className="p-3">Father Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center py-8 text-slate-400">
                  No student records match the search parameters.
                </td>
              </tr>
            ) : (
              filtered.map((s, idx) => (
                <tr key={s.id} className="hover:bg-blue-50/40 transition group">
                  <td className="p-3 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(s.id)}
                      onChange={() => toggleRow(s.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="p-3 text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="p-3">
                    <img src={s.photo} alt={s.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
                  </td>
                  <td className="p-3 font-bold text-slate-900 group-hover:text-blue-600 transition">{s.name}</td>
                  <td className="p-3 text-slate-500 font-mono text-[11px]">{s.admissionNo}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 rounded font-semibold text-slate-600">{s.section}</span></td>
                  <td className="p-3">{s.rollNo}</td>
                  <td className="p-3 text-slate-600">{s.fatherName}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-500">{s.contact}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block ${
                      s.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      s.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center space-x-1.5 opacity-80 group-hover:opacity-100">
                      <button 
                        onClick={() => onSelectStudent(s)}
                        className="p-1 hover:bg-slate-200/80 rounded text-slate-500 hover:text-blue-600 transition"
                        title="View Full Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:bg-slate-200/80 rounded text-slate-500 hover:text-amber-600 transition" title="Edit Record">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:bg-slate-200/80 rounded text-slate-500 hover:text-slate-800 transition" title="Options">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
        <div>
          Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">{filtered.length}</span> of <span className="font-bold text-slate-800">1,248</span> students
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold">1</button>
          <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">2</button>
          <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">3</button>
          <span className="px-1 text-slate-400">...</span>
          <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">125</button>
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span>Items per page</span>
          <select className="border border-slate-200 rounded-lg px-2 py-1 bg-slate-50 text-slate-700 font-semibold focus:outline-none">
            <option>10 / page</option>
            <option>25 / page</option>
          </select>
        </div>
      </div>

    </div>
  );
};

// ============================================================================
// COMPONENT 6: components/SideWidgets.tsx
// Side sidebar: Featured Profile Card + Recent Activities Feed + Promo Card
// ============================================================================
interface SideWidgetsProps {
  onSelectStudent: (student: Student) => void;
  featuredStudent: Student;
}

const SideWidgets: React.FC<SideWidgetsProps> = ({ onSelectStudent, featuredStudent }) => {
  return (
    <div className="space-y-6">
      
      {/* Featured Student Profile Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Featured Profile</span>
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Active</span>
        </div>

        <div className="flex items-center space-x-3">
          <img 
            src={featuredStudent.photo} 
            alt={featuredStudent.name} 
            className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/30"
          />
          <div>
            <h3 className="text-sm font-bold text-slate-900">{featuredStudent.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{featuredStudent.admissionNo} | {featuredStudent.class} - {featuredStudent.section}</p>
            <p className="text-xs text-slate-400">Roll No: {featuredStudent.rollNo}</p>
          </div>
        </div>

        <button 
          onClick={() => onSelectStudent(featuredStudent)}
          className="w-full mt-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-2 rounded-xl transition text-center border border-blue-200/50"
        >
          View Full Profile
        </button>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Activities</h4>
          <button className="text-xs text-blue-600 hover:underline font-medium">View All</button>
        </div>

        <div className="space-y-3">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="flex items-start space-x-3 text-xs">
              <div className={`p-2 rounded-xl shrink-0 ${act.color}`}>
                <act.icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 leading-tight truncate">{act.title}</p>
                <p className="text-[11px] text-slate-500 truncate">{act.desc}</p>
                <span className="text-[9px] text-slate-400">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart School Promo Graphic Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-bold text-sm">Smart Education<br />Better Future</h4>
          <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">Together we build a brighter tomorrow for every student.</p>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20 pointer-events-none">
          <School className="w-32 h-32" />
        </div>
      </div>

    </div>
  );
};

// ============================================================================
// COMPONENT 7: Code Explorer Tab for viewing modular Next.js TSX files
// ============================================================================
const MODULAR_FILES = [
  { name: 'Navbar.tsx', path: 'components/Navbar.tsx', code: `// Next.js + Tailwind CSS TypeScript Navbar Component
import React from 'react';
import { Search, Bell, MessageSquare, Menu, ChevronDown, GraduationCap } from 'lucide-react';

export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="bg-[#0b192c] text-white h-16 px-4 flex items-center justify-between shadow-md">
      {/* Brand Logo & Side-by-Side Menu Button */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-base">DevNix<span className="text-blue-400">Edu</span></span>
        </div>
        {/* Menu toggle button right beside logo */}
        <button onClick={onToggleSidebar} className="p-1.5 ml-2 rounded-lg bg-slate-800 text-slate-300">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}` },
  { name: 'Sidebar.tsx', path: 'components/Sidebar.tsx', code: `// Next.js Sidebar Navigation Menu Component
import React, { useState } from 'react';
import { School, Users, ChevronDown, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className={\`\${isOpen ? 'w-64' : 'w-16'} bg-[#0f213d] text-slate-300 transition-all\`}>
      <div className="p-3">Campus Switcher</div>
      <nav className="p-2 space-y-1">
        <a href="#" className="flex items-center space-x-3 p-2 bg-blue-600/20 text-white rounded-lg">
          <Users className="w-4 h-4" />
          <span>Students</span>
        </a>
      </nav>
    </aside>
  );
}` },
  { name: 'StudentsTable.tsx', path: 'components/StudentsTable.tsx', code: `// Next.js Filterable Student Records Data Table Component
import React, { useState } from 'react';
import { Search, Filter, Eye, Edit } from 'lucide-react';

export default function StudentsTable({ students }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-xs">
            <th>Photo</th><th>Name</th><th>Admission No</th><th>Class</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} className="border-t">
              <td>{s.name}</td><td>{s.admissionNo}</td><td>{s.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}` }
];

const CodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(MODULAR_FILES[0]);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0f172a] text-slate-200 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row h-[650px]">
      
      {/* File Explorer Tree */}
      <div className="w-full md:w-64 bg-[#020617] p-4 border-b md:border-b-0 md:border-r border-slate-800 shrink-0">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
          <Folder className="w-4 h-4 text-blue-400" />
          <span>Next.js Architecture</span>
        </div>

        <div className="space-y-1 text-xs">
          {MODULAR_FILES.map(f => (
            <button
              key={f.name}
              onClick={() => setSelectedFile(f)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-mono text-left transition ${
                selectedFile.name === f.name ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <FileCode className="w-4 h-4 shrink-0" />
              <span className="truncate">{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="flex-1 flex flex-col bg-[#0b1329] overflow-hidden">
        <div className="p-3 bg-[#020617] border-b border-slate-800 flex items-center justify-between px-4">
          <span className="text-xs font-mono text-blue-400">{selectedFile.path}</span>
          <button 
            onClick={copyCode}
            className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg text-slate-300 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <pre className="p-4 text-xs font-mono text-blue-300 overflow-auto flex-1 leading-relaxed">
          {selectedFile.code}
        </pre>
      </div>

    </div>
  );
};

// ============================================================================
// ROOT APPLICATION COMPONENT
// Combines modular components into the full Next.js UI
// ============================================================================
export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('All Students');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  // New Student State
  const [newStudent, setNewStudent] = useState({
    name: '', class: 'Class 6', section: 'A', rollNo: '', fatherName: '', contact: ''
  });

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.rollNo) return;

    const created: Student = {
      id: Date.now(),
      name: newStudent.name,
      admissionNo: `ADM-2025-${Math.floor(100 + Math.random() * 900)}`,
      class: newStudent.class,
      section: newStudent.section,
      rollNo: newStudent.rollNo,
      fatherName: newStudent.fatherName || 'Parent / Guardian',
      contact: newStudent.contact || '0300 0000000',
      status: 'Active',
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };

    setStudents([created, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({ name: '', class: 'Class 6', section: 'A', rollNo: '', fatherName: '', contact: '' });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans flex flex-col antialiased">
      
      {/* 1. Header Navigation Component */}
      <Navbar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. Sidebar Navigation Component */}
        <Sidebar 
          isOpen={sidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* 3. Main Dashboard Workspace */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          
          {/* Top Page Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
                <span>Home</span>
                <span>/</span>
                <span>Students</span>
                <span>/</span>
                <span className="text-blue-600 font-semibold">{activeTab}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Students Management</h1>
              <p className="text-xs text-slate-500">Manage your students, view profiles, track progress and more.</p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Student</span>
            </button>
          </div>

          {/* Toggle View Mode: Live Preview OR Code Explorer */}
          {viewMode === 'code' ? (
            <CodeViewer />
          ) : (
            <>
              {/* 4. Key Metrics Overview Component */}
              <StatsOverview />

              {/* 5. Main Middle Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <ChartsSection onOpenAddStudent={() => setIsAddModalOpen(true)} />
                </div>
                <div className="lg:col-span-4">
                  <SideWidgets 
                    onSelectStudent={setSelectedStudentProfile}
                    featuredStudent={students[0]}
                  />
                </div>
              </div>

              {/* 6. Filterable Students Table Component */}
              <StudentsTable 
                students={students}
                onSelectStudent={setSelectedStudentProfile}
              />
            </>
          )}

        </main>
      </div>

      {/* Add Student Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <span>Add New Student</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="e.g. Abdullah Khan"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select 
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    {['Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <select 
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Roll No. *</label>
                  <input 
                    type="text" 
                    required
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
                    placeholder="e.g. 24"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Father Name</label>
                  <input 
                    type="text" 
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({...newStudent, fatherName: e.target.value})}
                    placeholder="e.g. Imran Khan"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 border-t pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Profile Dialog */}
      {selectedStudentProfile && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-end">
              <button onClick={() => setSelectedStudentProfile(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <div className="text-center -mt-2">
              <img 
                src={selectedStudentProfile.photo} 
                alt={selectedStudentProfile.name} 
                className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-blue-500/20 shadow-md"
              />
              <h3 className="text-base font-bold text-slate-900 mt-2">{selectedStudentProfile.name}</h3>
              <p className="text-xs text-blue-600 font-semibold">{selectedStudentProfile.admissionNo}</p>
            </div>

            <div className="mt-4 bg-slate-50 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-slate-500">Class & Section:</span>
                <span className="font-bold text-slate-800">{selectedStudentProfile.class} - {selectedStudentProfile.section}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-slate-500">Roll Number:</span>
                <span className="font-bold text-slate-800">{selectedStudentProfile.rollNo}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-slate-500">Father Name:</span>
                <span className="font-bold text-slate-800">{selectedStudentProfile.fatherName}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-slate-500">Contact:</span>
                <span className="font-bold text-slate-800">{selectedStudentProfile.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">{selectedStudentProfile.status}</span>
              </div>
            </div>

            <div className="mt-5 flex space-x-2">
              <button 
                onClick={() => setSelectedStudentProfile(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}