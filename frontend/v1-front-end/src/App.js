import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import studyImage from "./assets/images/study.jpg";
import mentorshipImage from "./assets/images/mentor.png";
import immigrationImage from "./assets/images/immigration.jpg";
import { NavBar } from "./NavBar";
import { Welcome } from "./components/Welcome";
import { NextPage } from "./NextPage";
import { Activities } from "./Activities";
import { Categories } from "./Categories";
import { ActivityDetails } from "./ActivityDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AIOutput from "./components/AIOutput";

export const categories = [
  { id: 123, name: "Study", image: studyImage },
  {
    id: 124,
    name: "Mentorship",
    image:
      "https://www.pexels.com/photo/photo-of-professor-mentoring-his-student-6325975/",
  },
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
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/category/:categoryId" element={<Activities />} />
        <Route path="/activity/:activityId" element={<ActivityDetails />} />
        <Route path="/next/:themeId" element={<NextPage />} />
      </Routes>
    </Router>
  );
}
