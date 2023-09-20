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

  const vaciarComposicion = () => {
    setProductosElegidos([]);
  };

  const calcularTotalCantidadProductos = () => {
    let total = 0;

    for (const producto of productosElegidos) {
      total += producto.cantidad;
    }

    return total;
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
          width: "50%",
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

          <Grid display={"flex"}>
            <Grid mb={2} width={"60%"} mr={2}>
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
            <Grid mb={2} width={"20%"} mr={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Cantidad
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Cantidad"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid mb={2} width={"20%"} container>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() =>
                  agregarProducto(selectedProduct, productQuantity)
                }
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              className="mt-3"
              id="outlined-multiline-static"
              label="Productos elegidos"
              multiline
              rows={4}
              variant="outlined"
              value={productosElegidos
                .map(
                  (producto, index) =>
                    `${producto.nombre} - Cantidad: ${producto.cantidad}\n`
                )
                .join("")}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid display={"flex"} justifyContent={"space-between"}>
            <Grid>
              <Typography
                variant="subtitle1"
                color="Highlight"
                onClick={vaciarComposicion}
                textAlign={"start"}
                mt={1}
                sx={{ cursor: "pointer" }}
              >
                Vaciar campo
              </Typography>
              <Grid>
                <Typography variant="h6" mb={1}>
                  Total de Cantidad de Productos:{" "}
                  {calcularTotalCantidadProductos()}
                </Typography>
              </Grid>
            </Grid>
            <Grid width={"30%"} mt={2}>
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
        <Grid container justifyContent={"end"}>
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
