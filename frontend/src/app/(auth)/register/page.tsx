'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  GraduationCap,
  Users,
  Search,
  Bell,
  User,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  cnic: string;
  selectedClass: string;
  section: string;
  rollNo: string;
  qualification: string;
  specialization: string;
  fatherName: string;
  guardianPhone: string;
  address: string;
}

export default function Page() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '',
    cnic: '',
    selectedClass: 'Class 6',
    section: 'A',
    rollNo: '',
    qualification: '',
    specialization: '',
    fatherName: '',
    guardianPhone: '',
    address: ''
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitToBackend = async () => {
    setLoading(true);
    setErrorMsg(null);

    const payload = {
      role,
      ...formData
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Registration failed');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async (e: FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      await submitToBackend();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setErrorMsg(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male',
      dob: '',
      cnic: '',
      selectedClass: 'Class 6',
      section: 'A',
      rollNo: '',
      qualification: '',
      specialization: '',
      fatherName: '',
      guardianPhone: '',
      address: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans flex flex-col text-slate-800">
      {/* Top Navbar */}
      <header className="h-16 bg-[#0f172a] text-white flex items-center justify-between px-6 sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center font-extrabold text-xl shadow-lg shadow-blue-500/30">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none tracking-wide text-white">
              DevNix<span className="text-blue-400">Edu</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Smart School Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative w-72 hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search registration records..."
              className="w-full bg-slate-800/80 text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3 border-l border-slate-700/80 pl-6">
            <button className="relative p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 ml-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                AK
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-slate-200">Ahmed Khan</div>
                <div className="text-[10px] text-slate-400">Principal / Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0d1527] text-slate-300 flex flex-col justify-between hidden md:flex border-r border-slate-800">
          <div className="p-4 space-y-6">
            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center space-x-3">
              <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Bright Future School</div>
                <div className="text-[10px] text-slate-400">Main Campus - Academic Year 2026-27</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">Main Menu</div>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition">
                <Users className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30">
                <User className="w-4 h-4" />
                <span>New Registration</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition">
                <BookOpen className="w-4 h-4" />
                <span>All Students</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition">
                <Briefcase className="w-4 h-4" />
                <span>Teachers & Staff</span>
              </a>
            </div>
          </div>

          <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500">
            DevNixEdu v2.4 • Admin Portal
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">User Registration</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Add new students or teaching staff members to the school management system.
                </p>
              </div>

              {/* Role Toggle */}
              <div className="bg-slate-100 p-1.5 rounded-xl flex items-center border border-slate-200">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center space-x-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    role === 'student'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Admission</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`flex items-center space-x-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    role === 'teacher'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Teacher Onboarding</span>
                </button>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center space-x-3 text-xs">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step Indicators */}
            {!isSubmitted && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 flex justify-between items-center px-8">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    1
                  </div>
                  <span className={`text-xs font-semibold ${currentStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Personal Info</span>
                </div>
                <div className="h-0.5 flex-1 bg-slate-200 mx-4"></div>

                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    2
                  </div>
                  <span className={`text-xs font-semibold ${currentStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                    {role === 'student' ? 'Academic Details' : 'Professional Info'}
                  </span>
                </div>
                <div className="h-0.5 flex-1 bg-slate-200 mx-4"></div>

                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    3
                  </div>
                  <span className={`text-xs font-semibold ${currentStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Address & Contact</span>
                </div>
              </div>
            )}

            {/* Success State */}
            {isSubmitted ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {role === 'student' ? 'Student Registered Successfully!' : 'Teacher Onboarded Successfully!'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  The new record for <span className="font-semibold text-slate-800">{formData.firstName} {formData.lastName}</span> has been saved into the database via <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">/api/auth/register</code>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition"
                  >
                    Register Another Record
                  </button>
                </div>
              </div>
            ) : (
              /* Form Container */
              <form onSubmit={handleNextStep} className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
                
                {/* Step 1 */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Step 1: Personal Information</h3>
                      <p className="text-xs text-slate-400">Enter full legal name and primary details</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. Muhammad"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Ali"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@school.edu.pk"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / Mobile No *</label>
                        <input
                          type="text"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0300-1234567"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Step 2: {role === 'student' ? 'Academic Allocation' : 'Teaching Credentials'}
                      </h3>
                      <p className="text-xs text-slate-400">Specify classroom, subjects and identification details</p>
                    </div>

                    {role === 'student' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Class</label>
                          <select
                            name="selectedClass"
                            value={formData.selectedClass}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          >
                            <option value="Class 5">Class 5</option>
                            <option value="Class 6">Class 6</option>
                            <option value="Class 7">Class 7</option>
                            <option value="Class 8">Class 8</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 10">Class 10</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                          <select
                            name="section"
                            value={formData.section}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          >
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
                          <input
                            type="text"
                            name="rollNo"
                            placeholder="e.g. 24"
                            value={formData.rollNo}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">B-Form / CNIC Number</label>
                          <input
                            type="text"
                            name="cnic"
                            placeholder="42101-XXXXXXX-X"
                            value={formData.cnic}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Highest Qualification</label>
                          <input
                            type="text"
                            name="qualification"
                            placeholder="e.g. M.Sc Mathematics, B.Ed"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization / Department</label>
                          <input
                            type="text"
                            name="specialization"
                            placeholder="e.g. Science & Physics"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">CNIC / Government ID</label>
                          <input
                            type="text"
                            name="cnic"
                            placeholder="42101-XXXXXXX-X"
                            value={formData.cnic}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Step 3: Residence & Guardian Contact</h3>
                      <p className="text-xs text-slate-400">Emergency contacts and mailing details</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Father / Guardian Name *</label>
                        <input
                          type="text"
                          name="fatherName"
                          required
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          placeholder="e.g. Imran Ahmed"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Emergency Contact *</label>
                        <input
                          type="text"
                          name="guardianPhone"
                          required
                          value={formData.guardianPhone}
                          onChange={handleInputChange}
                          placeholder="0301-9876543"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="House / Flat No, Street, Block Area"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition disabled:opacity-50"
                    >
                      Back
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>{currentStep === 3 ? 'Complete Registration' : 'Next Step'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}