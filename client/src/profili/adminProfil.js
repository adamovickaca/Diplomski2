import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HandymanIcon from "@mui/icons-material/Handyman";
import VerifikujMajstora from "./admin/VerifikujMajstora.js";
import Blogovi from "./admin/Blogovi.js";
import { authContext } from "../context/authContext.js";
import { Button } from "@mui/material";

const drawerWidth = 350;
const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 100, // Postavi margin levo da bi se sadržaj pomerio udesno
  marginTop: 50,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function AdminPage() {
  const { dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();
  // const user = useSelector((state) => state.auth.userData);

  const { id } = useParams();

  const [page, setPage] = useState(0);

  useEffect(() => {
    //getChats();
  }, []);

  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: 8,
            height: "30vh",
          },
        }}
        variant="permanent" // Trajni meni
        anchor="left"
      >
        <List>
          <Divider />
          <Box sx={{ p: 1 }}>
            <ListItemButton
              onClick={() => {
                setPage(0);
              }}
              selected={page === 0}
              sx={{ borderRadius: 15 }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "#1A1C20",
                }}
              >
                <VerifiedIcon />
                Verifikuj majstore
              </Typography>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton
              onClick={() => {
                setPage(1);
              }}
              selected={page === 1}
              sx={{ borderRadius: 15 }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "#1A1C20",
                }}
              >
                <NewspaperIcon />
                Blogovi
              </Typography>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton
              onClick={() => {
                setPage(2);
              }}
              selected={page === 2}
              sx={{ borderRadius: 15 }}
            >
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  backgroundColor: "#F0A500",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#CF7500",
                  },
                  mt: 2,
                  mr: 2,
                }}
              >
                Odjavi se
              </Button>
            </ListItemButton>
          </Box>
        </List>
      </Drawer>
      <Main open={open} sx={{ pt: 7 }}>
        {page === 0 ? <VerifikujMajstora /> : page === 1 ? <Blogovi /> : <></>}
      </Main>
    </Box>
  );
}
