import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
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
                sx={{ marginLeft: "auto",
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#F0A500', // Postavlja indikator boju 
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
              <Tabs sx={{ marginLeft: "auto", alignItems:"center"}}>
              <Button sx={{ marginLeft: "auto", color:"inherit" }}  variant="text" onClick={() => { navigate("/login") }}>
                Prijavi se
              </Button>
              <Button sx={{ marginLeft: "auto", color:"inherit" }}  variant="text" onClick={() => { navigate("/signin") }}>
                Registruj se
              </Button>
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
