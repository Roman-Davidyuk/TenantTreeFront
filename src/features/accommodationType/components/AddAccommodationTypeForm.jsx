import { useState } from "react";
import { AccommodationTypeService } from "../services/accommodationType.service";
import { useValidateAccommodationType } from "../hooks/useValidateAccommodationType";
import { Button, TextField, Container } from "@mui/material";
import { useNotifications } from "../../../contexts/notifications/useNotifications";

const AddAccommodationTypeForm = ({ setAccommodationTypes }) => {
  const accommodationTypeInitial = {
    title: "",
  };
  const [newAccommodationType, setNewAccommodationType] = useState(
    accommodationTypeInitial
  );
  const { validationError, validateAccommodationType } =
    useValidateAccommodationType();
  const { showNotification } = useNotifications();

  const onAccommodationTypeChange = (event) => {
    const { name, value } = event.target;
    setNewAccommodationType((prevAccommodationType) => ({
      ...prevAccommodationType,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validateAccommodationType(newAccommodationType.title)) {
      showNotification(validationError, {
        severity: "error",
        autoHideDuration: 5000,
      });
      return;
    }
    const makeCreateApiRequest = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const response = await AccommodationTypeService.createAccommodationType(
          newAccommodationType,
          signal
        );
        showNotification("Accommodation Type created successfully", {
          severity: "success",
          autoHideDuration: 5000,
        });
        setAccommodationTypes((prev) => [
          ...prev,
          { ...newAccommodationType, id: response.id },
        ]);
        setNewAccommodationType(accommodationTypeInitial);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
          showNotification(error.response.data, {
            severity: "error",
            autoHideDuration: 5000,
          });
        } else {
          showNotification(error.message, {
            severity: "error",
            autoHideDuration: 5000,
          });
        }
      }
    };

    makeCreateApiRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <TextField
          value={newAccommodationType.title}
          name="title"
          label="Title"
          onChange={onAccommodationTypeChange}
          variant="outlined"
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Container>
    </form>
  );
};

export default AddAccommodationTypeForm;
