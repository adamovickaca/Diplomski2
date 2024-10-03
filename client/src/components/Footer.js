import React from "react";
import { Grid, Link, Container, Typography, Box } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ConstructionIcon from "@mui/icons-material/Construction";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {"© "}
      <Link color="inherit" href="/pocetna">
        NađiMajstora
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      id="kontakt"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="flex-start" mb={2}>
            <Grid item xs={12} sm={4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Box>
                  <ConstructionIcon sx={{ mr: 1 }} />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/pocetna"
                    sx={{
                      mr: 2,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".2rem",
                      color: "inherit",
                    }}
                  >
                    NađiMajstora
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: 1 }}>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener"
                    sx={{ color: "#E1306C", marginRight: 2 }}
                  >
                    <InstagramIcon />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener"
                    sx={{ color: "#1DA1F2", marginRight: 2 }}
                  >
                    <TwitterIcon />
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener"
                    sx={{ color: "#1877F2", marginRight: 2 }}
                  >
                    <FacebookIcon />
                  </Link>
                  <Link
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener"
                    sx={{ color: "#FF0000" }}
                  >
                    <YouTubeIcon />
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box border borderBottom={1}>
                Kontaktirajte nas:
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <EmailOutlinedIcon />
                <Typography
                  sx={{ marginLeft: "2%" }}
                  variant="caption"
                  color="text.secondary"
                >
                  nadjimajstora@gmail.com
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <PhoneOutlinedIcon />
                <Typography
                  sx={{ marginLeft: "2%" }}
                  variant="caption"
                  color="text.secondary"
                >
                  +381 64 2372043
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box border borderBottom={1}>
                Mapa sajta:
              </Box>
              <Box sx={{ marginTop: "2%" }}>
                <Link
                  href="/pocetna"
                  sx={{
                    color: "#F0A500",
                    textDecoration: "none",
                    "&:hover": { color: "#CF7500" },
                  }}
                >
                  Pocetna
                </Link>
              </Box>
              <Box>
                <Link
                  href="/delatnosti"
                  sx={{
                    color: "#F0A500",
                    textDecoration: "none",
                    "&:hover": { color: "#CF7500" },
                  }}
                >
                  Delatnosti
                </Link>
              </Box>
              <Box>
                <Link
                  href="/majstori"
                  sx={{
                    color: "#F0A500",
                    textDecoration: "none",
                    "&:hover": { color: "#CF7500" },
                  }}
                >
                  Majstori
                </Link>
              </Box>
              <Box>
                <Link
                  href="/onama"
                  sx={{
                    color: "#F0A500",
                    textDecoration: "none",
                    "&:hover": { color: "#CF7500" },
                  }}
                >
                  O nama
                </Link>
              </Box>
              <Box>
                <Link
                  href="/blog"
                  sx={{
                    color: "#F0A500",
                    textDecoration: "none",
                    "&:hover": { color: "#CF7500" },
                  }}
                >
                  Blog
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Copyright />
    </Box>
  );
}

export default Footer;
