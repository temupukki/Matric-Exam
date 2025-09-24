import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4 justify-center">
      <Link to="/" className="hover:text-yellow-400">Home</Link>
      <Link to="/about" className="hover:text-yellow-400">About</Link>
      <Link to="/contact" className="hover:text-red-600">Contact us</Link>
    </nav>
  );
}
