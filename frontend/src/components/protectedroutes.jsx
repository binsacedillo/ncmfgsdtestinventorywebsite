import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if there is a saved token in session storage
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired
};

export default ProtectedRoute;