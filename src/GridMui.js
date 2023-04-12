import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridCellModes, useGridApiRef } from "@mui/x-data-grid";

function EditToolbar(props) {
  const {
    selectedCellParams,
    cellMode,
    cellModesModel,
    setCellModesModel,
    apiRef,
  } = props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;

    if (cellMode === "edit") {
      // update du composant et du EDIT toolbar
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });

      // recuperer les donnés à modifier et les envoyer au Backend
      const rowUpdated = apiRef.current.getRowWithUpdatedValues(id, field);

      // creer le JSON
      const JSONtoSend = JSON.stringify(rowUpdated);

      // envoyer le JSON au backend (à implementer)
      fetch("http://localhost:8888/restAPI_CRUD_PHP/update_item.php", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSONtoSend,
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((json) => {
          alert("le serveur à repondu: --->" + json.message);
        })
        .catch((error) => {
          alert("erreur du serveur: " + error);
        });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        variant="outlined"
      >
        {cellMode === "edit" ? "Save" : "Edit"}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === "view"}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

EditToolbar.propTypes = {
  cellMode: PropTypes.oneOf(["edit", "view"]).isRequired,
  cellModesModel: PropTypes.object.isRequired,
  selectedCellParams: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  setCellModesModel: PropTypes.func.isRequired,
};

export default function StartEditButtonGrid() {
  const [selectedCellParams, setSelectedCellParams] = React.useState(null);
  const [cellModesModel, setCellModesModel] = React.useState({});
  const apiRef = useGridApiRef();
  const [rows, setRows] = React.useState([]);

  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  React.useEffect(() => {
    fetch("http://localhost:8888/restAPI_CRUD_PHP/getItems.php", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonArr) => {
        setRows(jsonArr);
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellKeyDown={handleCellKeyDown}
        cellModesModel={cellModesModel}
        onCellModesModelChange={(model) => setCellModesModel(model)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,
            apiRef,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
        apiRef={apiRef}
      />
    </div>
  );
}

const columns = [
  { field: "id", headerName: "Id Item", width: 180, editable: false },
  { field: "name", headerName: "Name", type: "text", editable: true },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    type: "text",
    editable: true,
  },
];
