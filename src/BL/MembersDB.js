import axios from "axios";
import { getSubs } from "./SubscriptionsDB";

export const getMembers = async () => {
  const members = await axios.get("http://localhost:3001/members/");
  return members.data;
};
export const postMembers = async ({ name, email, city }) => {
  const member = await axios.post("http://localhost:3001/members/", {
    name,
    email,
    city,
  });
  return member.data;
};

export const updateMember = async (id, { name, email, city }) => {
  const members = await axios.put(`http://localhost:3001/members/${id}`, { name, email, city });
  return members.data;
};
export const deleteMember = async (memberId) => {
  const member = await axios.delete(`http://localhost:3001/members/${memberId}`);
  return member.data;
};

export const getMembersDataFormatted = async () => {
  const members = await getMembers();
  const formattedMembers = await Promise.all(
    members.map(async (member) => {
      const subscriptions = await getSubs(member.id);
      return {
        id: member.id,
        name: member.name,
        email: member.email,
        city: member.city,
        subscriptions: { ...subscriptions },
      };
    })
  );
  return formattedMembers;
};
