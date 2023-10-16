import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddMaterialModal from "../../components/Modals/AddMaterialModal";
import DispatchMaterialModal from "../../components/Modals/DispatchMaterialModal";
import AddRentalItem from "../../components/Modals/AddRentalItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";

function MaterialTable() {
  const [tableType, settableType] = useState("all-stock");
  const [tableData, settableData] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);

  const handleRoute = async (table_type) => {
    settableType(table_type);
  };

  const fetchAllMaterials = async (tableType) => {
    if (tableType === "all-stock") {
      const data = await window.api.allStocks();
      settableData(data);
    } else if (tableType === "all-material") {
      const data = await window.api.materialDetails();
      settableData(data);
    } else if (tableType === "material-consumed") {
      const data = await window.api.materialConsumed();
      settableData(data);
    } else if (tableType === "material-rental") {
      const data = await window.api.rentalItems();
      settableData(data);
    }
  };

  useEffect(() => {
    if (tableType === "all-stock") {
      fetchAllMaterials(tableType);
      setTableColumn([
        {
          accessorFn: (row) => row.item_name, //alternate way
          id: "item_name", //id required if you use accessorFn instead of accessorKey
          header: "Material Name",
          Header: <span style={{ color: "Blue" }}>Material Name</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.stock, //alternate way
          id: "stock", //id required if you use accessorFn instead of accessorKey
          header: "Stock",
          Header: <span style={{ color: "Blue" }}>Stock</span>,
          size: 110, //optional custom markup
        },
      ]);
    } else if (tableType === "all-material") {
      fetchAllMaterials(tableType);
      setTableColumn([
        {
          accessorFn: (row) => row.item_name, //alternate way
          id: "item_name", //id required if you use accessorFn instead of accessorKey
          header: "Material Name",
          Header: <span style={{ color: "Blue" }}>Material Name</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.date?.split("-").reverse().join("-"), //alternate way
          id: "date", //id required if you use accessorFn instead of accessorKey
          header: "Date",
          Header: <span style={{ color: "Blue" }}>Date</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.qty, //alternate way
          id: "qty", //id required if you use accessorFn instead of accessorKey
          header: "Quantity",
          Header: <span style={{ color: "Blue" }}>Quantity</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.person, //alternate way
          id: "person", //id required if you use accessorFn instead of accessorKey
          header: "Received From",
          Header: <span style={{ color: "Blue" }}>Received From</span>,
          size: 110, //optional custom markup
        },
      ]);
    } else if (tableType === "material-consumed") {
      fetchAllMaterials(tableType);
      setTableColumn([
        {
          accessorFn: (row) => row.item_name, //alternate way
          id: "item_name", //id required if you use accessorFn instead of accessorKey
          header: "Material Name",
          Header: <span style={{ color: "Blue" }}>Material Name</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.date?.split("-").reverse().join("-"), //alternate way
          id: "date", //id required if you use accessorFn instead of accessorKey
          header: "Date",
          Header: <span style={{ color: "Blue" }}>Date</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.qty, //alternate way
          id: "qty", //id required if you use accessorFn instead of accessorKey
          header: "Quantity",
          Header: <span style={{ color: "Blue" }}>Quantity</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.person, //alternate way
          id: "person", //id required if you use accessorFn instead of accessorKey
          header: "Sended To",
          Header: <span style={{ color: "Blue" }}>Sended To</span>,
          size: 110, //optional custom markup
        },
      ]);
    } else if (tableType === "material-rental") {
      fetchAllMaterials(tableType);
      setTableColumn([
        {
          accessorFn: (row) => row.item_name, //alternate way
          id: "item_name", //id required if you use accessorFn instead of accessorKey
          header: "Material Name",
          Header: <span style={{ color: "Blue" }}>Material Name</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => (row.serial_no === "" ? "na" : row.serial_no), //alternate way
          id: "serial_no", //id required if you use accessorFn instead of accessorKey
          header: "Serial Number",
          Header: <span style={{ color: "Blue" }}>Serial Number</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.date?.split("-").reverse().join("-"), //alternate way
          id: "date", //id required if you use accessorFn instead of accessorKey
          header: "Date",
          Header: <span style={{ color: "Blue" }}>Date</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.rented_qty, //alternate way
          id: "rented_qty", //id required if you use accessorFn instead of accessorKey
          header: "Rented Quantity",
          Header: <span style={{ color: "Blue" }}>Rented Quantity</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.received_qty, //alternate way
          id: "received_qty", //id required if you use accessorFn instead of accessorKey
          header: "Received Quantity",
          Header: <span style={{ color: "Blue" }}>Received Quantity</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => row.location, //alternate way
          id: "person", //id required if you use accessorFn instead of accessorKey
          header: "Sended To",
          Header: <span style={{ color: "Blue" }}>Rented To</span>,
          size: 110, //optional custom markup
        },
        {
          accessorFn: (row) => <AddRentalItem method={"PATCH"} data={row} />, //alternate way
          id: "action", //id required if you use accessorFn instead of accessorKey
          header: "Action",
          Header: <span style={{ color: "Blue" }}>Action</span>,
          size: 110, //optional custom markup
        },
      ]);
    }
  }, [tableType]);
  return (
    <main className="bg-[var(--background-light)] min-h-screen">
      <nav>
        <ul className="flex gap-3 p-3">
          <li
            onClick={() => {
              handleRoute("all-stock");
            }}
            className="py-[0.5rem] px-[1rem] bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-700 "
          >
            All Stock
          </li>
          <li
            onClick={() => {
              handleRoute("all-material");
            }}
            className="py-[0.5rem] px-[1rem] bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-700 "
          >
            All Material
          </li>
          <li
            onClick={() => {
              handleRoute("material-consumed");
            }}
            className="py-[0.5rem] px-[1rem] bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-700"
          >
            Material Consumed
          </li>
          <li
            onClick={() => {
              handleRoute("material-rental");
            }}
            className="py-[0.5rem] px-[1rem] bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-700"
          >
            Material Rented
          </li>
          <li
            onClick={() => {
              handleRoute("material-discarded");
            }}
            className="py-[0.5rem] px-[1rem] bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-700"
          >
            Material Discarded
          </li>
        </ul>
      </nav>
      <MaterialReactTable
        data={tableData}
        columns={tableColumn}
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              p: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <AddMaterialModal method={"POST"} />

            <DispatchMaterialModal method={"POST"} />
            <AddRentalItem method={"POST"} />
            <Button
              size="small"
              color="primary"
              startIcon={<FileDownloadIcon />}
              variant="contained"
              className="bg-blue-500"
            >
              <CSVLink
                data={tableData}
                filename={`${tableType}.csv`}
                className="text-white hover:text-white"
              >
                Export All Data
              </CSVLink>
            </Button>
          </Box>
        )}
      />
    </main>
  );
}

export default MaterialTable;
