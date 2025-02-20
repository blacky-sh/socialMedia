import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAdminAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login");
    }
  }, [navigate]);
};

export default useAdminAuth;
