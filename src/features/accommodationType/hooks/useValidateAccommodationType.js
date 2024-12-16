import { useState } from "react";

export const useValidateAccommodationType = () => {
  const [validationError, setValidationError] = useState("");

  const ValidateAccommodation = (title) => {
    if (title.trim().length < 3) {
      setValidationError(
        "The accommodation title must be at least 3 letters long"
      );
      return false;
    }
    if (title.trim().length > 255) {
      setValidationError(
        "The accommodation title must be less than 255 letters long"
      );
      return false;
    }

    setValidationError("");
    return true;
  };

  return {
    validationError,
    validateAccommodationType: ValidateAccommodation,
  };
};
