import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../API/authApi";
import { FormControl, InputLabel, Input, Button } from "@mui/material";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await login(username, password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/projects");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <h1>Login Page</h1>
        <FormControl
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>

        <FormControl
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <InputLabel htmlFor="password">Password</InputLabel>

          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button
          style={{
            marginTop: "50px",
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
