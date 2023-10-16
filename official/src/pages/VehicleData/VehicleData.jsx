import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import AddVehicle from "../../components/Modals/AddVehicleDataModal";
import EditVehicle from "../../components/Modals/EditVehicle";

function VehicleData() {
  const [vehicleDetail, setVehicleDetails] = useState([]);
  const fetchVehicle = async () => {
    const res = await window.api.vehicleData();
    setVehicleDetails(res);
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.typeOfVehicle, //alternate way
        id: "typeOfVehicle", //id required if you use accessorFn instead of accessorKey
        header: "Type Of Vehicle",
        Header: (
          <span
            style={{
              color: "Blue",
              fontSize: "12px",
              wordWrap: "break-word",
            }}
          >
            Type Of Vehicle
          </span>
        ),
        size: 120,
      },
      {
        accessorFn: (row) => row.vehicleNumber, //alternate way
        id: "vehicleNumber", //id required if you use accessorFn instead of accessorKey
        header: "Vehicle Number",
        Header: (
          <span style={{ color: "Blue", fontSize: "12px" }}>
            Vehicle Number
          </span>
        ),
        size: 120,
      },
      {
        accessorFn: (row) => row.gPNo, //alternate way
        id: "gPNo", //id required if you use accessorFn instead of accessorKey
        header: "G P No",
        Header: <span style={{ color: "Blue", fontSize: "12px" }}>G P No</span>, //optional custom markup
        size: 100,
      },
      {
        accessorFn: (row) => {
          const newdate = new Date(row.gPValidity).getTime();
          const compDate = new Date().getTime();
          const dayDiff = newdate - 86400000 * 15;
          if (compDate >= dayDiff) {
            return (
              <span className="p-[1rem] bg-red-500 text-center flex items-center ">
                {row.gPValidity.split("-").reverse().join("-")}
              </span>
            );
          } else {
            return <>{row.gPValidity.split("-").reverse().join("-")}</>;
          }
        }, //alternate way
        id: "gPValidity", //id required if you use accessorFn instead of accessorKey
        header: "G P Validity",
        Header: (
          <span style={{ color: "Blue", fontSize: "12px" }}>G P Validity</span>
        ), //optional custom markup
        size: 110,
      },
      {
        accessorFn: (row) => {
          const newdate = new Date(row.insValidity).getTime();
          const compDate = new Date().getTime();
          const dayDiff = newdate - 86400000 * 15;
          if (compDate >= dayDiff) {
            return (
              <span className="p-[1rem] bg-red-500 text-center flex items-center ">
                {row.insValidity.split("-").reverse().join("-")}
              </span>
            );
          } else {
            return <>{row.insValidity.split("-").reverse().join("-")}</>;
          }
        }, //alternate way
        id: "insValidity", //id required if you use accessorFn instead of accessorKey
        header: "Ins. Validity",
        Header: (
          <span style={{ color: "Blue", fontSize: "12px" }}>Ins. Validity</span>
        ), //optional custom markup
        size: 110,
      },
      {
        accessorFn: (row) => {
          const newdate = new Date(row.polution).getTime();
          const compDate = new Date().getTime();
          const dayDiff = newdate - 86400000 * 15;
          if (compDate >= dayDiff) {
            return (
              <span className="p-[1rem] bg-red-500 text-center flex items-center ">
                {row.polution.split("-").reverse().join("-")}
              </span>
            );
          } else {
            return <>{row.polution.split("-").reverse().join("-")}</>;
          }
        }, //alternate way
        id: "polution", //id required if you use accessorFn instead of accessorKey
        header: "Pollution",
        Header: (
          <span style={{ color: "Blue", fontSize: "12px" }}>Pollution</span>
        ), //optional custom markup
        size: 110,
      },
      {
        accessorFn: (row) => {
          const newdate = new Date(row.fitnes).getTime();
          const compDate = new Date().getTime();
          const dayDiff = newdate - 86400000 * 30;
          if (compDate >= dayDiff) {
            return (
              <span className="p-[1rem] bg-red-500 text-center flex items-center ">
                {row.fitnes.split("-").reverse().join("-")}
              </span>
            );
          } else {
            return <>{row.fitnes.split("-").reverse().join("-")}</>;
          }
        }, //alternate way
        id: "fitnes", //id required if you use accessorFn instead of accessorKey
        header: "Fitness",
        Header: (
          <span style={{ color: "Blue", fontSize: "12px" }}>Fitness</span>
        ), //optional custom markup
        size: 110,
      },
      {
        accessorFn: (row) => {
          const newdate = new Date(row.roadTax).getTime();
          const compDate = new Date().getTime();
          const dayDiff = newdate - 86400000 * 15;
          if (compDate >= dayDiff) {
            return (
              <span className="p-[1rem] bg-red-500 text-center flex items-center ">
                {row.roadTax.split("-").reverse().join("-")}
              </span>
            );
          } else {
            return <>{row.roadTax.split("-").reverse().join("-")}</>;
          }
        }, //alternate way
        id: "roadTax", //id required if you use accessorFn instead of accessorKey
        header: "Road Tax",
        Header: (
          <span style={{ color: "Blue", fontSize: "12px" }}>Road Tax</span>
        ), //optional custom markup
        size: 110,
      },
      {
        accessorFn: (row) => {
          const newdate = new Date(row.permit).getTime();
          const compDate = new Date().getTime();
          const dayDiff = newdate - 86400000 * 30;
          if (compDate >= dayDiff) {
            return (
              <span className="p-[1rem] bg-red-500 text-center flex items-center ">
                {row.permit.split("-").reverse().join("-")}
              </span>
            );
          } else {
            return <>{row.permit.split("-").reverse().join("-")}</>;
          }
        }, //alternate way
        id: "permit", //id required if you use accessorFn instead of accessorKey
        header: "Permit",
        Header: <span style={{ color: "Blue", fontSize: "12px" }}>Permit</span>, //optional custom markup
        size: 110,
      },
      {
        accessorFn: (row) => {
          const newdate = new Date(row.loadTest).getTime();
          const compDate = new Date().getTime();
          const dayDiff = newdate - 86400000 * 30;
          if (compDate >= dayDiff) {
            return (
              <span className="p-[1rem] bg-red-500 text-center flex items-center ">
                {row.loadTest.split("-").reverse().join("-")}
              </span>
            );
          } else {
            return <>{row.loadTest.split("-").reverse().join("-")}</>;
          }
        }, //alternate way
        id: "loadTest", //id required if you use accessorFn instead of accessorKey
        header: "Load Test",
        Header: (
          <span style={{ color: "Blue", fontSize: "12px" }}>Load Test</span>
        ), //optional custom markup
        size: 110,
      },
      {
        accessorFn: (row) => <EditVehicle data={row} />, //alternate way
        id: "action", //id required if you use accessorFn instead of accessorKey
        header: "Action",
        Header: <span style={{ color: "Blue", fontSize: "12px" }}>Action</span>,
        size: 120,
      },
    ],
    []
  );

  return (
    <section className="bg-[var(--background-light)] text-[var(--dark-color)] min-h-[100vh] p-2 py-5">
      <div className="py-4">
        <AddVehicle />
      </div>

      <MaterialReactTable
        data={vehicleDetail}
        columns={columns}
        enableStickyHeader
        enableColumnResizing
        muiTableHeadCellProps={{
          sx: {
            "& .Mui-TableHeadCell-Content-Wrapper": {
              overflow: "hidden",
              whiteSpace: "normal",
              lineHeight: 0.8,
            },
          },
        }}
      />
    </section>
  );
}

export default VehicleData;
