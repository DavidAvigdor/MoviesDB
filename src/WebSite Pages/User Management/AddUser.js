import React, { useContext, useState } from "react";
import { StateFunctions } from "./Users";
import { addUser } from "../../BL/DealWithUsers";
import { WebSiteContext } from "../MainPage";
import { validateUser } from "../../BL/DataValidation"
import AddPage from '../../Utils/AddPage';
export default function AddUser() {
  const { handleAddInfo, users } = useContext(WebSiteContext);
  const { HandleShowEditUser } = useContext(StateFunctions);
  const [userPremissions, setUserPremissions] = useState({ premissions: [] })

  const validateUserWrapper = ({ firstName, lastName, username, session }) => {
    return validateUser({ firstName, lastName, username, session }, users)
  }
  const handleAddUser = async (userValues) => {
    const { id, createdDate } = await addUser({ ...userValues, ...userPremissions });
    const newUser = { ...userValues, ...userPremissions, id, password: null, createdDate }
    handleAddInfo("user", newUser)

  }
  const setpremission = (e) => {
    const sub = document.getElementById("per1")
    const mov = document.getElementById("per5")
    let premissions = userPremissions.premissions;
    if (e.target.checked && (e.target.value === "Delete Subscriptions" || e.target.value === "Create Subscriptions" || e.target.value === "Update Subscriptions")) {
      if (premissions.indexOf("View Subscriptions") === -1)
        premissions.push("View Subscriptions")
      sub.checked = true;
    }
    if (e.target.checked && (e.target.value === "Delete Movies" || e.target.value === "Create Movies" || e.target.value === "Update Movies")) {
      if (premissions.indexOf("View Movies") === -1)
        premissions.push("View Movies")
      mov.checked = true;
    }

    e.target.checked ? premissions.push(e.target.value) : premissions = premissions.filter(premission => premission !== e.target.value)
    setUserPremissions(oldValues => ({ ...oldValues, premissions }))

  }
  return (
    <div>
      <div className="Edit_User-Main_Div">


        <div className="grid2by2">
          <AddPage
            objType="User"
            operation="Add"
            addFunction={handleAddUser}
            cancelFunction={() => { HandleShowEditUser("All", null) }}
            validataionFunction={validateUserWrapper}
            inputs={[{
              type: "text",
              name: "firstName",
              label: "First Name",

            }, {
              type: "text",
              name: "lastName",
              label: "Last Name",
            }, {
              type: "text",
              name: "username",
              label: "User Name",

            }, {
              type: "text",
              name: "session",
              label: "Session Time Out (Minutes)",

            }]}
            confirmLabel={"Save"}
            abortLabel={"Cancel"}
          />



          <div className="Add_User-Input_Container">
            <span className="Edit_User-Permissions_Span"> Permissions:</span>
            <div className=" Edit_User-Premissions_Grid grid2by2">

              <div>

                <input
                  type="checkbox"
                  id="per1"
                  name="per1"
                  value="View Subscriptions"
                  onChange={(e) => setpremission(e)} />
                <span className="mr-2"> View Subscriptions</span><br></br>

                <input
                  type="checkbox"
                  id="per2"
                  name="per2"
                  value="Create Subscriptions"
                  onChange={(e) => setpremission(e)}
                />
                <span > Create Subscriptions</span> <br></br>

                <input
                  type="checkbox"
                  id="per3"
                  name="per3"
                  value="Delete Subscriptions"
                  onChange={(e) => setpremission(e)}
                />
                <span > Delete Subscriptions</span><br></br>

                <input
                  type="checkbox"
                  id="per4"
                  name="per4"
                  value="Update Subscriptions"
                  onChange={(e) => setpremission(e)}
                />
                <span > Update Subscriptions</span><br></br>
              </div>
              <div>

                <input
                  type="checkbox"
                  id="per5"
                  name="per5"
                  value="View Movies"
                  onChange={(e) => setpremission(e)}
                />
                <span > View Movies</span> <br></br>

                <input
                  type="checkbox"
                  id="per6"
                  name="per6"
                  value="Create Movies"
                  onChange={(e) => setpremission(e)} />
                <span > Create Movies</span> <br></br>

                <input
                  type="checkbox"
                  id="per7"
                  name="per7"
                  value="Delete Movies"
                  onChange={(e) => setpremission(e)} />
                <span> Delete Movies</span> <br></br>

                <input
                  type="checkbox"
                  id="per8"
                  name="per8"
                  value="Update Movies"
                  onChange={(e) => setpremission(e)} />
                <span> Update Movies</span> <br></br>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}
