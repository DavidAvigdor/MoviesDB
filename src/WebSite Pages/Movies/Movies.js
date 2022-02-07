import React, { useState, useEffect, useContext } from "react";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import { Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { WebSiteContext } from "../MainPage";
export const StateFunctions = React.createContext();
export default function Movies() {
  const location = useLocation();
  const { movies, userCred } = useContext(WebSiteContext);
  const [displayChoice, setDisplayChoice] = useState("All");
  const [filteredMovies, setFiltered] = useState(null);
  const [SelectedMovieId, setsSelectedMovieId] = useState(null);
  const [SelectedMovie, setSelectedMovie] = useState(null)
  const [subscriptionMovie, setSubscriptionMovie] = useState(location.state ? location.state.movie : null)
  useEffect(() => {
    setSelectedMovie(movies && movies.find((movie) => movie.id === SelectedMovieId))

  }, [SelectedMovieId])

  function handleShowEditMovie(state, id) {
    setsSelectedMovieId(id);
    setDisplayChoice(state);
  }

  useEffect(() => {
    setSubscriptionMovie(location.state ? location.state.movie : null)
  }, [])
  useEffect(() => {
    movies && setFiltered([...movies]);
  }, [movies]);
  function filterMovies(filterValue) {
    setFiltered((prev) =>
      movies.filter((movie) =>
        movie.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }
  function handleSearch() {
    setSubscriptionMovie(null)
    const search = document.getElementById("search");
    filterMovies(search.value);
  }




  const DisplayPage = () => {
    if (displayChoice === "All")
      return <AllMovies
        movies={filteredMovies}
        filterMovies={filterMovies}
        subscriptionMovie={subscriptionMovie}
        userCred={userCred}
      ></AllMovies>
    return <AddMovie></AddMovie>
  }
  return (
    <div>
      <div className="Movies-Main_Div">
        <StateFunctions.Provider
          value={{ handleShowEditMovie }}
        >
          {displayChoice === "Edit" ? SelectedMovie && (
            <EditMovie movie={SelectedMovie}></EditMovie>
          ) : (
            <div className="Movies-All_Add_Main_Div">
              <h1 className="">Movies</h1>
              <div className="Movies-Header">

                <Button
                  onClick={() => { setSubscriptionMovie(null); setDisplayChoice("All") }}
                  className="btn--information btn"
                >
                  All Movies
                </Button>

                {userCred && userCred !== "Not Logged In" && (userCred === true || userCred.premissions.includes("Create Movies")) && <Button
                  onClick={() => setDisplayChoice("Add")}
                  className="btn--information btn"
                >
                  Add Movies
                </Button>}
                <div className="Movies-Find_Movie_Container">
                  <span className="bold-title "> Find Movie:</span>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    onChange={() => handleSearch()}
                  />
                </div>
              </div>
              <div className="Movies-Content ">

                {DisplayPage()}
              </div>
            </div>
          )}
        </StateFunctions.Provider>
      </div>
    </div>
  );
}
