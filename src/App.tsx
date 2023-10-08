import "./App.css";
import LandingPage from "./components/landing page/LandingPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/log in/Login";
import { SignUp } from "./components/sign up/SignUp";
import { NewsFeed } from "./components/news feed/NewsFeed";
import { Profile } from "./components/user profile/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/newsfeed" Component={NewsFeed} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </Router>
  );
};

export default App;
