import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success("Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue sur le Dashboard</h1>
      <Button type="primary" onClick={handleLogout}>
        Déconnexion
      </Button>
    </div>
  );
};

export default Dashboard;
