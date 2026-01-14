import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import { Lock, Person, Email, AdminPanelSettings } from "@mui/icons-material";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      await api.put("/auth/update-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>

      <Grid container spacing={4}>
        {/* ACCOUNT INFO SECTION */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{ p: 4, textAlign: "center", height: "100%", borderRadius: 2 }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "2rem",
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
            <Chip
              icon={<AdminPanelSettings />}
              label={user.role}
              color={user.role === "Admin" ? "secondary" : "default"}
              sx={{ mt: 1, mb: 3 }}
            />

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2} textAlign="left">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Email color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Email Address
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Person color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Account Name
                  </Typography>
                  <Typography variant="body1">{user.name}</Typography>
                </Box>
              </Box>
            </Stack>

            <Typography
              variant="caption"
              display="block"
              sx={{ mt: 4, color: "text.secondary", fontStyle: "italic" }}
            >
              Contact Admin to update name or email.
            </Typography>
          </Paper>
        </Grid>

        {/* SECURITY SECTION */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Lock color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Account Security
              </Typography>
            </Box>

            <form onSubmit={handlePasswordChange}>
              <Stack spacing={3}>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  required
                  value={passwords.currentPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      currentPassword: e.target.value,
                    })
                  }
                />
                <Divider />
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  required
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ py: 1.5, fontWeight: "bold" }}
                >
                  Update Password
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
