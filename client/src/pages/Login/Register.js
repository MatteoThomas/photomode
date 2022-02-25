import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data.status === "ok") {
      window.location.href = "/login";
    }
  }

  const renderForm = (
    <form onSubmit={registerUser}>
      <div className="input-container">
        <label>Name</label>
        <br />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          placeholder="Name"
        />
      </div>

      <div className="input-container">
        <label>Email</label>
        <br />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Email"
        />
      </div>

      <div className="input-container">
        <label>Password</label>
        <br />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="Password"
        />
        <br />
      </div>
      <ButtonsWrapper>
        <StyledButton className="Btn" type="submit" value="Register">
          Register
        </StyledButton>
        <Link to="/Login">
          <StyledButtonLink className="Btn">Login</StyledButtonLink>
        </Link>
      </ButtonsWrapper>
    </form>
  );

  return (
    <StyledContainer>
      <RegisterHeading>Register</RegisterHeading>
      {renderForm}
    </StyledContainer>
  );
}

export default Register;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(5px);
  width: clamp(300px, 95%, 600px);
  color: antiquewhite;
  margin: 5rem auto;
`;

const RegisterHeading = styled.h1`
  font-family: "Raleway" sans-serif;
  font-size: 3rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  background-color: aquamarine;
  color: black;
  border: 1px transparent solid;
  margin: 1rem 2rem 0 0;
  width: fit-content;
  border: 1px transparent solid;
  &:hover {
    background-color: transparent;
    border: 1px aquamarine solid;
  }
`;

const StyledButtonLink = styled(Button)`
  background-color: transparent;
  color: antiquewhite;
  border: 1px transparent solid;
  margin: 1rem 0 0 0;
  width: fit-content;
  border: 1px aquamarine solid;
  &:hover {
    color: black;
    border: 1px transparent solid;
    background-color: aquamarine;
  }
`;

const Input = styled.input`
  border-radius: 4px;
  border: none;
  width: clamp(300px, 95%, 600px);
  margin: 0.3rem 0 2rem 0;
`;
