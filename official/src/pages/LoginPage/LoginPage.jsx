import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import "./LoginPage.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ isAuth }) => {
  const router = useNavigate();
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await window.api.userDetails(formdata);
    if (typeof user === "object") {
      sessionStorage.setItem("token", user.password);
      redirectFunc();
    } else {
      alert(user);
    }
  };

  const redirectFunc = async () => {
    const myToken = sessionStorage.getItem("token");
    const verified = await verifytoken(myToken);
    if (verified) {
      isAuth(true);
      router("/");
    }
  };

  const verifytoken = async (token) => {
    const user = await window.api.verifyToken(token);
    return await user;
  };

  useEffect(() => {
    redirectFunc();
  }, [isAuth, router]);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <main className="main">
      <div className="container-login">
        <div className="title-container">
          <div className="logo">
            <img src={logo} alt="Company Logo" />
          </div>
          <div className="title text-center uppercase font-bold">Login</div>
        </div>
        <Form
          className="flex items-center justify-center flex-wrap"
          onSubmit={handleSubmit}
        >
          <Form.Field className="flex-[100%] flex items-center gap-4 " required>
            <label className="label">Username</label>
            <input
              placeholder="Username"
              name="username"
              required
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field className="flex-[100%] flex items-center gap-4" required>
            <label className="label">Password</label>
            <input
              placeholder="Password"
              type="password"
              className="text-black"
              name="password"
              required
              onChange={handleChange}
            />
          </Form.Field>

          <Button type="submit">Login</Button>
        </Form>
      </div>
    </main>
  );
};

export default LoginPage;
