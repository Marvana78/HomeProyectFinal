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

const AddProdModal = ({ open, onClose }) => {
  const [Categoria, setCategoria] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Minimo, setMinimo] = useState("");

  const productoNuevo = async (
    Categoria,
    Descripcion,
    Nombre,
    Precio,
    Minimo
  ) => {
    try {
      const resp = await serverAPI.post("/prod/AddProd", {
        Categoria,
        Descripcion,
        Nombre,
        Precio,
        Minimo,
      });

      console.log(resp);
      SwAlert();
      onClose();
    } catch (error) {
      SwAlertErrorFondos();
    }
  };

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

  const SwAlert = () => {
    swal({
      title: "¡Exito!",
      text: "La operación se agregó correctamente",
      icon: "success",
    });
  };

  const SwAlertErrorFondos = () => {
    swal({
      title: "¡Error!",
      text: "No posee los fondos suficientes para realizar la operación",
      icon: "error",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(Categoria);
    console.log(Descripcion);
    console.log(Nombre);
    console.log(Minimo);
    console.log(Precio);

    if (
      Categoria === "" ||
      Descripcion === "" ||
      Nombre === "" ||
      Precio === ""
    ) {
      return console.log("todos los campos son obligatorios");
    }

    productoNuevo(Categoria, Descripcion, Nombre, Precio, Minimo);

    setCategoria("");
    setDescripcion("");
    setNombre("");
    setPrecio("");
    setMinimo("");
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
            Crear producto
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
            <Grid display={"flex"}>
              <Grid width={"40%"} mb={2}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Categoría"
                  defaultValue=""
                  fullWidth
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
                    id="outlined-adornment-amount"
                    label="Precio"
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
                    id="outlined-adornment-amount"
                    label="Minimo"
                    onChange={(e) => setMinimo(e.target.value)} // Actualiza el estado del mínimo de unidades
                  />
                </FormControl>
              </Grid>
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
            Crear producto
          </Button>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddProdModal;
