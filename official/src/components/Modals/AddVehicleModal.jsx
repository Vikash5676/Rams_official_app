"use client";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

function AddVehicleModal({ method, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [option, setOption] = useState([]);

  const placeholder = [
    "JH05AA 1234",
    "Sakchi",
    "Bistupur",
    "12:00 AM",
    "1 or 2 or 3",
    "Driver gatepass name",
  ];
  const [inform, setInformation] = useState({
    id: data ? data.id : "",
    driverName: data ? data.driverName : "",
    date: data ? data.date : new Date().toLocaleDateString("fr-FR"),
    vehicleNumber: data ? data.vehicleNumber : "",
    location: data ? data.location : "",
    time: data ? data.time : "",
    drop_loc: data ? data.drop_loc : "",
    trip: data ? data.trip : "",
    entryTime: new Date(),
  });
  const handleChange = (e) => {
    setInformation({ ...inform, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e, { value }) => {
    setInformation({ ...inform, ["vehicleNumber"]: value });
  };

  const handleSubmit = async () => {
    if (method === "POST") {
      const postReq = await window.api.addVehicleEntry(inform);
      if (postReq) {
        Swal.fire({ icon: "success", text: "Data Saved Successfully" });
      } else {
        Swal.fire({ icon: "error", text: "Something Went Wrong" });
      }
    } else if (method === "PATCH") {
      const postReq = await window.api.updateVehicleEntry(inform);
      if (postReq) {
        Swal.fire({ icon: "success", text: "Data updated Successfully" });
      } else {
        Swal.fire({ icon: "error", text: "Something Went Wrong" });
      }
    }
  };

  const fetchVehicleNo = async () => {
    const res = await window.api.vehicleData();
    const options = [];
    res.map((ele) => {
      options.push({
        key: ele.vehicleNumber,
        text: ele.vehicleNumber,
        value: ele.vehicleNumber,
      });
    });
    setOption(options);
  };

  useEffect(() => {
    fetchVehicleNo();
  }, []);

  useEffect(() => {
    if (isModalOpen === false) {
      setInformation({
        id: data ? data.id : "",
        driverName: data ? data.driverName : "",
        date: data ? data.date : new Date().toLocaleDateString("fr-FR"),
        vehicleNumber: data ? data.vehicleNumber : "",
        location: data ? data.location : "",
        time: data ? data.time : "",
        drop_loc: data ? data.drop_loc : "",
        trip: data ? data.trip : "",
        entryTime: new Date(),
      });
    }
  }, [isModalOpen]);
  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={
        method === "POST" ? (
          <Button color="blue" style={{ margin: "0.75rem 0" }}>
            Add New Entry
          </Button>
        ) : (
          <AiFillEdit className="bg-blue-500 hover:cursor-pointer text-white w-[20px] h-[20px] rounded" />
        )
      }
    >
      <Modal.Header>Add New Vechicle Entry</Modal.Header>
      <Modal.Content>
        <Modal.Description></Modal.Description>
        <Form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center p-16  gap-[1rem]"
        >
          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Driver Name</label>
            <input
              type="text"
              name="driverName"
              value={inform.driverName}
              onChange={handleChange}
              required
              placeholder={placeholder[5]}
            />
          </Form.Field>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Date</label>
            <input
              type="text"
              name="date"
              value={new Date().toLocaleDateString("fr-FR")}
              required
            />
          </Form.Field>

          <Form.Select
            options={option}
            label={"Vehicle Number"}
            name="vehicleNumber"
            required
            className="flex-[22%]"
            onChange={handleSelectChange}
            placeholder={placeholder[0]}
          ></Form.Select>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={inform.location}
              placeholder={placeholder[1]}
              required
            />
          </Form.Field>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Drop</label>
            <input
              type="text"
              name="drop_loc"
              onChange={handleChange}
              value={inform.drop_loc}
              placeholder={placeholder[2]}
              required
            />
          </Form.Field>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Time</label>
            <input
              type="time"
              name="time"
              onChange={handleChange}
              value={inform.time}
              placeholder={placeholder[3]}
              required
            />
          </Form.Field>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Trip</label>
            <input
              type="text"
              name="trip"
              onChange={handleChange}
              value={inform.trip}
              placeholder={placeholder[4]}
              required
            />
          </Form.Field>

          <div className="w-full ">
            <Button
              color="red"
              onClick={() => setIsModalOpen(false)}
              className="float-right"
            >
              Close
            </Button>
            <Button
              type="submit"
              content="Submit"
              color="blue"
              className="float-right"
            />
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddVehicleModal;
