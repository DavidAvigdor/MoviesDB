import React, { useState, useContext } from "react";
import AllUsers from "./AllUsers";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { Button } from "react-bootstrap";
import { WebSiteContext } from "../MainPage";
export const StateFunctions = React.createContext();
export default function Users() {

  const { users } = useContext(WebSiteContext);
  const [displayChoice, setDisplayChoice] = useState("All");
  const [SelectedUserId, setsSelectedUserId] = useState(null);
  const SelectedUser =
    users && users.find((user) => user.id === SelectedUserId);

  function HandleShowEditUser(state, id) {
    setsSelectedUserId(id);
    setDisplayChoice(state);
  }


  return (
    <div>
      <div>
        <StateFunctions.Provider value={{ HandleShowEditUser }}>
          {displayChoice === "Edit" && SelectedUser ? (
            <EditUser user={SelectedUser}></EditUser>
          ) : (
            <div>
              <h1>Users</h1>

              <div className="Users-Buttons_Container">
                <Button className="btn--information btn"
                  onClick={() => setDisplayChoice("All")}>
                  All Users

                </Button>
                <Button className="btn--information btn"
                  onClick={() => setDisplayChoice("Add")}>
                  Add User
                </Button>
              </div>
              <div className="Users-Content">
                {displayChoice === "All" ? (
                  <AllUsers
                    Users={users}
                    HandleShowEditUser={HandleShowEditUser}
                  ></AllUsers>
                ) : (
                  <AddUser></AddUser>
                )}
              </div>
            </div>
          )}
        </StateFunctions.Provider>
      </div>
    </div>
  );
}
