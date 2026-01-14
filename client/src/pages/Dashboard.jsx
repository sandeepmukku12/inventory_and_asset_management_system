import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import api from "../api/axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/reports/dashboard-stats");
        setStats(data);
      } catch (err) {
        toast.error("Failed to load dashboard data");
        console.error("Dashboard error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  const COLORS = [
    "#1976d2",
    "#2e7d32",
    "#ed6c02",
    "#d32f2f",
    "#9c27b0",
    "#0288d1",
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Inventory Analytics
      </Typography>

      {/* Metrics Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            label: "Total Products",
            value: stats.totalProducts,
            color: "#1976d2",
          },
          { label: "Low Stock", value: stats.lowStockItems, color: "#ed6c02" },
          {
            label: "Out of Stock",
            value: stats.outOfStockItems,
            color: "#d32f2f",
          },
          {
            label: "Total Inventory Value",
            value: `₹${stats.totalValue}`,
            color: "#2e7d32",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                textAlign: "center",
                borderBottom: `4px solid ${item.color}`,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ textTransform: "uppercase", mb: 1 }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: item.color }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Chart 1: Category Distribution (Pie) */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 450, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Stock Distribution by Category
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={stats.categoryStats}
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {stats.categoryStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Chart 2: Products per Supplier (Bar) */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{ p: 5, height: 450, borderRadius: 2, minWidth: 400 }}
            elevation={2}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Products per Supplier
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={stats.supplierStats}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: "#f5f5f5" }} />
                <Bar dataKey="products" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
