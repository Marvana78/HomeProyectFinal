import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export function AddButton({ handleClick, id }) {
  return (
    <div className="mt-2 w-100">
      <div className="d-flex justify-content-end">
        <div>
          <Button
            variant="contained"
            onClick={handleClick}
            startIcon={<AddCircleIcon />}
            style={{
              marginTop: 17,
            }}
            id={id}
          >
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ShowComboEditButton({ setShowComboEditButton }) {
  const [EditState, setEditState] = useState(true);

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        style={{
          marginTop: 17,
          marginLeft: 10,
          borderColor: "#f57c00",
        }}
        onClick={() => {
          setShowComboEditButton(EditState);
          setEditState(!EditState);
          console.log(EditState);
        }}
      >
        Editar
      </Button>
    </div>
  );
}

export function ShowProdEditButton({ setShowProdEditButton }) {
  const [EditState, setEditState] = useState(true);

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        style={{
          marginTop: 17,
          marginLeft: 10,
          borderColor: "#f57c00",
        }}
        onClick={() => {
          setShowProdEditButton(EditState);
          setEditState(!EditState);
          console.log(EditState);
        }}
      >
        Editar
      </Button>
    </div>
  );
}

export function ShowUserEditButton({ setShowUserEditButton }) {
  const [EditState, setEditState] = useState(true);

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        style={{
          marginTop: 17,
          marginLeft: 10,
          borderColor: "#f57c00",
        }}
        onClick={() => {
          setShowUserEditButton(EditState);
          setEditState(!EditState);
          console.log(EditState);
        }}
      >
        Editar
      </Button>
    </div>
  );
}

export function ShowPedidosEditButton({ setShowPedidosEditButton }) {
  const [EditState, setEditState] = useState(false);

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        style={{
          marginTop: 17,
          marginLeft: 10,
          borderColor: "#f57c00",
        }}
        onClick={() => {
          setShowPedidosEditButton(EditState);
          setEditState(!EditState);
          console.log(EditState);
        }}
      >
        Editar
      </Button>
    </div>
  );
}

export function EditButton({ handleClick }) {
  return (
    <IconButton
      aria-label="edit"
      onClick={handleClick}
      sx={{ width: 30, height: 30 }}
    >
      <EditIcon />
    </IconButton>
  );
}
