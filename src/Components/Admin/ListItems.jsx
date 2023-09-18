import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import GroupIcon from "@mui/icons-material/Group";

function ListItems() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Opciones" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/AdminMenu")}>
            <ListItemIcon>
              <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary="Menues y Combos" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/AdminPedidos")}
          >
            <ListItemIcon>
              <DeliveryDiningIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/AdminUsers")}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default ListItems;
