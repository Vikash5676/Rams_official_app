"use client";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

const AddCareerModal = React.memo(({ method, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: data ? String(data._id) : "",
    role: data ? data.role : "",
    description: data ? data.description : "",
    vacancies: data ? data.vacancies : "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`/api/job`, {
      method: `${method}`,
      body: JSON.stringify(formData),
    });
    if (res.status === 200) {
      Swal.fire({ icon: "success", title: "Data Saved Successfully" }).then(
        (res) => {
          if (res.isConfirmed) {
            setFormData({
              role: "",
              description: "",
              vacancies: "",
            });
          }
          window.location.reload();
        }
      );
    } else {
      Swal.fire({ icon: "error", title: "Something went wrong" });
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
            Add New Position
          </Button>
        ) : (
          <AiFillEdit className="bg-blue-500 hover:cursor-pointer text-white w-[20px] h-[20px] rounded" />
        )
      }
    >
      <Modal.Header>
        {method === "POST" ? <>Add New POsition</> : <>Edit Job Details</>}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description></Modal.Description>
        <Form
          className="p-[2rem] flex items-center gap-[1rem] flex-wrap"
          onSubmit={handleSubmit}
        >
          <Form.Field required className="flex-[30%]">
            <label htmlFor="">Role</label>
            <input
              type="text"
              name="role"
              required
              onChange={handleChange}
              value={formData.role}
            />
          </Form.Field>
          <Form.Field required={true} className="flex-[30%] ">
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              name="description"
              required
              rows={1}
              onChange={handleChange}
              value={formData.description}
            />
          </Form.Field>
          <Form.Field required={true} className="flex-[30%]">
            <label htmlFor="">Vacancies</label>
            <input
              type="number"
              name="vacancies"
              required
              onChange={handleChange}
              value={formData.vacancies}
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
});

export default AddCareerModal;
