import Projects from "./pages/Projects";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { Route, Routes } from "react-router-dom";
import ContactForm from "./pages/ContactForm";
import Inbox from "./pages/Inbox";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
