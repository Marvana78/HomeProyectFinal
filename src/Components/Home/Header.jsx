import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

function Header() {
  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          margin: 0,
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <div>
            <img src="" alt="logo" />
          </div>
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button
          sx={{ marginRight: 2 }}
          variant="contained"
          size="small"
          href="/Login"
        >
          Iniciar Sesión
        </Button>
        <Button variant="outlined" size="small">
          Registrarse
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
