import * as React from "react";
import { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  AddButton,
  ShowComboEditButton,
  ShowProdEditButton,
} from "../../Components/Buttons";
import ListItems from "../../Components/Admin/ListItems";
import ProdCard from "../../Components/Menu/ProdCard";
import AddProdModal from "../../Components/Menu/AddProdModal";
import AddComboModal from "../../Components/Menu/AddComboModal";
import ComboCard from "../../Components/Menu/ComboCard";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#f57c00",
    },
  },
});

const AdminMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [loading, setLoading] = useState(true);
  const [prodModalOpen, setProdModalOpen] = useState(false);
  const [comboModalOpen, setComboModalOpen] = useState(false);
  const [showComboEditButton, setShowComboEditButton] = useState(false);
  const [showProdEditButton, setShowProdEditButton] = useState(false);
  const [onAddProd, setOnAddProd] = useState(false);
  const [onAddCombo, setOnAddCombo] = useState(false);

  const handleProdModalOpen = () => {
    setProdModalOpen(true);
  };

  const handleProdModalClose = () => {
    setProdModalOpen(false);
  };

  const handleComboModalOpen = () => {
    setComboModalOpen(true);
  };

  const handleComboModalClose = () => {
    setComboModalOpen(false);
  };

  const handleAddProd = () => {
    setOnAddProd(!onAddProd);
  };

  const handleAddCombo = () => {
    setOnAddCombo(!onAddCombo);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ¡Bienvenido!
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider sx={{ backgroundColor: "#f57c00", borderWidth: 1.5 }} />

          <ListItems />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[300]
                : theme.palette.grey[500],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <Grid spacing={1} sx={{ width: "50%", height: 600 }}>
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <h2 className="titulo my-3">Productos Activos</h2>
                    <Grid sx={{ display: "flex" }}>
                      <AddButton
                        handleClick={handleProdModalOpen}
                        id={"openProdModal"}
                      />
                      <ShowProdEditButton
                        setShowProdEditButton={setShowProdEditButton}
                      />
                      <AddProdModal
                        open={prodModalOpen}
                        onClose={handleProdModalClose}
                        onAddProd={handleAddProd}
                      />
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{ backgroundColor: "#f57c00", borderWidth: 1.5 }}
                  />
                  <Grid
                    sx={{
                      paddingRight: 1,
                      width: "100%",
                      height: 500,
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "dark",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "lightgray",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <ProdCard
                      showProdEditButton={showProdEditButton}
                      onAddProd={handleAddProd}
                    />
                  </Grid>
                </Paper>
              </Grid>
              <Grid spacing={3} marginLeft={2} sx={{ width: "50%" }}>
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <h2 className="titulo my-3">Combos Activos</h2>
                    <Grid sx={{ display: "flex" }}>
                      <AddButton
                        handleClick={handleComboModalOpen}
                        id={"openComboModal"}
                      />
                      <ShowComboEditButton
                        setShowComboEditButton={setShowComboEditButton}
                      />
                      <AddComboModal
                        open={comboModalOpen}
                        onClose={handleComboModalClose}
                        onAddCombo={handleAddCombo}
                      />
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{ backgroundColor: "#f57c00", borderWidth: 1.5 }}
                  />
                  <Grid
                    sx={{
                      paddingRight: 1,
                      width: "100%",
                      height: 500,
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "dark",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "lightgray",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <ComboCard
                      showComboEditButton={showComboEditButton}
                      onAddCombo={handleAddCombo}
                    />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminMenu;
