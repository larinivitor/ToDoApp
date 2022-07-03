import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "src/hooks/useAuth";

import { Container } from "./styles";

import { api } from "src/api";

import { PublicPages } from "src/common/PublicPages";
import { FormErrors } from "src/common/FormErrors";

import { emailIsValid } from "src/utils";

export const Login = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { saveAndUpdateUserAuth } = useAuth();

  const validateForm = () => {
    const validationErrors = [];

    if (!emailIsValid(email))
      validationErrors.push("Please insert a valid email!");
    if (!password) validationErrors.push("Please insert a password!");

    setErrors(validationErrors);

    return !validationErrors.length;
  };

  const login = async (event) => {
    event.preventDefault();

    const isFormOk = validateForm();
    if (!isFormOk) return;

    api
      .post("/login", { email, password })
      .then((response) => {
        saveAndUpdateUserAuth(response.data);
        history.push("/projects");
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      });
  };

  return (
    <PublicPages>
      <Container onSubmit={login}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormErrors errors={errors} />
        <div>
          <button type="submit">Login</button>
          <button type="text" onClick={() => history.push("/signup")}>
            Signup
          </button>
        </div>
      </Container>
    </PublicPages>
  );
};
