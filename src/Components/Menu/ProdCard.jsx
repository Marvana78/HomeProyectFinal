import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { EditButton } from "../Buttons";
import serverAPI from "../../api/serverAPI";
import EditProdModal from "./EditProdModal";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ProdCard({ showEditButton }) {
  const [productos, setProductos] = useState([]);
  const [productToEdit, setProductToEdit] = useState("");

  useEffect(() => {
    fetchProductosData();
  }, []);

  const fetchProductosData = async () => {
    try {
      const resp = await serverAPI.get("/prod/GetProd");
      setProductos(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Grid>
      {productos.map((producto, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 275,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[500],
            marginTop: 1,
          }}
        >
          <CardContent sx={{ display: "flex" }}>
            <Grid sx={{ width: "80%", marginRight: 2 }}>
              <Typography variant="h6" component="div">
                {producto.Nombre}
              </Typography>
              <Typography variant="subtitle1" component="div">
                Categoría: {producto.Categoria}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
              >
                {producto.Descripcion}
              </Typography>
            </Grid>
            {showEditButton && (
              <EditButton
                handleClick={() => {
                  handleOpenModal();
                }}
              />
            )}
            <Grid sx={{ marginTop: 4, width: "20%" }}>
              <Typography sx={{ fontWeight: "bold", textAlign: "end" }}>
                {formatCurrency(producto.Precio, "ARS")}
              </Typography>
              <Typography
                variant="caption"
                sx={{ mb: 1.5 }}
                color="text.secondary"
              >
                Unidades mínimas: {producto.Minimo}
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
