import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-5xl font-bold text-orange mb-4">404</h1>
    <p className="text-lg text-gray-200 mb-6">Page not found.</p>
    <Link to="/" className="text-orange underline hover:text-orange-glow transition">Go Home</Link>
  </div>
);

export default NotFound;
