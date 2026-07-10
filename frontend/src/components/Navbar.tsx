import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `text-sm transition colors ${
      location.pathname === path
        ? "text-white font medium"
        : " text-neutral-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-8">
        <span className="text-white font-medium">My Portfolio</span>
        <div className="flex gap-6 ml-auto">
          <Link to="/" className={linkClass("/")}>
            Projects
          </Link>
          <Link to="/about" className={linkClass("/about")}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
