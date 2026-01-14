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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
import api from "../api/axios";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Create and Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // Update existing category
        await api.put(`/categories/${selectedId}`, formData);
        toast.success("Category updated!");
      } else {
        // Create new category
        await api.post("/categories", formData);
        toast.success("Category Created!");
      }
      handleClose();
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving category");
    }
  };

  const handleOpenEdit = (cat) => {
    setIsEdit(true);
    setSelectedId(cat._id);
    setFormData({ name: cat.name, description: cat.description || "" });
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
    setIsEdit(false);
    setSelectedId(null);
    setFormData({ name: "", description: "" });
  };

  const handleDelete = async () => {
    try {
      // This triggers the pre('findOneAndDelete') hook in the backend
      await api.delete(`/categories/${selectedId}`);
      toast.success("🧹 Category and all related products deleted!");
      setOpenDelete(false);
      setSelectedId(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed on server");
    }
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Product Categories
        </Typography>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          + Add Category
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Category Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat._id} hover>
              <TableCell sx={{ fontWeight: "500" }}>{cat.name}</TableCell>
              <TableCell>
                {cat.description || "No description provided"}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit Category">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEdit(cat)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete (Cascade)">
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedId(cat._id);
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

      {/* MODAL: ADD / EDIT */}
      <Dialog open={openAdd} onClose={handleClose} fullWidth maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {isEdit ? "Update Category" : "New Category"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
          >
            <TextField
              label="Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
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

      {/* MODAL: DELETE (WARNING) */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <WarningIcon color="error" sx={{ fontSize: 50, mb: 1 }} />
          <DialogTitle sx={{ textAlign: "center" }}>
            Dangerous Action!
          </DialogTitle>
          <DialogContent>
            <Typography align="center">
              Are you sure you want to delete this category?
              <strong>
                {" "}
                All products linked to this category will be permanently
                removed.
              </strong>
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{ width: "100%", justifyContent: "center", pb: 2 }}
          >
            <Button onClick={() => setOpenDelete(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete Everything
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Paper>
  );
};

export default Categories;
