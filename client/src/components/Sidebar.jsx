import { useContext } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  Icon,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  Category,
  Business,
  Person,
  Logout,
  People,
} from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const drawerWidth = 240;

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Products", icon: <Inventory />, path: "/products" },
    { text: "Categories", icon: <Category />, path: "/categories" },
    { text: "Suppliers", icon: <Business />, path: "/suppliers" },
    ...(user.role === "Admin"
      ? [
          {
            text: "Users Management",
            icon: <People />,
            path: "/usersManagement",
          },
        ]
      : []),
    { text: "Profile", icon: <Person />, path: "/profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Icon
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundImage: "url(/logo.jpg)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "primary.main", p: 2 }}
          >
            StockSync <span style={{ fontWeight: 300 }}>Pro</span>
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto", p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#f4f6f8", minHeight: "100vh" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidebar;
