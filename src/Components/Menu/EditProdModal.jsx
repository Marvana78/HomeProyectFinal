import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import serverAPI from "../../api/serverAPI";

const EditProdModal = ({ open, onClose, onProductChange, product }) => {
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [nombre, setNombre] = useState("");
  const [minimo, setMinimo] = useState("");

  useEffect(() => {
    if (product) {
      setCategoria(product.Categoria || "");
      setDescripcion(product.Descripcion || "");
      setPrecio(product.Precio || "");
      setNombre(product.Nombre || "");
      setMinimo(product.Minimo || "");
    }
  }, [product]);

  const categorias = [
    {
      value: "Sushi",
      label: "Sushi",
    },
    {
      value: "Duplas",
      label: "Duplas",
    },
    {
      value: "Cocina",
      label: "Cocina",
    },
    {
      value: "LineaVegan",
      label: "Linea Vegana",
    },
    {
      value: "LineaVeggie",
      label: "Linea Veggie",
    },
    {
      value: "Ensaladas",
      label: "Ensaladas",
    },
    {
      value: "Entradas",
      label: "Entradas",
    },
    {
      value: "Bebidas",
      label: "Bebidas",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      categoria === "" ||
      descripcion === "" ||
      nombre === "" ||
      precio === ""
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    swal({
      title: "¿Desea guardar los cambios?",
      text: "Una vez guardados, los cambios serán permanentes",
      icon: "warning",
      buttons: ["Cancelar", "Guardar"],
      dangerMode: true,
    }).then((willSave) => {
      if (willSave) {
        try {
          serverAPI.put(`/prod/EditProd/${product._id}`, {
            Categoria: categoria,
            Descripcion: descripcion,
            Nombre: nombre,
            Precio: precio,
            Minimo: minimo,
          });

          swal("¡Producto editado con éxito!", {
            icon: "success",
          });

          onProductChange();
          onClose();
        } catch (error) {
          console.error("Error al editar la operación:", error);
        }
      }
    });
  };

  const deleteProd = async (_id) => {
    try {
      const deleteResp = await serverAPI.delete(`/prod/DeleteProd/${_id}`);

      if (deleteResp.data.message === "Product deleted successfully") {
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
      title: "¿Desea borrar el producto?",
      text: "Una vez borrado, este no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("¡Operación borrada con éxito!", {
          icon: "success",
        });
        deleteProd(_id);
        onClose();
      }
    });
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
            Editar Producto
          </Typography>
          <HighlightOffIcon
            onClick={onClose}
            fontSize="large"
            sx={{ color: "#6a6a6a" }}
          />
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid>
              <Grid mb={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Nombre
                  </InputLabel>
                  <OutlinedInput
                    id="crearProdNombre"
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid mb={2}>
                <TextField
                  fullWidth
                  className="mt-3"
                  id="crearProdDescripcion"
                  label="Descripción"
                  multiline
                  rows={4}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Grid>
              <Grid display={"flex"}>
                <Grid width={"40%"} mb={2}>
                  <TextField
                    id="crearProdCategoria"
                    select
                    fullWidth
                    label="Categoría"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    {categorias.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid width={"30%"} ml={2}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Precio
                    </InputLabel>
                    <OutlinedInput
                      id="crearProdPrecio"
                      label="Precio"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid width={"30%"} ml={2}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Mínimo unidades
                    </InputLabel>
                    <OutlinedInput
                      id="crearProdMinimo"
                      label="Minimo"
                      value={minimo}
                      onChange={(e) => setMinimo(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 3, mb: 2, width: "20%" }}
              onClick={() => SwAlertDelete(product._id)}
            >
              Borrar producto
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2, width: "20%" }}
              id="EditProd"
            >
              Guardar cambios
            </Button>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default EditProdModal;
