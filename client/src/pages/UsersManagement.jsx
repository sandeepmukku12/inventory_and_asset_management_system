import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, PersonAdd } from "@mui/icons-material";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Staff",
  });

  const { user } = useContext(AuthContext);
  const currentUser = user;

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      toast.success("New staff account created!");
      setOpen(false);
      setFormData({ name: "", email: "", password: "", role: "Staff" });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating user");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await api.put(`/users/${id}/role`, { role: newRole });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser.id)
      return toast.error("You cannot delete yourself!");
    if (window.confirm("Are you sure? This user will lose all access.")) {
      try {
        await api.delete(`/users/${id}`);
        toast.success("User removed");
        fetchUsers();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            User Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage system access and staff roles
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setOpen(true)}
        >
          Add New Staff
        </Button>
      </Box>

      <Table component={Paper} elevation={3}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Joined</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} hover>
              <TableCell fontWeight="bold">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <TextField
                  select
                  size="small"
                  value={user.role}
                  disabled={user._id === currentUser.id}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <MenuItem value="Staff">Staff</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => handleDelete(user._id)}
                  disabled={user._id === currentUser.id}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* CREATE USER DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <form onSubmit={handleCreateUser}>
          <DialogTitle>Create Staff Account</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
          >
            <TextField
              label="Full Name"
              required
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Email Address"
              type="email"
              required
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              label="Initial Password"
              type="password"
              required
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <TextField
              select
              label="Assign Role"
              value={formData.role}
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create User
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default UsersManagement;
