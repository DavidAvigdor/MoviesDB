import React, { useState, useEffect, useRef } from "react";
import Users from "./User Management/Users";
import Movies from "./Movies/Movies";
import Members from "./Subscriptions/Members";
import { Routes, Route, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { GetSiteData, getUpdatedCred } from "../BL/ImportData";
import { updateSubs } from "../BL/SubscriptionsDB";
import { deleteMovie } from "../BL/MoviesDB";
import { DeleteUserCred } from '../BL/DealWithUsers'
export const WebSiteContext = React.createContext();
export default function MainPage() {
  const [loading, setLoadingState] = useState(true);
  const [members, setMembersState] = useState(null);
  const [movies, setMoviesState] = useState(null);
  const [users, setUsersState] = useState(null);
  const [userCred, setUserCredState] = useState(null)

  const intervalRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setLoadingState(true);
    GetSiteData().then(res => {

      setMembersState(res.members);
      setUsersState(res.users);
      setMoviesState(res.movies);
      setUserCredState(res.user)
      setLoadingState(false);
    });

  }, []);

  const handleAddMovieToSubscription = (sub) => {
    updateSubs(sub, sub.memberId).then((res) => {
      const newMembers = members.map((member) => {
        return member.id !== sub.memberId
          ? member
          : {
            id: member.id,
            city: member.city,
            email: member.email,
            name: member.name,
            subscriptions: sub,
          };
      });
      setMembersState(newMembers);
    });
  };
  const handleDeleteMovie = async (movieId) => {
    const newMembers = members.map((member) => {
      const newSubs = member.subscriptions.movies.filter(
        (movie) => movie.movieId !== movieId
      );
      return {
        id: member.id,
        city: member.city,
        email: member.email,
        name: member.name,
        subscriptions: {
          memberId: member.id,
          id: member.subscriptions.id,
          movies: [...newSubs],
        },
      };
    });

    setLoadingState(true);
    const newMovies = movies.filter((movie) => movie.id !== movieId);
    for (let i = 0; i < newMembers.length; i++) {
      await updateSubs(newMembers[i].subscriptions, newMembers[i].id);
    }
    deleteMovie(movieId).then((movie) => {
      setMoviesState(newMovies);
      setMembersState(newMembers);
      setLoadingState(false);
    });
  };

  const handleDeleteInfo = (type, value) => {
    switch (type) {
      case "movie":
        handleDeleteMovie(value)
        break;
      case "user":
        const newUsers = users.filter(user => user.id !== value)

        setUsersState([...newUsers])
        break;
      case "member":

        const newMembers = members.filter((member) => member.id !== value);
        setMembersState([...newMembers]);
        break;
      default:
        break;
    }
  }


  const handleAddInfo = (type, value) => {
    switch (type) {
      case "member":
        const newMembers = [...members];

        newMembers.push(value);
        setMembersState(newMembers);
        break;
      case "movie":
        const newMovies = [...movies];
        newMovies.push(value);

        setMoviesState(newMovies);
        break;
      case "user":
        const newUsers = [...users];
        newUsers.push(value)
        setUsersState([...newUsers])
        break;
      case "subscription":
        handleAddMovieToSubscription(value)

        break;
      default:
        break;
    }
  }

  const handleEditInfo = (type, value) => {
    switch (type) {
      case "member":
        const newMembers = members.map((member) => {
          return member.id === value.id ? value : member;
        });
        setMembersState(newMembers);
        break;
      case "movie":
        const newMovies = movies.map((movie) => {
          return movie.id === value.id ? value : movie;
        });
        setMoviesState(newMovies);
        break;
      case "user":
        const newUsers = users.map((user) => {
          return user.id === value.id ? value : user;
        });
        setUsersState(newUsers)

        break;
      default:
        break;
    }
  }



  useEffect(() => {
    if (userCred === "Not Logged In") {

      navigate("/")

    }
    else {
      intervalRef.current = setInterval(async () => {
        const newUserCred = await getUpdatedCred()
        if (newUserCred === "Not Logged In") {
          setUserCredState(newUserCred)
          clearInterval(intervalRef.current)
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [userCred])
  const logOut = () => {
    DeleteUserCred()
    setUserCredState("Not Logged In")
  }
  return (
    <div>

      <div>

        {loading
          ? "loading..."
          : members &&
          movies &&
          users && (
            <WebSiteContext.Provider
              value={{
                loading,
                movies,
                members,
                users,
                handleAddInfo,
                handleDeleteInfo,
                handleEditInfo,
                userCred,
              }}
            >
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="movies" element={<Movies />} />
                  <Route path="users" element={<Users />} />
                  <Route path="members" element={<Members />} />
                  <Route path="*" element={<NoMatch />} />

                </Route>
              </Routes>
            </WebSiteContext.Provider>
          )}
      </div>
    </div>
  );
  function Layout() {

    setTimeout(() => {
      if (location.pathname === "/MainPage") {
        navigate("/MainPage/movies")
      }

    }, 1000)

    return (
      <div>
        <div className="ml-4">
          <Link className="myLinks" to="/MainPage/movies">Movies</Link>
          {(userCred === true) && <Link className="myLinks" to="/MainPage/users"> User Management</Link>}
          <Link className="myLinks" to="/MainPage/members"> Members</Link>
          <Link className="myLinks" onClick={logOut} to="/"> LogOut</Link>
        </div>
        <Outlet />
      </div>
    );
  }
  function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }
}
