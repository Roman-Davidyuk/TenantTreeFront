import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const EditAccommodationTypeModal = ({
  open,
  onClose,
  accommodationType,
  onSave,
}) => {
  const [title, setTitle] = useState(accommodationType.title);

  useEffect(() => {
    setTitle(accommodationType.title);
  }, [open, accommodationType]);

  const handleSave = async () => {
    const success = await onSave({ ...accommodationType, title });
    if (success) {
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditAccommodationTypeModal;
