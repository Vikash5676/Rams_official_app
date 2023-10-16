import { MaterialReactTable } from "material-react-table";
import React, { useMemo } from "react";
import AddVehicleModal from "../../components/Modals/AddVehicleModal";

function TableVehicle({ tableData }) {
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.date, //alternate way
        id: "date", //id required if you use accessorFn instead of accessorKey
        header: "Date",
        Header: <span style={{ color: "Blue" }}>Date</span>,
        size: 110, //optional custom markup
      },

      {
        accessorFn: (row) => row.vehicleNumber, //alternate way
        id: "vehicleNumber", //id required if you use accessorFn instead of accessorKey
        header: "Vehicle Number",
        Header: <span style={{ color: "Blue" }}>Vehicle Number</span>,
        size: 210, //optional custom markup
      },
      {
        accessorFn: (row) => row.location, //alternate way
        id: "location", //id required if you use accessorFn instead of accessorKey
        header: "Location",
        Header: <span style={{ color: "Blue" }}>Location</span>,
        size: 170, //optional custom markup
      },
      {
        accessorFn: (row) => row.time, //alternate way
        id: "time", //id required if you use accessorFn instead of accessorKey
        header: "Time",
        Header: <span style={{ color: "Blue" }}>Time</span>,
        size: 140, //optional custom markup
      },
      {
        accessorFn: (row) => row.drop_loc, //alternate way
        id: "drop", //id required if you use accessorFn instead of accessorKey
        header: "Drop",
        Header: <span style={{ color: "blue" }}>Drop</span>,
        size: 130, //optional custom markup
      },
      {
        accessorFn: (row) => row.trip, //alternate way
        id: "trip", //id required if you use accessorFn instead of accessorKey
        header: "Trip",
        Header: <span style={{ color: "blue" }}>Trip</span>,
        size: 130, //optional custom markup
      },
      {
        accessorFn: (row) => {
          if (row.entryTime) {
            const time = new Date(row.entryTime).getTime();
            const currentTime = new Date().getTime();
            const newTime = time + 3600000 * 24;
            if (newTime >= currentTime) {
              return <AddVehicleModal data={row} method={"PATCH"} />;
            }
          }
        }, //alternate way
        id: "edit", //id required if you use accessorFn instead of accessorKey
        header: "Action",
        Header: <span style={{ color: "blue" }}>Action</span>,
        size: 170, //optional custom markup
      },
    ],
    []
  );
  return (
    <>
      <marquee behavior="" direction="left" className="text-red-500 text-2xl">
        You can edit this data upto 24 hours
      </marquee>
      <MaterialReactTable
        title="Vechile schedule details"
        columns={columns}
        data={tableData}
        enableGrouping
      />
    </>
  );
}

export default TableVehicle;
