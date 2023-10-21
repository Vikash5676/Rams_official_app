"use client";

import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";
import PpeModal from "../../components/Modals/PpeModal";

function PpeTable({ mbNo }) {
  const [showTable, setShowTable] = useState(false);
  const [column, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setColumns([
      {
        accessorFn: (row) => row.empname, //alternate way
        id: "employeeName", //id required if you use accessorFn instead of accessorKey
        header: "Employee Name",
        Header: <span style={{ color: "Blue" }}>Employee Name</span>,
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => row.equipment, //alternate way
        id: "equipment",
        header: "Equipment",
        Header: <span style={{ color: "Blue" }}>Equipment</span>,
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => row.date_issue.split("-").reverse().join("-"), //alternate way
        id: "date_issue", //id required if you use accessorFn instead of accessorKey
        header: "Date Issue",
        Header: (
          <span style={{ color: "Blue" }} className="uppercase">
            Date Issue
          </span>
        ),
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => row.reason, //alternate way
        id: "reason", //id required if you use accessorFn instead of accessorKey
        header: "Reason",
        Header: (
          <span style={{ color: "Blue" }} className=" uppercase">
            Reason
          </span>
        ),
        size: 110, //optional custom markup
      },
    ]);
  }, []);

  useEffect(() => {
    const fetchPpe = async () => {
      const mobNo = sessionStorage.getItem("mobNo");
      const ppeIssue = await window.api.workerPpe(mobNo);

      const newPpe = async () => {
        const arr = [];
        await ppeIssue.map((ele) => {
          if (ele.head_protection !== "") {
            arr.push({
              empname: ele.employeeName,
              equipment: ele.head_protection,
              date_issue: ele.date_issue,
              reason:
                ele.head_protection_issue === "custom issue"
                  ? ele.head_protection_custom_issue
                  : ele.head_protection_issue,
            });
          }
          if (ele.face_protection !== "") {
            arr.push({
              empname: ele.employeeName,
              equipment: ele.face_protection,
              date_issue: ele.date_issue,
              reason:
                ele.face_protection_issue === "custom issue"
                  ? ele.face_protection_custom_issue
                  : ele.face_protection_issue,
            });
          }
          if (ele.leg_protection !== "") {
            arr.push({
              empname: ele.employeeName,
              equipment: ele.leg_protection,
              date_issue: ele.date_issue,
              reason:
                ele.leg_protection_issue === "custom issue"
                  ? ele.leg_protection_custom_issue
                  : ele.leg_protection_issue,
            });
          }
          if (ele.eye_protection !== "") {
            arr.push({
              empname: ele.employeeName,
              equipment: ele.eye_protection,
              date_issue: ele.date_issue,
              reason:
                ele.eye_protection_issue === "custom issue"
                  ? ele.eye_protection_custom_issue
                  : ele.eye_protection_issue,
            });
          }
          if (ele.road_protection !== "") {
            arr.push({
              empname: ele.employeeName,
              equipment: ele.road_protection,
              date_issue: ele.date_issue,
              reason:
                ele.road_protection_issue === "custom issue"
                  ? ele.road_protection_custom_issue
                  : ele.road_protection_issue,
            });
          }
          if (ele.hand_protection !== "") {
            arr.push({
              empname: ele.employeeName,
              equipment: ele.hand_protection,
              date_issue: ele.date_issue,
              reason:
                ele.hand_protection_issue === "custom issue"
                  ? ele.hand_protection_custom_issue
                  : ele.hand_protection_issue,
            });
          }
        });
        return arr;
      };
      newPpe().then((res) => {
        setData(res);
        setTimeout(() => {
          setShowTable(true);
        }, 1500);
      });
    };

    fetchPpe();
  }, [showTable]);

  return (
    <div className=" min-h-screen">
      {showTable ? (
        <MaterialReactTable
          data={data}
          columns={column}
          enableStickyHeader
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <PpeModal className="bg-blue-500" method={"POST"} mbNo={mbNo} />

              <Button
                color="primary"
                startIcon={<FileDownloadIcon />}
                variant="contained"
                className="bg-blue-500"
              >
                <CSVLink
                  data={data}
                  filename={`ppe-issue-${sessionStorage.getItem("emp")}.csv`}
                  className="text-white hover:text-white"
                >
                  Export All Data
                </CSVLink>
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)

                startIcon={<FileDownloadIcon />}
                variant="contained"
                className="bg-blue-500"
              >
                <CSVLink
                  data={table.getRowModel().rows}
                  filename={`ppe-issue-${sessionStorage.getItem("emp")}.csv`}
                  className="text-white hover:text-white"
                >
                  Export Page Rows
                </CSVLink>
              </Button>
            </Box>
          )}
        />
      ) : (
        <Loader active />
      )}
    </div>
  );
}

export default PpeTable;
