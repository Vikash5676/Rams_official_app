"use client";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Modal, Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";

function AddMaterialModal({ data, method }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listOptions, setListOptions] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState({
    item_name: data ? data.item_name : "",
    stock: 0,
    discarded: false,
  });
  const [stockValue, setStockValue] = useState(0);

  const [formData, setFormData] = useState({
    date: data ? data.date : "",
    item_name: data ? data.item_name : "",
    qty: data ? data.qty : 0,
    location: data ? data.location : "",
    person: data ? data.person : "",
  });

  const fetchStock = async () => {
    const data = await window.api.allStocks();
    setStocks(data);
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
      } else {
        setStockValue(stockval[0].stock);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const res = window.api.addMaterial(formData);
    if (res !== undefined) {
      if (listOptions.length < 1) {
        const newStock = window.api.addStock(stockData);
        if (newStock !== undefined) {
          Swal.fire({
            icon: "success",
            title: "Stock Updated Successfully",
          }).then((res) => {
            if (res.isConfirmed) {
              setFormData({
                date: "",
                item_name: "",
                qty: 0,
                location: "",
                person: "",
              });
              setStockData({
                item_name: "",
                stock: 0,
                discarded: false,
              });
            }
            // window.location.reload();
          });
        } else {
          Swal.fire({ icon: "error", title: "Something went wrong" });
        }
      } else {
        stockData.id = String(listOptions[0].id);
        const newStock = window.api.updateStock(stockData);
        if (newStock !== undefined) {
          Swal.fire({
            icon: "success",
            title: "Stock Updated Successfully",
          }).then((res) => {
            if (res.isConfirmed) {
              setFormData({
                date: "",
                item_name: "",
                qty: 0,
                location: "",
                person: "",
              });
              setStockData({
                item_name: "",
                stock: 0,
                discarded: false,
              });
            }
            // window.location.reload();
          });
        } else {
          Swal.fire({ icon: "error", title: "Something went wrong" });
        }
      }
    } else {
      Swal.fire({ icon: "error", title: "Something went wrong" });
    }
  };

  useEffect(() => {
    setStockData({
      ...stockData,
      ["stock"]: parseInt(formData.qty) + parseInt(stockValue),
    });
  }, [stockValue, formData.qty, setStockData]);

  useEffect(() => {
    fetchStock();
  }, []);

  useEffect(() => {
    setFormData({
      date: "",
      item_name: "",
      qty: 0,
      location: "",
      person: "",
    });
    setStockData({
      item_name: "",
      stock: 0,
      discarded: false,
    });
  }, [isModalOpen]);

  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={
        method === "POST" ? (
          <Button size="mini" color="blue" style={{ margin: "0.75rem 0" }}>
            Add New Material
          </Button>
        ) : (
          <AiFillEdit className="bg-blue-500 hover:cursor-pointer text-white w-[20px] h-[20px] rounded" />
        )
      }
    >
      <Modal.Header>
        {method === "POST" ? <>Add New Material</> : <>Edit Job Details</>}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description></Modal.Description>
        <Form
          className="p-[2rem] flex items-center gap-[1rem] flex-wrap"
          onSubmit={handleSubmit}
        >
          <Form.Field required className="flex-[30%]">
            <label htmlFor="">Date</label>
            <input type="date" name="date" required onChange={handleChange} />
          </Form.Field>
          <Form.Field required={true} className="flex-[30%] ">
            <label htmlFor="">Material Name</label>
            <input
              type="text"
              name="item_name"
              required
              onChange={handleChange}
              list="item_list"
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
            <label htmlFor="">Quantity</label>
            <input
              type="number"
              name="qty"
              required
              onChange={handleChange}
              value={formData.qty}
            />
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
            <label htmlFor="">Sender Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={formData.location}
            />
          </Form.Field>

          <Form.Field className="flex-[30%]">
            <label htmlFor="">Sender company / person</label>
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
            />
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddMaterialModal;
