import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Chip,
  IconButton,
  Tooltip,
  InputAdornment,
  Stack,
  Grid,
} from "@mui/material";
import {
  Delete,
  Edit,
  AddCircle,
  RemoveCircle,
  Search,
  FilterList,
  RestartAlt,
} from "@mui/icons-material";
import api from "../api/axios";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSupplier, setFilterSupplier] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modals State
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    supplier: "",
    quantity: 0,
    price: 0,
    lowStockThreshold: 10,
  });

  const loadData = async () => {
    try {
      const [p, c, s] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
        api.get("/suppliers"),
      ]);
      setProducts(p.data);
      setCategories(c.data);
      setSuppliers(s.data);
    } catch (err) {
      toast.error("Failed to load inventory data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // MULTI-CONDITION FILTER LOGIC
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || item.category?._id === filterCategory;

    const matchesSupplier =
      filterSupplier === "All" || item.supplier?._id === filterSupplier;

    const matchesStatus =
      filterStatus === "All" || item.status === filterStatus;

    return matchesSearch && matchesCategory && matchesSupplier && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterCategory("All");
    setFilterSupplier("All");
    setFilterStatus("All");
    toast.info("Filters reset");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        lowStockThreshold: Number(formData.lowStockThreshold),
      };

      if (isEdit) {
        await api.put(`/products/${selectedProduct}`, payload);
        toast.success("Product updated!");
      } else {
        await api.post("/products", payload);
        toast.success("Product created!");
      }

      handleClose();
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving product");
    }
  };

  const adjustStock = async (id, currentQty, amount) => {
    try {
      const newQty = currentQty + amount;
      if (newQty < 0) return toast.warning("Stock cannot be negative");

      await api.put(`/products/${id}`, { quantity: newQty });
      loadData();
    } catch (err) {
      toast.error("Stock update failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product permanently?")) {
      try {
        await api.delete(`/products/${id}`);
        toast.success("Product removed");
        loadData();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleOpenEdit = (product) => {
    setIsEdit(true);
    setSelectedProduct(product._id);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category?._id || "",
      supplier: product.supplier?._id || "",
      quantity: product.quantity,
      price: product.price,
      lowStockThreshold: product.lowStockThreshold || 10,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedProduct(null);
    setFormData({
      name: "",
      sku: "",
      category: "",
      supplier: "",
      quantity: 0,
      price: 0,
      lowStockThreshold: 10,
    });
  };

  const getStatusColor = (status) => {
    if (status === "In Stock") return "success";
    if (status === "Low Stock") return "warning";
    return "error";
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Inventory Management
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddCircle />}
        >
          New Product
        </Button>
      </Box>

      {/* MULTI-FILTER BAR */}
      <Paper sx={{ p: 2, mb: 3 }} elevation={2} variant="outlined">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3.5}>
            <TextField
              placeholder="Search by Name or SKU..."
              size="small"
              fullWidth
              sx={{
                minWidth: 250,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2.2}>
            <TextField
              select
              size="small"
              label="Category"
              fullWidth
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4} md={2.2}>
            <TextField
              select
              size="small"
              label="Supplier"
              fullWidth
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
            >
              <MenuItem value="All">All Suppliers</MenuItem>
              {suppliers.map((sup) => (
                <MenuItem key={sup._id} value={sup._id}>
                  {sup.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4} md={2.2}>
            <TextField
              select
              size="small"
              label="Stock Status"
              fullWidth
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Low Stock">Low Stock</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={1.9}>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              startIcon={<RestartAlt />}
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Table component={Paper} elevation={3}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f8f9fa" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Product Info</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Supplier</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Stock Adjustment
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((row) => (
            <TableRow key={row._id} hover>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  {row.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {row.sku}
                </Typography>
              </TableCell>
              <TableCell>{row.category?.name || "N/A"}</TableCell>
              <TableCell>{row.supplier?.name || "N/A"}</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => adjustStock(row._id, row.quantity, -1)}
                  >
                    <RemoveCircle fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ width: "25px", textAlign: "center" }}
                  >
                    {row.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => adjustStock(row._id, row.quantity, 1)}
                  >
                    <AddCircle fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>₹{row.price?.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={row.status}
                  color={getStatusColor(row.status)}
                  size="small"
                  sx={{ fontWeight: "bold", minWidth: "90px" }}
                />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEdit(row)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row._id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
          {filteredProducts.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                <Typography color="textSecondary">
                  No products found matching filters.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* FORM DIALOG FOR ADD/EDIT */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {isEdit ? "Update Product Details" : "Add New Inventory Item"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}
          >
            <TextField
              label="Product Name"
              required
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="SKU (Stock Keeping Unit)"
              required
              fullWidth
              value={formData.sku}
              disabled={isEdit}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />

            <TextField
              select
              label="Category"
              required
              fullWidth
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Supplier"
              required
              fullWidth
              value={formData.supplier}
              onChange={(e) =>
                setFormData({ ...formData, supplier: e.target.value })
              }
            >
              {suppliers.map((sup) => (
                <MenuItem key={sup._id} value={sup._id}>
                  {sup.name}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Initial Quantity"
                type="number"
                fullWidth
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
              <TextField
                label="Unit Price (₹)"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </Box>

            <TextField
              label="Low Stock Threshold"
              type="number"
              fullWidth
              helperText="Status will change to 'Low Stock' when quantity hits this number"
              value={formData.lowStockThreshold}
              onChange={(e) =>
                setFormData({ ...formData, lowStockThreshold: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ px: 4 }}>
              {isEdit ? "Update Product" : "Save Product"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Products;
