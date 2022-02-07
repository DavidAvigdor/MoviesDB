import React from "react";
import UserData from "./UserData";

export default function AllUsers({ Users }) {
  const layout = () => {
    const filteredUsers = Users.filter(user => { return user.username !== "admin" })
    if (filteredUsers.length === 0)
      return <>No Users in the DB</>

    return filteredUsers.map((user, index) => <UserData key={user.id} User={user} style={{
      backgroundColor: index % 2 === 0 ? "white" : "hsl(0, 0%, 90%)",
    }}></UserData>)
  }
  return (
    <div>
      {layout()}
    </div>
  );
}
