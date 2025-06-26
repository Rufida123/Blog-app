import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useReportStore = create(
  persist(
    (set, get) => ({
      reports: [],

      addReport: (report) => {
        set((state) => ({
          reports: [
            ...state.reports,
            {
              ...report,
              id: `report-${Date.now()}`,
              status: "pending",
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },

      markAsReviewed: (reportId) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === reportId ? { ...report, status: "reviewed" } : report
          ),
        }));
      },

      deleteReport: (reportId) => {
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== reportId),
        }));
      },

      getPendingReports: () => {
        return get().reports.filter((report) => report.status === "pending");
      },
    }),
    {
      name: "report-storage",
    }
  )
);
