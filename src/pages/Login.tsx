import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      localStorage.setItem("token", response.data.access_token);
      message.success("Connexion réussie !");
      navigate("/dashboard");
    } catch (error) {
      message.error("Échec de la connexion. Vérifiez vos identifiants.");
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
        <img src="/images/dixner.png" alt="Dixner Logo" width="300" />{" "}
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
