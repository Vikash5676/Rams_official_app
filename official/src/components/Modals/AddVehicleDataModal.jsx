import { useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

function AddVehicle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inform, setInformation] = useState({
    typeOfVehicle: "na",
    vehicleNumber: "na",
    gPNo: "na",
    gPValidity: "na",
    insValidity: "na",
    polution: "na",
    fitnes: "na",
    roadTax: "na",
    permit: "na",
    loadTest: "na",
  });

  const handleChange = (e) => {
    setInformation({ ...inform, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postReq = await window.api.addVehicleData(inform);
    if (postReq) {
      Swal.fire({ icon: "success", text: "Data Saved Successfully" });
    } else {
      Swal.fire({ icon: "error", text: "Something Went Wrong" });
    }
  };

  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={
        <Button color="blue" inverted>
          Add Vehicle
        </Button>
      }
      size="large"
    >
      <Modal.Header>Add Vehicle details</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center p-16 font-semibold gap-[1rem]">
            <div className="flex-[30%]">
              <Form.Input
                name="typeOfVehicle"
                label="Types Of Vehicle"
                type="text"
                required={true}
                onChange={handleChange}
                placeholder="Truck/Tata Ace/407 LTP"
              />
            </div>
            <div className="flex-[30%]">
              <Form.Input
                name="vehicleNumber"
                label="Vehicle Number"
                type="text"
                onChange={handleChange}
                required={true}
                placeholder="JH05AA - 1000"
              />
            </div>
            <div className="flex-[30%]">
              <Form.Input
                label="Gate Pass Number"
                type="text"
                name="gPNo"
                onChange={handleChange}
                placeholder={123456}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Gate Pass Validity"
                type="date"
                name="gPValidity"
                onChange={handleChange}
                placeholder={"01-01-2023"}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Ins Validity"
                type="date"
                name="insValidity"
                onChange={handleChange}
                placeholder={"01-01-2023"}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Pollution"
                type="date"
                name="polution"
                onChange={handleChange}
                placeholder={"01-01-2023"}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Fitness"
                type="date"
                name="fitnes"
                onChange={handleChange}
                placeholder={"01-01-2023"}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Road Tax"
                type="date"
                name="roadTax"
                onChange={handleChange}
                placeholder={"01-01-2023"}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Permit"
                type="date"
                name="permit"
                onChange={handleChange}
                placeholder={"01-01-2023"}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Load Test"
                type="date"
                name="loadTest"
                onChange={handleChange}
                placeholder={"01-01-2023"}
              />
            </div>
          </div>
          <hr />
          <div className="py-4 float-right">
            <Button color="red" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button type="submit" content="Submit" color="blue" />
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddVehicle;
