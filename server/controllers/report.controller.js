import { getDashboardStats } from "../services/report.service.js";

export const getAnalytics = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error("Report Generation Error:", error);
    res.status(500).json({ message: "Error generating analytics report" });
  }
};
