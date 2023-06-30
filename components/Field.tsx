import styled from "styled-components";
import { resetInput } from "../lib/styles";

const Field = styled.div`
  input {
    ${resetInput}
    display: block;
    text-align: center;
    margin: 2rem 0;
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
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.025);
  }
`;

export default Field;
