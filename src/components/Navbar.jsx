import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "/logo.png"; // Ensure the path is correct

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "rgb(17, 24, 39)", zIndex: 1100 }}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 64 }}>
          
          {/* Logo for Mobile, Text for Desktop */}
          <Link to="/home" className="flex items-center text-white">
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
              <img src={logo} alt="StockGorithm Logo" style={{ height: 40 }} />
            </Box>
            <h1 className="text-2xl font-bold text-indigo-500 hidden md:block">StockGorithm</h1>
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            <Link to="/home" className="hover:text-indigo-400">Home</Link>
            <Link to="/predict" className="hover:text-indigo-400">Predict</Link>
            <Link to="/news" className="hover:text-indigo-400">News</Link>
            <Link to="/insight" className="hover:text-indigo-400">Insights</Link>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250, backgroundColor: "rgb(17, 24, 39)", height: "100%", color: "white" }}>
          {["Home", "Predict", "News", "Insight"].map((text) => (
            <ListItem key={text} onClick={handleDrawerToggle} component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Add Top Padding to Prevent Overlapping Content */}
      <div className="pt-16"></div> 
    </>
  );
};

export default Navbar;
