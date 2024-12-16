import React, { useEffect, useState, useCallback } from "react";
import { AccommodationTypeService } from "./services/accommodationType.service";
import AccommodationTypeTable from "./components/AccommodationTypeTable";
import SearchInput from "../../components/SearchInput";
import AddAccommodationTypeForm from "./components/AddAccommodationTypeForm";
import { useValidateAccommodationType } from "./hooks/useValidateAccommodationType";
import { useNotifications } from "../../contexts/notifications/useNotifications";

const AccommodationTypeComponent = () => {
  const [accommodationTypes, setAccommodationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const { validateAccommodationType, validationError } =
    useValidateAccommodationType();
  const { showNotification } = useNotifications();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchAccommodationTypes = async () => {
      try {
        setLoading(true);

        const response =
          await AccommodationTypeService.getAllAccommodationTypes(
            abortController.signal
          );
        if (isMounted) {
          setAccommodationTypes(response);
        }
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationTypes();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const memoizedAccommodationTypeItemDeleteCallback = useCallback(
    async (id) => {
      try {
        setLoading(true);

        const makeDeleteApiRequest = async (signal) => {
          try {
            await AccommodationTypeService.deleteAccommodationType(id, signal);
            setAccommodationTypes((prev) => prev.filter((el) => el.id !== id));
            showNotification("AccommodationType deleted successfully", {
              severity: "success",
              autoHideDuration: 5000,
            });
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

        const abortController = new AbortController();
        await makeDeleteApiRequest(abortController.signal);

        setLoading(false);
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
        setLoading(false);
      }
    },
    []
  );

  const memoizedSaveAccommodationTypeButtonClickCallback = useCallback(
    async (editAccommodationType) => {
      const isValid = validateAccommodationType(editAccommodationType.title);

      if (!isValid) {
        showNotification(validationError, {
          severity: "error",
          autoHideDuration: 5000,
        });
        return false;
      }

      try {
        const makeUpdateApiRequest = async () => {
          try {
            const abortController = new AbortController();
            const signal = abortController.signal;
            const response =
              await AccommodationTypeService.updateAccommodationType(
                editAccommodationType,
                signal
              );

            setAccommodationTypes((prev) =>
              prev.map((el) => {
                if (el.id === editAccommodationType.id) {
                  return editAccommodationType;
                }
                return el;
              })
            );

            showNotification("AccommodationType updated successfully", {
              severity: "success",
              autoHideDuration: 5000,
            });
          } catch (error) {
            if (error.status === 409) {
              showNotification(error.response?.data, {
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
        await makeUpdateApiRequest();
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }

      return true;
    },
    [validationError]
  );

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredAccommodationTypes =
    accommodationTypes?.filter((accommodationType) =>
      Object.keys(accommodationType).some((key) => {
        if (key === "id") return false;
        return String(accommodationType[key])
          .toLowerCase()
          .includes(filterQuery.toLowerCase());
      })
    ) || [];

  return (
    <div>
      {loading && <p>Loading...</p>}
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddAccommodationTypeForm setAccommodationTypes={setAccommodationTypes} />

      <AccommodationTypeTable
        accommodationTypes={filteredAccommodationTypes}
        onAccommodationTypeDelete={memoizedAccommodationTypeItemDeleteCallback}
        onSaveAccommodationType={
          memoizedSaveAccommodationTypeButtonClickCallback
        }
      />
    </div>
  );
};

export default AccommodationTypeComponent;
