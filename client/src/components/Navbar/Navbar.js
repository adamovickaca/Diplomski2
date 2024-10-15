import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../../context/authContext";
import {
  AppBar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ConstructionIcon from "@mui/icons-material/Construction";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DrawerComponent from "../DrawerComponent";
import { useNavigate } from "react-router-dom";

const PAGES = ["Pocetna", "Delatnosti", "Majstori", "onama", "Blog"];

const pages = [
  { val: "Pocetna", link: "/pocetna" },
  { val: "Delatnost", link: "delatnosti" },
  { val: "O nama", link: "/onama" },
  { val: "Majstori", link: "/majstori" },
  { val: "Blog", link: "/blog" },
];

const Navbar = () => {
  const [value, setValue] = useState(undefined);
  const { pathname } = useLocation(); // Uvezi useLocation
  const [anchorEl, setAnchorEl] = useState(null);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user, role, token } = useContext(authContext);

  useEffect(() => {
    // Postavi value na undefined kada si na profilu
    if (pathname.includes("profil") || pathname.includes("zahtevi")) {
      setValue(undefined);
    } else {
      // Na osnovu pathname-a postavi value
      const pageIndex = pages.findIndex(page => pathname.includes(page.link));
      setValue(pageIndex !== -1 ? pageIndex : undefined);
    }
  }, [pathname]);


  useEffect(() => {
    if (user && user._id) {
      const newSocket = new WebSocket(`ws://localhost:8080/${user._id}`);

      newSocket.onopen = () => {
        console.log("WebSocket connection established");
      };

      newSocket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === "request" || data.type === "response") {
          setNotifications((prev) => [...prev, data.data.details]);
        }
      };

      newSocket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setSocket(newSocket);

      // Čisti socket kada se komponenta unmountuje ili korisnik odjavi
      return () => newSocket.close();
    }
  }, [user]); // Ovaj useEffect će se pokrenuti svaki put kada se promeni 'user'

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "#1A1C20",
        }}
      >
        <Toolbar>
          <ConstructionIcon />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem", paddingLeft: "3%" }}>
                Nadji majstora
              </Typography>
              <DrawerComponent />
            </>
          ) : (
            <>
              <Tabs
                sx={{
                  marginLeft: "auto",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#F0A500",
                  },
                }}
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {pages.map((page, index) => (
                  <Tab
                    key={page.val}
                    label={page.val}
                    to={page.link}
                    component={Link}
                    onClick={() => setValue(index)}
                  />
                ))}
              </Tabs>
              <Tabs sx={{ marginLeft: "auto", alignItems: "center" }}>
                {token && user ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* Prikaz "Zahtevi" samo za majstore */}
                    {role === "majstor" && (
                      <Link to="majstor/zahtevi">
                        <Button>Zahtevi</Button>
                      </Link>
                    )}
                    <Link
                      to={
                        role === "korisnik"
                          ? "korisnik/profil"
                          : role === "admin"
                          ? "/admin"
                          : `/majstor/${user._id}`
                      }
                    >
                      <Button>Profil</Button>
                    </Link>
                  </Box>
                ) : (
                  <>
                    <Button
                      sx={{ marginLeft: "auto", color: "inherit" }}
                      variant="text"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Prijavi se
                    </Button>
                    <Button
                      sx={{ marginLeft: "auto", color: "inherit" }}
                      variant="text"
                      onClick={() => {
                        navigate("/signin");
                      }}
                    >
                      Registruj se
                    </Button>
                  </>
                )}
              </Tabs>
              {/* Notifications Icon */}
              {token && user &&  (
                <IconButton color="inherit" onClick={handleClick}>
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {notifications.length === 0 ? (
                  <MenuItem disabled>Nema obaveštenja</MenuItem>
                ) : (
                  notifications.map((notification, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                      {notification}
                    </MenuItem>
                  ))
                )}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
