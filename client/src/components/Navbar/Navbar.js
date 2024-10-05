import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";
import {
  AppBar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ConstructionIcon from "@mui/icons-material/Construction";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DrawerComponent from "../DrawerComponent";
import { useNavigate } from "react-router-dom";

const PAGES = ["Pocetna", "Delatnosti", "Majstori", "onama", "Blog"];
const Navbar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user, role, token } = useContext(authContext);

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "#1A1C20",
        }}
      >
        <Toolbar>
          <ConstructionIcon></ConstructionIcon>
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
                    backgroundColor: "#F0A500", // Postavlja indikator boju
                  },
                }}
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                //indicatorColor="secondary"
              >
                {PAGES.map((page, index) => (
                  <Tab
                    key={index}
                    label={page}
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                  />
                ))}
              </Tabs>
              <Tabs sx={{ marginLeft: "auto", alignItems: "center" }}>
                {token && user ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Link
                      to={
                        role === "korisnik"
                          ? "/delatnosti"
                          : "/majstor"
                      }
                    >
                      <figure
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={user?.slika}
                          style={{ width: "100%", borderRadius: "50%" }}
                          alt="User Profile"
                        />
                      </figure>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
