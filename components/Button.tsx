import styled from "styled-components";
import { resetButton } from "../lib/styles";

export const Button = styled.button`
  ${resetButton}
  color: #000;
  background: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.025);
  }
`;
