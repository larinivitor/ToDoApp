import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Container } from "./styles";
import { PublicPages } from "src/common/PublicPages";
import { FormErrors } from "src/common/FormErrors";

import { api } from "src/api";
import { emailIsValid } from "src/utils";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const validateForm = () => {
    const validationErrors = [];

    if (!emailIsValid(email))
      validationErrors.push("Please insert a valid email!");

    if (password.length < 6)
      validationErrors.push("Password must have 6 or more characters");

    if (password !== repeatPassword)
      validationErrors.push("Passwords do not match");

    setErrors(validationErrors);
    return !validationErrors.length;
  };

  const handleCreateNewUser = async (event) => {
    event.preventDefault();
    const isFormOk = validateForm();

    if (!isFormOk) return;
    else {
      api
        .post("/signup", { email, password })
        .then((response) => {
          const message = response?.data?.message;
          toast.success(message);
          history.push("/login");
        })
        .catch((error) => {
          const message = error?.response?.data?.message;
          toast.error(message);
        });
    }
  };

  return (
    <PublicPages>
      <Container onSubmit={handleCreateNewUser}>
        <h1>Signup</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrors([]);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setErrors([]);
          }}
        />
        <input
          type="password"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={(event) => {
            setRepeatPassword(event.target.value);
            setErrors([]);
          }}
        />

        <FormErrors errors={errors} />

        <div id="actions">
          <button type="submit">Save</button>
          <button type="text" onClick={() => history.push("/login")}>
            Back
          </button>
        </div>
      </Container>
    </PublicPages>
  );
};
