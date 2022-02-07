import React, { useState, useContext } from "react";
import AllMembers from "./AllMembers";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import { WebSiteContext } from "../MainPage";
import { Button } from "react-bootstrap";
export const StateFunctions = React.createContext();
export default function Members() {
  const { members, userCred } = useContext(WebSiteContext);
  const [displayChoice, setDisplayChoice] = useState("All");
  const [SelectedMemberId, setsSelectedMemberId] = useState(null);

  const SelectedMember =
    members && members.find((member) => member.id === SelectedMemberId);
  function HandleShowEditMember(state, id) {
    setsSelectedMemberId(id);
    setDisplayChoice(state);
  }
  const displayPage = () => {
    if (displayChoice === "All")
      return <AllMembers members={members}></AllMembers>
    return <AddMember></AddMember>
  }
  return (
    <div>
      <div>
        <StateFunctions.Provider
          value={{ HandleShowEditMember }}
        >
          {displayChoice === "Edit" ? (
            <EditMember member={SelectedMember}></EditMember>
          ) : (
            <div>
              <h1>Members</h1>

              <div className="Members-Buttons_Container">
                <Button className="btn--information btn"
                  onClick={() => setDisplayChoice("All")}>
                  All Members

                </Button>
                {(userCred === true || (userCred !== "Not Logged In" && userCred.premissions.includes("Create Subscriptions"))) &&
                  <Button
                    className="btn--information btn"
                    onClick={() => setDisplayChoice("Add")}>
                    Add Members
                  </Button>}
              </div>
              <div className="Members-Content">
                {displayPage()}
              </div>
            </div>
          )}
        </StateFunctions.Provider>
      </div>
    </div>
  );
}
