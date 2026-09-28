"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  LogOut,
  ChevronLeft, 
  ChevronRight, 
  User,
  Loader2,
  NotebookPenIcon,
  BoomBoxIcon,
  CheckCircle2,
  NotebookDotIcon,
  NotebookTabsIcon,
  CalendarDays
} from 'lucide-react';
import api from "@/src/services/api";
import GraduationCapIcon from '@/public/GraduationCapIcon';

interface UserProfile {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
}

const NAV_ITEMS = [
  { name: 'Overview', href: '/student', icon: LayoutDashboard },
  { name: 'My-Attendance', href: '/student/my-attendance', icon: NotebookPenIcon},
  { name: 'My-Result', href: '/student/my-result', icon: BoomBoxIcon},
  { name: 'Schedule', href: '/student/exams', icon: CalendarDays}
];

export default function StudentSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Profile State & Fetch Status
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // GET: Fetch User Profile from /api/auth/me
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        // Backend response format handling (res.data.data ya res.data)
        setUser(res.data?.data || res.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <aside 
      className={`bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 relative ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Toggle Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-indigo-600 hover:bg-indigo-700 text-white p-1 rounded-full border-2 border-slate-900 shadow-md transition-transform"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="space-y-6">
        {/* Brand Header */}
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
            <GraduationCapIcon className="w-15 h-15"/>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-extrabold text-lg leading-tight tracking-wide text-white truncate">
                DevNix<span className="text-sky-400">Edu</span>
              </span>
              <span className="text-[9px] text-slate-400 font-medium tracking-wider uppercase truncate">
                Smart School Management System
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isCollapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Dynamic Profile & Logout */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        {/* Dynamic User Profile Card */}
        <Link 
          href="/student/profile" 
          title={isCollapsed ? `${user?.name || 'Student'} (${user?.role || ''})` : undefined}
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-all ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-sm flex-shrink-0 overflow-hidden">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            ) : user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name || 'User Avatar'} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-indigo-400" />
            )}
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              {loading ? (
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-slate-800 animate-pulse rounded"></div>
                  <div className="h-2 w-12 bg-slate-800 animate-pulse rounded"></div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-bold text-slate-100 truncate">
                    {user?.name || "Student User"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium capitalize truncate">
                    {user?.role || "Student"}
                  </span>
                </>
              )}
            </div>
          )}
        </Link>

        {/* Logout Button */}
        <button 
          title={isCollapsed ? "Logout" : undefined}
          className={`flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}