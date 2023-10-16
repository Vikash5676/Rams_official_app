import { useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

function EditVehicle({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inform, setInformation] = useState({
    id: String(data.id),
    typeOfVehicle: data.typeOfVehicle,
    vehicleNumber: data.vehicleNumber,
    gPNo: data.gPNo,
    gPValidity: data.gPValidity,
    insValidity: data.insValidity,
    polution: data.polution,
    fitnes: data.fitnes,
    roadTax: data.roadTax,
    permit: data.permit,
    loadTest: data.loadTest,
  });

  const handleChange = (e) => {
    setInformation({ ...inform, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postReq = await window.api.updateVehicleData(inform);
    if (postReq) {
      Swal.fire({ icon: "success", text: "Data Updated Successfully" });
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
          Edit
        </Button>
      }
      size="large"
    >
      <Modal.Header>Edit Vehicle details</Modal.Header>
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
                value={inform.typeOfVehicle}
              />
            </div>
            <div className="flex-[30%]">
              <Form.Input
                name="vehicleNumber"
                label="Vehicle Number"
                type="text"
                onChange={handleChange}
                required={true}
                value={inform.vehicleNumber}
              />
            </div>
            <div className="flex-[30%]">
              <Form.Input
                label="Gate Pass Number"
                type="text"
                name="gPNo"
                onChange={handleChange}
                value={inform.gPNo}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Gate Pass Validity"
                type="date"
                name="gPValidity"
                onChange={handleChange}
                value={inform.gPValidity}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Ins Validity"
                type="date"
                name="insValidity"
                onChange={handleChange}
                value={inform.insValidity}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Pollution"
                type="date"
                name="polution"
                onChange={handleChange}
                value={inform.polution}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Fitness"
                type="date"
                name="fitnes"
                onChange={handleChange}
                value={inform.fitnes}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Road Tax"
                type="date"
                name="roadTax"
                onChange={handleChange}
                value={inform.roadTax}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Permit"
                type="date"
                name="permit"
                onChange={handleChange}
                value={inform.permit}
              />
            </div>
            <div className="flex-[10%]">
              <Form.Input
                label="Load Test"
                type="date"
                name="loadTest"
                onChange={handleChange}
                value={inform.loadTest}
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

export default EditVehicle;
