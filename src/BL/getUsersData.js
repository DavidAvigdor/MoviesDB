import axios from "axios";

export const getUserJson = async (id) => {
  const user = await axios.get(`http://localhost:3001/usersJson/${id}`);

  return user.data[0];
};
export const getUserPremissions = async (id) => {
  const premissions = await axios.get(`http://localhost:3001/userPremissions/${id}`);
  return premissions.data;
};
export const getUsers = async () => {
  const users = await axios.get("http://localhost:3001/users/");
  return users.data;
};

export const getAllPremissions = async () => {
  const premissions = await axios.get(`http://localhost:3001/userPremissions/`);
  return premissions.data;
};
export const getAllJson = async () => {
  const user = await axios.get(`http://localhost:3001/usersJson/`);

  return user.data;
};

export const getUsersDataFormatted = async () => {
  const users = await getUsers();
  const premissions = await getAllPremissions();
  const usersJson = await getAllJson();
  const finalInfo = users.map((user) => {
    const id = user.id;
    const userPremissions = premissions.find((per) => per.id === user.id) || {
      premissions: ["none"],
    };

    const userJson = usersJson.find((json) => json.id === user.id);

    return {
      id,
      username: user.username,
      firstName: userJson.firstName,
      lastName: userJson.lastName,
      premissions: userPremissions.premissions,
      session: userJson.session,
      createdDate: userJson.createdDate,
    };
  });

  return finalInfo;
};

export const getUserCred = async () => {
  axios.defaults.withCredentials = true
  const user = await axios.get('http://localhost:3001/userAuth/')
  return user.data
}
export const sortPremissions = (premissions) => {
  let movies = premissions.filter(pre => pre.toLowerCase().includes("movies"))
  let subscriptions = premissions.filter(pre => pre.toLowerCase().includes("subscriptions"))
  movies = movies.sort((a, b) => {
    if (a.includes("View")) return -1;
    if (b.includes("View")) return 1;
    return a > b ? 1 : -1
  })
  subscriptions = subscriptions.sort((a, b) => {
    if (a.includes("View")) return -1;
    if (b.includes("View")) return 1;
    return a > b ? 1 : -1
  })
  return [[...subscriptions], [...movies]]
}
export const createUser = async ({ username, password }) => {
  const users = await getUsers();
  const user = users.filter(user => user.username === username)
  if (users.some(user => { return user.username === username && user.password != null })) {
    alert("User with this username already exists")
    return false;
  }
  if (user.length === 0) {
    alert("Couldn't find user with that username")
    return false;

  }

  await axios.put(`http://localhost:3001/users/${user[0].id}`, {
    username,
    password
  })


  return true;
}