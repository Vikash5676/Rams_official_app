import React, { useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

import Swal from "sweetalert2";

function PpeModal({ mbNo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [equipment, setEquipment] = useState({
    mobileNo: sessionStorage.getItem("mobNo"),
    employeeName: sessionStorage.getItem("emp"),
    head_protection: "",
    face_protection: "",
    hand_protection: "",
    leg_protection: "",
    eye_protection: "",
    road_protection: "",
    head_protection_issue: "",
    face_protection_issue: "",
    hand_protection_issue: "",
    leg_protection_issue: "",
    eye_protection_issue: "",
    road_protection_issue: "",
    head_protection_custom_issue: "",
    face_protection_custom_issue: "",
    hand_protection_custom_issue: "",
    leg_protection_custom_issue: "",
    eye_protection_custom_issue: "",
    road_protection_custom_issue: "",
    date_issue: "",
    previous_date_issue: "",
  });
  const handleChange = (e, data) => {
    setEquipment({
      ...equipment,
      [data.name]: data.value,
    });
  };
  const handleInputChange = (e) => {
    setEquipment({ ...equipment, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (
      equipment.head_protection === "" &&
      equipment.face_protection === "" &&
      equipment.hand_protection === "" &&
      equipment.leg_protection === "" &&
      equipment.eye_protection === "" &&
      equipment.road_protection === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Please Select one of the equipment First",
      });
    } else {
      const res = await window.api.addPpe(equipment);
      if (res) {
        Swal.fire({ icon: "success", title: "Successfully Saved" });
      } else {
        Swal.fire({ icon: "error", title: "Something Went Wrong" });
      }
    }
  };

  const hp = [
    {
      key: "",
      text: "",
      value: "",
    },
    {
      key: "Helmet",
      text: "Helmet",
      value: "Helmet",
    },
    {
      key: "Ear Plug",
      text: "Ear Plug",
      value: "Ear Plug",
    },

    {
      key: "Saftey Belt",
      text: "Saftey Belt",
      value: "Saftey Belt",
    },
  ];
  const fp = [
    {
      key: "",
      text: "",
      value: "",
    },

    {
      key: "Saftey Nose Mask",
      text: "Saftey Nose Mask",
      value: "Saftey Nose Mask",
    },
  ];
  const hap = [
    {
      key: "",
      text: "",
      value: "",
    },
    {
      key: "Elecrical Gloves",
      text: "Elecrical Gloves",
      value: "Elecrical Gloves",
    },
    {
      key: "Cotton Gloves",
      text: "Cotton Gloves",
      value: "Cotton Gloves",
    },
    {
      key: "18 inch Cutting Gloves",
      text: "18 inch Cutting Gloves",
      value: "18 inch Cutting Gloves",
    },
    {
      key: "Nylon Hand",
      text: "Nylon Hand",
      value: "Nylon Hand",
    },
  ];
  const lp = [
    {
      key: "",
      text: "",
      value: "",
    },
    {
      key: "Sing Guard",
      text: "Sing Guard",
      value: "Sing Guard",
    },
    {
      key: "Leather Leg Guard",
      text: "Leather Leg Guard",
      value: "Leather Leg Guard",
    },
    {
      key: "Saftey Shoes",
      text: "Saftey Shoes",
      value: "Saftey Shoes",
    },
  ];
  const ep = [
    {
      key: "",
      text: "",
      value: "",
    },
    {
      key: "Saftey Goggle",
      text: "Saftey Goggle",
      value: "Saftey Goggle",
    },
    {
      key: "Cutting Goggle",
      text: "Cutting Goggle",
      value: "Cutting Goggle",
    },
  ];
  const rs = [
    {
      key: "",
      text: "",
      value: "",
    },
    {
      key: "Fluorescent jacket",
      text: "Fluorescent jacket",
      value: "Fluorescent jacket",
    },
    {
      key: "FR Jacket",
      text: "FR Jacket",
      value: "FR Jacket",
    },
    {
      key: "Jeans Jacket",
      text: "Jeans Jacket",
      value: "Jeans Jacket",
    },
  ];

  const hpp = [
    {
      key: "",
      text: "",
      value: "",
    },
    {
      key: "opt1",
      text: `Equipment condition is not good`,
      value: `Equipment condition is not good`,
    },
    {
      key: "opt2",
      text: `Lost the equipment`,
      value: `Lost the equipment`,
    },
    {
      key: "opt3",
      text: `Equipment has passed the issue plan`,
      value: `Equipment has passed the issue plan`,
    },
    {
      key: "opt4",
      text: `Equipment has been damaged`,
      value: "Equipment has been damaged",
    },
    {
      key: "opt5",
      text: `custom issue`,
      value: "custom issue",
    },
  ];
  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={<Button color="blue">Add PPE</Button>}
    >
      <Modal.Header>PPE Issue Form</Modal.Header>

      <Modal.Content scrolling className="no-scrollbar">
        <Form
          onSubmit={handleSubmit}
          className="flex flex-wrap p-2 gap-[1vmax] items-center justify-center"
        >
          <Form.Field required={true} className="flex-[30%]">
            <label htmlFor="">Employee Name</label>
            <input
              type="text"
              name="employeeName"
              required
              onChange={handleInputChange}
              value={equipment.employeeName}
            />
          </Form.Field>
          <Form.Field className="md:flex-[30%]" required={true}>
            <label htmlFor="">Issue Date</label>
            <input
              type="date"
              name="date_issue"
              required
              placeholder="2023-01-01"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field className="md:flex-[30%]">
            <label htmlFor="">Previous Issue Date</label>
            <input
              type="date"
              name="previous_date_issue"
              placeholder="2023-01-01"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Group
            className=" flex-[45%] border-[1px] border-black p-2"
            grouped
          >
            <label htmlFor="">Head Protection</label>

            <Form.Select
              className="flex-[30%]"
              placeholder="Head Protection"
              name="head_protection"
              search
              selection
              options={hp}
              onChange={handleChange}
            />
            <Form.Select
              className="flex-[30%]"
              placeholder="Issue for Head Protection equipment"
              name="head_protection_issue"
              search
              selection
              options={hpp}
              onChange={handleChange}
              disabled={equipment?.head_protection === "" ? true : false}
            />
            {equipment?.head_protection_issue === "custom issue" ? (
              <Form.Field className="md:flex-[30%]" required={true}>
                <label htmlFor="">Enter Custom issue</label>
                <input
                  type="text"
                  name="head_protection_custom_issue"
                  onChange={handleInputChange}
                  required
                />
              </Form.Field>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group
            className=" flex-[45%] border-[1px] border-black p-2"
            grouped
          >
            <label htmlFor="">Face Protection</label>

            <Form.Select
              className="flex-[30%]"
              placeholder="Face Protection"
              name="face_protection"
              search
              selection
              options={fp}
              onChange={handleChange}
            />
            <Form.Select
              className="flex-[30%]"
              placeholder="Issue for Face Protection equipment"
              name="face_protection_issue"
              search
              selection
              options={hpp}
              onChange={handleChange}
              disabled={equipment?.face_protection === "" ? true : false}
            />
            {equipment?.face_protection_issue === "custom issue" ? (
              <Form.Field className="md:flex-[30%]" required={true}>
                <label htmlFor="">Enter Custom issue</label>
                <input
                  type="text"
                  name="face_protection_custom_issue"
                  onChange={handleInputChange}
                  required
                />
              </Form.Field>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group
            className=" flex-[45%] border-[1px] border-black p-2"
            grouped
          >
            <label htmlFor="">Hand Protection</label>

            <Form.Select
              className="flex-[30%]"
              placeholder="Hand Protection"
              name="hand_protection"
              search
              selection
              options={hap}
              onChange={handleChange}
            />
            <Form.Select
              placeholder="Issue for Hand Protection equipment"
              name="hand_protection_issue"
              search
              selection
              options={hpp}
              onChange={handleChange}
              disabled={equipment?.hand_protection === "" ? true : false}
            />
            {equipment?.hand_protection_issue === "custom issue" ? (
              <Form.Field className="md:flex-[30%]" required={true}>
                <label htmlFor="">Enter Custom issue</label>
                <input
                  type="text"
                  name="face_protection_custom_issue"
                  onChange={handleInputChange}
                  required
                />
              </Form.Field>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group
            className=" flex-[45%] border-[1px] border-black p-2"
            grouped
          >
            <label htmlFor="">Leg Protection</label>

            <Form.Select
              className="flex-[30%]"
              placeholder="Leg Protection"
              name="leg_protection"
              search
              selection
              options={lp}
              onChange={handleChange}
            />
            <Form.Select
              placeholder="Issue for Leg Protection equipment"
              name="leg_protection_issue"
              search
              selection
              options={hpp}
              onChange={handleChange}
              disabled={equipment?.leg_protection === "" ? true : false}
            />
            {equipment?.leg_protection_issue === "custom issue" ? (
              <Form.Field className="md:flex-[30%]" required={true}>
                <label htmlFor="">Enter Custom issue</label>
                <input
                  type="text"
                  name="face_protection_custom_issue"
                  onChange={handleInputChange}
                  required
                />
              </Form.Field>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group
            className=" flex-[45%] border-[1px] border-black p-2"
            grouped
          >
            <label htmlFor="">Eye Protection</label>

            <Form.Select
              className="flex-[30%]"
              placeholder="Eye Protection"
              name="eye_protection"
              search
              selection
              options={ep}
              onChange={handleChange}
            />
            <Form.Select
              className="flex-[30%]"
              name="eye_protection_issue"
              search
              selection
              options={hpp}
              onChange={handleChange}
              disabled={equipment?.eye_protection === "" ? true : false}
            />
            {equipment?.eye_protection_issue === "custom issue" ? (
              <Form.Field className="md:flex-[30%]" required={true}>
                <label htmlFor="">Enter Custom issue</label>
                <input
                  type="text"
                  name="face_protection_custom_issue"
                  onChange={handleInputChange}
                  required
                />
              </Form.Field>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group
            className=" flex-[45%] border-[1px] border-black p-2"
            grouped
          >
            <label htmlFor="">Road Saftey</label>

            <Form.Select
              placeholder="Road Saftey"
              name="road_protection"
              search
              selection
              options={rs}
              onChange={handleChange}
            />
            <Form.Select
              placeholder="Issue for Road Saftey equipment"
              name="road_protection_issue"
              search
              selection
              options={hpp}
              onChange={handleChange}
              disabled={equipment?.road_protection === "" ? true : false}
            />
            {equipment?.road_protection_issue === "custom issue" ? (
              <Form.Field className="md:flex-[30%]" required={true}>
                <label htmlFor="">Enter Custom issue</label>
                <input
                  type="text"
                  name="face_protection_custom_issue"
                  onChange={handleInputChange}
                  required
                />
              </Form.Field>
            ) : (
              ""
            )}
          </Form.Group>

          <Modal.Actions className="py-4 flex-[100%]">
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
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default PpeModal;
