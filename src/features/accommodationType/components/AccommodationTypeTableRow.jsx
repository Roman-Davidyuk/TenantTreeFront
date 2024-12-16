import React, { useState } from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import EditAccommodationTypeModal from "./EditAccommodationTypeModal";

const AccommodationTypeTableRow = ({
  accommodationType,
  onAccommodationTypeDelete,
  onAccommodationTypeUpdate,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleSave = async (updatedAccommodationType) => {
    const success = await onAccommodationTypeUpdate(updatedAccommodationType);
    if (success) {
      closeModal();
    }
  };

  const handleDelete = () => {
    onAccommodationTypeDelete(accommodationType.id);
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{accommodationType.title}</TableCell>
        <TableCell align="center">
          <Box display="flex" gap={1} justifyContent="center">
            <Button onClick={openModal} variant="outlined" color="primary">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <EditAccommodationTypeModal
        open={isEditModalOpen}
        onClose={closeModal}
        accommodationType={accommodationType}
        onSave={handleSave}
      />
    </>
  );
};

export default AccommodationTypeTableRow;
