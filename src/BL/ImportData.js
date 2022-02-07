import { getUsersDataFormatted, getUserCred } from "./getUsersData";
import { getMovies } from "./MoviesDB";
import { getMembersDataFormatted } from "./MembersDB";
import axios from "axios";
export const GetSiteData = async () => {
  const members = await getMembersDataFormatted();
  const movies = await getMovies();
  const users = await getUsersDataFormatted();
  const user = await getUserCred()

  return {
    members,
    movies,
    users,
    user
  };
};
export const getUpdatedCred = async () => {
  const user = await getUserCred()

  return user
}
