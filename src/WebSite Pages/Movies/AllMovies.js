import React from "react";
import MovieInfo from "./MovieInfo";

export default function AllMovies({ movies, subscriptionMovie, userCred }) {
  const layout = () => {
    if (userCred === "Not Logged In")
      return <></>
    if (userCred !== true && !userCred.premissions.includes("View Movies"))
      return <> You don't have a premission to watch the movie list</>
    if (subscriptionMovie)
      return <MovieInfo
        key={subscriptionMovie.id}
        movie={subscriptionMovie}
        style={{
          backgroundColor: "white",
        }}
      ></MovieInfo>
    return (movies && movies.length === 0) ? <> No Movies, Sorry</> :
      movies &&
      movies.map((movie, index) => {

        return (
          <MovieInfo
            key={movie.id}
            movie={movie}
            style={{
              backgroundColor: index % 2 === 0 ? "white" : "hsl(0, 0%, 90%)",
            }}
          ></MovieInfo>
        );
      })
  }
  return (
    <div>
      {layout()}


    </div>
  );
}
