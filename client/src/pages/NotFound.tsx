import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <p className="text-6xl font-semibold text-white">404</p>
      <h1 className="mt-4 text-xl text-white font-medium">Page not found</h1>
      <p className="mt-2 text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        to="/"
        className="inline-block mt-8 bg-teal-500 hover:bg-teal-400 text-neutral-950 font-medium rounded-md px-4 py-2 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
