import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-7 bg-red-800 text-white flex gap-6 justify-center ">
      <Link to="/" className="hover:text-yellow-400">Home</Link>
      <Link to="/stream" className="hover:text-yellow-400">Stream</Link>
      <Link to="/feature" className="hover:text-yellow-400">Features</Link>
      <Link to="/contact" className="hover:text-yellow-600">Contact us</Link>
      <Link to="/sign-in" className="hover:text-yellow-400">Get Started</Link>
    </nav>
  );
}
