import React, { useContext } from "react";
import { postMembers } from "../../BL/MembersDB";
import { StateFunctions } from "./Members";
import { postSubs } from "../../BL/SubscriptionsDB";
import { WebSiteContext } from "../MainPage";
import { validateMember } from "../../BL/DataValidation"
import AddPage from '../../Utils/AddPage';
export default function AddMember() {
  const { handleAddInfo } = useContext(WebSiteContext);
  const { HandleShowEditMember } = useContext(StateFunctions);



  function handleAddMember(memberValues) {

    postMembers({ ...memberValues }).then((member) => {

      const id = member.id;
      postSubs(id).then((subscriptions) => {
        const newMember = { id, subscriptions, ...memberValues }
        handleAddInfo("member", newMember)
        // HandleShowEditMember("All", null);
      });
    });


  }
  return (
    <AddPage
      objType="Member"
      operation="Add"
      addFunction={handleAddMember}
      cancelFunction={() => { HandleShowEditMember("All", null) }}
      validataionFunction={validateMember}
      inputs={[{
        type: "text",
        name: "name",
        label: "Name"
      }, {
        type: "email",
        name: "email",
        label: "Email"
      }, {
        type: "text",
        name: "city",
        label: "City"
      }]}
      confirmLabel={"Save"}
      abortLabel={"Cancel"}
    />
  );
}
