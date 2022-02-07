import React, { useContext, useState } from "react";
import { StateFunctions } from "./Members";
import { Button } from "react-bootstrap";
import { WebSiteContext } from "../MainPage";
import Select from "react-select";
import { deleteSubs } from "../../BL/SubscriptionsDB";
import { deleteMember } from "../../BL/MembersDB";
import { useNavigate } from "react-router-dom";
export default function MemberInfo({ member, style }) {
  const navigate = useNavigate();
  const { movies, handleAddInfo, handleDeleteInfo, userCred } = useContext(WebSiteContext);
  const { HandleShowEditMember } = useContext(StateFunctions);
  const [SubscribeNew, setSubscribeNew] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleChange = (e) => setSelectedMovie(e.value);
  const SubmitSub = () => {
    const date = document.getElementById(
      `Member_Info-Subscribe_Data${member.id}`
    ).value;

    if (selectedMovie && date) {
      const newMovies = [...member.subscriptions.movies];
      newMovies.push({ movieId: selectedMovie, date });
      const id = member.subscriptions.id;
      const memberId = member.id;
      const newSub = { id, memberId, movies: newMovies };
      handleAddInfo("subscription", newSub)
      setSelectedMovie(null);
    }
  };

  const createOptions = () => {
    const Filtered = movies.filter((movie) => {
      const res = member.subscriptions.movies.findIndex(
        (subMovie) => subMovie.movieId === movie.id
      );
      return res === -1;
    });
    return Filtered.map((movie) => {
      return { value: movie.id, label: movie.name };
    });
  };
  const handleDeleteMember = () => {
    deleteSubs(member.subscriptions.id).then((res) => {
      deleteMember(member.id).then((res) => {
        handleDeleteInfo("member", member.id)

      });
    });
  };

  return (
    <div className="radius" style={style}>
      <div className="Member_Info-Main_Div " >
        <span className="Member_Info-Member_Name bold-title cursor-def" >{member.name}:</span>

        <div className="Member_Info-Info_Container grid2by2 ml-2">
          <span className="bold-title cursor-def">Email: </span>
          <span className="cursor-def">{member.email}</span>
          <span className="bold-title cursor-def">City:</span>
          <span className="cursor-def">{member.city}</span>
        </div>
        <div className="Member_Info-Buttons_Container ml-4">
          {(userCred === true || (userCred !== "Not Logged In" && userCred.premissions.includes("Update Subscriptions"))) && <Button
            variant="primary"
            onClick={() => HandleShowEditMember("Edit", member.id)}
          >
            Edit
          </Button>}

          {(userCred === true || (userCred !== "Not Logged In" && userCred.premissions.includes("Delete Subscriptions"))) && < Button variant="danger" onClick={() => handleDeleteMember()}>
            Delete
          </Button>}
        </div>
        <div className="Member_Info-Movies_Watched_Container">
          <span className="Member_Info-Member_Movies_Watched_Div bold-title cursor-def"  >Movies Watched:</span> <br></br>

          <Button onClick={() => setSubscribeNew(!SubscribeNew)}>
            Subscribe to a new movie
          </Button>
          <br></br>


          {SubscribeNew && (
            <div className="ml-3">
              <div className="Member_Info-Subscribe_New_Container">
                <Select
                  options={createOptions()}
                  id={`Member_Info-Select-${member.id}`}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  id={`Member_Info-Subscribe_Data${member.id}`}
                ></input>
              </div>
              <Button
                variant="success"
                className="mt-2 Success-Button"
                onClick={() => SubmitSub()}
              >
                Subscribe
              </Button>
            </div>
          )}


          <br></br>

          {member.subscriptions.movies.length !== 0
            ? member.subscriptions.movies.map((sub) => {
              const movie = movies.find((movie) => movie.id === sub.movieId);
              return <li onClick={() => { navigate("/MainPage/movies", { state: { movie: { ...movie } } }) }} className="cursor-def" key={`${member.id}${movie.id}`}>
                {movie.name}, {sub.date.substring(0, 10)}
              </li>
            })

            : <span className="cursor-def">No Subs yet</span>}
        </div>
      </div>
    </div >
  );
}
