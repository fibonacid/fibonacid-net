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
  onLogin: () => void;
};

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const { watch, register } = useForm<Fields>();
  const watchPassword = watch("password");

  useEffect(() => {
    if (/hello/i.test(watchPassword)) {
      onLogin();
    }
  }, [watchPassword, onLogin]);

  return (
    <form onSubmit={() => console.log("Submit")}>
      <Field>
        <input
          type="password"
          placeholder='Type "hello" to enter'
          {...register("password")}
        ></input>
      </Field>
    </form>
  );
};

export default LoginForm;
