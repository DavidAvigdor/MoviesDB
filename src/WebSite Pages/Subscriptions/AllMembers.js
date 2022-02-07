import React from "react";
import MemberInfo from "./MemberInfo";
export default function AllMembers({ members }) {

  const layout = () => {
    if (members.length === 0)
      return <>No Members in the DB</>

    return members.map((member, index) => <MemberInfo key={member.id}
      member={member}
      style={{
        backgroundColor: index % 2 === 0 ? "white" : "hsl(0, 0%, 90%)",
      }}
    ></MemberInfo>
    )
  }

  return (
    <div>
      {layout()}
    </div>
  );
}
