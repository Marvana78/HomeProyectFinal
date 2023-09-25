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
import FormControl from "@mui/material/FormControl";
import serverAPI from "../../api/serverAPI";

const EditComboModal = ({ open, onClose, onProductChange, combo }) => {
  const [Cantidad, setCantidad] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Composicion, setComposicion] = useState([]);
  const [Productos, setProductos] = useState([]);
  const [productosElegidos, setProductosElegidos] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    if (combo) {
      setNombre(combo.Nombre || "");
      setDescripcion(combo.Descripcion || "");
      setPrecio(combo.Precio || "");
      setCantidad(combo.Cantidad || "");
      setProductosElegidos(combo.Composicion || []);
    }
  }, [combo]);

  const SwAlert = () => {
    swal({
      title: "¡Exito!",
      text: "El combo se agregó correctamente",
      icon: "success",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      Composicion === "" ||
      Descripcion === "" ||
      Nombre === "" ||
      Precio === ""
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    try {
      await serverAPI.put(`/combo/EditCombo/${combo._id}`, {
        Descripcion: Descripcion,
        Nombre: Nombre,
        Precio: Precio,
        Cantidad: Cantidad,
        Composicion: Composicion,
      });

      onProductChange();
      onClose();
    } catch (error) {
      console.error("Error al editar el combo:", error);
    }
  };

  const deleteCombo = async (_id) => {
    try {
      const deleteResp = await serverAPI.delete(`/combo/DeleteCombo/${_id}`);

      if (deleteResp.data.message === "Combo deleted successfully") {
        console.log(deleteResp);
      } else {
        console.log("Cancel operation failed.");
      }
      onProductChange();
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertDelete = (_id) => {
    swal({
      title: "¿Desea borrar el combo?",
      text: "Una vez borrado, este no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("¡Combo borrado con éxito!", {
          icon: "success",
        });
        deleteCombo(_id);
        onClose();
      }
    });
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

  const agregarProducto = () => {
    if (!selectedProduct || productQuantity <= 0) {
      alert("Selecciona un producto y una cantidad válida.");
      return;
    }

    const productoExistente = productosElegidos.find(
      (producto) => producto._id === selectedProduct._id
    );

    if (productoExistente) {
      const productosActualizados = productosElegidos.map((producto) => {
        if (producto._id === selectedProduct._id) {
          return {
            ...producto,
            cantidad: producto.cantidad + parseFloat(productQuantity),
          };
        }
        return producto;
      });

      setProductosElegidos(productosActualizados);
    } else {
      const nuevoProducto = {
        _id: selectedProduct._id,
        nombre: selectedProduct.Nombre,
        cantidad: parseFloat(productQuantity),
      };

      setProductosElegidos([...productosElegidos, nuevoProducto]);
    }

    setSelectedProduct("");
    setProductQuantity("");
  };

  useEffect(() => {
    setComposicion(productosElegidos);
  }, [productosElegidos]);

  const vaciarComposicion = () => {
    setProductosElegidos([]);
  };

  const calcularTotalCantidadProductos = () => {
    let total = 0;

    for (const producto of productosElegidos) {
      const cantidadNumerica = parseFloat(producto.cantidad);

      if (!isNaN(cantidadNumerica)) {
        total += cantidadNumerica;
      }
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
            Editar combo
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
                  id="ComboNombre"
                  label="Nombre"
                  value={Nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid mb={2}>
              <TextField
                fullWidth
                className="mt-3"
                id="ComboDescripcion"
                label="Descripción"
                value={Descripcion}
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
                id="ComboProductosList"
                fullWidth
                label="Seleccione un producto"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {Productos.map((producto) => (
                  <MenuItem
                    key={producto.id}
                    value={producto}
                    id="ComboProducto"
                  >
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
                  id="ComboProductoCantidad"
                  label="Cantidad"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid mb={2} width={"20%"} container>
              <Button
                id="ComboAgregarProducto"
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
              value={Composicion.map(
                (producto, index) =>
                  `${producto.nombre} - Cantidad: ${producto.cantidad}\n`
              ).join("")}
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
                  value={Precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent={"end"}>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2, width: "25%" }}
            onClick={() => SwAlertDelete(product._id)}
          >
            Borrar producto
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 2, width: "25%" }}
            id="EditProd"
            onClick={handleSubmit}
          >
            Guardar cambios
          </Button>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default EditComboModal;
