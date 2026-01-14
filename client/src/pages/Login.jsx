import { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  CircularProgress,
  InputAdornment,
  IconButton,
  Icon,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, FlashOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/axios.js";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Helper for demo access to auto-fill credentials
  const fillDemo = (role) => {
    if (role === "admin") {
      setFormData({ email: "admin@demo.com", password: "admin123" });
    } else {
      setFormData({ email: "staff@demo.com", password: "staff123" });
    }
    toast.info(
      `${role.charAt(0).toUpperCase() + role.slice(1)} demo credentials loaded!`
    );
  };

  const handleForgotPassword = () => {
    toast.info(
      "Please contact your System Administrator to reset your password.",
      {
        position: "top-center",
        autoClose: 6000,
      }
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#f4f6f8",
        minWidth: "1024px",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Logo / Icon Header */}
          <Box
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Icon
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundImage: "url(/logo.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            StockSync
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Inventory Management System
          </Typography>

          {/* QUICK ACCESS FOR DEMO */}
          <Box
            sx={{
              width: "100%",
              bgcolor: "#e3f2fd",
              p: 2,
              borderRadius: 2,
              mb: 3,
              border: "1px dashed #1976d2",
            }}
          >
            <Typography
              variant="caption"
              fontWeight="bold"
              color="primary"
              display="block"
              gutterBottom
              align="center"
            >
              DEMO QUICK LOGIN
            </Typography>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<FlashOn />}
                onClick={() => fillDemo("admin")}
                sx={{ textTransform: "none" }}
              >
                Admin
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<FlashOn />}
                onClick={() => fillDemo("staff")}
                sx={{ textTransform: "none" }}
              >
                Staff
              </Button>
            </Box>
          </Box>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Typography
                variant="caption"
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: "block" }}
            >
              Restricted Access Area
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Public registration is disabled.
            </Typography>
          </Box>
        </Paper>

        <Typography
          variant="caption"
          align="center"
          display="block"
          sx={{ mt: 4, color: "grey.500" }}
        >
          &copy; {new Date().getFullYear()} StockSync. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
