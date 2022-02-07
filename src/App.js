import { Routes, Link, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./LoginPages/Login";
import CreateAccount from "./LoginPages/CreateAccount";
import MainPage from "./WebSite Pages/MainPage";
import "./css/app.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Create" element={<CreateAccount />} />
          <Route path="/MainPage/*" element={<MainPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
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

export default App;
