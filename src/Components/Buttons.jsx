import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export function OpOkButton({ handleClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        sx={{ width: 150 }}
        endIcon={<CheckCircleIcon />}
        color="success"
        onClick={handleClick}
      >
        Aceptar
      </Button>
    </Stack>
  );
}

export function OpCancelButton({ handleClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        sx={{ width: 150 }}
        endIcon={<CancelIcon />}
        color="error"
        onClick={handleClick}
      >
        Cancelar
      </Button>
    </Stack>
  );
}

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
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const [userRole, setUserRole] = useState("");

  const [EditState, setEditState] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const resp = await serverAPI.get("/auth/getUserByEmail", {
          params: { email: loggedInUserEmail },
        });
        setUserRole(resp.data.rol);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (loggedInUserEmail) {
      fetchUserRole();
    }
  }, [loggedInUserEmail]);

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
        }}
      >
        Editar
      </Button>
    </div>
  );
}

export function EditButton({ visible, handleClick }) {
  return (
    <IconButton
      aria-label="edit"
      style={{
        display: visible ? "flex" : "none",
        marginTop: 17,
      }}
      onClick={handleClick}
    >
      <EditIcon />
    </IconButton>
  );
}
