import { useNavigate } from "react-router-dom";

const navigate = useNavigate(); 

const ProtectedRoute2 = ({ canAccess, children }) => {
    return canAccess ? children : navigate('./home');
  };

export default ProtectedRoute2;