/* ADD MEMBER
<div className="Add_Movie-Main_Div">
      <span className="Add_Movie-Header mb-3 cursor-def">
        Add Member:
      </span>
      <div className="Add_Movie-Info_Container  ">
        <form onSubmit={handleAddMember}>

          <div id="Add_Member-N_Div" className="ml-4 Add_Member-Input_Container Add_Invalid_ToolTip ">
            <span className="cursor-def">Name: </span>
            <input
              placeholder="Enter member name"
              type="text" required
              id="Add_Member-Name"
              onChange={set('name')} />
          </div>
          <div id="Add_Member-E_Div" className="ml-4 Add_Member-Input_Container Add_Invalid_ToolTip">
            <span className="cursor-def">Email: </span>
            <input
              placeholder="Enter email"
              type="text"
              id="Add_Member-Email"
              onChange={set('email')} />
          </div>
          <div id="Add_Member-C_Div" className="ml-4 Add_Member-Input_Container Add_Invalid_ToolTip">
            <span className="cursor-def">City: </span>
            <input
              placeholder="Enter city name"
              type="text"
              id="Add_Member-City"
              onChange={set('city')} />
          </div>



          <div className="Add_Movie-Button_Container">
            <Button
              variant="primary"
              className="btn mr-3"
              type="submit"

            >
              Save
            </Button>
            <Button
              variant="danger"
              className="btn "
              onClick={() => HandleShowEditMember("All", null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

    </div>*/




/*ADD MOVIE
<div>
  <div className="Add_Movie-Main_Div">
    <span className="Add_Movie-Header mb-3 cursor-def">Add Movie</span>
    <div className="Add_Movie-Info_Container ml-4 ">

      <form onSubmit={handleAddMovie}>
        <div id="Add_Movie-N_Div" className=" Add_Movie-Input_Container Add_Invalid_ToolTip ">
          <span className="cursor-def">Name: </span>
          <input
            placeholder="Enter movie name"
            type="text" required
            id="Add_Movie-Name"
            onChange={set('name')} />
        </div>
        <div id="Add_Movie-G_Div" className=" Add_Movie-Input_Container Add_Invalid_ToolTip">
          <span className="cursor-def ">Genres:</span>
          <input
            placeholder="Enter movie genres"
            type="text" required
            id="Add_Movie-Genres"
            onChange={set('genres')} />
        </div>
        <span className="Add_Movie-Genres_Format_ToolTip"> genres need to be seperated by a ","</span>
        <div id="Add_Movie-I_Div" className=" Add_Movie-Input_Container Add_Invalid_ToolTip">
          <span className="cursor-def ">Image Source:</span>
          <input
            placeholder="Enter movie image URL"
            type="text" required
            id="Add_Movie-Image"
            onChange={set('image')} />

        </div>
        <div id="Add_Movie-P_Div" className=" Add_Movie-Input_Container Add_Invalid_ToolTip">
          <span className="cursor-def  "> Premiered</span>
          <input
            type="date" required
            style={{ width: "300px", height: "45px" }}
            id="Add_Movie-Premiered"
            onChange={set('premiered')} />
        </div>



        <div className="Add_Movie-Button_Container">
          <Button
            variant="primary"
            className="btn mr-3"
            type="submit"

          >
            Save
          </Button>
          <Button
            variant="danger"
            className="btn "
            onClick={() => handleShowEditMovie("All", null)}
          >
            Cancel
          </Button>
        </div>
      </form>

    </div>
  </div>
</div>*/

/* EDIT MOVIE 
 <div className="Edit_Movie-Main-Div_Container">
      <form onSubmit={handleEditMovie}>
        <div className="Edit_Movie-Main_Div">

          <span className="Edit_Movie-Header mb-3 cursor-def">Edit Movie</span>
          <div className="ml-4">
            <div id="Edit_Movie-N_Div" className="Edit_Movie-Info_Container Add_Invalid_ToolTip">

              <span className="cursor-def">Name: </span>
              <input
                type="text" required
                defaultValue={movie.name}
                id={`Edit_Movie-Name${movie.id}`}
                onChange={set('name')}
              />
            </div>
            <div id="Edit_Movie-G_Div" className="Edit_Movie-Info_Container Add_Invalid_ToolTip ">

              <span className="cursor-def">Genres:</span>
              <input
                type="text" required
                defaultValue={movie.genres}
                id={`Edit_Movie-Genres${movie.id}`}
                onChange={set('genres')}
              />
            </div>
            <span className="Edit_Movie-Genres_Format_ToolTip"> genres need to be seperated by a ","</span>
            <div id="Edit_Movie-I_Div" className="Edit_Movie-Info_Container  Add_Invalid_ToolTip">
              <span className="cursor-def">Image Source:</span>
              <input
                type="text" required
                defaultValue={movie.image}
                id={`Edit_Movie-Image${movie.id}`}
                onChange={set('image')}
              />
            </div>
            <div id="Edit_Movie-P_Div" className="Edit_Movie-Info_Container  Add_Invalid_ToolTip">

              <span className="cursor-def"> Premiered:</span>
              <input
                type="date" required
                style={{ width: "300px", height: "45px" }}
                defaultValue={new Date(movie.premiered).toISOString().slice(0, 10)}
                id={`Edit_Movie-Premiered${movie.id}`}
                onChange={set('premiered')}
              />
            </div>
          </div>
        </div>
        <div className=" Edit_Movie-Buttons_Container">
          <Button
            variant="primary"
            className="btn mr-3"
            type="submit"
          >
            Update
          </Button>
          <Button
            variant="danger"
            className="btn"
            onClick={() => handleShowEditMovie("All", null)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div >*/

/* EDIT MEMBER
  <div className="Edit_Member-Main-Div_Container">
  <form onSubmit={handleEditMemberSetter}>
    <div className="Edit_Member-Main_Div">
      <span className="Edit_Member-Header mb-3 cursor-def">Edit Member</span>
      <div className="ml-center">
        <div id="Edit_Movie-N_Div" className="Edit_Member-Info_Container Add_Invalid_ToolTip">

          <span>Name: </span>
          <input
            type="text" required
            id="Edit_Member-Name"
            defaultValue={member.name}
            onChange={set('name')} />
        </div>
        <div id="Edit_Movie-E_Div" className="Edit_Member-Info_Container Add_Invalid_ToolTip">
          <span>Email:</span>
          <input
            type="email" required
            id="Edit_Member-Email"
            defaultValue={member.email}
            onChange={set('email')} />
        </div>
        <div id="Edit_Movie-C_Div" className="Edit_Member-Info_Container Add_Invalid_ToolTip">
          <span>City:</span>
          <input
            type="text"
            id="Edit_Member-City"
            defaultValue={member.city}
            onChange={set('city')} />

        </div>
      </div>
    </div>
    <div className=" Edit_Movie-Buttons_Container">
      <Button
        variant="primary"
        className="btn mr-3"
        type="submit"
      >
        Update
      </Button>
      <Button
        variant="danger"
        className="btn"
        onClick={() => HandleShowEditMember("All", null)}
      >
        Cancel
      </Button>
    </div>
  </form>

</div>*/