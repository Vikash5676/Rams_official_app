"use client";

import { MaterialReactTable } from "material-react-table";
import React, { useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import AddWorkerModal from "../../components/Modals/AddWorkerModal";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

function WorkerTable({ data }) {
  const handleDelete = async (id) => {
    const deletedData = await window.api.deleteWorker(id);
    if (deletedData) {
      Swal.fire({ icon: "success", title: "Deleted Successfully" });
    } else {
      Swal.fire({ icon: "error", title: "something went wrong" });
    }
  };
  const handleClick = (mb, emp) => {
    sessionStorage.setItem("mobNo", mb);
    sessionStorage.setItem("emp", emp);
  };
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => (
          <img
            src={row.profileImg}
            alt={row.empName}
            className="w-[100px] h-[100px] rounded-md object-cover object-center "
          />
        ), //alternate way
        id: "profileImg", //id required if you use accessorFn instead of accessorKey
        header: "Profile Image",
        Header: <span style={{ color: "Blue" }}>Profile Image</span>,
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => row.safetyPassNo, //alternate way
        id: "safetyPassNo", //id required if you use accessorFn instead of accessorKey
        header: "SAFETY PASS NO",
        Header: <span style={{ color: "Blue" }}>SAFETY PASS NO</span>,
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => row["empName"], //alternate way
        id: "empName", //id required if you use accessorFn instead of accessorKey
        header: "EMPLOYEE NAME",
        Header: <span style={{ color: "Blue" }}>EMPLOYEE NAME</span>,
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => row["fathersName"], //alternate way
        id: "fathersName", //id required if you use accessorFn instead of accessorKey
        header: "Fathers Name",
        Header: (
          <span style={{ color: "Blue" }} className="uppercase">
            Fathers Name
          </span>
        ),
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => row["designation"], //alternate way
        id: "designation", //id required if you use accessorFn instead of accessorKey
        header: "Designation",
        Header: (
          <span style={{ color: "Blue" }} className=" uppercase">
            Designation
          </span>
        ),
        size: 110, //optional custom markup
      },
      {
        accessorFn: (row) => {
          return (
            <div className="flex gap-2 items-center">
              <Link to="/ppe-table">
                <Button
                  primary
                  onClick={() => {
                    handleClick(row.mobileNo, row.empName);
                  }}
                >
                  PPE ISSUE
                </Button>
              </Link>

              <AddWorkerModal method={"PATCH"} data={row} />
              <AiFillDelete
                onClick={() => {
                  handleDelete(String(row.id));
                }}
                className="bg-red-500 w-[20px] h-[20px] rounded text-white hover:cursor-pointer"
              />
            </div>
          );
        }, //alternate way
        id: "action", //id required if you use accessorFn instead of accessorKey
        header: "Action",
        Header: (
          <span style={{ color: "Blue" }} className=" uppercase">
            Action
          </span>
        ),
        size: 110, //optional custom markup
      },
    ],
    []
  );

  return (
    <MaterialReactTable data={data} columns={columns} enableStickyHeader />
  );
}

export default WorkerTable;
