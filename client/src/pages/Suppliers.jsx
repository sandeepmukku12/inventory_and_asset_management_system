import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import api from "../api/axios";
import { toast } from "react-toastify";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchSuppliers = async () => {
    try {
      const { data } = await api.get("/suppliers");
      setSuppliers(data);
    } catch (err) {
      toast.error("Error loading suppliers");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/suppliers/${selectedId}`, formData);
        toast.success("Supplier Updated!");
      } else {
        await api.post("/suppliers", formData);
        toast.success("Supplier Added!");
      }
      handleClose();
      fetchSuppliers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving supplier");
    }
  };

  const handleOpenEdit = (s) => {
    setIsEdit(true);
    setSelectedId(s._id);
    setFormData({
      name: s.name,
      contactPerson: s.contactPerson || "",
      email: s.email,
      phone: s.phone || "",
      address: s.address || "",
    });
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setIsEdit(false);
    setSelectedId(null);
    setFormData({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/suppliers/${selectedId}`);
      toast.success("🧹 Supplier and all related products removed!");
      setOpenDelete(false);
      fetchSuppliers();
    } catch (err) {
      toast.error("Server error during deletion");
    }
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Suppliers Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          + Add Supplier
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Company Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Products Tracked
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((s) => (
            <TableRow key={s._id} hover>
              <TableCell sx={{ fontWeight: "500" }}>{s.name}</TableCell>
              <TableCell>{s.contactPerson || "—"}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell align="center">
                <Chip
                  label={`${s.productCount} Products`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit Supplier">
                  <IconButton color="primary" onClick={() => handleOpenEdit(s)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete (Cascade)">
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedId(s._id);
                      setOpenDelete(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ADD/EDIT MODAL */}
      <Dialog open={openForm} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEdit ? "Edit Supplier" : "New Supplier"}</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
          >
            <TextField
              label="Company Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Contact Person"
              fullWidth
              value={formData.contactPerson}
              onChange={(e) =>
                setFormData({ ...formData, contactPerson: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={2}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {isEdit ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <WarningAmberIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <DialogTitle>Permanent Deletion</DialogTitle>
          <Typography variant="body1">
            Deleting this supplier will{" "}
            <strong>permanently remove all products</strong> associated with
            them.
          </Typography>
          <DialogActions
            sx={{ mt: 3, width: "100%", justifyContent: "space-between" }}
          >
            <Button onClick={() => setOpenDelete(false)} variant="outlined">
              Keep Supplier
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Confirm Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Paper>
  );
};

export default Suppliers;
