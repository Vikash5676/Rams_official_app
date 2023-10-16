import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

function AddRentalItem({ data, method }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listOptions, setListOptions] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState({
    item_name: data ? data.item_name : "",
    stock: 0,
    discarded: false,
  });
  const [stockValue, setStockValue] = useState(0);
  const [validation, setValidation] = useState({
    validate: true,
    message: "",
    message1: "",
  });

  const [formData, setFormData] = useState({
    id: data ? data.id : "",
    date: data ? data.date : "",
    item_name: data ? data.item_name : "",
    serial_no: data ? data.serial_no : "",
    rented_qty: data ? data.rented_qty : 0,
    received_qty: 0,
    location: data ? data.location : "",
    person: data ? data.person : "",
    selected_qty: data ? data.rented_qty : 0,
    modified_qty: data ? data.rented_qty : 0,
  });
  const fetchStock = async () => {
    if (method === "POST") {
      const stock = await window.api.allStocks();
      setStocks(stock);
    } else if (method === "PATCH") {
      const stock = await window.api.stockDetail(formData.item_name);
      setStocks(stock);
    }
  };

  const handleChange = (e) => {
    let items = [];
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "item_name") {
      setStockData({ ...stockData, [e.target.name]: e.target.value });
    }

    stocks?.map((ele) => {
      if (!items.includes(ele.item_name)) {
        items.push(ele);
      }
    });
    if (e.target.name === "item_name") {
      const filteritem = items.filter((ele) => {
        if (ele.item_name.startsWith(e.target.value)) {
          return ele;
        }
      });
      setListOptions(filteritem);
      const stockval = stocks?.filter((ele) => {
        return ele.item_name === e.target.value;
      });
      if (stockval.length === 0) {
        setStockValue(0);
        setValidation({
          message: `This Item is not available`,
          message1: "",
          validate: false,
        });
      } else {
        setStockValue(stockval[0].stock);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "POST") {
      const res = window.api.addRentalItem(formData);
      if (res) {
        stockData.id = String(listOptions[0].id);
        const newStock = window.api.updateStock(stockData);
        if (newStock !== undefined) {
          Swal.fire({
            icon: "success",
            title: "Stock Updated Successfully",
          });
        } else {
          Swal.fire({ icon: "error", title: "Something went wrong" });
        }
      } else {
        Swal.fire({ icon: "error", title: "Something went wrong" });
      }
    } else if (method === "PATCH") {
      const res = window.api.updateRentalItem(formData);
      if (res) {
        stockData.id = String(stocks[0].id);
        const newStock = window.api.updateStock(stockData);
        if (newStock !== undefined) {
          Swal.fire({
            icon: "success",
            title: "Stock Updated Successfully",
          });
        } else {
          Swal.fire({ icon: "error", title: "Something went wrong" });
        }
      } else {
        Swal.fire({ icon: "error", title: "Something went wrong" });
      }
    }
  };

  useEffect(() => {
    if (method === "POST") {
      if (formData.rented_qty > stockValue) {
        setValidation({
          message: `You cannot enter more quantity than stock`,
          message1: "",
          validate: false,
        });
      } else {
        setValidation({ message: "", message1: "", validate: true });
        setStockData({
          ...stockData,
          ["stock"]: parseInt(stockValue) - parseInt(formData.rented_qty),
        });
      }
    }
  }, [stockValue, formData.rented_qty, setStockData]);

  useEffect(() => {
    fetchStock();
  }, [method, formData.item_name]);

  useEffect(() => {
    if (method === "PATCH") {
      if (formData.selected_qty < formData.received_qty) {
        setValidation({
          message: ``,
          message1: "You cannot enter more quantity than rented Qty",
          validate: false,
        });
      } else {
        setValidation({ message: "", message1: "", validate: true });
        setStockData({
          ...stockData,
          ["stock"]:
            parseInt(stocks[0]?.stock) + parseInt(formData.received_qty),
        });
        setFormData({
          ...formData,
          ["rented_qty"]: data.rented_qty - formData.received_qty,
          ["modified_qty"]:
            parseInt(data?.received_qty) + parseInt(formData.received_qty),
        });
      }
    }
  }, [setStocks, formData.received_qty, setStockData]);
  useEffect(() => {
    setFormData({
      id: data ? data.id : "",
      date: data ? data.date : "",
      item_name: data ? data.item_name : "",
      serial_no: data ? data.serial_no : "",
      rented_qty: data ? data.rented_qty : 0,
      received_qty: 0,
      location: data ? data.location : "",
      person: data ? data.person : "",
      selected_qty: data ? data.rented_qty : 0,
    });
    setStockData({
      item_name: "",
      stock: 0,
      discarded: false,
    });
    setValidation({
      message: ``,
      validate: true,
    });
  }, [isModalOpen]);

  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={
        method === "POST" ? (
          <Button
            size="mini"
            color="blue"
            style={{ margin: "0.75rem 0" }}
            disabled={stocks.length < 1 ? true : false}
          >
            Add Rental Item
          </Button>
        ) : (
          <Button
            size="mini"
            color="blue"
            style={{ margin: "0.75rem 0" }}
            disabled={data.rented_qty < 1 ? true : false}
          >
            Received Rental Item
          </Button>
        )
      }
    >
      <Modal.Header>
        {method === "POST" ? <>Add Rental Item</> : <>Edit Job Details</>}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description></Modal.Description>
        <Form
          className="p-[2rem] flex items-center gap-[1rem] flex-wrap"
          onSubmit={handleSubmit}
        >
          <Form.Field required className="flex-[30%]">
            <label htmlFor="">Date</label>
            <input
              type="date"
              name="date"
              required
              onChange={handleChange}
              value={formData.date}
            />
          </Form.Field>
          <Form.Field required={true} className="flex-[30%] ">
            <label htmlFor="">Material Name</label>
            <input
              type="text"
              name="item_name"
              required
              onChange={handleChange}
              list="item_list"
              value={formData.item_name}
            />
            <datalist id="item_list">
              {listOptions?.map((ele) => (
                <option value={ele.item_name} key={`${ele.item_name}_0`}>
                  {ele.item_name}
                </option>
              ))}
            </datalist>
          </Form.Field>
          <Form.Field required={true} className="flex-[30%]">
            <label htmlFor="">Serial No</label>
            <input
              type="text"
              name="serial_no"
              required
              onChange={handleChange}
              value={formData.serial_no}
            />
          </Form.Field>
          <Form.Field required={true} className="flex-[30%]">
            <label htmlFor="">Add Rent Quantity</label>
            <input
              type="number"
              name="rented_qty"
              required
              onChange={handleChange}
              value={formData.rented_qty}
              disabled={method === "PATCH" ? true : false}
            />
            <p className="text-red-500">{validation.message}</p>
          </Form.Field>
          <Form.Field required={true} className="flex-[30%]">
            <label htmlFor="">Received Rent Quantity</label>
            <input
              type="number"
              name="received_qty"
              required
              onChange={handleChange}
              value={parseInt(formData.received_qty)}
              disabled={method === "PATCH" ? false : true}
            />
            <p className="text-red-500">{validation.message1}</p>
          </Form.Field>

          <Form.Field required={true} className="flex-[30%]">
            <label htmlFor="">stock</label>
            <input
              type="number"
              name="stock"
              required
              onChange={handleChange}
              value={stockData.stock}
            />
          </Form.Field>

          <Form.Field className="flex-[30%]">
            <label htmlFor="">Reciver Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={formData.location}
              placeholder="receiver company location"
            />
          </Form.Field>

          <Form.Field className="flex-[30%]">
            <label htmlFor="">Rented To/Person Name</label>
            <input
              type="text"
              name="person"
              onChange={handleChange}
              value={formData.person}
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
              disabled={validation.validate ? false : true}
            />
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddRentalItem;
