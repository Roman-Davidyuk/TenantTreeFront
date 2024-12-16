import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import AccommodationTypeTableRow from "./AccommodationTypeTableRow";

const AccommodationTypeTable = ({
  accommodationTypes,
  onAccommodationTypeDelete,
  onSaveAccommodationType,
}) => {
  if (accommodationTypes.length === 0) {
    return <p>No data</p>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginY: "1rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accommodationTypes.map((type) => (
            <AccommodationTypeTableRow

              accommodationType={type}
              onAccommodationTypeDelete={onAccommodationTypeDelete}
              onAccommodationTypeUpdate={onSaveAccommodationType}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccommodationTypeTable;
