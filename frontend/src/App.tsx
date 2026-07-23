import Projects from "./pages/Projects";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
