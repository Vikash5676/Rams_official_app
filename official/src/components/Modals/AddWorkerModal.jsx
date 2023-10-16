"use client";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

function AddWorkerModal({ method, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inform, setInformation] = useState({
    id: data ? String(data.id) : "",
    safetyPassNo: data ? data.safetyPassNo : "",
    empName: data ? data.empName : "",
    fathersName: data ? data.fathersName : "",
    designation: data ? data.designation : "",
    spValid: data ? data.spValid : "",
    woNo: data ? data.woNo : "",
    gpNo: data ? data.gpNo : "",
    gpValid: data ? data.gpValid : "",
    email: data ? data.email : "",
    profileImg: data ? data.profileImg : "",
    mobileNo: data ? data.mobileNo : "",
  });
  const handleChange = (e) => {
    setInformation({ ...inform, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (method === "POST") {
      const postReq = await window.api.addWorker(inform);
      if (postReq) {
        Swal.fire({ icon: "success", text: "Data Saved Successfully" });
      } else {
        Swal.fire({ icon: "error", text: "Something Went Wrong" });
      }
    } else if (method === "PATCH") {
      const postReq = await window.api.updateWorker(inform);
      if (postReq) {
        Swal.fire({ icon: "success", text: "Data Updated Successfully" });
      } else {
        Swal.fire({ icon: "error", text: "Something Went Wrong" });
      }
    }
  };

  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={
        method === "POST" ? (
          <Button color="blue" style={{ margin: "0.75rem 0" }}>
            Add New Worker
          </Button>
        ) : (
          <AiFillEdit className="bg-blue-500 hover:cursor-pointer text-white w-[20px] h-[20px] rounded" />
        )
      }
    >
      <Modal.Header>Add New Worker</Modal.Header>
      <Modal.Content>
        <Modal.Description></Modal.Description>
        <Form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center p-16  gap-[1rem]"
        >
          <Form.Field className="flex-[22%]">
            <label htmlFor="">Saftey Pass No.</label>
            <input
              type="text"
              name="safetyPassNo"
              value={inform.safetyPassNo}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Employee Name</label>
            <input
              type="text"
              name="empName"
              value={inform.empName}
              onChange={handleChange}
              required
            />
          </Form.Field>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Fathers Name</label>
            <input
              type="text"
              name="fathersName"
              required
              value={inform.fathersName}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field required className="flex-[22%]">
            <label htmlFor="">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              value={inform.designation}
              required
            />
          </Form.Field>

          <Form.Field className="flex-[22%]">
            <label htmlFor="">Saftey Pass Validity</label>
            <input
              type="date"
              name="spValid"
              onChange={handleChange}
              value={inform.spValid}
            />
          </Form.Field>

          <Form.Field className="flex-[22%]">
            <label htmlFor="">Wo No.</label>
            <input
              type="number"
              name="woNo"
              onChange={handleChange}
              value={inform.woNo}
            />
          </Form.Field>

          <Form.Field className="flex-[22%]">
            <label htmlFor="">Gate Pass No.</label>
            <input
              type="text"
              name="gpNo"
              onChange={handleChange}
              value={inform.gpNo}
            />
          </Form.Field>
          <Form.Field className="flex-[22%]">
            <label htmlFor="">Gate Pass validity</label>
            <input
              type="date"
              name="gpValid"
              onChange={handleChange}
              value={inform.gpValid}
            />
          </Form.Field>
          <Form.Field className="flex-[22%]">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={inform.email}
            />
          </Form.Field>
          <Form.Field className="flex-[22%]">
            <label htmlFor="">Profile Image</label>
            <input
              type="file"
              name="profileImg"
              onChange={handleChange}
              accept="image/png, image/jpeg"
            />
          </Form.Field>
          <Form.Field className="flex-[22%]" required>
            <label htmlFor="">Mobile Number</label>
            <input
              type="number"
              name="mobileNo"
              onChange={handleChange}
              value={inform.mobileNo}
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

export default AddWorkerModal;
