'use client'
import React, { useState, useMemo } from 'react';
import {
  Search, Users, Eye, Edit, MoreHorizontal,
  Filter, ChevronRight, ChevronLeft
} from 'lucide-react';
import { Student } from '../types/dashboard';

interface StudentsTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({ students, onSelectStudent }) => {
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