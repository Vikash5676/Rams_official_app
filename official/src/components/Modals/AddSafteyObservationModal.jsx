import { React, useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

const AddSafteyObservationModal = ({ method, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datas, setDatas] = useState([""]);
  const [observation, setObservation] = useState({
    violation_date: "",
    site_supervisor_concerned: "",
    violation_detail: "",
    manpower: "",
    attachment: "na",
    observation_locked_by: "",
    action_taken: "",
    current_status: "",
  });
  const [add, setAdd] = useState([1]);

  const addManpower = () => {
    let ext = [...add];
    ext.push(add[add.length - 1] + 1);
    setAdd(ext);
  };

  const deleteManPower = () => {
    let ext = [...add];
    ext.pop();
    setAdd(ext);
  };

  const onchangeInput = (index, val) => {
    let temp = datas;
    temp[index - 1] = val.target.value;
    setDatas(temp);
    setObservation({ ...observation, ["manpower"]: temp.join(",") });
  };

  const handleChange = (e) => {
    setObservation({ ...observation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await window.api.addSafety(observation);
    if (res) {
      Swal.fire({ icon: "success", title: "Data Saved Successfully" });
    } else {
      Swal.fire({ icon: "error", title: "Something Went Wrong" });
    }
  };

  useEffect(() => {}, [setAdd]);

  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={
        method === "POST" ? (
          <Button color="blue" style={{ margin: "0.75rem 0" }}>
            Add New Observation
          </Button>
        ) : (
          <AiFillEdit className="bg-blue-500 hover:cursor-pointer text-white w-[30px] h-[30px] rounded" />
        )
      }
    >
      <Modal.Header>
        {method === "POST" ? (
          <>Saftey Observservation Form</>
        ) : (
          <>Edit Observation</>
        )}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description></Modal.Description>
        <Form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center gap-3"
        >
          <Form.Field className="flex-[30%]" required>
            <label>Date of Violation</label>
            <input
              onChange={handleChange}
              placeholder="Date of Violation"
              type="date"
              name="violation_date"
              required
            />
          </Form.Field>
          <Form.Field className="flex-[30%]" required>
            <label>Concerned Site Supervisor</label>
            <input
              onChange={handleChange}
              placeholder="Concerned Site Supervisor"
              type="text"
              name="site_supervisor_concerned"
              required
            />
          </Form.Field>
          <Form.Field className="flex-[30%]" required>
            <label>Violation details</label>
            <input
              onChange={handleChange}
              placeholder="Violation details"
              type="text"
              name="violation_detail"
              required
            />
          </Form.Field>
          <Form.Field className="flex-[100%]">
            <label>Man Power</label>
            {add.map((index, ele) => (
              <input
                key={ele}
                placeholder="name"
                type="text"
                onChange={(val) => {
                  onchangeInput(index, val);
                }}
                // name="man_power"
              />
            ))}

            <Button
              onClick={() => {
                addManpower();
              }}
              style={{ margin: "5px 0" }}
              color="blue"
            >
              Add Manpower
            </Button>
            <Button
              onClick={() => {
                deleteManPower();
              }}
              style={{ margin: "5px 5px" }}
              disabled={add.length < 2 ? true : false}
              color="red"
            >
              Delete Manpower
            </Button>
          </Form.Field>
          <Form.Field className="flex-[30%]">
            <label>Attachment</label>
            <input
              onChange={handleChange}
              placeholder="Attachment"
              type="file"
              name="attachment"
            />
          </Form.Field>
          <Form.Field className="flex-[30%]" required>
            <label>Observation Locked by</label>
            <input
              onChange={handleChange}
              placeholder="Observation Locked by"
              type="text"
              name="observation_locked_by"
              required
            />
          </Form.Field>
          <Form.Field className="flex-[30%]" required>
            <label>Action Taken</label>
            <input
              onChange={handleChange}
              placeholder="Action Taken"
              type="text"
              name="action_taken"
              required
            />
          </Form.Field>
          <Form.Group inline required>
            <label>Current Status</label>
            <Form.Field className="flex-[30%]">
              <label>Open</label>
              <input
                onChange={handleChange}
                type="radio"
                value="open"
                style={{ color: "red", backgroundColor: "red" }}
                name="current_status"
                required
              />
            </Form.Field>
            <Form.Field className="flex-[30%]">
              <label>Close</label>
              <input
                onChange={handleChange}
                value="close"
                style={{ color: "green", backgroundColor: "green" }}
                type="radio"
                name="current_status"
                required
              />
            </Form.Field>
          </Form.Group>
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
};

export default AddSafteyObservationModal;
