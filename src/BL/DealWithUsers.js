import axios from "axios";
export const deleteUser = async (id) => {
    const premissions = await axios.delete(`http://localhost:3001/userPremissions/${id}`);
    const userJson = await axios.delete(`http://localhost:3001/usersJson/${id}`);
    const user = await axios.delete(`http://localhost:3001/users/${id}`);
    return [premissions, userJson, user];
}
export const addUser = async ({ username, firstName, lastName, session, premissions }) => {
    const user = await axios.post(`/users/`, {
        username,
        password: null
    })
    const id = user.data.id
    const premissionsUser = await axios.post(`http://localhost:3001/userPremissions/`, {
        id,
        premissions
    })
    const nowMill = Date.now()
    const whatIs = new Date(nowMill);
    const createdDate = whatIs.toISOString().substring(0, 10)

    const Json = await axios.post(`http://localhost:3001/usersJson/`, {
        id,
        firstName,
        lastName,
        session,
        createdDate
    })
    return { id: user.data.id, createdDate }
}
export const updateUser = async ({ id, password, username, firstName, lastName, session, premissions }) => {

    const user = await axios.put(`/users/${id}`, {
        username,
        password
    })

    const premissionsUser = await axios.put(`http://localhost:3001/userPremissions/${id}`, {
        id,
        premissions
    })

    const Json = await axios.put(`http://localhost:3001/usersJson/${id}`, {
        id,
        firstName,
        lastName,
        session,
    })
    return { id: user.data.id }
}
export const DeleteUserCred = async () => {
    axios.defaults.withCredentials = true
    const user = await axios.delete('http://localhost:3001/userAuth/')
    return user.data
}