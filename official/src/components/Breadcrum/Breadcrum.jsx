import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Breadcrum = ({ nav, setnav }) => {
  let arr = [...nav];
  const router = useNavigate();
  const handleNav = () => {
    if (arr.length > 1) {
      arr.pop();
      router(arr[arr.length - 1]);
    }
    setnav(arr);
  };
  return (
    <section className="top-container">
      <IoArrowBack onClick={handleNav} />
    </section>
  );
};

export default Breadcrum;
