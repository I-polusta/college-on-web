import React from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import LoginNavbar from "../../../navbar/LoginNavbar";
import service_name from "../../../API/AuthService";
import image from "../../assets/email__verify.png";

function Admin_emailverify() {
  const history = useHistory();
  const [username, setUsername] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminU = {
      username,
    };
    await service_name
      .verifyEmailAdmin(adminU)
      .then((response) => {
        console.log(response);
        if (response.data === "Valid Email\nOtp Sent")
          history.push("/verifyOtp-admin");
        if (response.data === "Invalid Email") {
          alert("user does not exist. PLease create a account");
        }
        if (response.data === "OTP already sent") {
          history.push({
            pathname: "/verifyOtp-admin",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e, id) => {
    if (id == "username") setUsername(e.target.value);
  };

  return (
    <div className="container">
      <LoginNavbar />
      <div className="main__container">
        <div className="login__container">
          <h1>Enter Email Id</h1>
          <form className="admin__login" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              name="username"
              onChange={(e) => handleChange(e, "username")}
            ></input>
            <input type="submit" value="Send OTP" />
          </form>
        </div>

        <div className="img__container">
          <img src={image} alt="illustration" />
        </div>
      </div>
    </div>
  );
}

export default Admin_emailverify;
