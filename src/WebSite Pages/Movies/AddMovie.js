import React, { useContext } from "react";
import { postMovies } from "../../BL/MoviesDB";
import { StateFunctions } from "./Movies";
import { WebSiteContext } from "../MainPage";
import { validateMovie } from "../../BL/DataValidation"
import AddPage from '../../Utils/AddPage';
export default function AddMovie() {
  const { handleAddInfo } = useContext(WebSiteContext);
  const { handleShowEditMovie } = useContext(StateFunctions);


  const handleAddMovie = (movieValues) => {

    postMovies({ ...movieValues }).then((movie) => {
      handleAddInfo('movie', movie);
    });


  }
  return (
    <AddPage
      objType="Movie"
      operation="Add"
      addFunction={handleAddMovie}
      cancelFunction={() => { handleShowEditMovie("All", null) }}
      validataionFunction={validateMovie}
      inputs={[{
        type: "text",
        name: "name",
        label: "Name"
      }, {
        type: "text",
        name: "genres",
        label: "Genres",
        clarification: `genres need to be seperated by a ", "`,
      }, {
        type: "text",
        name: "image",
        label: "Image Source",

      }, {
        type: "date",
        name: "premiered",
        label: "",

      }]}
      confirmLabel={"Save"}
      abortLabel={"Cancel"}
    />

  );
}
