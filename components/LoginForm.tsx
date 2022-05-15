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

const LoginForm: React.FC = () => {
  return (
    <form onSubmit={() => console.log("Submit")}>
      <Field>
        <input type="password" placeholder='Type "hello" to enter'></input>
      </Field>
    </form>
  );
};

export default LoginForm;
