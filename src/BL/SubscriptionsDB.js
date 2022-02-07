import axios from "axios";
export const postSubs = async (memberId) => {
  const subs = await axios.post(`http://localhost:3001/subscriptions/`, {
    memberId: memberId,
    movies: [],
  });

  return subs.data;
};
export const getSubs = async (memberId) => {
  const subs = await axios.get(`http://localhost:3001/subscriptions/${memberId}`);
  return subs.data;
};
export const updateSubs = async (sub, memberId) => {
  const subs = await axios.put(`http://localhost:3001/subscriptions/${sub.id}`, {
    memberId: memberId,
    movies: [...sub.movies],
  });

  return subs.data;
};
export const deleteSubs = async (id) => {
  const subs = await axios.delete(`http://localhost:3001/subscriptions/${id}`);
  return subs.data;
};
