import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token); // Stockage du token
        message.success("Connexion réussie !");
        navigate("/dashboard"); // Rediriger après connexion
      } else {
        message.error(data.message || "Échec de connexion !");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      message.error("Impossible de se connecter !");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Card style={{ width: 400, padding: "20px" }}>
        <img src="/images/dixner.png" alt="Dixner Logo" width="300" />
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Connexion</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer votre email" },
              { type: "email", message: "L'email n'est pas valide" },
            ]}
          >
            <Input placeholder="Entrez votre email" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              { required: true, message: "Veuillez entrer votre mot de passe" },
            ]}
          >
            <Input.Password placeholder="Entrez votre mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Se connecter
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
