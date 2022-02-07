import React, { useContext, useState } from "react";
import { StateFunctions } from "./Users";
import { WebSiteContext } from "../MainPage";
import { updateUser } from "../../BL/DealWithUsers";
import { validateUser } from "../../BL/DataValidation"
import AddPage from '../../Utils/AddPage';
export default function EditUser({ user }) {
  const { HandleShowEditUser } = useContext(StateFunctions);
  const { handleEditInfo, users } = useContext(WebSiteContext);
  const [userPremissions, setUserPremissions] = useState({ premissions: [...user.premissions] })


  const validateUserWrapper = ({ firstName, lastName, username, session }) => {
    return validateUser({ firstName, lastName, username, session }, users, user.username)
  }
  const handleEditUser = async (userValues) => {
    const updatedUser = { id: user.id, password: user.password, createdDate: user.createdDate, ...userValues, ...userPremissions }
    await updateUser({ ...updatedUser });

    HandleShowEditUser("All", null)
    handleEditInfo("user", updatedUser)

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
    <div className="Edit_User-Main-Div_Container">
      <div className="Edit_User-Main_Div">


        <div className="grid2by2">
          <AddPage
            objType="User"
            operation="Edit"
            addFunction={handleEditUser}
            cancelFunction={() => { HandleShowEditUser("All", null) }}
            validataionFunction={validateUserWrapper}
            inputs={[{
              type: "text",
              name: "firstName",
              label: "FirstName",
              defaultValue: user.firstName

            }, {
              type: "text",
              name: "lastName",
              label: "LastName",
              defaultValue: user.lastName
            }, {
              type: "text",
              name: "username",
              label: "Username",
              defaultValue: user.username

            }, {
              type: "text",
              name: "session",
              label: "Session Time Out (Minutes)",
              defaultValue: user.session

            }]}
            confirmLabel={"Update"}
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
                  defaultChecked={user.premissions.indexOf("View Subscriptions") !== -1}
                  onChange={(e) => setpremission(e)} />
                <span > View Subscriptions</span><br></br>

                <input
                  type="checkbox"
                  id="per2"
                  name="per2"
                  value="Create Subscriptions"
                  defaultChecked={user.premissions.indexOf("Create Subscriptions") !== -1}
                  onChange={(e) => setpremission(e)}
                />
                <span > Create Subscriptions</span> <br></br>

                <input
                  type="checkbox"
                  id="per3"
                  name="per3"
                  value="Delete Subscriptions"
                  defaultChecked={user.premissions.indexOf("Delete Subscriptions") !== -1}
                  onChange={(e) => setpremission(e)}
                />
                <span> Delete Subscriptions</span><br></br>

                <input
                  type="checkbox"
                  id="per4"
                  name="per4"
                  value="Update Subscriptions"
                  defaultChecked={user.premissions.indexOf("Update Subscriptions") !== -1}
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
                  defaultChecked={user.premissions.indexOf("View Movies") !== -1}
                  onChange={(e) => setpremission(e)}
                />
                <span > View Movies</span> <br></br>

                <input
                  type="checkbox"
                  id="per6"
                  name="per6"
                  value="Create Movies"
                  defaultChecked={user.premissions.indexOf("Create Movies") !== -1}
                  onChange={(e) => setpremission(e)} />
                <span htmlFor="per6"> Create Movies</span> <br></br>

                <input
                  type="checkbox"
                  id="per7"
                  name="per7"
                  value="Delete Movies"
                  defaultChecked={user.premissions.indexOf("Delete Movies") !== -1}
                  onChange={(e) => setpremission(e)} />
                <span> Delete Movies</span> <br></br>

                <input
                  type="checkbox"
                  id="per8"
                  name="per8"
                  value="Update Movies"
                  defaultChecked={user.premissions.indexOf("Update Movies") !== -1}
                  onChange={(e) => setpremission(e)} />
                <span > Update Movies</span> <br></br>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  );
}
