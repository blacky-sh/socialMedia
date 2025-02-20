import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login");
    }
  }, [navigate]);
  return children;
};
export default ProtectedAdminRoute;
