import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "../api/axios";
import { toast } from "react-toastify";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  const loadSuppliers = async () => {
    try {
      const { data } = await axios.get("/suppliers");
      setSuppliers(data);
    } catch (err) {
      toast.error("Could not load suppliers");
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const deleteItem = async (id) => {
    if (
      window.confirm(
        "Delete this supplier? This will remove all their products too!"
      )
    ) {
      try {
        await axios.delete(`/suppliers/${id}`);
        toast.success("Supplier removed");
        loadSuppliers();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Supplier Directory
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell>Company Name</TableCell>
            <TableCell>Contact Person</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((s) => (
            <TableRow key={s._id}>
              <TableCell sx={{ fontWeight: "bold" }}>{s.name}</TableCell>
              <TableCell>{s.contactPerson}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell align="right">
                <Button
                  color="error"
                  size="small"
                  onClick={() => deleteItem(s._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Suppliers;
