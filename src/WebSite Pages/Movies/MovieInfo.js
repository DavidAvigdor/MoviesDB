import React, { useContext } from "react";
import { StateFunctions } from "./Movies";
import { Button } from "react-bootstrap";
import { WebSiteContext } from "../MainPage";
export default function MovieInfo({ movie, style }) {
  const { handleShowEditMovie } = useContext(StateFunctions);
  const { members, handleDeleteInfo, userCred } = useContext(WebSiteContext);
  return (
    <div className="Movie_Info-Main_Div radius" style={style}>
      <div className="Movie_Info-Info_Container fit">
        <span className="cursor-def">
          {movie.name}, {movie.premiered.substring(0, 4)}
        </span>

        <span className="cursor-def Movie_Info-Genres">
          {movie.genres &&
            movie.genres.length > 0 &&
            movie.genres.reduce((a, b) => {
              return a + ", " + b;
            })}
        </span>
      </div>
      <div className="Movie_Info-Extra_Container fit">
        <img src={movie.image} />
        <div className="Movie_Info-Summary">
          <h6 className="cursor-def">summary:</h6>
          <span className="cursor-def"> {movie.summary && movie.summary.length > 350 ? `${movie.summary.substring(0, 350)}...` : movie.summary}</span>

        </div>
        <div>
          <h6 className="cursor-def">Members that watched this movie:</h6>
          {members.map((member) => {
            const sub = member.subscriptions.movies.find(
              (subMovie) => subMovie.movieId === movie.id
            );
            return !sub ? null : (
              <div
                className="Movie_Info-Sub_List"
                key={`${member.id}SubsFor${movie.id}`}
              >
                <span className="clickable">{member.name}, </span>
                <span className="cursor-def">{sub.date.substring(0, 4)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Movie_Info-Buttons_Container ">

        {((userCred === true) || (userCred !== "Not Logged In" && userCred.premissions.includes("Update Movies"))) && <Button
          variant="primary"
          className="bth"
          onClick={() => handleShowEditMovie("Edit", movie.id)}
        >
          Edit
        </Button>}
        {(userCred === true || (userCred !== "Not Logged In" && userCred.premissions.includes("Delete Movies"))) && <Button
          variant="danger"
          className="bth"
          onClick={() => handleDeleteInfo("movie", movie.id)}
        >
          Delete
        </Button>}
      </div>
    </div>
  );
}
