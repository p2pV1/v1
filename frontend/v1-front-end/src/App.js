import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import studyImage from "./imgs/study.jpg";
import mentorshipImage from "./imgs/mentor.png";
import immigrationImage from "./imgs/immigration.jpg";
import { NavBar } from "./NavBar";
import { Welcome } from "./Welcome";
import { NextPage } from "./NextPage";
import { Activities } from "./Activities";
import { Categories } from "./Categories";
import { ActivityDetails } from "./ActivityDetails";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

export const categories = [
  { id: 123, name: "Study", image: studyImage },
  { id: 124, name: "Mentorship", image: mentorshipImage },
  { id: 125, name: "Immigration", image: immigrationImage },
];
export const activities = [
  { id: 123, name: "Art & Craft", image: studyImage },
  { id: 124, name: "Gardening", image: mentorshipImage },
  { id: 125, name: "Reading & Writing", image: immigrationImage },
  { id: 123, name: "Fitness & Exercise", image: studyImage },
  { id: 124, name: "Travel & Exploration", image: mentorshipImage },
  { id: 125, name: "Music & Music instruments", image: immigrationImage },
];
export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/" element={<Welcome />} />
        <Route path="/category/:categoryId" element={<Activities />} />
        <Route path="/activity/:activityId" element={<ActivityDetails />} />
        <Route path="/next/:themeId" element={<NextPage />} /> */}
      </Routes>
    </Router>
  );
}
