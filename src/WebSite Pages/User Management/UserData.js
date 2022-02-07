import React, { useContext } from "react";
import { StateFunctions } from "./Users";
import { deleteUser, DeleteUserCred } from "../../BL/DealWithUsers";
import { WebSiteContext } from "../MainPage";
import { sortPremissions } from "../../BL/getUsersData"
import { Button } from "react-bootstrap";
import UserPremissions from './UserPremissions'

export default function UserData({ User, style }) {
  const { HandleShowEditUser } = useContext(StateFunctions);
  const { handleDeleteInfo, userCred } = useContext(WebSiteContext);

  function handleDeleteUser(id) {


    deleteUser(id).then(res => {
      handleDeleteInfo("user", id)
    })

  }
  return (
    <div className="mt-3 borderr" style={style}>
      <div className="User_Data-Data_Container ml-4 grid2by2">
        <div className="User_Data-Name grid2by2">
          <span className="bold-title cursor-def" > Name:</span>
          <span className="cursor-def"> {User.firstName} {User.lastName}</span>
          <span className="bold-title cursor-def" >Username:</span>
          <span className="cursor-def">{User.username}</span>
          <span className="bold-title cursor-def" >Session Time Out:<br></br>(Minutes)</span>
          <span className="cursor-def">{User.session}</span>
          <span className="bold-title cursor-def" >Created Date:</span>
          <span className="cursor-def"> {User.createdDate}</span>
        </div>
        <div className="User_Data-Premissions ml-4">
          <span className="bold-title cursor-def">
            Premissions:
          </span>
          <div className="grid2by2">
            {User.premissions &&
              User.premissions.length > 0 &&
              sortPremissions(User.premissions).filter(premission => {
                return premission.length > 0
              }).map((premissions, index) => {
                return premissions.lenght !== 0 ? <UserPremissions key={`${User.id}${index}premissions`} id={User.id} premissions={premissions}>

                </UserPremissions> : null
              })}
          </div>


        </div>

        <div className="User_Data-Buttons_Container ml-4  ">
          <Button
            onClick={() => HandleShowEditUser("Edit", User.id)}
            variant="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteUser(User.id)}
            variant="danger"
          >
            Delete
          </Button>

        </div>
      </div>
    </div>
  );
}
