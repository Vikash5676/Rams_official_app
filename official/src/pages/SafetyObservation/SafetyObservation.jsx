import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AdjustIcon from "@mui/icons-material/Adjust";
import Swal from "sweetalert2";
import AddSafteyObservationModal from "../../components/Modals/AddSafteyObservationModal";
import { CSVLink } from "react-csv";

const SafteyObservation = () => {
  const [Open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    const res = await window.api.safetyObservations();
    setTableData(res);
  };

  useEffect(() => {
    fetchData();
  }, [setTableData, Open]);

  const handleClick = async (data) => {
    if (data?.action_taken === "") {
      Swal.fire({ icon: "error", title: "action field is empty" });
    } else {
      Swal.fire({
        icon: "warning",
        title:
          "you are sure to modify the the status , this action is not reversible",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await window.api.updateSafety(data.id);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Successufully updated status",
            });
          } else {
            Swal.fire({ icon: "error", title: "something went wrong" });
          }
        }
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "violation_date", //simple recommended way to define a column
        header: "Date of Violation",
        muiTableHeadCellProps: { sx: { color: "Blue" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorFn: (row) => row.site_supervisor_concerned, //alternate way
        id: "site_supervisor_concerned", //id required if you use accessorFn instead of accessorKey
        header: "Site Supervisor Concerned",
        Header: <i style={{ color: "Blue" }}>Site Supervisor Concerned</i>, //optional custom markup
      },
      {
        accessorFn: (row) => row.manpower, //alternate way
        id: "manpower", //id required if you use accessorFn instead of accessorKey
        header: "Manpower",
        Header: <i style={{ color: "blue" }}>Manpower</i>, //optional custom markup
      },
      {
        accessorFn: (row) => row.violation_detail, //alternate way
        id: "violation_detail", //id required if you use accessorFn instead of accessorKey
        header: "Violation Detail",
        Header: <i style={{ color: "blue" }}>Violation Detail</i>, //optional custom markup
      },
      {
        accessorFn: (row) => row.observation_locked_by, //alternate way
        id: "observation_locked_by", //id required if you use accessorFn instead of accessorKey
        header: "Observation Locked By",
        Header: <i style={{ color: "blue" }}>Observation Locked By</i>, //optional custom markup
      },
      {
        accessorFn: (row) => row.action_taken, //alternate way
        id: "action_taken", //id required if you use accessorFn instead of accessorKey
        header: "Action Taken",
        Header: <i style={{ color: "blue" }}>Action Taken</i>, //optional custom markup
      },
      {
        accessorFn: (row) => {
          return row.current_status === "open" ? (
            <>
              <AdjustIcon
                style={{ color: "red" }}
                onClick={() => {
                  handleClick(row);
                }}
                className="current_status"
              />
            </>
          ) : (
            <AdjustIcon style={{ color: "green" }} />
          );
        }, //alternate way
        id: "current_status", //id required if you use accessorFn instead of accessorKey
        header: "Current Status",
        Header: <i style={{ color: "blue" }}>Current Status</i>, //optional custom markup
      },
    ],
    []
  );

  return (
    <div className=" min-h-screen">
      <MaterialReactTable
        title="Materail Details"
        enableStickyHeader
        columns={columns}
        data={tableData}
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          >
            <AddSafteyObservationModal
              className="bg-blue-500"
              method={"POST"}
            />
            <Button
              color="primary"
              startIcon={<FileDownloadIcon />}
              variant="contained"
              className="bg-blue-500"
            >
              <CSVLink
                data={tableData}
                filename={`safety-observation.csv`}
                className="text-white hover:text-white"
              >
                Export All Data
              </CSVLink>
            </Button>
            <Button
              disabled={table.getRowModel().rows.length === 0}
              startIcon={<FileDownloadIcon />}
              variant="contained"
              className="bg-blue-500"
            >
              <CSVLink
                data={table.getRowModel().rows}
                filename={`safety-observation.csv`}
                className="text-white hover:text-white"
              >
                Export Page Rows
              </CSVLink>
            </Button>
          </Box>
        )}
      />
    </div>
  );
};

export default SafteyObservation;
