import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from '../Utils/MyInput';

import { Button } from "react-bootstrap";
import axios from "axios";
export default function Login() {
  const [loginUser, setLoginUser] = useState({
    username: "", password: ""
  })
  const Init = async () => {
    await axios.get("http://localhost:3001/initDB/")
  }
  const navigate = useNavigate();
  useEffect(async () => {
    Init()
    axios.defaults.withCredentials = true
    const isUserAuth = await axios.get('http://localhost:3001/userAuth/')
    if (isUserAuth.data != "Not Logged In") {
      navigate("/MainPage/movies", { state: { premissions: isUserAuth.data } })
    }
  }, [])
  const setUserCred = async (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true

    const isUserAuth = await axios.post('http://localhost:3001/userAuth/', { ...loginUser })
    if (isUserAuth.data != "No User Found") {

      navigate("/MainPage/movies", { state: { ...isUserAuth.data } })
      return
    }

    alert("User and Password combination was not correct")
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginUser(prev => ({ ...prev, [name]: value }))
  }
  const SetSpecialCreds = async () => {
    axios.defaults.withCredentials = true
    const specialCode = "myspecialcodeforauthentication";
    const isUserAuth = await axios.get(`http://localhost:3001/userAuth/${specialCode}`, {
      body: {

        specialCode: specialCode
      }
    })
    navigate("/MainPage/movies")

  }
  return (
    <div className="Login-Main_Container center ">
      <h2>My Movie Database</h2>
      <div>

        <form onSubmit={setUserCred}>

          <div className="Login-Inputs_Container InputGrid">
            <MyInput
              type="text"
              required
              name="username"
              label="Username"
              value={loginUser.username}
              handleChange={handleChange}
            />
            <MyInput
              type="password"
              required
              name="password"
              label="Password"
              value={loginUser.password}
              handleChange={handleChange}
            />
          </div>

          <div className="Login-Login_Button_Container">
            <Button
              varient="primary"
              type="submit"
              className="Login-Login_Button btn "
            >
              Login
            </Button>
          </div>
        </form>
        <div className="Login-New_User_Container">
          <span className="Login-New_User_Span bold-title cursor-def">
            New User?:
          </span>
          <span onClick={() => navigate("/create")}>Create</span> <br></br>
          <Button
            varient="primary"
            type="submit"
            className="Login-Login_Button btn "
            onClick={() => SetSpecialCreds()}
          >

            Login as special admin
          </Button>
        </div>
      </div>
    </div>
  );
}
