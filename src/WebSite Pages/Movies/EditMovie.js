import React, { useContext } from "react";
import { StateFunctions } from "./Movies";
import { updateMovie } from "../../BL/MoviesDB";
import AddPage from '../../Utils/AddPage';
import { WebSiteContext } from "../MainPage";
import { validateMovie } from "../../BL/DataValidation"
export default function EditMovie({ movie }) {
  const { handleShowEditMovie } = useContext(StateFunctions);
  const { handleEditInfo } = useContext(WebSiteContext);

  const handleEditMovie = (movieUpdatedValues) => {
    updateMovie({ id: movie.id, ...movieUpdatedValues }).then((movie) => {
      handleEditInfo("movie", movie)
    });

  }
  return (
    <div className="Edit_Movie-Main-Div_Container">

      <AddPage
        objType="Movie"
        operation="Edit"
        addFunction={handleEditMovie}
        cancelFunction={() => { handleShowEditMovie("All", null) }}
        validataionFunction={validateMovie}
        inputs={[{
          type: "text",
          name: "name",
          label: "Name",
          defaultValue: movie.name,

        }, {
          type: "text",
          name: "genres",
          label: "Genres",
          clarification: `genres need to be seperated by a ", "`,
          defaultValue: movie.genres.join(),
        }, {
          type: "text",
          name: "image",
          label: "Image Source",
          defaultValue: movie.image,

        }, {
          type: "date",
          name: "premiered",
          label: "",
          defaultValue: new Date(movie.premiered).toISOString().slice(0, 10)

        }]}
        confirmLabel={"Update"}
        abortLabel={"Cancel"}
      />
    </div>

  );
}
