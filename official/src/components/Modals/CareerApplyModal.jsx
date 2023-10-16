import React, { useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

function CareerApplyModal({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {};
  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={<Button color="blue">Apply</Button>}
    >
      <Modal.Header>Application Form For {data.role}</Modal.Header>

      <Modal.Content scrolling className="no-scrollbar">
        <Form
          onSubmit={handleSubmit}
          className="flex flex-wrap p-2 gap-[1vmax] items-center justify-center"
        >
          <Form.Field className="md:flex-[30%]" required={true}>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name="fname"
              required
              placeholder="firstname middlename lastname"
              className=" uppercase"
            />
          </Form.Field>
          <Form.Field className="md:flex-[30%]" required={true}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="abc@gmail.com"
            />
          </Form.Field>
          <Form.Field className="md:flex-[30%]" required={true}>
            <label htmlFor="">Mobile Number</label>
            <input
              type="text"
              name="mbno"
              required
              placeholder="1234567809"
              maxLength={10}
              minLength={10}
            />
          </Form.Field>
          <Form.Field className="md:flex-[30%]" required={true}>
            <label htmlFor="">Alternate Number</label>
            <input
              type="text"
              name="altmbno"
              required
              placeholder="1234567809"
              maxLength={10}
              minLength={10}
            />
          </Form.Field>
          <Form.Field className="md:flex-[30%]" required={true}>
            <label htmlFor="">Upload Resume/CV</label>
            <input
              type="file"
              name="cv"
              required
              placeholder="Upload in pdf format"
              className=" uppercase"
            />
          </Form.Field>
          <Form.Field className="md:flex-[30%]" required={true}>
            <label htmlFor="">Upload Adhar Image</label>
            <input
              type="file"
              name="adhar"
              required
              placeholder="Upload in jpg/png/pdf format"
              className=" uppercase"
            />
          </Form.Field>
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

export default CareerApplyModal;
