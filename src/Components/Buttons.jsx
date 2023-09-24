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

export function ShowEditButton({ setShowEditButton }) {
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
          setShowEditButton(EditState);
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
      style={{
        marginTop: 17,
      }}
      onClick={handleClick}
    >
      <EditIcon />
    </IconButton>
  );
}
