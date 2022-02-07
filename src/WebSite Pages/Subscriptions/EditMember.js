import React, { useContext } from "react";
import { StateFunctions } from "./Members";
import { updateMember } from "../../BL/MembersDB";
import { WebSiteContext } from "../MainPage";
import AddPage from '../../Utils/AddPage';
import { validateMember } from "../../BL/DataValidation"
export default function EditMember({ member }) {
  const { handleEditInfo } = useContext(WebSiteContext);
  const { HandleShowEditMember } = useContext(StateFunctions);

  const handleEditMember = async (memberUpdatedValues) => {

    const id = member.id;
    const subscriptions = member.subscriptions;
    const newMember = { id, subscriptions, ...memberUpdatedValues }
    await updateMember(member.id, { ...newMember })
    handleEditInfo("member", newMember)
  };
  return (
    <div className="Edit_Member-Main-Div_Container">

      <AddPage
        objType="Member"
        operation="Edit"
        addFunction={handleEditMember}
        cancelFunction={() => { HandleShowEditMember("All", null) }}
        validataionFunction={validateMember}
        inputs={[{
          type: "text",
          name: "name",
          label: "Name",
          defaultValue: member.name
        }, {
          type: "email",
          name: "email",
          label: "Email",
          defaultValue: member.email
        }, {
          type: "text",
          name: "city",
          label: "City",
          defaultValue: member.city
        }]}
        confirmLabel={"Update"}
        abortLabel={"Cancel"}
      />
    </div>
  );
}
