import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { resetInput } from "../lib/styles";

const Field = styled.div`
  input {
    ${resetInput}
    display: block;
    text-align: center;
    margin: 1rem 0;
    padding: 0.5rem 0;
    font-size: 1rem;
    background: #000;
    color: #fff;
    width: 100%;
  }
  input::placeholder {
    font-family: "Comic Mono";
    transition: opacity 0.3s;
  }
  input:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`;

type Fields = {
  password: string;
};

type Props = {
  password: string;
  onLogin: (password: string) => void;
};

const LoginForm: React.FC<Props> = ({ onLogin, password }) => {
  const { handleSubmit, watch, register } = useForm<Fields>();
  const watchPassword = watch("password");

  useEffect(() => {
    if (password.toLowerCase() === watchPassword?.toLowerCase()) {
      onLogin(password);
    }
  }, [password, watchPassword, onLogin]);

  return (
    <form onSubmit={handleSubmit(() => console.log("Submit"))}>
      <Field>
        <input
          type="password"
          placeholder={`Type "${password}" to enter`}
          {...register("password")}
        ></input>
      </Field>
    </form>
  );
};

export default LoginForm;
