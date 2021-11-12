import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import image from "../../../assets/studentL.png";
import service_name from "../../../API/Service";
function StudentLogin() {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      username,
      password,
    };
    await service_name
      .verifystudentLogin(userDetails)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        if (response.status === 401) alert("Please create a account to login");
        if (token) {
          window.localStorage.setItem(1, token);
          history.push("/dashboard");
        }
        if (!token) {
          alert("login failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e, id) => {
    if (id == "username") setUsername(e.target.value);
    else if (id == "password") setPassword(e.target.value);
  };

  return (
    <div className="container">
      <nav>
        <a href="/">LOGO</a>
      </nav>

      <div className="main__container">
        <div className="login__container">
          <h1>Student</h1>
          <form className="admin__login" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              name="username"
              onChange={(e) => handleChange(e, "username")}
            ></input>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={(e) => handleChange(e, "password")}
            ></input>

            <Link to="verifyEmail">
              <a className="forgot">Forgot Password</a>
            </Link>
            <input type="submit" value="Log In" />
          </form>

          <span className="login__span">
            New User? <a href="/student-sign">Sign In</a>
          </span>
        </div>

        <div className="img__container">
          <img src={image} alt="illustration" />
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
