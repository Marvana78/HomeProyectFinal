import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import serverAPI from "../../api/serverAPI";

const AddComboModal = ({ open, onClose }) => {
  const [Cantidad, setCantidad] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Composicion, setComposicion] = useState([]);
  const [Productos, setProductos] = useState([]);
  const [productosElegidos, setProductosElegidos] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const comboNuevo = async (
    Cantidad,
    Descripcion,
    Nombre,
    Precio,
    Composicion
  ) => {
    try {
      const resp = await serverAPI.post("/combo/AddCombo", {
        Cantidad,
        Descripcion,
        Nombre,
        Precio,
        Composicion,
      });

      console.log(resp);
      SwAlert();
      onClose();
    } catch (error) {
      SwAlertErrorFondos();
    }
  };

  const SwAlert = () => {
    swal({
      title: "¡Exito!",
      text: "El combo se agregó correctamente",
      icon: "success",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      Categoria === "" ||
      Descripcion === "" ||
      Nombre === "" ||
      Precio === ""
    ) {
      return console.log("todos los campos son obligatorios");
    }

    const composicion = productosElegidos.map((producto) => ({
      productoId: producto.id,
      cantidad: producto.cantidad,
    }));

    comboNuevo(Categoria, Descripcion, Nombre, Precio, composicion);

    setCategoria("");
    setDescripcion("");
    setNombre("");
    setPrecio("");
    setMinimo("");
  };

  useEffect(() => {
    fetchProductosData();
  }, [setProductos]);

  const fetchProductosData = async () => {
    try {
      const resp = await serverAPI.get("/prod/GetProd");
      setProductos(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const agregarProducto = (producto, cantidad) => {
    setProductosElegidos([
      ...productosElegidos,
      {
        id: producto.id,
        nombre: producto.Nombre,
        cantidad: cantidad,
      },
    ]);
    console.log(productosElegidos);
    setSelectedProduct("");
    setProductQuantity("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
        }}
        className="CreateModal"
      >
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" mb={1}>
            Crear combo
          </Typography>
          <HighlightOffIcon
            onClick={onClose}
            fontSize="large"
            sx={{ color: "#6a6a6a" }}
          />
        </Grid>

        <Grid>
          <Grid>
            <Grid mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Nombre
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Nombre"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid mb={2}>
              <TextField
                fullWidth
                className="mt-3"
                id="outlined-multiline-static"
                label="Descripción"
                multiline
                rows={4}
                defaultValue=""
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid>
            <Grid mb={2}>
              <TextField
                select
                fullWidth
                label="Seleccione un producto"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {Productos.map((producto) => (
                  <MenuItem key={producto.id} value={producto}>
                    {producto.Nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Cantidad
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Cantidad"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          agregarProducto(selectedProduct, productQuantity)
                        }
                      >
                        Agregar
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant="h6" mb={1}>
            Productos Elegidos:
          </Typography>
          <ul>
            {productosElegidos.map((producto, index) => (
              <li key={index}>
                {producto.nombre} - Cantidad: {producto.cantidad}
              </li>
            ))}
          </ul>
          <Grid display={"flex"}>
            <Grid width={"30%"} ml={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Precio
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Precio"
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "20%" }}
            onClick={handleSubmit}
          >
            Crear combo
          </Button>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddComboModal;
