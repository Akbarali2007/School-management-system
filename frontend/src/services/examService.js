import api from "./api";

/**
 * NOTE: There is no /api/exams backend yet (no model/controller/routes exist
 * in src/ at the time this was written). Every method below tries the real
 * endpoint first, and silently falls back to MOCK data if it 404s / errors,
 * so the UI works today and needs zero changes once the backend lands.
 * Backend is expected to scope everything by req.user.schoolId server-side.
 */

const MOCK_EXAMS = [
  {
    _id: "exm_1",
    subject: "Mathematics",
    examType: "Midterm",
    className: "Grade 9 - A",
    date: "2026-10-12",
    startTime: "09:00",
    duration: 120,
    totalMarks: 100,
    obtainedMarks: null,
    status: "upcoming",
  },
  {
    _id: "exm_2",
    subject: "Physics",
    examType: "Midterm",
    className: "Grade 9 - A",
    date: "2026-10-14",
    startTime: "09:00",
    duration: 90,
    totalMarks: 100,
    obtainedMarks: null,
    status: "upcoming",
  },
  {
    _id: "exm_3",
    subject: "English",
    examType: "Quiz",
    className: "Grade 9 - A",
    date: "2026-09-18",
    startTime: "10:00",
    duration: 45,
    totalMarks: 50,
    obtainedMarks: 44,
    grade: "A",
    status: "result-declared",
  },
  {
    _id: "exm_4",
    subject: "Chemistry",
    examType: "Final",
    className: "Grade 9 - A",
    date: "2026-09-05",
    startTime: "09:00",
    duration: 150,
    totalMarks: 100,
    obtainedMarks: 61,
    grade: "B",
    status: "result-declared",
  },
  {
    _id: "exm_5",
    subject: "Computer Science",
    examType: "Quiz",
    className: "Grade 9 - A",
    date: "2026-08-28",
    startTime: "11:00",
    duration: 40,
    totalMarks: 50,
    obtainedMarks: 33,
    grade: "C",
    status: "result-declared",
  },
];

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export const examService = {
  list: async (params = {}) => {
    try {
      const res = await api.get("/exams", { params });
      return res.data;
    } catch (err) {
      await delay();
      return { success: true, count: MOCK_EXAMS.length, data: MOCK_EXAMS, mock: true };
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/exams/${id}`);
      return res.data;
    } catch (err) {
      await delay();
      const found = MOCK_EXAMS.find((e) => e._id === id);
      return { success: !!found, data: found || null, mock: true };
    }
  },

  create: async (payload) => {
    try {
      const res = await api.post("/exams", payload);
      return res.data;
    } catch (err) {
      await delay();
      const created = { _id: `exm_${Date.now()}`, status: "upcoming", ...payload };
      MOCK_EXAMS.unshift(created);
      return { success: true, data: created, mock: true };
    }
  },

  update: async (id, payload) => {
    try {
      const res = await api.put(`/exams/${id}`, payload);
      return res.data;
    } catch (err) {
      await delay();
      const idx = MOCK_EXAMS.findIndex((e) => e._id === id);
      if (idx > -1) MOCK_EXAMS[idx] = { ...MOCK_EXAMS[idx], ...payload };
      return { success: true, data: MOCK_EXAMS[idx], mock: true };
    }
  },

  remove: async (id) => {
    try {
      const res = await api.delete(`/exams/${id}`);
      return res.data;
    } catch (err) {
      await delay();
      const idx = MOCK_EXAMS.findIndex((e) => e._id === id);
      if (idx > -1) MOCK_EXAMS.splice(idx, 1);
      return { success: true, mock: true };
    }
  },

  publishResult: async (id, payload) => {
    try {
      const res = await api.put(`/exams/${id}/result`, payload);
      return res.data;
    } catch (err) {
      await delay();
      const idx = MOCK_EXAMS.findIndex((e) => e._id === id);
      if (idx > -1) MOCK_EXAMS[idx] = { ...MOCK_EXAMS[idx], ...payload, status: "result-declared" };
      return { success: true, data: MOCK_EXAMS[idx], mock: true };
    }
  },
};
