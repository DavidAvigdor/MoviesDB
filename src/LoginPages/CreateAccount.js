import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { createUser } from '../BL/getUsersData'
import { validateUsername } from '../BL/DataValidation'

import AddPage from '../Utils/AddPage';
export default function CreateAccount() {
  const navigate = useNavigate();

  const handleCreateUser = async (user) => {
    const res = await createUser({ ...user })
    if (res) {
      return navigate("/")
    }
  }
  useEffect(async () => {
    axios.defaults.withCredentials = true
    const { data: isUserAuth } = await axios.get('http://localhost:3001/userAuth/')
    if (isUserAuth != "Not Logged In")
      navigate("/MainPage/movies", { state: { premissions: isUserAuth } })

  }, [])
  return (
    <div className="Create_Account-Main_Div ">

      <AddPage
        operation="Sign Up"
        addFunction={handleCreateUser}
        cancelFunction={() => { navigate("/") }}
        validataionFunction={validateUsername}
        inputs={[{
          type: "text",
          name: "username",
          label: "Username"
        }, {
          type: "password",
          name: "password",
          label: "Password"
        }]}
        confirmLabel={"Create"}
        abortLabel={"Cancel"}
      />
    </div >
  );
}
